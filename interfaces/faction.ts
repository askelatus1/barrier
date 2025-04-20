import {RegionsType} from "../dict/regionMap";
import {FactionType} from "../dict/factions";

export type FactionId = string;

export interface Faction {
    id: FactionId;
    name: string;
    baseRegion: RegionsType;
    military: boolean;
    terror: boolean;
}

