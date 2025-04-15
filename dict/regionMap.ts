import {Region} from "../interfaces";

export const regionMap: Region[] = [
    {
        id: 'moldavka',
        title: 'молдавка',
        status: 'peace',
        neighbour: ['Piter', 'center', 'miltown']
    },

    {
        id: 'decabristov',
        title: 'декабристов',
        status: 'peace',
        neighbour: ['center', 'krista', 'miltown'], // 'center | krista | miltown'
    },

    {
        id: 'obrazcovo',
        title: 'Образцовская',
        status: 'peace',
        neighbour: ['rudnik', 'mongora'] //'rudnik | mongora'
    },

    {
        id: 'mongora',
        title: 'монгора',
        status: 'peace',
        neighbour: ['Piter', 'cerdavino', 'obrazcovo']
    },

    {
        id: 'shanghai',
        title: 'шанхай',
        status: 'peace',
        neighbour: ['miltown']
    },

    {
        id: 'cerdavino',
        title: 'сердавино',
        status: 'wreckage',
        neighbour: ['mongora', 'Piter', 'varlamono']
    },

    {
        id: 'varlamono',
        title: 'варламово',
        status: 'peace',
        neighbour: ['cerdavino', "Piter"]
    },

    {
        id: 'rudnik',
        title: 'рудник',
        status: 'peace',
        neighbour: ['obrazcovo']
    },

    {
        id: 'krista',
        title: 'криста',
        status: 'peace',
        neighbour: ['decabristov', 'miltown']
    },

    {
        id: 'center',
        title: 'центр',
        status: 'peace',
        neighbour: ['moldavka', 'miltown', 'Piter', 'decabristov']
    },

    {
        id: 'miltown',
        title: 'военный городок',
        status: 'peace',
        neighbour: ['shanghai', 'center', 'moldavka', 'krista', 'decabristov']
    },

    {
        id: 'Piter',
        title: 'питер',
        status: 'peace',
        neighbour: ['center', 'moldavka', 'mongora', 'cerdavino', 'varlamono']
    }
] as const;

export type regionsType =
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
