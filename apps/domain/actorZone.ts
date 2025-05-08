import {BarrierContext, Region, Faction, FactionId} from "../../interfaces";
import {ActorZone} from "../../interfaces/actorZone";
import {IActorZoneService} from "../../interfaces/services";
import {ActorType} from "../../dict/constants";

export class ActorZoneService implements IActorZoneService {
    private zones: Map<FactionId, ActorZone> = new Map();

    constructor(private ctx: BarrierContext) {
        ctx.actorZoneService = this;
        this.initializeZones();
    }

    private initializeZones(): void {
        const factions = this.ctx.actorEngine.getActorsAll();
        factions.forEach(faction => {
            const regions = this.ctx.regionService.getRegionsByFaction(faction.id);
            const zone: ActorZone = {
                faction,
                regions,
                rearRegions: [],
                frontRegions: [],
                openRegions: []
            };
            this.updateZone(zone);
            this.zones.set(faction.id, zone);
        });
    }

    private updateZone(zone: ActorZone): void {
        zone.rearRegions = this.getRearRegions(zone);
        zone.frontRegions = this.getFrontRegions(zone);
        zone.openRegions = this.getOpenRegions(zone);
    }

    getZoneByFactionId(factionId: FactionId): ActorZone | undefined {
        return this.zones.get(factionId);
    }

    getRearRegions(zone: ActorZone): Region[] {
        return zone.regions.filter(region => this.isRearRegion(zone, region));
    }

    getFrontRegions(zone: ActorZone): Region[] {
        return zone.regions.filter(region => this.isFrontRegion(zone, region));
    }

    getOpenRegions(zone: ActorZone): Region[] {
        return zone.regions.filter(region => this.isOpenRegion(zone, region));
    }

    isRearRegion(zone: ActorZone, region: Region): boolean {
        const neighbours = this.ctx.regionService.getNeighbourRegions(region.id);
        return neighbours.every(neighbour => 
            neighbour.faction?.id === zone.faction.id
        );
    }

    isFrontRegion(zone: ActorZone, region: Region): boolean {
        const neighbours = this.ctx.regionService.getNeighbourRegions(region.id);
        return neighbours.some(neighbour => 
            neighbour.faction && neighbour.faction.id !== zone.faction.id
        );
    }

    isOpenRegion(zone: ActorZone, region: Region): boolean {
        const neighbours = this.ctx.regionService.getNeighbourRegions(region.id);
        return neighbours.some(neighbour => !neighbour.faction);
    }

    isRegionInZone(zone: ActorZone, regionId: Region['id']): boolean {
        return zone.regions.some(region => region.id === regionId);
    }

    /**
     * Обновляет все зоны
     */
    updateAllZones(): void {
        this.zones.forEach(zone => this.updateZone(zone));
    }

    /**
     * Обновляет зону конкретной фракции
     * @param factionId ID фракции
     */
    updateZoneByFactionId(factionId: FactionId): void {
        const zone = this.getZoneByFactionId(factionId);
        if (zone) {
            this.updateZone(zone);
        }
    }

    getNeighbourActors(zone: ActorZone, type: ActorType = ActorType.MILITARY): Faction[] {
        if (type === ActorType.MILITARY) {
            return this.getNeighbourRegions(zone)
                .filter(region => region.faction)
                .map(region => region.faction as Faction);
        } else {
            // Для не военных фракций проверяем baseRegion
            const allActors = this.ctx.actorEngine.getActorsAll();
            return this.getNeighbourRegions(zone)
                .flatMap(region => {
                    return allActors.filter(actor => 
                        actor.baseRegion === region.id && 
                        ((zone.faction.terror && actor.terror) || 
                         (!zone.faction.terror && !actor.military && !actor.terror))
                    );
                });
        }
    }

    getNeighbourRegions(zone: ActorZone): Region[] {
        const neighbours = zone.regions.flatMap(region => 
            this.ctx.regionService.getNeighbourRegions(region.id)
        );
        
        return neighbours.filter(region => !this.isRegionInZone(zone, region.id));
    }

    getNeighbourActorsByType(zone: ActorZone, type: ActorType): Faction[] {
        const neighbours = this.getNeighbourActors(zone, type);
        
        return neighbours.filter(actor => {
            if (type === ActorType.MILITARY) {
                return actor.military;
            } else if (type === ActorType.CIVILIAN) {
                return !actor.military && !actor.terror;
            } else if (type === ActorType.TERRORIST) {
                return actor.terror;
            }
            return false;
        });
    }
} 