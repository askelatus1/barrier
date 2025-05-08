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

/**
 * Проверяет является ли регион открытым
 * @param zone Зона актора
 * @param region Регион для проверки
 * @returns true если регион открытый
 */
function isOpenRegion(zone: ActorZone, region: Region): boolean {
    // Implementation of isOpenRegion method
    return false; // Placeholder return, actual implementation needed
}

/**
 * Проверяет входит ли регион в зону актора
 * @param zone Зона актора
 * @param regionId ID региона для проверки
 * @returns true если регион входит в зону
 */
function isRegionInZone(zone: ActorZone, regionId: Region['id']): boolean {
    // Implementation of isRegionInZone method
    return false; // Placeholder return, actual implementation needed
} 