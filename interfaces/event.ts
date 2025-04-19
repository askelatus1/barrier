import {NotifyTemplate} from "./notify";
import {EventType, ActorType, TerritoryRuleType} from "../dict/constants";

export interface BarrierEvent {
    id: string;
    type: EventType;
    actionType: ActionType;
    title: string;
    actorRule: ActorType[];
    territoryRule: TerritoryRuleType;
    military: boolean;
    notify?: NotifyTemplate;
}

export enum ActionType {
    CAPTURE = 'capture',
    PEACE = 'peace',
    WAR = 'war',
    WRECKAGE = 'wreckage',
}
