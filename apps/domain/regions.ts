import {BarrierContext, Region} from "../../interfaces";
import {regionMap} from "../../dict/regionMap";
import {IRegionService} from "../../interfaces/services";

export class RegionService implements IRegionService {
    private regionPool: Map<string, Region> = new Map();

    constructor(private ctx: BarrierContext) {
        ctx.regionService = this;
        this.initializeRegions();
    }

    private initializeRegions(): void {
        regionMap.forEach(region => {
            this.regionPool.set(region.id, region);
        });
    }

    getRegionById(id: string): Region | undefined {
        return this.regionPool.get(id);
    }

    getRegionsAll(): Region[] {
        return [...this.regionPool.values()];
    }

    getNeighbourRegions(regionId: string): Region[] {
        const region = this.getRegionById(regionId);
        if (!region) return [];
        return region.neighbour.map(id => this.getRegionById(id)).filter(Boolean) as Region[];
    }

    getEmptyNeighbourRegions(regionId: string): Region[] {
        return this.getNeighbourRegions(regionId).filter(region => region.faction === null);
    }

    getCapturedNeighbourRegions(regionId: string): Region[] {
        return this.getNeighbourRegions(regionId).filter(region => region.faction !== null);
    }

    getRegionsByStatus(status: Region['status']): Region[] {
        return this.getRegionsAll().filter(region => region.status === status);
    }

    updateRegionStatus(regionId: string, status: Region['status']): void {
        const region = this.getRegionById(regionId);
        if (region) {
            region.status = status;
            this.regionPool.set(regionId, region);
        }
    }

    setFactionToRegion(regionId: string, faction: Region['faction']): void {
        const region = this.getRegionById(regionId);
        if (region) {
            region.faction = faction;
            this.regionPool.set(regionId, region);
        }
    }

    getRegionsByFaction(factionId: string): Region[] {
        return this.getRegionsAll().filter(region => region.faction?.id === factionId);
    }

    getMilitaryRegions(): Region[] {
        return this.getRegionsAll().filter(region => region.faction?.military === true);
    }

    getCivilianRegions(): Region[] {
        return this.getRegionsAll().filter(region => !region.faction?.military);
    }
} 