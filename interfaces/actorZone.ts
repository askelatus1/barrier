import {Faction} from "./faction";
import {Region} from "./region";

export interface ActorZone {
    /**
     * Фракция, которой принадлежит зона
     */
    faction: Faction;

    /**
     * Все регионы, принадлежащие фракции
     */
    regions: Region[];

    /**
     * Тыловые регионы зоны
     */
    rearRegions: Region[];

    /**
     * Фронтовые регионы зоны
     */
    frontRegions: Region[];

    /**
     * Открытые регионы зоны
     */
    openRegions: Region[];
} 