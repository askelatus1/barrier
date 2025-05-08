import {RegionsType} from "../dict/regionMap";
import {ActorType} from "../dict/constants";

export type FactionId = string;

export interface Faction {
    id: FactionId;
    name: string;
    baseRegion: RegionsType;
    type: ActorType;
}

export type MilitaryFaction = Faction & {
    type: ActorType.MILITARY;
}

export type CivilianFaction = Faction & {
    type: ActorType.CIVILIAN;
}

export type TerroristFaction = Faction & {
    type: ActorType.TERRORIST;
}

