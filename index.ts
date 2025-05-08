import {BarrierContext} from "./interfaces";
import {BarrierTracker, EventEngine, GameCore} from "./apps/domain";
import {Notifier} from "./apps/domain/notifier";
import {ActorEngine} from "./apps/domain/actors";
import {ActorZoneService} from "./apps/domain/actorZone";
import { RegionService } from "./apps/domain/regions";
import { faction } from "./dict/factions";

console.log('Engine init');

const ctx: BarrierContext = {
    core: undefined,
    eventEngine: undefined,
    tracker: undefined,
    notifier: undefined,
    actorEngine: undefined,
    regionService: undefined,
    actorZoneService: undefined,
};

new GameCore(ctx, 1000);
new EventEngine(ctx);
new BarrierTracker(ctx);
new Notifier(ctx);
new ActorEngine(ctx);
new RegionService(ctx);
new ActorZoneService(ctx);

ctx.core.start();
// ctx.eventEngine.createEventById('humanitarian', faction[0]);
