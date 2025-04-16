import {Faction} from "../interfaces";

export const faction: Faction[] = [
    {
        id: 'monolith',
        name: 'ЧВК "монолит"',
        region: 'moldavka',
        military: true,
        terror: false,
        neighbours: ['sin', 'civ_sin', 'civ_monolyth'],
    },
    {
        id: 'sin',
        name:'Грех',
        region:'decabristov',
        military: true,
        terror: false,
        neighbours: ['monolith', 'civ_monolyth', 'civ_sin'],
    },
    {
        id: 'skyline',
        name: 'Скайлайн',
        region:'obrazcovo',
        military: true,
        terror: false,
        neighbours: ['monolith', 'civ_monolyth', 'civ_skyline'],
    },
    {
        id: 'civ_monolyth',
        region: 'moldavka',
        military: false,
        neighbours: ['sin', 'monolith', 'civ_sin'],
        name: 'Мирные Монолит',
        terror: false,
    },
    {
        id: 'civ_sin',
        region: 'decabristov',
        military: false,
        neighbours: ['monolith', 'sin', "civ_monolyth"],
        name: 'Мирные Грех',
        terror: false,
    },
    {
        id: 'civ_skyline',
        region: 'obrazcovo',
        military: false,
        neighbours: ['monolith', 'skyline', 'civ_monolyth'],
        name: 'Мирные Скайлайн',
        terror: false,
    }
];

export type FactionType = 'monolith' | 'sin' | 'skyline' | 'civ_skyline' | 'civ_monolyth' | 'civ_sin';
