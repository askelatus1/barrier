import {BarrierTracker, EventEngine, GameCore} from "../apps/domain";
import {Notifier} from "../apps/domain/notifier";
import {IActorEngine, IRegionService} from "./services";

export interface BarrierContext {
    core: GameCore;
    eventEngine: EventEngine;
    tracker: BarrierTracker;
    notifier: Notifier;
    actorEngine: IActorEngine;
    regionService: IRegionService;
}
