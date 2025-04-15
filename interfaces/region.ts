import {regionsType} from "../dict/regionMap";

export interface Region {
    id: regionsType;
    title: string;
    status: Status;
    neighbour: regionsType[]
}
export type Status = 'war' | 'wreckage' | 'peace';
