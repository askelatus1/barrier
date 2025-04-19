import {NotifyTemplate} from "./notify";
import {EventType, ActorType, TerritoryRuleType} from "../dict/constants";

export interface BarrierEvent {
    id: string;
    type: EventType;
    title: string;
    actorRule: ActorType[];
    territoryRule: TerritoryRuleType;
    military: boolean;
    notify?: NotifyTemplate;
}
