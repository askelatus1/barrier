import { RegionsType } from "../dict/regionMap";
import { RegionStatus } from "../dict/constants";
import { MilitaryFaction } from "./faction";

export interface Region {
    id: RegionsType;
    title: string;
    status: RegionStatus;
    neighbour: RegionsType[],
    faction: MilitaryFaction | null
}
