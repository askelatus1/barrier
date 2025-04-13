import {BarrierContext} from "../../interfaces/core";

export class EventEngine {
    constructor(private ctx: BarrierContext) {
        ctx.eventEngine = this;
    }
}
