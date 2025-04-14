export interface BarrierEvent {
    id: string;
    type: BarrierEventType;
    title: string;
    actorRule: ActorType[];
    territoryRule: ActorType[];
    military: boolean;
}
export type ActorType = 'military' | 'civilian' | 'neutral';
export type BarrierEventType = 'step' | 'event'
