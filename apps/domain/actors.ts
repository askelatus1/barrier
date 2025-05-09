import {BarrierContext, Faction, MilitaryFaction, Region} from "../../interfaces";
import {faction} from "../../dict/factions";
import {getMilitary, getCivilian, getTerrors} from "./rules/actorRules";
import {getRegionByFaction} from "./rules/territoryRule";
import {IActorEngine} from "../../interfaces/services";
import { ActorRuleType, ActorType } from "../../dict/constants";

export class ActorEngine implements IActorEngine {
    private actorPool: Map<string, Faction> = new Map();

    constructor(private ctx: BarrierContext) {
        ctx.actorEngine = this;
        this.initializeActors();
    }

    private initializeActors(): void {
        faction.forEach(actor => {
            if (actor.type === ActorType.MILITARY) {
                const region = this.ctx.regionService.getRegionById(actor.baseRegion);
                if (region) {
                    this.ctx.regionService.setFactionToRegion(region.id, actor as MilitaryFaction);
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

    getActorsByRule(rule: ActorRuleType): Faction[] {
        switch(rule) {
            case ActorRuleType.MILITARY:
                return this.getMilitaryActors();
            case ActorRuleType.CIVILIAN:
                return this.getCivilianActors();
            case ActorRuleType.TERRORIST:
                return this.getTerroristActors();
            case ActorRuleType.ARMORED:
                return [...this.getMilitaryActors(), ...this.getTerroristActors()];
            case ActorRuleType.LEGAL:
                return [...this.getMilitaryActors(), ...this.getCivilianActors()];
            case ActorRuleType.ALL:
                return this.getActorsAll();
            case ActorRuleType.NONE:
                return [];
            default:
                return [];
        }
    }

    /**
     * Фильтрует массив акторов по правилу
     * @param actors Массив акторов для фильтрации
     * @param rule Правило фильтрации
     * @returns Отфильтрованный массив акторов
     */
    filterActorsByRule(actors: Faction[], rule: ActorRuleType): Faction[] {
        switch(rule) {
            case ActorRuleType.MILITARY:
                return actors.filter(actor => actor.type === ActorType.MILITARY);
            case ActorRuleType.CIVILIAN:
                return actors.filter(actor => actor.type === ActorType.CIVILIAN);
            case ActorRuleType.TERRORIST:
                return actors.filter(actor => actor.type === ActorType.TERRORIST);
            case ActorRuleType.ARMORED:
                return actors.filter(actor => 
                    actor.type === ActorType.MILITARY || actor.type === ActorType.TERRORIST
                );
            case ActorRuleType.LEGAL:
                return actors.filter(actor => 
                    actor.type === ActorType.MILITARY || actor.type === ActorType.CIVILIAN
                );
            case ActorRuleType.ALL:
                return actors;
            case ActorRuleType.NONE:
                return [];
            default:
                return [];
        }
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

    getActorsByBaseRegion(regionId: string): Faction[] {
        return this.getActorsAll().filter(actor => actor.baseRegion === regionId);
    }
}
