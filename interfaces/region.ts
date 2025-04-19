import {RegionsType} from "../dict/regionMap";

export interface Region {
    id: RegionsType;
    title: string;
    status: Status;
    neighbour: RegionsType[]
}

export type Status = 'war' | 'wreckage' | 'peace';
