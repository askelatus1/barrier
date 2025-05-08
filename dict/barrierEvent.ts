import {BarrierContext, BarrierEvent, Faction, ActionType, Track} from "../interfaces";
import {EventType, ActorType, TerritoryRuleType} from "./constants";

export const barrierEvent: BarrierEvent[] = [
    {
        id: 'infantry',
        title: 'атака на пехоту',
        type: EventType.EVENT,
        actionType: ActionType.WAR,
        actorRule: [ActorType.MILITARY, ActorType.MILITARY],
        territoryRule: TerritoryRuleType.BOTH,
        military: true,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Сторона ${init.name} начала атаку на пехоту противника (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Войска стороны ${init.name}, уничтожили пехоту противника (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Войска стороны ${init.name}, понесли потери при атаке на пехоту противника (${victim.name}) в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'HTV',
        title: 'ликвидация офицера',
        type: EventType.EVENT,
        actionType: ActionType.WAR,
        actorRule: [ActorType.MILITARY, ActorType.MILITARY],
        territoryRule: TerritoryRuleType.BOTH,
        military: true,
        notify: {
            start: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Сторона ${init.name} начала операцию по ликвидации офицера противника (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Войска стороны ${init.name}, уничтожили офицера противника (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Войска стороны ${init.name}, не смогли устранить офицера противника (${victim.name}) в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'vehicle',
        title: 'атака на технику',
        type: EventType.EVENT,
        actionType: ActionType.WAR,
        actorRule: [ActorType.MILITARY, ActorType.MILITARY],
        territoryRule: TerritoryRuleType.BOTH,
        military: true,
        notify: {
            start: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Сторона ${init.name} начала атаку на технику противника (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Войска стороны ${init.name}, уничтожили технику противника (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Войска стороны ${init.name}, не смогли уничтожить технику противника (${victim.name}) в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'drone',
        title: 'атака дроном-камикадзе',
        type: EventType.EVENT,
        actionType: ActionType.WAR,
        actorRule: [ActorType.MILITARY, ActorType.MILITARY],
        territoryRule: TerritoryRuleType.VICTIM,
        military: true,
        notify: {
            start: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Сторона ${init.name} запустила дрон-камикадзе по позициям противника (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Дрон-камикадзе стороны ${init.name} успешно поразил цели противника (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Дрон-камикадзе стороны ${init.name} был перехвачен противником (${victim.name}) в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'detonation',
        title: 'подрыв оружейного склада',
        type: EventType.EVENT,
        actionType: ActionType.WAR,
        actorRule: [ActorType.MILITARY, ActorType.MILITARY],
        territoryRule: TerritoryRuleType.VICTIM,
        military: true,
        notify: {
            start: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Сторона ${init.name} начала операцию по подрыву оружейного склада противника (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Оружейный склад противника (${victim.name}) успешно уничтожен в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Попытка подрыва оружейного склада стороны ${init.name} была предотвращена противником (${victim.name}) в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'trade',
        title: 'установление торговых отношений',
        type: EventType.EVENT,
        actionType: ActionType.PEACE,
        actorRule: [ActorType.CIVILIAN, ActorType.CIVILIAN],
        territoryRule: TerritoryRuleType.BOTH,
        military: false,
        notify: {
            start: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `Сторона ${init.name} начала переговоры об установлении торговых отношений с (${victim.name})`
            },
            resolve: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `Сторона ${init.name} успешно наладила торговые отношения с (${victim.name})`
            },
            reject: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `Сторона ${init.name}, не смогла наладить торговые отношения с (${victim.name})`
            },
        }
    },
    {
        id: 'artillery',
        title: 'работают артилерией по позициям',
        type: EventType.EVENT,
        actionType: ActionType.WAR,
        actorRule: [ActorType.MILITARY, ActorType.MILITARY],
        territoryRule: TerritoryRuleType.BOTH,
        military: true,
        notify: {
            start: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Сторона ${init.name} начала артиллерийский обстрел позиций противника (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Артиллерийский обстрел стороны ${init.name} успешно поразил цели противника (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Артиллерийский обстрел стороны ${init.name} не смог поразить цели противника (${victim.name}) в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'scientific',
        title: 'наладили научные отношения',
        type: EventType.EVENT,
        actionType: ActionType.PEACE,
        actorRule: [ActorType.MILITARY, ActorType.MILITARY],
        territoryRule: TerritoryRuleType.BOTH,
        military: false,
        notify: {
            start: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `Сторона ${init.name} начала переговоры о научном сотрудничестве с (${victim.name})`
            },
            resolve: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `Сторона ${init.name} успешно наладила научное сотрудничество с (${victim.name})`
            },
            reject: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `Сторона ${init.name} не смогла договориться о научном сотрудничестве с (${victim.name})`
            },
        }
    },

    {
        id: 'humanitarian',
        title: 'проводят гумунитарную помощь',
        type: EventType.EVENT,
        actionType: ActionType.PEACE,
        actorRule: [ActorType.MILITARY, ActorType.CIVILIAN],
        territoryRule: TerritoryRuleType.BOTH,
        military: false,
        notify: {
            start: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `Сторона ${init.name} начала доставку гуманитарной помощи для (${victim.name})`
            },
            resolve: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `Сторона ${init.name} успешно доставила гуманитарную помощь для (${victim.name})`
            },
            reject: (ctx: BarrierContext,  track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `Сторона ${init.name} не смогла доставить гуманитарную помощь для (${victim.name})`
            },
        }
    },
];
