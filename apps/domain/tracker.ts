import {BarrierContext, BarrierEvent, Step, Track} from "../../interfaces";
import {stepEvent} from "../../dict/barrierEvent";
import {faction} from "../../dict/factions";
import {getCivilian, getMilitary} from "./rules/actorRules";
import {getTerritoryByRule} from "./rules/territoryRule";
import {BarrierRandom} from "./random";

export type EnhancedTrack = Track & {scheduler: NodeJS.Timeout, steps: Step[]}

export class BarrierTracker {
    pool: Map<string, EnhancedTrack> = new Map();
    constructor(private ctx: BarrierContext, private timeoutRange = 1000) {
        ctx.tracker = this;
    }
    trackEvent(event: BarrierEvent): void {
        const military = getMilitary(faction);
        const civilian = getCivilian(faction);
        const actors = event.actorRule.map(rule => {
            switch (rule) {
                case "civilian":
                    return civilian.splice(BarrierRandom.getRandomInt(civilian.length), 1)[0];
                case "military":
                    return military.splice(BarrierRandom.getRandomInt(military.length), 1)[0];
            }
        }).filter(Boolean);
        const track: Track = {
            id: crypto.randomUUID(),
            eventId: event.id,
            timeout: BarrierRandom.getRandomInt(this.timeoutRange),
            territory: getTerritoryByRule(actors.map(a => a.region), event.territoryRule),
            actors
        };

        this.#addTrack(track)
        console.log('createTrack by event: ', track, event);
        this.ctx.notifier.notify(track, 'start')
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
        this.ctx.notifier.notify(newStep);

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
