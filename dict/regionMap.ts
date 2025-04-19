import {Region} from "../interfaces";

export const regionMap: Region[] = [
    {
        id: 'moldavka',
        title: 'молдавка',
        status: 'peace',
        neighbour: ['Piter' , 'center' , 'miltown' , 'varlamono'],
        civil: true
    },

    {
        id: 'decabristov',
        title: 'декабристов',
        status: 'peace',
        neighbour: ['center' , 'krista' , 'miltown'],
        civil: true
    },

    {
        id: 'obrazcovo',
        title: 'Образцовская',
        status: 'peace',
        neighbour: ['rudnik' , 'mongora'],
        civil: true
    },

    {
        id: 'mongora',
        title: 'монгора',
        status: 'peace',
        neighbour: ['Piter' , 'cerdavino' , 'obrazcovo' , 'center'],
        civil: true
    },

    {
        id: 'shanghai',
        title: 'шанхай',
        status: 'peace',
        neighbour: ['miltown' , 'krista'],
        civil: true
    },

    {
        id: 'cerdavino',
        title: 'сердавино',
        status: 'wreckage',
        neighbour: ['mongora' , 'Piter' , 'varlamono'],
        civil: false
    },

    {
        id: 'varlamono',
        title: 'варламово',
        status: 'peace',
        neighbour: ['cerdavino' , 'Piter' , 'moldavka'],
        civil: true
    },

    {
        id: 'rudnik',
        title: 'рудник',
        status: 'peace',
        neighbour: ['obrazcovo'],
        civil: true
    },

    {
        id: 'krista',
        title: 'криста',
        status: 'peace',
        neighbour: ['decabristov' , 'miltown' , 'shanghai'],
        civil: true
    },

    {
        id: 'center',
        title: 'центр',
        status: 'peace',
        neighbour: ['moldavka' , 'miltown' , 'Piter' , 'decabristov' , 'mongora'],
        civil: true
    },

    {
        id: 'miltown',
        title: 'военный городок',
        status: 'peace',
        neighbour: ['shanghai' , 'center' , 'moldavka' , 'krista' , 'decabristov'],
        civil: true
    },

    {
        id: 'Piter',
        title: 'питер',
        status: 'peace',
        neighbour: ['center' , 'moldavka' , 'mongora' , 'cerdavino' , 'varlamono'],
        civil: true
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
