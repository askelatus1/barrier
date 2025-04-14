import {BarrierContext, BarrierEvent, Step, Track} from "../../interfaces";
import {stepEvent} from "../../dict/barrierEvent";
import {faction} from "../../dict/factions";
import {getCivilian, getMilitary} from "./rules/actorRules";

export type EnhancedTrack = Track & {scheduler: NodeJS.Timeout, steps: Step[]}

export class BarrierTracker {
    pool: EnhancedTrack[] = [];
    constructor(private ctx: BarrierContext) {
        ctx.tracker = this;
    }
    trackEvent(event: BarrierEvent): void {
        const military = getMilitary(faction);
        const civilian = getCivilian(faction);
        const actors = event.actorRule.map(rule => {
            switch (rule) {
                case "civilian":
                    return civilian.splice(this.ctx.random.getRandomInt(civilian.length), 1)[0];
                case "military":
                    return military.splice(this.ctx.random.getRandomInt(civilian.length), 1)[0];
            }
        })
        const track: Track = {
            id: crypto.randomUUID(),
            eventId: event.id,
            actors
        };

        this.#addTrack(track)
    }

    #addTrack(track: Track) {
        const targetTrack: EnhancedTrack = {...track, scheduler: undefined, steps: []};
        targetTrack.scheduler = setTimeout(() => this.#handleTrackStep(targetTrack), )
        this.pool.push(targetTrack);
    }

    #handleTrackStep(track: EnhancedTrack) {
        // create step
        const newStep = this.#createStep();
        // if step final noty and ending track
        track.steps.push(newStep);
        if (newStep.final) return;

    }

    #createStep(): Step {
        return this.ctx.random.selectRandom(stepEvent);
    }
}
