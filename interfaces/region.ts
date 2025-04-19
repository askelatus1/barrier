import {RegionsType} from "../dict/regionMap";
import {Status} from "../dict/constants";

export interface Region {
    id: RegionsType;
    title: string;
    status: Status;
    neighbour: RegionsType[]
}
