import {BarrierContext, Faction, MilitaryFaction, Region} from "../../interfaces";
import {faction} from "../../dict/factions";
import {getMilitary, getCivilian, getTerrors} from "./rules/actorRules";
import {getRegionByFaction, getRegionById} from "./rules/territoryRule";
import {IActorEngine} from "../../interfaces/services";

export class ActorEngine implements IActorEngine {
    private actorPool: Map<string, Faction> = new Map();

    constructor(private ctx: BarrierContext) {
        ctx.actorEngine = this;
        this.initializeActors();
    }

    private initializeActors(): void {
        faction.forEach(actor => {
            if (actor.military) {
                const region = getRegionById(actor.baseRegion);
                if (region) {
                    region.faction = actor as MilitaryFaction;
                }
            }
            this.actorPool.set(actor.id, actor);
        });
    }

    getMilitaryActors(): Faction[] {
        return getMilitary(this.getActorsAll());
    }

    getCivilianActors(): Faction[] {
        return getCivilian(this.getActorsAll());
    }

    getTerroristActors(): Faction[] {
        return getTerrors(this.getActorsAll());
    }

    getActorById(id: string): Faction | undefined {
        return this.actorPool.get(id);
    }

    getActorByRegionId(actor: Faction): Faction | undefined {
        const region = getRegionByFaction(actor);
        return this.getActorById(region.faction?.id);
    }

    getActorsAll(): Faction[] {
        return [...this.actorPool.values()];
    }

    getNeighbourTerritoriesByActor(actor: Faction): Region[] {
        const actorZone = this.ctx.actorZoneService.getZoneByFactionId(actor.id);
        if (!actorZone) return [];
        
        return this.ctx.actorZoneService.getNeighbourRegions(actorZone);
    }

    getNeighbourActorsByActor(actor: Faction): Faction[] {
        const actorZone = this.ctx.actorZoneService.getZoneByFactionId(actor.id);
        if (!actorZone) return [];
        
        return this.ctx.actorZoneService.getNeighbourActors(actorZone);
    }
}
