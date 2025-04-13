import {BarrierRandom, BarrierTracker, EventEngine, GameCore} from "../apps/domain";

export interface BarrierContext {
    core: GameCore;
    eventEngine: EventEngine;
    tracker: BarrierTracker;
    random: BarrierRandom;
}
