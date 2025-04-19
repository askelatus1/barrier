import {Faction} from "../interfaces";

export const faction: Faction[] = [
    {
        id: 'monolith',
        name: 'ЧВК "монолит"',
        region: 'moldavka',
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
        region:'obrazcovo',
        military: true,
        terror: false,
    },
];

export type FactionType = 'monolith' | 'sin' | 'skyline';