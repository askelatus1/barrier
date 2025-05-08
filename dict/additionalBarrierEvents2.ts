import {BarrierContext, BarrierEvent, Faction, ActionType, Track} from "../interfaces";
import {EventType, TerritoryRuleType, ActorRuleType} from "./constants";

export const additionalBarrierEvents2: BarrierEvent[] = [
    {
        id: 'psychological_warfare',
        title: 'психологическая операция',
        type: EventType.EVENT,
        actionType: ActionType.WAR,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала психологическую операцию по деморализации населения (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Психологическая операция ${init.name} успешно подорвала моральный дух населения (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Население (${victim.name}) сохранило стойкость перед психологическим давлением ${init.name} в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'technological_espionage',
        title: 'промышленный шпионаж',
        type: EventType.EVENT,
        actionType: ActionType.WAR,
        actorRule: [ActorRuleType.CIVILIAN, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `${init.name} начала операцию по краже технологических секретов (${victim.name})`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `${init.name} успешно получила доступ к секретным разработкам (${victim.name})`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `Служба безопасности (${victim.name}) предотвратила утечку технологических секретов в пользу ${init.name}`
            },
        }
    },

    {
        id: 'refugee_crisis',
        title: 'создание миграционного кризиса',
        type: EventType.EVENT,
        actionType: ActionType.WAR,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} спровоцировала массовый поток беженцев на территорию (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Наплыв беженцев успешно дестабилизировал социальную обстановку (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `(${victim.name}) успешно справилась с миграционным кризисом в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'energy_blackmail',
        title: 'энергетический шантаж',
        type: EventType.EVENT,
        actionType: ActionType.DIPLOMACY,
        actorRule: [ActorRuleType.CIVILIAN, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.BOTH,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `${init.name} начала манипулировать поставками энергоресурсов для давления на (${victim.name})`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `Энергетический шантаж ${init.name} вынудил (${victim.name}) пойти на уступки`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `(${victim.name}) нашла альтернативные источники энергии и избежала зависимости от ${init.name}`
            },
        }
    },

    {
        id: 'currency_manipulation',
        title: 'манипуляция валютным курсом',
        type: EventType.EVENT,
        actionType: ActionType.TRADE,
        actorRule: [ActorRuleType.CIVILIAN, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.BOTH,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `${init.name} начала операцию по дестабилизации национальной валюты (${victim.name})`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `Валютные манипуляции ${init.name} успешно подорвали экономическую стабильность (${victim.name})`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `Центральный банк (${victim.name}) успешно защитил национальную валюту от манипуляций ${init.name}`
            },
        }
    },

    {
        id: 'proxy_conflict',
        title: 'развязывание прокси-конфликта',
        type: EventType.EVENT,
        actionType: ActionType.WAR,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала поддержку повстанческих групп против (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Поддерживаемые ${init.name} повстанцы успешно дестабилизировали контроль (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `(${victim.name}) успешно подавила поддерживаемое ${init.name} восстание в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'biological_weapon',
        title: 'применение биологического оружия',
        type: EventType.EVENT,
        actionType: ActionType.WAR,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала применение биологического оружия против (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Биологическое оружие ${init.name} успешно поразило цели на территории (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Системы биозащиты (${victim.name}) успешно нейтрализовали биологическую атаку ${init.name} в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'space_warfare',
        title: 'противоспутниковая операция',
        type: EventType.EVENT,
        actionType: ActionType.WAR,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.BOTH,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `${init.name} начала операцию по выведению из строя спутниковой группировки (${victim.name})`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `${init.name} успешно нарушила работу космических систем (${victim.name})`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `Противоспутниковая атака ${init.name} была отражена системами защиты (${victim.name})`
            },
        }
    },

    {
        id: 'cultural_influence',
        title: 'культурная экспансия',
        type: EventType.EVENT,
        actionType: ActionType.PEACE,
        actorRule: [ActorRuleType.CIVILIAN, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала масштабную программу культурного влияния на территории (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Культурное влияние ${init.name} успешно укрепилось в обществе (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `(${victim.name}) сохранила культурную самобытность вопреки влиянию ${init.name} в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'economic_integration',
        title: 'экономическая интеграция',
        type: EventType.EVENT,
        actionType: ActionType.TRADE,
        actorRule: [ActorRuleType.CIVILIAN, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.BOTH,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `${init.name} предложила программу глубокой экономической интеграции с (${victim.name})`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `${init.name} и (${victim.name}) успешно интегрировали свои экономические системы`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `(${victim.name}) отвергла предложение экономической интеграции от ${init.name}`
            },
        }
    }
]; 