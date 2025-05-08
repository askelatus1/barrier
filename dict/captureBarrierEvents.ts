import {BarrierContext, BarrierEvent, Faction, ActionType, Track} from "../interfaces";
import {EventType, TerritoryRuleType, ActorRuleType} from "./constants";

export const captureBarrierEvents: BarrierEvent[] = [
    {
        id: 'capture_military_base',
        title: 'захват военной базы',
        type: EventType.EVENT,
        actionType: ActionType.CAPTURE,
        actorRule: [ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.EMPTY,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала штурм военной базы в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `Войска ${init.name} успешно захватили военную базу в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `Попытка захвата военной базы ${init.name} в секторе ${territory.title} не удалась`
            },
        }
    },

    {
        id: 'capture_city',
        title: 'захват города',
        type: EventType.EVENT,
        actionType: ActionType.CAPTURE,
        actorRule: [ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.EMPTY,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала операцию по захвату города в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `Силы ${init.name} установили полный контроль над городом в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `Попытка захвата города силами ${init.name} в секторе ${territory.title} не удалась`
            },
        }
    },

    {
        id: 'capture_industrial_complex',
        title: 'захват промышленного комплекса',
        type: EventType.EVENT,
        actionType: ActionType.CAPTURE,
        actorRule: [ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.EMPTY,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала операцию по захвату промышленного комплекса в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} взяла под контроль стратегически важный промышленный комплекс в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `Попытка захвата промышленного комплекса силами ${init.name} в секторе ${territory.title} не удалась`
            },
        }
    },

    {
        id: 'capture_port',
        title: 'захват морского порта',
        type: EventType.EVENT,
        actionType: ActionType.CAPTURE,
        actorRule: [ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.EMPTY,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала штурм морского порта в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `Морской порт перешел под контроль ${init.name} в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `Попытка захвата морского порта силами ${init.name} в секторе ${territory.title} не удалась`
            },
        }
    },

    {
        id: 'capture_airport',
        title: 'захват аэропорта',
        type: EventType.EVENT,
        actionType: ActionType.CAPTURE,
        actorRule: [ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.EMPTY,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала операцию по захвату аэропорта в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `Десантные подразделения ${init.name} захватили аэропорт в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `Попытка захвата аэропорта силами ${init.name} в секторе ${territory.title} не удалась`
            },
        }
    },

    {
        id: 'capture_power_plant',
        title: 'захват электростанции',
        type: EventType.EVENT,
        actionType: ActionType.CAPTURE,
        actorRule: [ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.EMPTY,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала операцию по захвату электростанции в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} установила контроль над электростанцией в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `Попытка захвата электростанции силами ${init.name} в секторе ${territory.title} не удалась`
            },
        }
    },

    {
        id: 'capture_command_center',
        title: 'захват командного центра',
        type: EventType.EVENT,
        actionType: ActionType.CAPTURE,
        actorRule: [ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.EMPTY,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала штурм командного центра в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `Спецподразделения ${init.name} захватили командный центр в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `Попытка захвата командного центра силами ${init.name} в секторе ${territory.title} не удалась`
            },
        }
    },

    {
        id: 'capture_research_facility',
        title: 'захват научного центра',
        type: EventType.EVENT,
        actionType: ActionType.CAPTURE,
        actorRule: [ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.EMPTY,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала операцию по захвату научно-исследовательского центра в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} получила контроль над научным центром в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `Попытка захвата научного центра силами ${init.name} в секторе ${territory.title} не удалась`
            },
        }
    },

    {
        id: 'capture_communications_hub',
        title: 'захват центра связи',
        type: EventType.EVENT,
        actionType: ActionType.CAPTURE,
        actorRule: [ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.EMPTY,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала операцию по захвату центра связи и коммуникаций в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} установила контроль над центром связи в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `Попытка захвата центра связи силами ${init.name} в секторе ${territory.title} не удалась`
            },
        }
    },

    {
        id: 'capture_supply_depot',
        title: 'захват склада снабжения',
        type: EventType.EVENT,
        actionType: ActionType.CAPTURE,
        actorRule: [ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.EMPTY,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала штурм склада военного снабжения в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} захватила склад снабжения в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init]: Faction[] = track.actors;
                const territory = track.territory;
                return `Попытка захвата склада снабжения силами ${init.name} в секторе ${territory.title} не удалась`
            },
        }
    }
];