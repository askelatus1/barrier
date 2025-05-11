import {BarrierTracker} from "../apps/domain/tracker";
import {ActorEngine} from "../apps/domain/actors";
import {EventEngine} from "../apps/domain/events";
import {IRegionService, IActorZoneService, IApiService} from "./services";
import {INotifier} from "./notify";
import {GameCore} from "../apps/domain/core";
import { TelegramBot } from "../apps/bot";

export interface BarrierContext {
    tracker: BarrierTracker;
    actorEngine: ActorEngine;
    regionService: IRegionService;
    notifier: INotifier;
    eventEngine: EventEngine;
    actorZoneService: IActorZoneService;
    core: GameCore;
    telegramBot: TelegramBot;
    apiService: IApiService;
} 