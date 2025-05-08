import {BarrierContext, BarrierEvent, Faction, ActionType, Track} from "../interfaces";
import {EventType, TerritoryRuleType, ActorRuleType} from "./constants";

export const captureBarrierEvents: BarrierEvent[] = [
    {
        id: 'capture_military_base',
        title: 'захват военной базы',
        type: EventType.EVENT,
        actionType: ActionType.CAPTURE,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала штурм военной базы (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Войска ${init.name} успешно захватили военную базу (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Гарнизон (${victim.name}) отбил атаку ${init.name} на военную базу в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'capture_city',
        title: 'захват города',
        type: EventType.EVENT,
        actionType: ActionType.CAPTURE,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала операцию по захвату города у (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Силы ${init.name} установили полный контроль над городом (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Войска (${victim.name}) отстояли город от наступления ${init.name} в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'capture_industrial_complex',
        title: 'захват промышленного комплекса',
        type: EventType.EVENT,
        actionType: ActionType.CAPTURE,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала операцию по захвату промышленного комплекса (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} взяла под контроль стратегически важный промышленный комплекс (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Силы безопасности (${victim.name}) отразили попытку захвата промышленного комплекса ${init.name} в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'capture_port',
        title: 'захват морского порта',
        type: EventType.EVENT,
        actionType: ActionType.CAPTURE,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала штурм морского порта (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Морской порт (${victim.name}) перешел под контроль ${init.name} в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Морская пехота (${victim.name}) отбила атаку на порт от сил ${init.name} в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'capture_airport',
        title: 'захват аэропорта',
        type: EventType.EVENT,
        actionType: ActionType.CAPTURE,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала операцию по захвату аэропорта (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Десантные подразделения ${init.name} захватили аэропорт (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Силы (${victim.name}) удержали контроль над аэропортом от атаки ${init.name} в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'capture_power_plant',
        title: 'захват электростанции',
        type: EventType.EVENT,
        actionType: ActionType.CAPTURE,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала операцию по захвату электростанции (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} установила контроль над электростанцией (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Охрана объекта (${victim.name}) отразила попытку захвата электростанции силами ${init.name} в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'capture_command_center',
        title: 'захват командного центра',
        type: EventType.EVENT,
        actionType: ActionType.CAPTURE,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала штурм командного центра (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Спецподразделения ${init.name} захватили командный центр (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Силы (${victim.name}) отбили атаку на командный центр от подразделений ${init.name} в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'capture_research_facility',
        title: 'захват научного центра',
        type: EventType.EVENT,
        actionType: ActionType.CAPTURE,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала операцию по захвату научно-исследовательского центра (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} получила контроль над научным центром и секретными разработками (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Попытка захвата научного центра силами ${init.name} была пресечена службой безопасности (${victim.name}) в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'capture_communications_hub',
        title: 'захват центра связи',
        type: EventType.EVENT,
        actionType: ActionType.CAPTURE,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала операцию по захвату центра связи и коммуникаций (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} установила контроль над центром связи (${victim.name}), нарушив систему управления в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Силы (${victim.name}) сохранили контроль над центром связи, отразив атаку ${init.name} в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'capture_supply_depot',
        title: 'захват склада снабжения',
        type: EventType.EVENT,
        actionType: ActionType.CAPTURE,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала штурм склада военного снабжения (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} захватила крупный склад снабжения (${victim.name}), получив доступ к военным ресурсам в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Охрана склада (${victim.name}) отбила попытку захвата военных запасов силами ${init.name} в секторе ${territory.title}`
            },
        }
    }
];