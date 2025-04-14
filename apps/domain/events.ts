import {BarrierContext} from "../../interfaces";

export class EventEngine {
    constructor(private ctx: BarrierContext) {
        ctx.eventEngine = this;
    }


    createEvent(): void {

    }
}
