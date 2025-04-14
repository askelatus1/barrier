import {BarrierEvent, Step} from "../interfaces";

export const barrierEvent: BarrierEvent[] = [
    {
        id: 'infantry',
        title: 'уничтожили пехоту',
        type: 'event',
        actors: [],
        actorRule: ['military', 'military'],
        territoryRule: [],
        military: true,
    },

    {
        id: 'HTV',
        title: 'устранили офицера',
        type: 'event',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: true,
    },

    {
        id: 'vehicle',
        title: 'уничтожили технику',
        type: 'event',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: true,
    },


    {
        id: 'drone',
        title: 'запустили дрон-камикадзе по',
        type: 'event',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: true,
    },

    {
        id: 'detonation',
        title: 'подорвали оружейный склад',
        type: 'event',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: true,
    },

    {
        id: 'trade',
        title: 'наладили торговые отношения',
        type: 'event',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: false,
    },
    {
        id: 'artillery',
        title: 'работают артилерией по позициям',
        type: 'event',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: true,
    },

    {
        id: 'scientific',
        title: 'наладили научные отношения',
        type: 'event',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: false,
    },

    {
        id: 'humanitarian',
        title: 'проводят гумунитарную помощь',
        type: 'event',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: false,
    },


]

export const StepEvent: Step[] = [
    {
        id: 'attack',
        type: 'step',
        title: 'наступают на',
        actors: [],
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
        actors: [],
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
        actors: [],
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
        actors: [],
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
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: false,
        final: false,
        timeout: 10,
    },
]

export const postWarEvent: Step[] = [
    {
        id: 'cleaningСompleted',
        type:'step',
        title: 'очистка обломков успешно звершена',
        actors: [],
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
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: false,
        final: true,
        timeout: 10,
    },
    ]
