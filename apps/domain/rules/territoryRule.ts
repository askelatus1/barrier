import {Faction, Region, TerritoryRuleType} from "../../../interfaces";
import {regionMap, regionsType} from "../../../dict/regionMap";
import {BarrierRandom} from "../random";

export function getRegionByFaction(faction: Faction): Region {
    return regionMap.find(t => t.id === faction.region) satisfies Region;
}

export function getRegionById(regionId: regionsType): Region {
    return regionMap.find(t => t.id === regionId) satisfies Region;
}

export function getTerritoryByRule(territories: regionsType[], rule: TerritoryRuleType): Region {
    let t: regionsType | undefined;

    switch (rule) {
        case "initiator":
            t = territories[0];
            break;
        case "victim":
            t = territories[1];
            break;
        case "both":
            t = BarrierRandom.selectRandom(territories);
            break;
    }

    return getRegionById(t);
}
