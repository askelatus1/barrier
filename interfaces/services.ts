import {Region} from "./region";
import {Faction} from "./faction";

export interface IRegionService {
    getRegionById(id: string): Region | undefined;
    getRegionsAll(): Region[];
    getNeighbourRegions(regionId: string): Region[];
    getEmptyNeighbourRegions(regionId: string): Region[];
    getCapturedNeighbourRegions(regionId: string): Region[];
    getRegionsByStatus(status: Region['status']): Region[];
    updateRegionStatus(regionId: string, status: Region['status']): void;
    setFactionToRegion(regionId: string, faction: Region['faction']): void;
    getRegionsByFaction(factionId: string): Region[];
    getMilitaryRegions(): Region[];
    getCivilianRegions(): Region[];
}

export interface IActorEngine {
    getMilitaryActors(): Faction[];
    getCivilianActors(): Faction[];
    getActorById(id: string): Faction | undefined;
    getActorByRegionId(actor: Faction): Faction | undefined;
    getActorsAll(): Faction[];
    getNeighbourTerritoriesByActor(actor: Faction): Region[];
    getNeighbourActorsByActor(actor: Faction): Faction[];
} 