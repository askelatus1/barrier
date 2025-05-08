import {NotifyTemplate} from "./notify";
import {EventType, TerritoryRuleType, ActorRuleType} from "../dict/constants";
export interface BarrierEvent {
    id: string;
    type: EventType;
    actionType: ActionType;
    title: string;
    actorRule: [ActorRuleType, ActorRuleType]; // Всегда ровно два правила: для инициатора и цели
    territoryRule: TerritoryRuleType;
    notify?: NotifyTemplate;
}

export enum ActionType {
    CAPTURE = 'capture',
    PEACE = 'peace',
    WAR = 'war',
    WRECKAGE = 'wreckage',
    TRADE = 'trade',
    DIPLOMACY = 'diplomacy',
    ESPIONAGE = 'espionage'
}
