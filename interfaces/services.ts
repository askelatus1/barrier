import {Region} from "./region";
import {Faction} from "./faction";
import {FactionId} from "./faction";
import {ActorZone} from "./index";
import {ActorType, RegionStatus} from "../dict/constants";

/**
 * Interface for managing regions in the system
 */
export interface IRegionService {
    /**
     * Retrieves a region by its unique identifier
     * @param id - The unique identifier of the region
     * @returns The region object if found, undefined otherwise
     */
    getRegionById(id: string): Region | undefined;

    /**
     * Retrieves all regions in the system
     * @returns Array of all regions
     */
    getRegionsAll(): Region[];

    /**
     * Gets all regions that are adjacent to the specified region
     * @param regionId - The ID of the region to find neighbors for
     * @returns Array of neighboring regions
     */
    getNeighbourRegions(regionId: string): Region[];

    /**
     * Gets all empty regions that are adjacent to the specified region
     * @param regionId - The ID of the region to find empty neighbors for
     * @returns Array of empty neighboring regions
     */
    getEmptyNeighbourRegions(regionId: string): Region[];

    /**
     * Gets all captured regions that are adjacent to the specified region
     * @param regionId - The ID of the region to find captured neighbors for
     * @returns Array of captured neighboring regions
     */
    getCapturedNeighbourRegions(regionId: string): Region[];

    /**
     * Retrieves all regions with a specific status
     * @param status - The status to filter regions by
     * @returns Array of regions matching the specified status
     */
    getRegionsByStatus(status: Region['status']): Region[];

    /**
     * Updates the status of a specific region
     * @param regionId - The ID of the region to update
     * @param status - The new status to set
     */
    updateRegionStatus(regionId: string, status: Region['status']): void;

    /**
     * Assigns a faction to a specific region
     * @param regionId - The ID of the region to update
     * @param faction - The faction to assign to the region
     */
    setFactionToRegion(regionId: string, faction: Region['faction']): void;

    /**
     * Retrieves all regions controlled by a specific faction
     * @param factionId - The ID of the faction
     * @returns Array of regions controlled by the faction
     */
    getRegionsByFaction(factionId: FactionId): Region[];

    /**
     * Retrieves all military regions
     * @returns Array of military regions
     */
    getMilitaryRegions(): Region[];

    /**
     * Retrieves all civilian regions
     * @returns Array of civilian regions
     */
    getCivilianRegions(): Region[];
}

/**
 * Interface for managing actors (factions) in the system
 */
export interface IActorEngine {
    /**
     * Retrieves all military factions
     * @returns Array of military factions
     */
    getMilitaryActors(): Faction[];

    /**
     * Retrieves all civilian factions
     * @returns Array of civilian factions
     */
    getCivilianActors(): Faction[];

    /**
     * Retrieves all terrorist factions
     * @returns Array of terrorist factions
     */
    getTerroristActors(): Faction[];

    /**
     * Retrieves a faction by its unique identifier
     * @param id - The unique identifier of the faction
     * @returns The faction object if found, undefined otherwise
     */
    getActorById(id: string): Faction | undefined;

    /**
     * Retrieves a faction that controls a specific region
     * @param actor - The faction to check
     * @returns The faction controlling the region if found, undefined otherwise
     */
    getActorByRegionId(actor: Faction): Faction | undefined;

    /**
     * Retrieves all factions in the system
     * @returns Array of all factions
     */
    getActorsAll(): Faction[];

    /**
     * Gets all territories adjacent to a faction's controlled regions
     * @param actor - The faction to find neighboring territories for
     * @returns Array of neighboring territories
     */
    getNeighbourTerritoriesByActor(actor: Faction): Region[];

    /**
     * Gets all factions that control regions adjacent to the specified faction's regions
     * @param actor - The faction to find neighboring factions for
     * @returns Array of neighboring factions
     */
    getNeighbourActorsByActor(actor: Faction): Faction[];

    /**
     * Retrieves all factions that have their base in the specified region
     * @param regionId - The ID of the region to check
     * @returns Array of factions that have their base in the specified region
     */
    getActorsByBaseRegion(regionId: string): Faction[];
}

export interface IActorZoneService {
    /**
     * Получает зону актора по его ID
     * @param factionId ID фракции
     * @returns ActorZone или undefined если фракция не найдена
     */
    getZoneByFactionId(factionId: FactionId): ActorZone | undefined;

    /**
     * Получает тыловые регионы зоны
     * @param zone Зона актора
     * @returns Массив тыловых регионов
     */
    getRearRegions(zone: ActorZone): Region[];

    /**
     * Получает фронтовые регионы зоны
     * @param zone Зона актора
     * @returns Массив фронтовых регионов
     */
    getFrontRegions(zone: ActorZone): Region[];

    /**
     * Получает открытые регионы зоны
     * @param zone Зона актора
     * @returns Массив открытых регионов
     */
    getOpenRegions(zone: ActorZone): Region[];

    /**
     * Проверяет является ли регион тыловым
     * @param zone Зона актора
     * @param region Регион для проверки
     * @returns true если регион тыловой
     */
    isRearRegion(zone: ActorZone, region: Region): boolean;

    /**
     * Проверяет является ли регион фронтовым
     * @param zone Зона актора
     * @param region Регион для проверки
     * @returns true если регион фронтовой
     */
    isFrontRegion(zone: ActorZone, region: Region): boolean;

    /**
     * Проверяет является ли регион открытым
     * @param zone Зона актора
     * @param region Регион для проверки
     * @returns true если регион открытый
     */
    isOpenRegion(zone: ActorZone, region: Region): boolean;

    /**
     * Проверяет входит ли регион в зону актора
     * @param zone Зона актора
     * @param regionId ID региона для проверки
     * @returns true если регион входит в зону
     */
    isRegionInZone(zone: ActorZone, regionId: Region['id']): boolean;

    /**
     * Получает всех соседних акторов зоны
     * @param zone Зона актора
     * @returns Массив соседних фракций
     */
    getNeighbourActors(zone: ActorZone): Faction[];

    /**
     * Получает соседних акторов зоны определенного типа
     * @param zone Зона актора
     * @param type Тип актора (военный/гражданский/террорист)
     * @returns Массив соседних фракций указанного типа
     */
    getNeighbourActorsByType(zone: ActorZone, type: ActorType): Faction[];

    /**
     * Получает все соседние регионы зоны
     * @param zone Зона актора
     * @returns Массив соседних регионов, не входящих в зону
     */
    getNeighbourRegions(zone: ActorZone): Region[];

    /**
     * Получает регионы зоны с определенным статусом
     * @param zone Зона актора
     * @param status Статус региона
     * @returns Массив регионов с указанным статусом
     */
    getRegionsByStatus(zone: ActorZone, status: RegionStatus): Region[];

    /**
     * Получает соседние регионы зоны с определенным статусом
     * @param zone Зона актора
     * @param status Статус региона
     * @returns Массив соседних регионов с указанным статусом
     */
    getNeighbourRegionsByStatus(zone: ActorZone, status: RegionStatus): Region[];

    /**
     * Получает собственные регионы зоны (принадлежащие фракции)
     * @param zone Зона актора
     * @returns Массив регионов, принадлежащих фракции
     */
    getOwnRegions(zone: ActorZone): Region[];

    /**
     * Получает соседних акторов зоны
     * @param zone Зона актора
     * @param type Тип актора (по умолчанию военный)
     * @returns Массив соседних фракций
     */
    getNeighbourActors(zone: ActorZone, type?: ActorType): Faction[];
} 