import {BarrierContext, BarrierEvent, Track, Faction} from "../../interfaces";
import {allBarrierEvents} from "../../dict/allBarrierEvents";
import {BarrierRandom} from "./random";
import {ActorType} from "../../dict/constants";

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
        return allBarrierEvents.find(event => event.id === id);
    }

    getEventByTrack(track: Track): BarrierEvent {
        return this.getEventById(track.eventId);
    }

    /**
     * Получает все доступные события
     * @returns Массив всех событий
     */
    getAllEvents(): BarrierEvent[] {
        return [...allBarrierEvents];
    }

    /**
     * Получает события по типу актора
     * @param actorType Тип актора
     * @returns Массив событий для указанного типа актора
     */
    getEventsByActorType(type: ActorType): BarrierEvent[] {
        return allBarrierEvents.filter(event => {
            const [initiatorRule] = event.actorRule;
            const validActors = this.ctx.actorEngine.getActorsByRule(initiatorRule);
            return validActors.some(actor => actor.type === type);
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
        return allBarrierEvents.some(event => event.id === id);
    }
}
