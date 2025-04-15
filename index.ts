import {BarrierContext} from "./interfaces";
import {BarrierTracker, EventEngine, GameCore} from "./apps/domain";
import {Notifier} from "./apps/domain/notifier";

console.log('Engine init');

const ctx: BarrierContext = {
    core: undefined,
    eventEngine: undefined,
    tracker: undefined,
    notifier: undefined,
};

new GameCore(ctx, 1000);
new EventEngine(ctx);
new BarrierTracker(ctx);
new Notifier(ctx);

// ctx.core.start();
ctx.eventEngine.createEventById('humanitarian');
