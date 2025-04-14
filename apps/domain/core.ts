import {BarrierContext} from "../../interfaces";
import {clearTimeout} from "node:timers";

export class GameCore {
    ttl: number = 0;
    constructor(private ctx: BarrierContext, public timeout: number) {
        ctx.core = this;
        this.ttl = this.ctx.random.getRandomInt(10);
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
        if(!this.ttl) this.addEvent();
        this.scheduler = setTimeout(() => this.tick(), this.timeout ?? 5000);
        this.ttl--;
    }

    addEvent(): void {
        this.ttl = this.ctx.random.getRandomInt(10);
        this.ctx.eventEngine.createEvent();
    }
}
