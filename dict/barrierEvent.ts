import {BarrierEvent, Step} from "../interfaces";

export const barrierEvent: BarrierEvent[] = [
    {
        id: 'infantry',
        title: 'уничтожили пехоту',
        type: 'event',
        actorRule: ['military', 'military'],
        territoryRule: [],
        military: true,
    },

    {
        id: 'HTV',
        title: 'устранили офицера',
        type: 'event',
        actorRule: [],
        territoryRule: [],
        military: true,
    },

    {
        id: 'vehicle',
        title: 'уничтожили технику',
        type: 'event',
        actorRule: [],
        territoryRule: [],
        military: true,
    },


    {
        id: 'drone',
        title: 'запустили дрон-камикадзе по',
        type: 'event',
        actorRule: [],
        territoryRule: [],
        military: true,
    },

    {
        id: 'detonation',
        title: 'подорвали оружейный склад',
        type: 'event',
        actorRule: [],
        territoryRule: [],
        military: true,
    },

    {
        id: 'trade',
        title: 'наладили торговые отношения',
        type: 'event',
        actorRule: [],
        territoryRule: [],
        military: false,
    },
    {
        id: 'artillery',
        title: 'работают артилерией по позициям',
        type: 'event',
        actorRule: [],
        territoryRule: [],
        military: true,
    },

    {
        id: 'scientific',
        title: 'наладили научные отношения',
        type: 'event',
        actorRule: [],
        territoryRule: [],
        military: false,
    },

    {
        id: 'humanitarian',
        title: 'проводят гумунитарную помощь',
        type: 'event',
        actorRule: [],
        territoryRule: [],
        military: false,
    },
]

export const stepEvent: Step[] = [
    {
        id: 'attack',
        type: 'step',
        title: 'наступают на',
        actorRule: [],
        territoryRule: [],
        military: true,
        final: false,
        timeout: 10,
    },
    {
        id: 'negotiation',
        type: 'step',
        title: 'начали перероворы с',
        actorRule: [],
        territoryRule: [],
        military: true,
        final: false,
        timeout: 10,
    },
    {
        id: 'capture',
        type: 'step',
        title: 'захватили территорию',
        actorRule: [],
        territoryRule: [],
        military: true,
        final: false,
        timeout: 10,
    },
    {
        id: 'peace',
        type: 'step',
        title: 'заключиои мир с',
        actorRule: [],
        territoryRule: [],
        military: false,
        final: false,
        timeout: 10,
    },
    {
        id: 'negotiation',
        type: 'step',
        title: 'переговоры сорваны. Бои продолжаются',
        actorRule: [],
        territoryRule: [],
        military: false,
        final: false,
        timeout: 10,
    },
    {
        id: 'cleaningСompleted',
        type:'step',
        title: 'очистка обломков успешно звершена',
        actorRule: [],
        territoryRule: [],
        military: false,
        final: true,
        timeout: 10,
    },
    {
        id: 'wreckage',
        type:'step',
        title: 'проводят очистку района от обломков',
        actorRule: [],
        territoryRule: [],
        military: false,
        final: true,
        timeout: 10,
    },
]

