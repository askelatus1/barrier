import {Region} from "../interfaces";
import {RegionStatus} from "./constants";

export const regionMap: Region[] = [
    {
        id: 'moldavka',
        title: 'молдавка',
        status: RegionStatus.PEACE,
        neighbour: ['Piter' , 'center' , 'miltown' , 'varlamono']
    },

    {
        id: 'decabristov',
        title: 'декабристов',
        status: RegionStatus.PEACE,
        neighbour: ['center' , 'krista' , 'miltown']
    },

    {
        id: 'obrazcovo',
        title: 'Образцовская',
        status: RegionStatus.PEACE,
        neighbour: ['rudnik' , 'mongora']
    },

    {
        id: 'mongora',
        title: 'монгора',
        status: RegionStatus.PEACE,
        neighbour: ['Piter' , 'cerdavino' , 'obrazcovo' , 'center']
    },

    {
        id: 'shanghai',
        title: 'шанхай',
        status: RegionStatus.PEACE,
        neighbour: ['miltown' , 'krista']
    },

    {
        id: 'cerdavino',
        title: 'сердавино',
        status: RegionStatus.WRECKAGE,
        neighbour: ['mongora' , 'Piter' , 'varlamono']
    },

    {
        id: 'varlamono',
        title: 'варламово',
        status: RegionStatus.PEACE,
        neighbour: ['cerdavino' , 'Piter' , 'moldavka']
    },

    {
        id: 'rudnik',
        title: 'рудник',
        status: RegionStatus.PEACE,
        neighbour: ['obrazcovo']
    },

    {
        id: 'krista',
        title: 'криста',
        status: RegionStatus.PEACE,
        neighbour: ['decabristov' , 'miltown' , 'shanghai']
    },

    {
        id: 'center',
        title: 'центр',
        status: RegionStatus.PEACE,
        neighbour: ['moldavka' , 'miltown' , 'Piter' , 'decabristov' , 'mongora']
    },

    {
        id: 'miltown',
        title: 'военный городок',
        status: RegionStatus.PEACE,
        neighbour: ['shanghai' , 'center' , 'moldavka' , 'krista' , 'decabristov']
    },

    {
        id: 'Piter',
        title: 'питер',
        status: RegionStatus.PEACE,
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
