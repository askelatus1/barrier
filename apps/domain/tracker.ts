import {BarrierContext, BarrierEvent, Step, Track} from "../../interfaces";
import {stepEvent} from "../../dict/barrierEvent";
import {faction} from "../../dict/factions";
import {getCivilian, getMilitary} from "./rules/actorRules";
import {getTerritoryByRule} from "./rules/territoryRule";
import {BarrierRandom} from "./random";

export type EnhancedTrack = Track & {scheduler: NodeJS.Timeout, steps: Step[]}

export class BarrierTracker {
    pool: Map<string, EnhancedTrack> = new Map();
    constructor(private ctx: BarrierContext, private timeoutRange = 100000) {
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
                    return military.splice(BarrierRandom.getRandomInt(civilian.length), 1)[0];
            }
        })
        const track: Track = {
            id: crypto.randomUUID(),
            eventId: event.id,
            timeout: BarrierRandom.getRandomInt(this.timeoutRange),
            territory: getTerritoryByRule(actors.map(a => a.region), event.territoryRule),
            actors
        };

        this.#addTrack(track)
    }

    getTracksByEvent(event: BarrierEvent): EnhancedTrack[] {
        return [...this.pool.values()].filter(t => t.eventId === event.id)
    }

    #addTrack(track: Track) {
        const targetTrack: EnhancedTrack = {...track, scheduler: undefined, steps: []};
        targetTrack.scheduler = setTimeout(() => this.#handleTrackStep(targetTrack), track.timeout ?? this.timeoutRange);
        this.pool.set(targetTrack.id, targetTrack);
        this.ctx.notifier.notify(targetTrack)
    }

    #removeTrack(track: EnhancedTrack) {
        this.pool.delete(track.id);
    }

    #handleTrackStep(track: EnhancedTrack) {
        // create step
        const newStep = this.#createStep();
        // if step final noty and ending track
        track.steps.push(newStep);
        if (newStep.final) {
            this.ctx.notifier.notify(track);
            this.#removeTrack(track);
        }

    }

    #createStep(): Step {
        return BarrierRandom.selectRandom(stepEvent);
    }
}
