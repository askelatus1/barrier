import {regionsType} from "../dict/regionMap";

export interface Faction {
    id: string;
    name: string;
    region: regionsType;
    military: boolean;
    terror: boolean;
    neighbours: regionsType[];
}

