import {ActorType, BarrierEvent} from "../interfaces/event";
import {Faction} from "../interfaces/faction";

export {BarrierEvent} from "../interfaces/event";

export const barrierEvent: BarrierEvent[] = [
    {
        id: 'infantry',
        title: 'уничтожили пехоту',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: true,
    },

    {
        id: 'HTV',
        title: 'устранили офицера',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: true,
    },

    {
        id: 'vehicle',
        title: 'уничтожили технику',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: true,
    },


    {
        id: 'drone',
        title: 'запустили дрон-камикадзе по',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: true,
    },

    {
        id: 'detonation',
        title: 'подорвали оружейный склад',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: true,
    },

    {
        id: 'trade',
        title: 'наладили торговые отношения',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: false,
    },
    {
        id: 'artillery',
        title: 'работают артилерией по позициям',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: true,
    },

    {
        id: 'scientific',
        title: 'наладили научные отношения',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: false,
    },

    {
        id: 'humanitarian',
        title: 'проводят гумунитарную помощь',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: false,
    },


]

export const StepEvent: BarrierEvent[] = [
    {
        id: 'attack',
        title: 'наступают на',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: true,
    },
    {
        id: 'negotiation',
        title: 'начали перероворы с',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: true,
    },
    {
        id: 'capture',
        title: 'захватили территорию',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: true,
    },
    {
        id: 'peace',
        title: 'заключиои мир с',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: false,
    },
    {
        id: 'negotiation',
        title: 'переговоры сорваны. Бои продолжаются',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: false,
    },
]

export const postWarEvent: BarrierEvent[] = [
    {
        id: 'cleaningСompleted',
        title: 'очистка обломков успешно звершена',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: false,
    },
    {
        id: 'wreckage',
        title: 'проводят очистку района от обломков',
        actors: [],
        actorRule: [],
        territoryRule: [],
        military: false,
    },
    ]