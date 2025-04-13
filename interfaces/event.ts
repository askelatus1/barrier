import {Faction} from "./faction";

export interface BarrierEvent {
    id: string;
    title: string;
    actors: Faction[];
    actorRule: ActorType[];
    territoryRule: ActorType[];
}
export type ActorType = 'intiator' | 'victim' | 'both' | 'random' | 'neutral';
export interface Type {
    id: string;
    title: string;
}