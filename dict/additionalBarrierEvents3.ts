import {BarrierContext, BarrierEvent, Faction, ActionType, Track} from "../interfaces";
import {EventType, TerritoryRuleType, ActorRuleType} from "./constants";

export const additionalBarrierEvents3: BarrierEvent[] = [
    {
        id: 'quantum_research',
        title: 'квантовые исследования',
        type: EventType.EVENT,
        actionType: ActionType.PEACE,
        actorRule: [ActorRuleType.CIVILIAN, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.BOTH,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `${init.name} предложила совместную программу квантовых исследований с (${victim.name})`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `${init.name} и (${victim.name}) достигли прорыва в квантовых технологиях`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `(${victim.name}) отказалась от сотрудничества в квантовых исследованиях с ${init.name}`
            },
        }
    },

    {
        id: 'ai_development',
        title: 'разработка искусственного интеллекта',
        type: EventType.EVENT,
        actionType: ActionType.PEACE,
        actorRule: [ActorRuleType.CIVILIAN, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.BOTH,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `${init.name} инициировала совместный проект по развитию ИИ с (${victim.name})`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `${init.name} и (${victim.name}) успешно создали передовую систему ИИ`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `Сотрудничество по развитию ИИ между ${init.name} и (${victim.name}) не принесло результатов`
            },
        }
    },

    {
        id: 'climate_initiative',
        title: 'климатическая инициатива',
        type: EventType.EVENT,
        actionType: ActionType.PEACE,
        actorRule: [ActorRuleType.CIVILIAN, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.BOTH,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `${init.name} предложила совместную программу по борьбе с изменением климата (${victim.name})`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `${init.name} и (${victim.name}) успешно реализовали климатическую инициативу`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `(${victim.name}) отвергла климатическую инициативу ${init.name}`
            },
        }
    },

    {
        id: 'information_warfare',
        title: 'информационная война',
        type: EventType.EVENT,
        actionType: ActionType.WAR,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала масштабную информационную войну против (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Информационная война ${init.name} успешно подорвала доверие к властям (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `(${victim.name}) успешно противостоит информационной войне ${init.name} в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'economic_sabotage',
        title: 'экономический саботаж',
        type: EventType.EVENT,
        actionType: ActionType.WAR,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.VICTIM,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала операцию по подрыву экономики (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Экономический саботаж ${init.name} успешно дестабилизировал экономику (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Экономика (${victim.name}) устояла перед попытками саботажа ${init.name} в секторе ${territory.title}`
            },
        }
    },

    {
        id: 'diplomatic_pressure',
        title: 'дипломатическое давление',
        type: EventType.EVENT,
        actionType: ActionType.DIPLOMACY,
        actorRule: [ActorRuleType.CIVILIAN, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.BOTH,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `${init.name} начала кампанию дипломатического давления на (${victim.name})`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `Дипломатическое давление ${init.name} вынудило (${victim.name}) пойти на уступки`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `(${victim.name}) успешно противостоит дипломатическому давлению ${init.name}`
            },
        }
    },

    {
        id: 'medical_cooperation',
        title: 'медицинское сотрудничество',
        type: EventType.EVENT,
        actionType: ActionType.PEACE,
        actorRule: [ActorRuleType.CIVILIAN, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.BOTH,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `${init.name} предложила программу медицинского сотрудничества (${victim.name})`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `${init.name} и (${victim.name}) успешно развивают совместные медицинские проекты`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `(${victim.name}) отказалась от медицинского сотрудничества с ${init.name}`
            },
        }
    },

    {
        id: 'infrastructure_development',
        title: 'развитие инфраструктуры',
        type: EventType.EVENT,
        actionType: ActionType.PEACE,
        actorRule: [ActorRuleType.CIVILIAN, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.BOTH,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} предложила совместный проект развития инфраструктуры с (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} и (${victim.name}) успешно модернизировали инфраструктуру в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Проект развития инфраструктуры между ${init.name} и (${victim.name}) в секторе ${territory.title} не состоялся`
            },
        }
    },

    {
        id: 'educational_exchange',
        title: 'образовательный обмен',
        type: EventType.EVENT,
        actionType: ActionType.PEACE,
        actorRule: [ActorRuleType.CIVILIAN, ActorRuleType.CIVILIAN],
        territoryRule: TerritoryRuleType.BOTH,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `${init.name} инициировала программу образовательного обмена с (${victim.name})`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `${init.name} и (${victim.name}) успешно реализуют программу образовательного обмена`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                return `(${victim.name}) отказалась от программы образовательного обмена с ${init.name}`
            },
        }
    },

    {
        id: 'military_exercises',
        title: 'военные учения',
        type: EventType.EVENT,
        actionType: ActionType.WAR,
        actorRule: [ActorRuleType.MILITARY, ActorRuleType.MILITARY],
        territoryRule: TerritoryRuleType.BOTH,
        notify: {
            start: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `${init.name} начала масштабные военные учения вблизи границ (${victim.name}) в секторе ${territory.title}`
            },
            resolve: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Военные учения ${init.name} успешно продемонстрировали силу и готовность к действиям против (${victim.name}) в секторе ${territory.title}`
            },
            reject: (ctx: BarrierContext, track: Track) => {
                const [init, victim]: Faction[] = track.actors;
                const territory = track.territory;
                return `Военные учения ${init.name} не произвели ожидаемого эффекта на (${victim.name}) в секторе ${territory.title}`
            },
        }
    }
]; 