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
    {
        id: 'moldavka_civ',
        name: 'Жители Молдавки',
        region: 'moldavka',
        military: false,
        terror: false,
    },
    {
        id: 'decabristov_civ',
        name: 'Жители Декабристов',
        region: 'decabristov',
        military: false,
        terror: false,
    },
    {
        id: 'obrazcovo_civ',
        name: 'Жители Образцовской',
        region: 'obrazcovo',
        military: false,
        terror: false,
    },
    {
        id: 'mongora_civ',
        name: 'Жители Монгоры',
        region: 'mongora',
        military: false,
        terror: false,
    },
    {
        id: 'shanghai_civ',
        name: 'Жители Шанхая',
        region: 'shanghai',
        military: false,
        terror: false,
    },
    {
        id: 'cerdavino_civ',
        name: 'Жители Сердавино',
        region: 'cerdavino',
        military: false,
        terror: false,
    },
    {
        id: 'varlamono_civ',
        name: 'Жители Варламова',
        region: 'varlamono',
        military: false,
        terror: false,
    },
    {
        id: 'rudnik_civ',
        name: 'Жители Рудника',
        region: 'rudnik',
        military: false,
        terror: false,
    },
    {
        id: 'krista_civ',
        name: 'Жители Кристы',
        region: 'krista',
        military: false,
        terror: false,
    },
    {
        id: 'center_civ',
        name: 'Жители Центра',
        region: 'center',
        military: false,
        terror: false,
    },
    {
        id: 'miltown_civ',
        name: 'Жители Военного городка',
        region: 'miltown',
        military: false,
        terror: false,
    },
    {
        id: 'piter_civ',
        name: 'Жители Питера',
        region: 'Piter',
        military: false,
        terror: false,
    }
];

export type FactionType = 'monolith' | 'sin' | 'skyline' | 'moldavka_civ' | 'decabristov_civ' | 'obrazcovo_civ' | 'mongora_civ' | 'shanghai_civ' | 'cerdavino_civ' | 'varlamono_civ' | 'rudnik_civ' | 'krista_civ' | 'center_civ' | 'miltown_civ' | 'piter_civ';

import {Region} from "../interfaces";

export const factionRegionMap: Record<FactionType, Region['id']> = {
    'monolith': 'center',
    'sin': 'decabristov',
    'skyline': 'Piter',
    'moldavka_civ': 'moldavka',
    'decabristov_civ': 'decabristov',
    'obrazcovo_civ': 'obrazcovo',
    'mongora_civ': 'mongora',
    'shanghai_civ': 'shanghai',
    'cerdavino_civ': 'cerdavino',
    'varlamono_civ': 'varlamono',
    'rudnik_civ': 'rudnik',
    'krista_civ': 'krista',
    'center_civ': 'center',
    'miltown_civ': 'miltown',
    'piter_civ': 'Piter'
};

