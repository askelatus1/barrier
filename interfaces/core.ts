import {BarrierTracker, EventEngine, GameCore} from "../apps/domain";
import {Notifier} from "../apps/domain/notifier";
import {ActorEngine} from "../apps/domain/actors";
import {IRegionService, IActorZoneService} from "./services";

export interface BarrierContext {
    core: GameCore;
    eventEngine: EventEngine;
    tracker: BarrierTracker;
    notifier: Notifier;
    actorEngine: ActorEngine;
    regionService: IRegionService;
    actorZoneService: IActorZoneService;
}
