import {Faction, Region} from "../../../interfaces";
import {regionMap, RegionsType} from "../../../dict/regionMap";
import {BarrierRandom} from "../random";
import {TerritoryRuleType} from "../../../dict/constants";

export function getRegionByFaction(faction: Faction): Region {
    return regionMap.find(t => t.id === faction.region) satisfies Region;
}

export function getRegionById(regionId: RegionsType): Region {
    return regionMap.find(t => t.id === regionId) satisfies Region;
}

export function getTerritoryByRule(territories: RegionsType[], rule: TerritoryRuleType): Region {
    let t: RegionsType | undefined;

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
