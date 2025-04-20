import {BarrierContext, BarrierEvent, Track, Faction} from "../../interfaces";
import {barrierEvent} from "../../dict/barrierEvent";
import {BarrierRandom} from "./random";
import {ActorType} from "../../dict/constants";

export class EventEngine {
    constructor(private ctx: BarrierContext) {
        ctx.eventEngine = this;
    }

    createEvent(): void {
        const targetEvent: BarrierEvent = BarrierRandom.selectRandom(barrierEvent);
        console.log('EventEngine create event', targetEvent.id, targetEvent.title);
        this.ctx.tracker.trackEvent(targetEvent);
    }

    createEventById(id: string): void {
        const ev = barrierEvent.find(event => event.id === id);
        console.log('EventEngine create event manually', ev.id, ev.title);
        this.ctx.tracker.trackEvent(ev);
    }

    getEventById(id: string): BarrierEvent {
        return barrierEvent.find(e => e.id === id);
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
    getEventsByActorType(actorType: ActorType): BarrierEvent[] {
        return barrierEvent.filter(event => 
            event.actorRule.some(rule => rule === actorType)
        );
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

    /**
     * Получает события, доступные для указанных акторов
     * @param actors Массив акторов
     * @returns Массив доступных событий
     */
    getEventsByActors(actors: Faction[]): BarrierEvent[] {
        return barrierEvent.filter(event => {
            const actorTypes = actors.map(actor => {
                switch (true) {
                    case actor.military && actor.terror:
                        return ActorType.TERRORIST;
                    case actor.military:
                        return ActorType.MILITARY;
                    default:
                        return ActorType.CIVILIAN;
                }
            });
            return event.actorRule.every(rule => actorTypes.includes(rule));
        });
    }
}
