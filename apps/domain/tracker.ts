import {BarrierContext, BarrierEvent, Step, Track, EnhancedTrack} from "../../interfaces";
import {stepEvent} from "../../dict/barrierEvent";
import {faction} from "../../dict/factions";
import {regionMap} from "../../dict/regionMap";
import {getCivilian, getMilitary} from "./rules/actorRules";
import {getTerritoryByRule} from "./rules/territoryRule";
import {BarrierRandom} from "./random";
import {TIMEOUTS, EventType} from "../../dict/constants";

/**
 * Трекер событий игры. Отслеживает и управляет жизненным циклом событий.
 */
export class BarrierTracker {
    private pool: Map<string, EnhancedTrack> = new Map();
    private readonly cache: Map<string, typeof faction[number][]> = new Map();

    constructor(private ctx: BarrierContext, private timeoutRange = TIMEOUTS.DEFAULT) {
        ctx.tracker = this;
    }

    /**
     * Получает список акторов из соседних регионов
     * @param rule Тип актора (военный/гражданский)
     * @param firstActor Первый актор, относительно которого ищутся соседи
     * @returns Массив акторов из соседних регионов
     */
    private getNeighbourActors(rule: 'military' | 'civilian', firstActor: {region: string}): typeof faction[number][] {
        const cacheKey = `${rule}-${firstActor.region}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey)!;
        }

        const military = getMilitary(faction);
        const civilian = getCivilian(faction);
        const actors = rule === 'military' ? military : civilian;
        
        const region = regionMap.find(r => r.id === firstActor.region);
        if (!region) {
            console.warn(`Region ${firstActor.region} not found`);
            return [];
        }

        const validNeighbours = region.neighbour;
        const result = actors.filter(actor => validNeighbours.includes(actor.region as any));
        
        this.cache.set(cacheKey, result);
        return result;
    }

    /**
     * Начинает отслеживание нового события
     * @param event Событие для отслеживания
     * @throws Error если не удалось создать трек
     */
    trackEvent(event: BarrierEvent): void {
        try {
            const military = getMilitary(faction);
            const civilian = getCivilian(faction);
            
            const firstRule = event.actorRule[0];
            const firstActorPool = firstRule === 'military' ? military : civilian;
            if (firstActorPool.length === 0) {
                throw new Error(`No available actors for rule ${firstRule}`);
            }

            const firstActor = firstActorPool.splice(BarrierRandom.getRandomInt(firstActorPool.length), 1)[0];
            
            const secondRule = event.actorRule[1];
            const neighbourActors = this.getNeighbourActors(secondRule, firstActor);
            if (neighbourActors.length === 0) {
                throw new Error(`No available neighbour actors for rule ${secondRule}`);
            }

            const secondActor = neighbourActors.splice(BarrierRandom.getRandomInt(neighbourActors.length), 1)[0];
            
            const actors = [firstActor, secondActor].filter(Boolean);
            if (actors.length !== 2) {
                throw new Error('Failed to create track: not enough actors');
            }
            
            const track: Track = {
                id: crypto.randomUUID(),
                eventId: event.id,
                timeout: BarrierRandom.getRandomInt(this.timeoutRange),
                territory: getTerritoryByRule(actors.map(a => a.region), event.territoryRule),
                actors
            };

            this.#addTrack(track);
            console.log('createTrack by event: ', track, event);
            this.ctx.notifier.notify(track, 'start');
        } catch (error) {
            console.error('Failed to track event:', error);
            throw error;
        }
    }

    getTracksByEvent(event: BarrierEvent): EnhancedTrack[] {
        return [...this.pool.values()].filter(t => t.eventId === event.id)
    }

    #addTrack(track: Track) {
        const targetTrack: EnhancedTrack = {...track, scheduler: undefined, steps: []};
        targetTrack.scheduler = setTimeout(() => this.#handleTrackStep(targetTrack), track.timeout ?? this.timeoutRange);
        this.pool.set(targetTrack.id, targetTrack);
    }

    #removeTrack(track: EnhancedTrack) {
        console.log('remove track: ', track);
        this.pool.delete(track.id);
    }

    #handleTrackStep(track: EnhancedTrack) {
        console.log('Tracker: new step by track: ', track.id);
        // create step
        const newStep = this.#createStep();
        console.log('Tracker: new step created: ', newStep.id, newStep.title);
        // if step final noty and ending track
        track.steps.push(newStep);
        this.ctx.notifier.notify({...newStep, type: EventType.STEP});

        if (newStep.final) {
            const notifyType: 'resolve' | 'reject' = newStep.id === 'resolve' ? 'resolve' : 'reject';
            console.log('track ending: ', track.id);
            this.ctx.notifier.notify(track, notifyType);
            this.#removeTrack(track);
        } else  {
            setTimeout(() => this.#handleTrackStep(track), newStep.timeout)
        }
    }

    #createStep(): Step {
        return BarrierRandom.selectRandom(stepEvent);
    }
}
