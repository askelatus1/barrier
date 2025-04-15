import {RegionsType} from "../dict/regionMap";
import {FactionType} from "../dict/factions";

export interface Faction {
    id: string;
    name: string;
    region: RegionsType;
    military: boolean;
    terror: boolean;
    neighbours: FactionType[];
}

