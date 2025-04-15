import {BarrierContext, BarrierEvent, Track} from "../../interfaces";
import {barrierEvent} from "../../dict/barrierEvent";

export class EventEngine {
    constructor(private ctx: BarrierContext) {
        ctx.eventEngine = this;
    }

    createEvent(): void {
        const targetEvent: BarrierEvent = this.ctx.random.selectRandom(barrierEvent);
        this.ctx.tracker.trackEvent(targetEvent)
    }

    getEventById(id: string): BarrierEvent {
        return barrierEvent.find(e => e.id === id);
    }

    getEventByTrack(track: Track): BarrierEvent {
        return this.getEventById(track.eventId);
    }
}
