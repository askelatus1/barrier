import {Region, Status} from "../interfaces/region";

export const region: Region[] = [
    {
        id: 'modavka',
        title: 'молдавка',
        status: 'peace',
        neighbour: ['Piter' , 'center' , 'miltown']
    },

    {
        id: 'decabristov',
        title: 'декабристов',
        status: 'peace',
        neighbour: ['center' , 'krista' , 'miltown']
    },

    {
        id: 'obrazcovo',
        title: 'Образцовская',
        status: 'peace',
        neighbour: ['rudnik' , 'mongora']
    },

    {
        id: 'mongora',
        title: 'монгора',
        status: 'peace',
        neighbour: ['Piter' , 'cerdavino' , 'obrazcovo']
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
        neighbour: ['mongora' , 'Piter' , 'varlamono']
    },

    {
        id: 'varlamono',
        title: 'варламово',
        status: 'peace',
        neighbour: ['cerdavino' , 'Piter']
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
        neighbour: ['decabristov' , 'miltown']
    },

    {
        id: 'center',
        title: 'центр',
        status: 'peace',
        neighbour: ['modavka' , 'miltown' , 'Piter' , 'decabristov']
    },

    {
        id: 'miltown',
        title: 'военный городок',
        status: 'peace',
        neighbour: ['shanghai' , 'center' , 'modavka' , 'krista' , 'decabristov']
    },

    {
        id: 'Piter',
        title: 'питер',
        status: 'peace',
        neighbour: ['center' , 'modavka' , 'mongora' , 'cerdavino' , 'varlamono']
    }
];