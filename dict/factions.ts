import {Faction} from "../interfaces";

export const faction: Faction[] = [
    {
        id: 'monolith',
        name: 'ЧВК "монолит"',
        region: 'center',
        military: true,
        terror: false,
    },
    {
        id: 'sin',
        name:'Грех',
        region:'decabristov',
        military: true,
        terror: false,
    },
    {
        id: 'skyline',
        name: 'Скайлайн',
        region:'Piter',
        military: true,
        terror: false,
    },
];

export type FactionType = 'monolith' | 'sin' | 'skyline';

import {Region} from "../interfaces";

export const factionRegionMap: Record<FactionType, Region['id']> = {
    'monolith': 'center',
    'sin': 'decabristov',
    'skyline': 'Piter'
};

