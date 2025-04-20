import {IRegionService} from "./services";
import {IActorEngine} from "./services";

export interface BarrierContext {
    regionService: IRegionService;
    actorEngine: IActorEngine;
} 