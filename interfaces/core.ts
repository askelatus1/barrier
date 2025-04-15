import {BarrierTracker, EventEngine, GameCore} from "../apps/domain";
import {Notifier} from "../apps/domain/notifier";

export interface BarrierContext {
    core: GameCore;
    eventEngine: EventEngine;
    tracker: BarrierTracker;
    notifier: Notifier
}
