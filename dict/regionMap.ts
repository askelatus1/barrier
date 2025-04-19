import {Region} from "../interfaces";
import {Status} from "./constants";

export const regionMap: Region[] = [
    {
        id: 'moldavka',
        title: 'молдавка',
        status: Status.PEACE,
        neighbour: ['Piter' , 'center' , 'miltown' , 'varlamono']
    },

    {
        id: 'decabristov',
        title: 'декабристов',
        status: Status.PEACE,
        neighbour: ['center' , 'krista' , 'miltown']
    },

    {
        id: 'obrazcovo',
        title: 'Образцовская',
        status: Status.PEACE,
        neighbour: ['rudnik' , 'mongora']
    },

    {
        id: 'mongora',
        title: 'монгора',
        status: Status.PEACE,
        neighbour: ['Piter' , 'cerdavino' , 'obrazcovo' , 'center']
    },

    {
        id: 'shanghai',
        title: 'шанхай',
        status: Status.PEACE,
        neighbour: ['miltown' , 'krista']
    },

    {
        id: 'cerdavino',
        title: 'сердавино',
        status: Status.WRECKAGE,
        neighbour: ['mongora' , 'Piter' , 'varlamono']
    },

    {
        id: 'varlamono',
        title: 'варламово',
        status: Status.PEACE,
        neighbour: ['cerdavino' , 'Piter' , 'moldavka']
    },

    {
        id: 'rudnik',
        title: 'рудник',
        status: Status.PEACE,
        neighbour: ['obrazcovo']
    },

    {
        id: 'krista',
        title: 'криста',
        status: Status.PEACE,
        neighbour: ['decabristov' , 'miltown' , 'shanghai']
    },

    {
        id: 'center',
        title: 'центр',
        status: Status.PEACE,
        neighbour: ['moldavka' , 'miltown' , 'Piter' , 'decabristov' , 'mongora']
    },

    {
        id: 'miltown',
        title: 'военный городок',
        status: Status.PEACE,
        neighbour: ['shanghai' , 'center' , 'moldavka' , 'krista' , 'decabristov']
    },

    {
        id: 'Piter',
        title: 'питер',
        status: Status.PEACE,
        neighbour: ['center' , 'moldavka' , 'mongora' , 'cerdavino' , 'varlamono']
    }
] as const;

export type RegionsType =
    | 'moldavka'
    | 'decabristov'
    | 'obrazcovo'
    | 'mongora'
    | 'shanghai'
    | 'cerdavino'
    | 'varlamono'
    | 'rudnik'
    | 'krista'
    | 'center'
    | 'miltown'
    | 'Piter';
