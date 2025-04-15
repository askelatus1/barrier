import {NotifyTemplate} from "./notify";

export interface BarrierEvent {
    id: string;
    type: BarrierEventType;
    title: string;
    actorRule: ActorType[];
    territoryRule: TerritoryRuleType;
    military: boolean;
    notify?: NotifyTemplate
}
export type ActorType = 'military' | 'civilian';
export type BarrierEventType = 'step' | 'event' ;
export type TerritoryRuleType = 'initiator' |  'victim' | 'both';
