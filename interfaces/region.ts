import {RegionsType} from "../dict/regionMap";
import {RegionStatus} from "../dict/constants";

export interface Region {
    id: RegionsType;
    title: string;
    status: RegionStatus;
    neighbour: RegionsType[]
}
