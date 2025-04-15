import {Faction} from "../interfaces";

export const faction: Faction[] = [
    {
        id: 'monolith',
        name: 'ЧВК "монолит"',
        region: 'moldavka',
        military: true,
        terror: false,
        neighbours: ['sin'],
    },
    {
        id: 'sin',
        name:'Грех',
        region:'decabristov',
        military: true,
        terror: false,
        neighbours: ['monolith'],
    },
    {
        id: 'skyline',
        name: 'Скайлайн',
        region:'obrazcovo',
        military: true,
        terror: false,
        neighbours: ['monolith'],
    },
    // {
    //     id: 'civ_skyline',
    //     region: 'obrazcovo',
    //     military: false,
    //     neighbours: ['monolith'],
    //     name: 'Мирные скайлайн',
    //     terror: false,
    // }
];

export type FactionType = 'monolith' | 'sin' | 'skyline';
