import {RegionsType} from "../dict/regionMap";
import {RegionStatus} from "../dict/constants";
import { Faction } from "./faction";

export interface Region {
    id: RegionsType;
    title: string;
    status: RegionStatus;
    neighbour: RegionsType[],
    faction: (Faction & { military: true }) | null
}
