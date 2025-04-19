import {BarrierContext, BarrierEvent, Faction, Step} from "../interfaces";
import {EnhancedTrack} from "../apps/domain";

export const barrierEvent: BarrierEvent[] = [
    {
        id: 'infantry',
        title: 'атака на пехоту',
        type: 'event',
        actorRule: ['military', 'military'],
        territoryRule: 'both',
        military: true,
        notify: {
            start: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Сторона ${init.name} начала атаку на пехоту противника (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Войска стороны ${init.name}, уничтожили пехоту противника (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Войска стороны ${init.name}, понесли потери при атаке на пехоту противника (${victim.name}) в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'HTV',
        title: 'ликвидация офицера',
        type: 'event',
        actorRule: ['military', 'military'],
        territoryRule: 'both',
        military: true,
        notify: {
            start: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Сторона ${init.name} начала операцию по ликвидации офицера противника (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Войска стороны ${init.name}, уничтожили офицера противника (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Войска стороны ${init.name}, не смогли устранить офицера противника (${victim.name}) в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'vehicle',
        title: 'атака на технику',
        type: 'event',
        actorRule: ['military', 'military'],
        territoryRule: 'both',
        military: true,
        notify: {
            start: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Сторона ${init.name} начала атаку на технику противника (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Войска стороны ${init.name}, уничтожили технику противника (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Войска стороны ${init.name}, не смогли уничтожить технику противника (${victim.name}) в секторе ${territory.title}`
            },
        }
    },


    {
        id: 'drone',
        title: 'атака дроном-камикадзе',
        type: 'event',
        actorRule: ['military', 'military'],
        territoryRule: 'victim',
        military: true,
        notify: {
            start: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Сторона ${init.name} запустила дрон-камикадзе по позициям противника (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Дрон-камикадзе стороны ${init.name} успешно поразил цели противника (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Дрон-камикадзе стороны ${init.name} был перехвачен противником (${victim.name}) в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'detonation',
        title: 'подрыв оружейного склада',
        type: 'event',
        actorRule: ['military', 'military'],
        territoryRule: 'victim',
        military: true,
        notify: {
            start: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Сторона ${init.name} начала операцию по подрыву оружейного склада противника (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Оружейный склад противника (${victim.name}) успешно уничтожен в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Попытка подрыва оружейного склада стороны ${init.name} была предотвращена противником (${victim.name}) в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'trade',
        title: 'установление торговых отношений',
        type: 'event',
        actorRule: ['civilian', 'civilian'],
        territoryRule: 'both',
        military: false,
        notify: {
            start: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                return `Сторона ${init.name} начала переговоры об установлении торговых отношений с (${victim.name})`
            },
            resolve: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                return `Сторона ${init.name} успешно наладила торговые отношения с (${victim.name})`
            },
            reject: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                return `Сторона ${init.name}, не смогла наладить торговые отношения с (${victim.name})`
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

