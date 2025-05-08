import {BarrierContext, BarrierEvent, Faction, ActionType, Track} from "../interfaces";
import {EventType, TerritoryRuleType, ActorRuleType} from "./constants";

export const additionalBarrierEvents: BarrierEvent[] = [
    {
        id: 'sabotage_communications',
        title: 'диверсия на узле связи',
        type: EventType.EVENT,
        actionType: ActionType.WAR,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Диверсионная группа ${init.name} начала операцию по выведению из строя узла связи противника (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Узел связи противника (${victim.name}) успешно выведен из строя в секторе ${territory.title}, что нарушило систему управления войсками`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Диверсионная группа ${init.name} была обнаружена при попытке саботажа узла связи (${victim.name}) в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'cyber_attack',
        title: 'кибератака на инфраструктуру',
        type: EventType.EVENT,
        actionType: ActionType.WAR,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Кибервойска ${init.name} начали массированную атаку на цифровую инфраструктуру (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Успешная кибератака ${init.name} парализовала работу критической инфраструктуры (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Системы кибербезопасности (${victim.name}) успешно отразили атаку ${init.name} в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'intelligence_network',
        title: 'внедрение агентурной сети',
        type: EventType.EVENT,
        actionType: ActionType.WAR,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Разведка ${init.name} начала операцию по созданию агентурной сети на территории (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Агентурная сеть ${init.name} успешно внедрена в ключевые структуры (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Контрразведка (${victim.name}) выявила и нейтрализовала агентурную сеть ${init.name} в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'economic_sanctions',
        title: 'введение экономических санкций',
        type: EventType.EVENT,
        actionType: ActionType.DIPLOMACY,
        actorRule: [ActorRuleType.CIVILIAN, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.BOTH,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `${init.name} инициировала введение пакета экономических санкций против (${victim.name})`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `Экономические санкции ${init.name} успешно ограничили финансовые возможности (${victim.name})`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `(${victim.name}) успешно обошла санкции, введенные ${init.name}, через альтернативные экономические связи`
            },
        }
    },

    {
        id: 'propaganda_campaign',
        title: 'информационная кампания',
        type: EventType.EVENT,
        actionType: ActionType.DIPLOMACY,
        actorRule: [ActorRuleType.CIVILIAN, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} запустила масштабную информационную кампанию по дискредитации (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Информационная кампания ${init.name} успешно подорвала авторитет (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `(${victim.name}) успешно противостоит информационной кампании ${init.name} в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'special_operation',
        title: 'спецоперация в тылу врага',
        type: EventType.EVENT,
        actionType: ActionType.WAR,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Спецподразделение ${init.name} начало секретную операцию в тылу (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Спецоперация ${init.name} успешно дезорганизовала тыловое обеспечение (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Спецподразделение ${init.name} обнаружено и нейтрализовано силами (${victim.name}) в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'air_superiority',
        title: 'борьба за превосходство в воздухе',
        type: EventType.EVENT,
        actionType: ActionType.WAR,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.BOTH,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `ВВС ${init.name} начали операцию по завоеванию господства в воздухе над силами (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `ВВС ${init.name} успешно подавили системы ПВО и авиацию (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `ВВС ${init.name} понесли тяжелые потери в борьбе с силами ПВО (${victim.name}) в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'naval_blockade',
        title: 'морская блокада',
        type: EventType.EVENT,
        actionType: ActionType.WAR,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Военно-морские силы ${init.name} начали операцию по блокаде морских путей (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Морская блокада ${init.name} успешно перекрыла морское сообщение (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `(${victim.name}) успешно прорвала морскую блокаду ${init.name} в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'diplomatic_alliance',
        title: 'формирование военного альянса',
        type: EventType.EVENT,
        actionType: ActionType.DIPLOMACY,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.BOTH,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `${init.name} инициировала переговоры о создании военного альянса с (${victim.name})`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `${init.name} и (${victim.name}) успешно сформировали военный альянс`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `Переговоры о военном альянсе между ${init.name} и (${victim.name}) завершились неудачей`
            },
        }
    },

    {
        id: 'resource_control',
        title: 'захват стратегических ресурсов',
        type: EventType.EVENT,
        actionType: ActionType.WAR,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала операцию по захвату месторождений стратегических ресурсов (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} успешно взяла под контроль стратегические ресурсы (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `(${victim.name}) отстояла контроль над стратегическими ресурсами от посягательств ${init.name} в секторе ${territory.title}`
            },
        }
    }
]; 