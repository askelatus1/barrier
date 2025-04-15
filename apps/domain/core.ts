import {BarrierContext} from "../../interfaces";
import {clearTimeout} from "node:timers";
import {BarrierRandom} from "./random";

export class GameCore {
    ttl: number = 0;
    constructor(private ctx: BarrierContext, public timeout = 5000) {
        ctx.core = this;
        this.ttl = BarrierRandom.getRandomInt(10);
    }
    scheduler: NodeJS.Timeout;
    start() {
        console.log('Game core started');
        if(!this.scheduler) this.scheduler = setTimeout(() => this.tick(), this.timeout);
    }
    stop() {
        if(this.scheduler) clearTimeout(this.scheduler);
    }

    tick(){
        // logic
        console.log('Game core ticked', performance.now());
        if(!this.ttl) this.addEvent();
        this.scheduler = setTimeout(() => this.tick(), this.timeout);
        this.ttl--;
    }

    addEvent(): void {
        console.log('Game core addEvent fired: ', performance.now());
        this.ttl = BarrierRandom.getRandomInt(10);
        this.ctx.eventEngine.createEvent();
    }
}
