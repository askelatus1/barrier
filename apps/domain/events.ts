import {BarrierContext, BarrierEvent, Track} from "../../interfaces";
import {barrierEvent} from "../../dict/barrierEvent";
import {BarrierRandom} from "./random";

export class EventEngine {
    constructor(private ctx: BarrierContext) {
        ctx.eventEngine = this;
    }

    createEvent(): void {
        const targetEvent: BarrierEvent = BarrierRandom.selectRandom(barrierEvent);
        console.log('EventEngine create event', targetEvent);
        this.ctx.tracker.trackEvent(targetEvent);
    }

    createEventById(id: string): void {
        const ev = barrierEvent.find(event => event.id === id);
        console.log('EventEngine create event manually', ev);
        this.ctx.tracker.trackEvent(ev);
    }

    getEventById(id: string): BarrierEvent {
        return barrierEvent.find(e => e.id === id);
    }

    getEventByTrack(track: Track): BarrierEvent {
        return this.getEventById(track.eventId);
    }
}
