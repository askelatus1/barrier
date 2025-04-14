import {BarrierContext, BarrierEvent, Step, Track} from "../../interfaces";
import {stepEvent} from "../../dict/barrierEvent";

export type EnhancedTrack = Track & {scheduler: NodeJS.Timeout} & {steps: Step[]}

export class BarrierTracker {
    pool: EnhancedTrack[] = [];
    constructor(private ctx: BarrierContext) {
        ctx.tracker = this;
    }
    trackEvent(event: BarrierEvent): void {
        const track: Track = {
            id: crypto.randomUUID(),
            eventId: event.id
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

    }

    #createStep(): Step {
        return this.ctx.random.selectRandom(stepEvent);
    }
}
