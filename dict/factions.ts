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
    {
        id: 'moldavka_civ',
        name: 'Жители Молдавки',
        baseRegion: 'moldavka',
        military: false,
        terror: false,
    },
    {
        id: 'decabristov_civ',
        name: 'Жители Декабристов',
        baseRegion: 'decabristov',
        military: false,
        terror: false,
    },
    {
        id: 'obrazcovo_civ',
        name: 'Жители Образцовской',
        baseRegion: 'obrazcovo',
        military: false,
        terror: false,
    },
    {
        id: 'mongora_civ',
        name: 'Жители Монгоры',
        baseRegion: 'mongora',
        military: false,
        terror: false,
    },
    {
        id: 'shanghai_civ',
        name: 'Жители Шанхая',
        baseRegion: 'shanghai',
        military: false,
        terror: false,
    },
    {
        id: 'cerdavino_civ',
        name: 'Жители Сердавино',
        baseRegion: 'cerdavino',
        military: false,
        terror: false,
    },
    {
        id: 'varlamono_civ',
        name: 'Жители Варламова',
        baseRegion: 'varlamono',
        military: false,
        terror: false,
    },
    {
        id: 'rudnik_civ',
        name: 'Жители Рудника',
        baseRegion: 'rudnik',
        military: false,
        terror: false,
    },
    {
        id: 'krista_civ',
        name: 'Жители Кристы',
        baseRegion: 'krista',
        military: false,
        terror: false,
    },
    {
        id: 'center_civ',
        name: 'Жители Центра',
        baseRegion: 'center',
        military: false,
        terror: false,
    },
    {
        id: 'miltown_civ',
        name: 'Жители Военного городка',
        baseRegion: 'miltown',
        military: false,
        terror: false,
    },
    {
        id: 'piter_civ',
        name: 'Жители Питера',
        baseRegion: 'Piter',
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

