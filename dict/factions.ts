import {Faction} from "../interfaces";
import {ActorType} from "./constants";

export const faction: Faction[] = [
    {
        id: 'monolith',
        name: 'ЧВК "монолит"',
        baseRegion: 'moldavka',
        type: ActorType.MILITARY
    },
    {
        id: 'sin',
        name:'Грех',
        baseRegion:'decabristov',
        type: ActorType.MILITARY
    },
    {
        id: 'skyline',
        name: 'Скайлайн',
        baseRegion:'obrazcovo',
        type: ActorType.MILITARY
    },
    {
        id: 'moldavka_civ',
        name: 'Жители Молдавки',
        baseRegion: 'moldavka',
        type: ActorType.CIVILIAN
    },
    {
        id: 'decabristov_civ',
        name: 'Жители Декабристов',
        baseRegion: 'decabristov',
        type: ActorType.CIVILIAN
    },
    {
        id: 'obrazcovo_civ',
        name: 'Жители Образцовской',
        baseRegion: 'obrazcovo',
        type: ActorType.CIVILIAN
    },
    {
        id: 'mongora_civ',
        name: 'Жители Монгоры',
        baseRegion: 'mongora',
        type: ActorType.CIVILIAN
    },
    {
        id: 'shanghai_civ',
        name: 'Жители Шанхая',
        baseRegion: 'shanghai',
        type: ActorType.CIVILIAN
    },
    {
        id: 'cerdavino_civ',
        name: 'Жители Сердавино',
        baseRegion: 'cerdavino',
        type: ActorType.CIVILIAN
    },
    {
        id: 'varlamono_civ',
        name: 'Жители Варламова',
        baseRegion: 'varlamono',
        type: ActorType.CIVILIAN
    },
    {
        id: 'rudnik_civ',
        name: 'Жители Рудника',
        baseRegion: 'rudnik',
        type: ActorType.CIVILIAN
    },
    {
        id: 'krista_civ',
        name: 'Жители Кристы',
        baseRegion: 'krista',
        type: ActorType.CIVILIAN
    },
    {
        id: 'center_civ',
        name: 'Жители Центра',
        baseRegion: 'center',
        type: ActorType.CIVILIAN
    },
    {
        id: 'miltown_civ',
        name: 'Жители Военного городка',
        baseRegion: 'miltown',
        type: ActorType.CIVILIAN
    },
    {
        id: 'piter_civ',
        name: 'Жители Питера',
        baseRegion: 'Piter',
        type: ActorType.CIVILIAN
    }
];

export type FactionType = 
    | 'monolith'
    | 'sin'
    | 'skyline'
    | 'moldavka_civ'
    | 'decabristov_civ'
    | 'obrazcovo_civ'
    | 'mongora_civ'
    | 'shanghai_civ'
    | 'cerdavino_civ'
    | 'varlamono_civ'
    | 'rudnik_civ'
    | 'krista_civ'
    | 'center_civ'
    | 'miltown_civ'
    | 'piter_civ';

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

