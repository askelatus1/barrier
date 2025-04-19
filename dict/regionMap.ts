import {Region} from "../interfaces";
import {RegionStatus} from "./constants";

export const regionMap: Region[] = [
    {
        id: 'moldavka',
        title: 'молдавка',
        status: RegionStatus.PEACE,
        neighbour: ['Piter' , 'center' , 'miltown' , 'varlamono'],
        faction: null
    },

    {
        id: 'decabristov',
        title: 'декабристов',
        status: RegionStatus.PEACE,
        neighbour: ['center' , 'krista' , 'miltown'],
        faction: null
    },

    {
        id: 'obrazcovo',
        title: 'Образцовская',
        status: RegionStatus.PEACE,
        neighbour: ['rudnik' , 'mongora'],
        faction: null
    },

    {
        id: 'mongora',
        title: 'монгора',
        status: RegionStatus.PEACE,
        neighbour: ['Piter' , 'cerdavino' , 'obrazcovo' , 'center'],
        faction: null
    },

    {
        id: 'shanghai',
        title: 'шанхай',
        status: RegionStatus.PEACE,
        neighbour: ['miltown' , 'krista'],
        faction: null
    },

    {
        id: 'cerdavino',
        title: 'сердавино',
        status: RegionStatus.WRECKAGE,
        neighbour: ['mongora' , 'Piter' , 'varlamono'],
        faction: null
    },

    {
        id: 'varlamono',
        title: 'варламово',
        status: RegionStatus.PEACE,
        neighbour: ['cerdavino' , 'Piter' , 'moldavka'],
        faction: null
    },

    {
        id: 'rudnik',
        title: 'рудник',
        status: RegionStatus.PEACE,
        neighbour: ['obrazcovo'],
        faction: null
    },

    {
        id: 'krista',
        title: 'криста',
        status: RegionStatus.PEACE,
        neighbour: ['decabristov' , 'miltown' , 'shanghai'],
        faction: null
    },

    {
        id: 'center',
        title: 'центр',
        status: RegionStatus.PEACE,
        neighbour: ['moldavka' , 'miltown' , 'Piter' , 'decabristov' , 'mongora'],
        faction: null
    },

    {
        id: 'miltown',
        title: 'военный городок',
        status: RegionStatus.PEACE,
        neighbour: ['shanghai' , 'center' , 'moldavka' , 'krista' , 'decabristov'],
        faction: null
    },

    {
        id: 'Piter',
        title: 'питер',
        status: RegionStatus.PEACE,
        neighbour: ['center' , 'moldavka' , 'mongora' , 'cerdavino' , 'varlamono'],
        faction: null
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
