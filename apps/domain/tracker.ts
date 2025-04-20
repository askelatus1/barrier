import {BarrierContext, BarrierEvent, Track, EnhancedTrack, Faction} from "../../interfaces";
import {stepEvent} from "../../dict/barrierEvent";
import {getTerritoryByRule} from "./rules/territoryRule";
import {BarrierRandom} from "./random";
import {TIMEOUTS, EventType, ActorType, NotifyType} from "../../dict/constants";
import {Step} from "../../interfaces/steps";

/**
 * Трекер событий игры. Отслеживает и управляет жизненным циклом событий.
 */
export class BarrierTracker {
    private pool: Map<string, EnhancedTrack> = new Map();

    constructor(private ctx: BarrierContext, private timeoutRange = TIMEOUTS.DEFAULT) {
        ctx.tracker = this;
    }

    /**
     * Получает список акторов из соседних регионов
     * @param rule Тип актора (военный/гражданский)
     * @param firstActor Первый актор, относительно которого ищутся соседи
     * @returns Массив акторов из соседних регионов
     */
    private getNeighbourActors(rule: ActorType, firstActor: Faction): Faction[] {
        const region = this.ctx.regionService.getRegionById(firstActor.baseRegion);
        if (!region) {
            console.warn(`Region ${firstActor.baseRegion} not found`);
            return [];
        }

        const neighbourRegions = this.ctx.regionService.getNeighbourRegions(firstActor.baseRegion);
        const actors = rule === ActorType.MILITARY ? 
            this.ctx.actorEngine.getMilitaryActors() : 
            this.ctx.actorEngine.getCivilianActors();

        return actors.filter(actor => 
            neighbourRegions.some(neighbour => neighbour.faction?.id === actor.id)
        );
    }

    /**
     * Начинает отслеживание нового события
     * @param event Событие для отслеживания
     * @throws Error если не удалось создать трек
     */
    trackEvent(event: BarrierEvent): void {
        try {
            const firstRule = event.actorRule[0];
            let firstActorPool: Faction[];
            switch (firstRule) {
                case ActorType.MILITARY:
                    firstActorPool = this.ctx.actorEngine.getMilitaryActors();
                    break;
                case ActorType.TERRORIST:
                    firstActorPool = this.ctx.actorEngine.getTerroristActors();
                    break;
                case ActorType.CIVILIAN:
                    firstActorPool = this.ctx.actorEngine.getCivilianActors();
                    break;
                default:
                    throw new Error(`Unknown actor type: ${firstRule}`);
            }
            
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
                territory: getTerritoryByRule(actors.map(a => a.baseRegion), event.territoryRule),
                actors
            };

            this.#addTrack(track);
            console.log('createTrack by event: ', track, event);
            this.ctx.notifier.notify(track, NotifyType.START);
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
        this.ctx.notifier.notify({...newStep, type: EventType.STEP}, NotifyType.START);

        if (newStep.final) {
            const notifyType = newStep.id === 'resolve' ? NotifyType.RESOLVE : NotifyType.REJECT;
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

    /**
     * Получает все активные треки
     * @returns Массив активных треков
     */
    getAllTracks(): EnhancedTrack[] {
        return [...this.pool.values()];
    }

    /**
     * Останавливает и удаляет все активные треки
     */
    clearAllTracks(): void {
        this.getAllTracks().forEach(track => {
            if (track.scheduler) {
                clearTimeout(track.scheduler);
            }
            this.#removeTrack(track);
        });
    }

    /**
     * Принудительно останавливает трек
     * @param trackId ID трека для остановки
     * @throws Error если трек не найден
     */
    stopTrack(trackId: string): void {
        const track = this.pool.get(trackId);
        if (!track) {
            throw new Error(`Track with id ${trackId} not found`);
        }
        if (track.scheduler) {
            clearTimeout(track.scheduler);
        }
        this.#removeTrack(track);
    }

    /**
     * Проверяет статус трека
     * @param trackId ID трека
     * @returns true если трек активен, false если нет
     */
    isTrackActive(trackId: string): boolean {
        return this.pool.has(trackId);
    }

    /**
     * Получает количество активных треков
     * @returns Количество активных треков
     */
    getActiveTracksCount(): number {
        return this.pool.size;
    }
}
