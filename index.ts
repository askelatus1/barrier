import {BarrierContext} from "./interfaces";
import {BarrierTracker, EventEngine, GameCore} from "./apps/domain";
import {Notifier} from "./apps/domain/notifier";
import { ActorEngine } from "./apps/domain/actors";


console.log('Engine init');

const ctx: BarrierContext = {
    core: undefined,
    eventEngine: undefined,
    tracker: undefined,
    notifier: undefined,
    actorEngine: undefined,
};

new GameCore(ctx, 1000);
new EventEngine(ctx);
new BarrierTracker(ctx);
new Notifier(ctx);
new ActorEngine(ctx);

ctx.core.start();
// ctx.eventEngine.createEventById('infantry');
