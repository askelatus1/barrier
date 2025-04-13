import {Faction} from "../interfaces/faction";

export const faction: Faction[] = [
    {
        id: 'monolith',
        name: 'ЧВК "монолит"',
        region: 'modavka',
        military: true,
        terror: false,
        neighbour: 'sin | skyline',
    },
    {
        id: 'sin',
        name:'Грех',
        region:'decabristov',
        military: true,
        terror: false,
        neighbour: 'monolith',
    },

    {
        id: 'skyline',
        name: 'Скайлайн',
        region:'obrazcovo',
        military: true,
        terror: false,
        neighbour: 'monolith',
    }
];