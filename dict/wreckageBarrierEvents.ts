import {BarrierContext, BarrierEvent, Faction, ActionType, Track} from "../interfaces";
import {EventType, TerritoryRuleType, ActorRuleType} from "./constants";

export const wreckageBarrierEvents: BarrierEvent[] = [
    {
        id: 'restore_residential_area',
        title: 'восстановление жилого района',
        type: EventType.EVENT,
        actionType: ActionType.WRECKAGE,
        actorRule: [ActorRuleType.LEGAL],
        territoryRule: TerritoryRuleType.WRECKAGE,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала восстановление жилого района в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} успешно восстановила жилой район в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `Попытка восстановления жилого района в секторе ${territory.title} не удалась`
            },
        }
    },

    {
        id: 'restore_infrastructure',
        title: 'восстановление инфраструктуры',
        type: EventType.EVENT,
        actionType: ActionType.WRECKAGE,
        actorRule: [ActorRuleType.LEGAL],
        territoryRule: TerritoryRuleType.WRECKAGE,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} приступила к восстановлению инфраструктуры в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} успешно восстановила инфраструктуру в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `Восстановление инфраструктуры в секторе ${territory.title} не удалось`
            },
        }
    },

    {
        id: 'restore_medical_facility',
        title: 'восстановление медицинского учреждения',
        type: EventType.EVENT,
        actionType: ActionType.WRECKAGE,
        actorRule: [ActorRuleType.LEGAL],
        territoryRule: TerritoryRuleType.WRECKAGE,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала восстановление медицинского учреждения в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} восстановила работу медицинского учреждения в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `Восстановление медицинского учреждения в секторе ${territory.title} не удалось`
            },
        }
    },

    {
        id: 'restore_education_center',
        title: 'восстановление образовательного центра',
        type: EventType.EVENT,
        actionType: ActionType.WRECKAGE,
        actorRule: [ActorRuleType.LEGAL],
        territoryRule: TerritoryRuleType.WRECKAGE,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала восстановление образовательного центра в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} восстановила работу образовательного центра в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `Восстановление образовательного центра в секторе ${territory.title} не удалось`
            },
        }
    },

    {
        id: 'restore_supply_lines',
        title: 'восстановление линий снабжения',
        type: EventType.EVENT,
        actionType: ActionType.WRECKAGE,
        actorRule: [ActorRuleType.LEGAL],
        territoryRule: TerritoryRuleType.WRECKAGE,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала восстановление линий снабжения в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} восстановила линии снабжения в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `Восстановление линий снабжения в секторе ${territory.title} не удалось`
            },
        }
    },

    {
        id: 'restore_communications',
        title: 'восстановление систем связи',
        type: EventType.EVENT,
        actionType: ActionType.WRECKAGE,
        actorRule: [ActorRuleType.LEGAL],
        territoryRule: TerritoryRuleType.WRECKAGE,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала восстановление систем связи в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} восстановила работу систем связи в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `Восстановление систем связи в секторе ${territory.title} не удалось`
            },
        }
    },

    {
        id: 'restore_power_grid',
        title: 'восстановление энергосети',
        type: EventType.EVENT,
        actionType: ActionType.WRECKAGE,
        actorRule: [ActorRuleType.LEGAL],
        territoryRule: TerritoryRuleType.WRECKAGE,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала восстановление энергосети в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} восстановила работу энергосети в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `Восстановление энергосети в секторе ${territory.title} не удалось`
            },
        }
    },

    {
        id: 'restore_water_supply',
        title: 'восстановление водоснабжения',
        type: EventType.EVENT,
        actionType: ActionType.WRECKAGE,
        actorRule: [ActorRuleType.LEGAL],
        territoryRule: TerritoryRuleType.WRECKAGE,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала восстановление системы водоснабжения в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} восстановила систему водоснабжения в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `Восстановление системы водоснабжения в секторе ${territory.title} не удалось`
            },
        }
    }
];