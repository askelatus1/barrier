export interface BarrierEvent {
    id: string;
    type: BarrierEventType;
    title: string;
    actorRule: ActorType[];
    territoryRuleActor1: territoryType[];
    territoryRuleActor2: territoryType[];
    military: boolean;
}
export type ActorType = 'military' | 'civilian';
export type BarrierEventType = 'step' | 'event' ;
export type territoryType = 'initiator' |  'victim' | 'both';
