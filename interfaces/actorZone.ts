import {Faction} from "./faction";
import {Region} from "./region";

export interface ActorZone {
    /**
     * The faction that owns the zone
     */
    faction: Faction;

    /**
     * All regions belonging to the faction
     */
    regions: Region[];

    /**
     * Rear regions of the zone
     */
    rearRegions: Region[];

    /**
     * Front regions of the zone
     */
    frontRegions: Region[];

    /**
     * Open regions of the zone
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