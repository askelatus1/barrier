import {Region, Status} from "../interfaces/region";

export const region: Region[] = [
    {
        id: 'modavka',
        title: 'молдавка',
        status: 'peace',
        neighbour: ['Piter' , 'center' , 'miltown' , 'varlamono']
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
        neighbour: ['Piter' , 'cerdavino' , 'obrazcovo' , 'center']
    },

    {
        id: 'shanghai',
        title: 'шанхай',
        status: 'peace',
        neighbour: ['miltown' , 'krista']
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
        neighbour: ['cerdavino' , 'Piter' , 'modavka']
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
        neighbour: ['decabristov' , 'miltown' , 'shanghai']
    },

    {
        id: 'center',
        title: 'центр',
        status: 'peace',
        neighbour: ['modavka' , 'miltown' , 'Piter' , 'decabristov' , 'mongora']
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