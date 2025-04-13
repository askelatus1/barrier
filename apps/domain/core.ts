import {BarrierContext} from "../../interfaces/core";
import {clearTimeout} from "node:timers";

export class GameCore {
    constructor(private ctx: BarrierContext, public timeout: number) {
        ctx.core = this;
    }

    scheduler: NodeJS.Timeout;
    start() {
        if(!this.scheduler) this.scheduler = setTimeout(() => this.tick(), this.timeout ?? 5000);
    }
    stop() {
        if(this.scheduler) clearTimeout(this.scheduler);
    }

    tick(){
        // logic


        this.scheduler = setTimeout(() => this.tick(), this.timeout ?? 5000);
    }
}
