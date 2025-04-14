import {BarrierContext} from "../../interfaces";

export class Notifier {
    constructor(ctx: BarrierContext) {
        ctx.notifier = this;
    }

    notify(payload: unknown) {
        console.log(JSON.stringify(payload, null, 2));
    }
}
