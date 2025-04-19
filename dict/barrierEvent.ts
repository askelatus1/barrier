import {BarrierContext, BarrierEvent, Faction, Step} from "../interfaces";
import {EnhancedTrack} from "../apps/domain";

export const barrierEvent: BarrierEvent[] = [
    {
        id: 'infantry',
        title: 'уничтожили пехоту',
        type: 'event',
        actorRule: ['military', 'military'],
        territoryRule: 'both',
        military: true,
        notify: {
            start: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Войска стороны ${init.name}, напали на пехоту противника (${victim.name}) в секторе ${territory.title}`
            },
            end: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Войска стороны ${init.name}, уничтожили пехоту противника (${victim.name}) в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'HTV',
        title: 'устранили офицера',
        type: 'event',
        actorRule: ['military', 'military'],
        territoryRule: 'both',
        military: true,
        notify: {
            start: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Войска стороны ${init.name}, напали на офицера противника (${victim.name}) в секторе ${territory.title}`
            },
            end: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Войска стороны ${init.name}, уничтожили офицера противника (${victim.name}) в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'vehicle',
        title: 'уничтожили технику',
        type: 'event',
        actorRule: ['military', 'military'],
        territoryRule: 'both',
        military: true,
        notify: {
            start: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Войска стороны ${init.name}, напали на технику противника (${victim.name}) в секторе ${territory.title}`
            },
            end: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Войска стороны ${init.name}, уничтожили технику противника (${victim.name}) в секторе ${territory.title}`
            },
        }
    },


    {
        id: 'drone',
        title: 'запустили дрон-камикадзе по',
        type: 'event',
        actorRule: ['military', 'military'],
        territoryRule: 'victim',
        military: true,
        notify: {
            start: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Войска стороны ${init.name}, запустили дрон-камикадзе по силам противника (${victim.name}) в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'detonation',
        title: 'подорвали оружейный склад',
        type: 'event',
        actorRule: ['military', 'military'],
        territoryRule: 'victim',
        military: true,
        notify: {
            start: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Войска стороны ${init.name}, подорвали оружейный склад противника (${victim.name}) в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'trade',
        title: 'наладили торговые отношения',
        type: 'event',
        actorRule: ['civilian', 'civilian'],
        territoryRule: 'both',
        military: false,
        notify: {
            start: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                return `Сторона ${init.name}, наладили торговые отношения с (${victim.name})`
            },
        }
    },
    {
        id: 'artillery',
        title: 'работают артилерией по позициям',
        type: 'event',
        actorRule: ['military', 'military'],
        territoryRule: 'both',
        military: true,
    },

    {
        id: 'scientific',
        title: 'наладили научные отношения',
        type: 'event',
        actorRule: ['military', 'military'],
        territoryRule: 'both',
        military: false,
    },

    {
        id: 'humanitarian',
        title: 'проводят гумунитарную помощь',
        type: 'event',
        actorRule: ['military', 'civilian'],
        territoryRule: 'both',
        military: false,
    },


]

export const stepEvent: Step[] = [
    {
        id: 'attack',
        type: 'step',
        title: 'наступают на',
        actorRule: ['military', 'military'],
        territoryRule: 'both',
        military: true,
        final: false,
        timeout: 1000,
    },
    {
        id: 'negotiation',
        type: 'step',
        title: 'начали перероворы с',
        actorRule: ['military', 'military'],
        territoryRule: 'both',
        military: true,
        final: false,
        timeout: 1000,
    },
    {
        id: 'capture',
        type: 'step',
        title: 'захватили территорию',
        actorRule: ['military', 'military'],
        territoryRule: 'both',
        military: true,
        final: false,
        timeout: 1000,
    },
    {
        id: 'peace',
        type: 'step',
        title: 'заключиои мир с',
        actorRule: ['military', 'military'],
        territoryRule: 'both',
        military: false,
        final: false,
        timeout: 1000,
    },
    {
        id: 'negotiation',
        type: 'step',
        title: 'переговоры сорваны. Бои продолжаются',
        actorRule: ['military', 'military'],
        territoryRule: 'both',
        military: false,
        final: false,
        timeout: 1000,
    },
    {
        id: 'cleaningСompleted',
        type:'step',
        title: 'очистка обломков успешно звершена',
        actorRule: ['civilian'],
        territoryRule: 'both',
        military: false,
        final: false,
        timeout: 1000,
    },
    {
        id: 'wreckage',
        type:'step',
        title: 'проводят очистку района от обломков',
        actorRule: ['civilian'],
        territoryRule: 'both',
        military: false,
        final: false,
        timeout: 1000,
    },
    {
        id: 'resolve',
        type:'step',
        title: '',
        actorRule: [],
        territoryRule: 'both',
        military: true,
        final: true,
        timeout: 1000,
    },

    {
        id: 'raject',
        type:'step',
        title: '',
        actorRule: [],
        territoryRule: 'both',
        military: true,
        final: true,
        timeout: 1000,
    }
]

