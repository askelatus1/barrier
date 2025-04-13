import {BarrierContext, Steps, Track} from "../../interfaces";

export type EhchangedTrack = Track & {scheduler: NodeJS.Timeout} & {steps: Steps[]}
export class BarrierTracker {
    pool: (Track & {scheduler: NodeJS.Timeout})[] = [];
    constructor(private ctx: BarrierContext) {
        ctx.tracker = this;
    }

    addTrack(track: Track) {
        const scheduler = setTimeout(() => this.handleTrackStep(track), )
         this.pool.push({...track, scheduler});
    }

    handleTrackStep(track: Track) {
        return;
    }
}
