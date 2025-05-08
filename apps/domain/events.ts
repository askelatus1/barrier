import {BarrierContext, BarrierEvent, Track, Faction} from "../../interfaces";
import {barrierEvent} from "../../dict/barrierEvent";
import {BarrierRandom} from "./random";
import {ActorType, ActorRuleType} from "../../dict/constants";

export class EventEngine {
    constructor(private ctx: BarrierContext) {
        ctx.eventEngine = this;
    }

    createEventById(id: string, initializer: Faction): void {
        const event = this.getEventById(id);
        if (!event) {
            throw new Error(`Event ${id} not found`);
        }
        this.ctx.tracker.trackEvent(event, initializer);
    }

    getEventById(id: string): BarrierEvent | undefined {
        return barrierEvent.find(event => event.id === id);
    }

    getEventByTrack(track: Track): BarrierEvent {
        return this.getEventById(track.eventId);
    }

    /**
     * Получает все доступные события
     * @returns Массив всех событий
     */
    getAllEvents(): BarrierEvent[] {
        return [...barrierEvent];
    }

    /**
     * Получает события по типу актора
     * @param actorType Тип актора
     * @returns Массив событий для указанного типа актора
     */
    getEventsByActorType(type: ActorType): BarrierEvent[] {
        return barrierEvent.filter(event => {
            const targetActorRule = event.actorRule[0] ?? ActorRuleType.NONE;
            switch(targetActorRule) {
                case ActorRuleType.MILITARY:
                    return type === ActorType.MILITARY;
                case ActorRuleType.CIVILIAN:
                    return type === ActorType.CIVILIAN;
                case ActorRuleType.TERRORIST:
                    return type === ActorType.TERRORIST;
                case ActorRuleType.ARMORED:
                    return type === ActorType.MILITARY || type === ActorType.TERRORIST;
                case ActorRuleType.ALL:
                    return true;
                case ActorRuleType.NONE:
                    return false;
                default:
                    return false;
            }
        });
    }

    /**
     * Получает случайное событие по типу актора
     * @param actorType Тип актора
     * @returns Случайное событие для указанного типа актора
     */
    getRandomEventByActorType(actorType: ActorType): BarrierEvent {
        const events = this.getEventsByActorType(actorType);
        return BarrierRandom.selectRandom(events);
    }

    /**
     * Проверяет существование события
     * @param id ID события
     * @returns true если событие существует, false если нет
     */
    hasEvent(id: string): boolean {
        return barrierEvent.some(event => event.id === id);
    }
}
