import {BarrierEvent} from "./event";
import {Faction} from "./faction";
import {Region} from "./region";

export interface Track {
    id: string;
    eventId: string;
    timeout?: number;
    territory?: Region;
    actors: Faction[];
    status?: 'resolve' | 'reject';
    scheduler?: NodeJS.Timeout;
}

export interface TrackResponse {
    id: string;
    eventId: string;
    timeout?: number;
    territoryId?: string;
    actorIds: string[];
    status?: 'resolve' | 'reject';
}
