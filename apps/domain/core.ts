import {ActionType, BarrierContext} from "../../interfaces";
import {BarrierRandom} from "./random";
import {ActorType, CORE_TTL_MAX, CORE_TTL_MIN, TIMEOUTS} from "../../dict/constants";

export class GameCore {
    ttl: number = 0;
    constructor(private ctx: BarrierContext, public timeout = TIMEOUTS.GAME_TICK) {
        ctx.core = this;
        this.ttl = BarrierRandom.getRandomInt(10);
    }
    scheduler: NodeJS.Timeout;
    start() {
        console.log('Game core started');
        if(!this.scheduler) this.scheduler = setTimeout(() => this.tick(), this.timeout);
    }
    stop() {
        if(this.scheduler) {
            clearTimeout(this.scheduler);
            this.scheduler = null;
        }
        console.log('Game core stopped');
    }

    tick(){
        if(this.ttl <= 0) this.addEvent();
        this.scheduler = setTimeout(() => this.tick(), BarrierRandom.getRandomIntInRange(TIMEOUTS.GAME_TICK_MIN, TIMEOUTS.GAME_TICK_MAX));
        this.ttl--;
    }

    addEvent(): void {
        this.ttl = BarrierRandom.getRandomIntInRange(CORE_TTL_MIN, CORE_TTL_MAX);
       
        // Создаем пул доступных событий
        let availableEvents: any[] = [];
        // Выбираем случайного актора
        const actors = this.ctx.actorEngine.getActorsAll();
        const actor = BarrierRandom.selectRandom(actors);

        // Определяем тип актора
        const actorType = actor.type;
    
        switch (actorType) {
            case ActorType.MILITARY: {
                // Получаем зону актора
                const zone = this.ctx.actorZoneService.getZoneByFactionId(actor.id);
                if (!zone) {
                    console.error('Zone not found for actor:', actor.id);
                    return;
                }

                // Проверяем наличие открытых и фронтовых регионов
                const hasOpenRegions = zone.openRegions.length > 0;
                const hasFrontRegions = zone.frontRegions.length > 0;

                // Добавляем события в пул в зависимости от условий
                if (hasOpenRegions) {
                    // Если есть открытые регионы, добавляем события типа CAPTURE
                    availableEvents.push(...this.ctx.eventEngine.getEventsByActorType(actorType)
                        .filter(event => event.actionType === ActionType.CAPTURE));
                }
                
                if (hasFrontRegions) {
                    // Если есть фронтовые регионы, добавляем события типа WAR
                    availableEvents.push(...this.ctx.eventEngine.getEventsByActorType(actorType)
                        .filter(event => event.actionType === ActionType.WAR));
                }

                // Добавляем дипломатические и шпионские события
                availableEvents.push(
                    ...this.ctx.eventEngine.getEventsByActorType(actorType)
                        .filter(event => 
                            event.actionType === ActionType.DIPLOMACY ||
                            event.actionType === ActionType.ESPIONAGE ||
                            event.actionType === ActionType.WRECKAGE
                        )
                );
                break;
            }
            case ActorType.TERRORIST: {
                // Для террористов добавляем события типа WAR, CAPTURE и WRECKAGE
                availableEvents.push(
                    ...this.ctx.eventEngine.getEventsByActorType(actorType)
                        .filter(event => false) // TODO: Добавить события для террористов
                );
                break;
            }
            case ActorType.CIVILIAN: {
                // Для гражданских добавляем мирные события и торговлю
                availableEvents.push(
                    ...this.ctx.eventEngine.getEventsByActorType(actorType)
                        .filter(event => false) // TODO: Добавить события для гражданских
                );
                break;
            }
        }

        // Всегда добавляем мирные события для всех типов акторов
        availableEvents.push(...this.ctx.eventEngine.getEventsByActorType(actorType)
            .filter(event => event.actionType === ActionType.PEACE));

        if (availableEvents.length > 0) {
            const selectedEvent = BarrierRandom.selectRandom(availableEvents);
            this.ctx.eventEngine.createEventById(selectedEvent.id, actor);
        }
    }
}
