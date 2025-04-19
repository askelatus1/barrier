import {Faction} from "../interfaces";

export const faction: Faction[] = [
    {
        id: 'monolith',
        name: 'ЧВК "монолит"',
        baseRegion: 'moldavka',
        military: true,
        terror: false,
    },
    {
        id: 'sin',
        name:'Грех',
        baseRegion:'decabristov',
        military: true,
        terror: false,
    },
    {
        id: 'skyline',
        name: 'Скайлайн',
        baseRegion:'obrazcovo',
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

