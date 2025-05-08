import {NotifyTemplate} from "./notify";
import {EventType, TerritoryRuleType, ActorRuleType} from "../dict/constants";
export interface BarrierEvent {
    id: string;
    type: EventType;
    actionType: ActionType;
    title: string;
    actorRule: ActorRuleType[]; // Одно правило для захвата, два для других действий
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
