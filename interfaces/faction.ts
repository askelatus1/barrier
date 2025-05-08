import {RegionsType} from "../dict/regionMap";

export type FactionId = string;

export interface Faction {
    id: FactionId;
    name: string;
    baseRegion: RegionsType;
    military: boolean;
    terror: boolean;
}

export type MilitaryFaction = Faction & {
    military: true;
}

export type CivilianFaction = Faction & {
    military: false;
}

