import {BarrierContext, BarrierEvent, Faction, Step} from "../interfaces";
import {EnhancedTrack} from "../apps/domain";
import {getRegionById} from "../apps/domain/rules/territoryRule";

export const barrierEvent: BarrierEvent[] = [
    {
        id: 'infantry',
        title: 'уничтожили пехоту',
        type: 'event',
        actorRule: ['military', 'military'],
        territoryRule: ['both'],
        military: true,
        notify: {
            start: (ctx: BarrierContext,  track: EnhancedTrack) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = getRegionById(track.territory);
                return `Войска стороны ${init.name}, уничтожили пехоту противника (${victim.name}) в секторе ${territory.title}`
            }
        }
    },

    {
        id: 'HTV',
        title: 'устранили офицера',
        type: 'event',
        actorRule: ['military', 'military'],
        territoryRule: ['both'],
        military: true,
    },

    {
        id: 'vehicle',
        title: 'уничтожили технику',
        type: 'event',
        actorRule: ['military', 'military'],
        territoryRule: ['both'],
        military: true,
    },


    {
        id: 'drone',
        title: 'запустили дрон-камикадзе по',
        type: 'event',
        actorRule: ['military', 'military'],
        territoryRule: ['both'],
        military: true,
    },

    {
        id: 'detonation',
        title: 'подорвали оружейный склад',
        type: 'event',
        actorRule: ['military', 'military'],
        territoryRule: ['both'],
        military: true,
    },

    {
        id: 'trade',
        title: 'наладили торговые отношения',
        type: 'event',
        actorRule: ['military', 'military'],
        territoryRule: ['both'],
        military: false,
    },
    {
        id: 'artillery',
        title: 'работают артилерией по позициям',
        type: 'event',
        actorRule: ['military', 'military'],
        territoryRule: ['both'],
        military: true,
    },

    {
        id: 'scientific',
        title: 'наладили научные отношения',
        type: 'event',
        actorRule: ['military', 'military'],
        territoryRule: ['both'],
        military: false,
    },

    {
        id: 'humanitarian',
        title: 'проводят гумунитарную помощь',
        type: 'event',
        actorRule: ['military', 'civilian'],
        territoryRule: ['both'],
        military: false,
    },


]

export const stepEvent: Step[] = [
    {
        id: 'attack',
        type: 'step',
        title: 'наступают на',
        actorRule: ['military', 'military'],
        territoryRule: ['both'],
        military: true,
        final: false,
        timeout: 10,
    },
    {
        id: 'negotiation',
        type: 'step',
        title: 'начали перероворы с',
        actorRule: ['military', 'military'],
        territoryRule: ['both'],
        military: true,
        final: false,
        timeout: 10,
    },
    {
        id: 'capture',
        type: 'step',
        title: 'захватили территорию',
        actorRule: ['military', 'military'],
        territoryRule: ['both'],
        military: true,
        final: false,
        timeout: 10,
    },
    {
        id: 'peace',
        type: 'step',
        title: 'заключиои мир с',
        actorRule: ['military', 'military'],
        territoryRule: ['both'],
        military: false,
        final: false,
        timeout: 10,
    },
    {
        id: 'negotiation',
        type: 'step',
        title: 'переговоры сорваны. Бои продолжаются',
        actorRule: ['military', 'military'],
        territoryRule: ['both'],
        military: false,
        final: false,
        timeout: 10,
    },
    {
        id: 'cleaningСompleted',
        type:'step',
        title: 'очистка обломков успешно звершена',
        actorRule: ['civilian'],
        territoryRule: ['both'],
        military: false,
        final: true,
        timeout: 10,
    },
    {
        id: 'wreckage',
        type:'step',
        title: 'проводят очистку района от обломков',
        actorRule: ['civilian'],
        territoryRule: ['both'],
        military: false,
        final: true,
        timeout: 10,
    },
]

