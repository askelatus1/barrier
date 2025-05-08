import {BarrierContext, BarrierEvent, Track, Faction, Region} from "../../interfaces";
import {getTerritoryByRule} from "./rules/territoryRule";
import {BarrierRandom} from "./random";
import {TIMEOUTS, ActorType, NotifyType, RegionStatus} from "../../dict/constants";
import {ActionType} from "../../interfaces/event";

/**
 * Трекер событий игры. Отслеживает и управляет жизненным циклом событий.
 */
export class BarrierTracker {
    private pool: Map<string, Track> = new Map();

    constructor(private ctx: BarrierContext, private timeoutRange = TIMEOUTS.DEFAULT) {
        ctx.tracker = this;
    }

    /**
     * Получает список акторов из соседних регионов
     * @param rule Тип актора (военный/гражданский)
     * @param firstActor Первый актор, относительно которого ищутся соседи
     * @returns Массив акторов из соседних регионов
     */
    private getNeighbourActors(rule: ActorType, firstActor: Faction): Faction[] {
        if (!firstActor) {
            console.warn('First actor is undefined');
            return [];
        }

        const actorZone = this.ctx.actorZoneService.getZoneByFactionId(firstActor.id);
        if (!actorZone) {
            console.warn(`Actor zone not found for faction ${firstActor.id}`);
            return [];
        }

        return this.ctx.actorZoneService.getNeighbourActorsByType(actorZone, rule);
    }

    /**
     * Начинает отслеживание нового события
     * @param event Событие для отслеживания
     * @throws Error если не удалось создать трек
     */
    trackEvent(event: BarrierEvent, initializer: Faction): void {
        try {
            const firstActor = initializer;
            if (!firstActor) {
                throw new Error('No initializer available');
            }
            
            // Определяем территорию в зависимости от типа события
            let territory: Region;
            let secondActor: Faction | undefined;
            
            switch (event.actionType) {
                case ActionType.CAPTURE:
                    // Для захвата используем открытые регионы из зоны актора
                    const actorZone = this.ctx.actorZoneService.getZoneByFactionId(firstActor.id);
                    if (!actorZone) {
                        throw new Error(`Actor zone not found for faction ${firstActor.id}`);
                    }
                    
                    const openRegions = this.ctx.actorZoneService.getOpenRegions(actorZone);
                    if (openRegions.length === 0) {
                        throw new Error(`No open regions available for faction ${firstActor.id}`);
                    }
                    
                    // Выбираем случайный открытый регион
                    territory = openRegions[BarrierRandom.getRandomInt(openRegions.length)];
                    break;
                
                case ActionType.WAR:
                    // Для войны используем фронтовые регионы из зоны актора
                    const warActorZone = this.ctx.actorZoneService.getZoneByFactionId(firstActor.id);
                    if (!warActorZone) {
                        throw new Error(`Actor zone not found for faction ${firstActor.id}`);
                    }
                    
                    const frontRegions = this.ctx.actorZoneService.getFrontRegions(warActorZone);
                    if (frontRegions.length === 0) {
                        throw new Error(`No front regions available for faction ${firstActor.id}`);
                    }
                    
                    // Выбираем случайный фронтовой регион
                    territory = frontRegions[BarrierRandom.getRandomInt(frontRegions.length)];
                    secondActor = territory.faction;
                    
                    // Устанавливаем статус WAR для территории
                    this.ctx.regionService.updateRegionStatus(territory.id, RegionStatus.WAR);
                    break;
                
                default:
                    // Для других типов событий используем стандартную логику территориальных правил
                    const secondRule = event.actorRule[1];
                    const neighbourActors = this.getNeighbourActors(secondRule, firstActor);
                    if (neighbourActors.length === 0) {
                        throw new Error(`No available neighbour actors for rule ${secondRule}`);
                    }
                    
                    secondActor = neighbourActors[BarrierRandom.getRandomInt(neighbourActors.length)];
                    const actorRegions = [firstActor.baseRegion, secondActor.baseRegion];
                    territory = getTerritoryByRule(actorRegions, event.territoryRule);
                    break;
            }
            
            /**
             * @todo: Логика определения второго актора для CAPTURE и WAR событий
             * - Если территория принадлежит другой фракции, использовать её
             * - Иначе искать актора в соседних регионах
             */
            // // Для CAPTURE и WAR событий - определяем второго актора если он еще не определен
            // if (!secondActor) {
            //     const secondRule = event.actorRule[1];
                
            //     if (territory.faction && territory.faction.id !== firstActor.id) {
            //         // Если территория принадлежит другой фракции, используем её
            //         secondActor = territory.faction;
            //     } else {
            //         // Иначе ищем актора в соседних регионах
            //         const neighbourActors = this.getNeighbourActors(secondRule, firstActor);
            //         if (neighbourActors.length === 0) {
            //             throw new Error(`No available neighbour actors for rule ${secondRule}`);
            //         }
            //         secondActor = neighbourActors[BarrierRandom.getRandomInt(neighbourActors.length)];
            //     }
            // }
            
            const actors = [firstActor, secondActor].filter(Boolean);
            if (actors.length !== 2) {
                throw new Error('Failed to create track: not enough actors');
            }
            
            const track: Track = {
                id: crypto.randomUUID(),
                eventId: event.id,
                timeout: BarrierRandom.getRandomInt(this.timeoutRange),
                territory,
                actors
            };
            
            this.#addTrack(track);
            console.log('createTrack by event: ', track, event);
            this.ctx.notifier.notify(track, NotifyType.START);
        } catch (error) {
            console.error('Failed to track event:', error);
            throw error;
        }
    }

    getTracksByEvent(event: BarrierEvent): Track[] {
        return [...this.pool.values()].filter(t => t.eventId === event.id)
    }

    #addTrack(track: Track) {
        const targetTrack: Track = {...track};
        targetTrack.scheduler = setTimeout(() => this.#handleTrackCompletion(targetTrack), track.timeout ?? this.timeoutRange);
        this.pool.set(targetTrack.id, targetTrack);
    }

    #removeTrack(track: Track) {
        console.log('remove track: ', track);
        this.pool.delete(track.id);
    }

    #handleTrackCompletion(track: Track) {
        console.log('Tracker: completing track: ', track.id);
        
        // Randomly choose between resolve and reject
        const status = BarrierRandom.getRandomInt(2) === 0 ? 'resolve' : 'reject';
        track.status = status;
        
        const notifyType = status === 'resolve' ? NotifyType.RESOLVE : NotifyType.REJECT;
        console.log('track ending with status: ', status);
        this.ctx.notifier.notify(track, notifyType);
        this.#removeTrack(track);
    }

    /**
     * Получает все активные треки
     * @returns Массив активных треков
     */
    getAllTracks(): Track[] {
        return [...this.pool.values()];
    }

    /**
     * Останавливает и удаляет все активные треки
     */
    clearAllTracks(): void {
        this.getAllTracks().forEach(track => {
            if (track.scheduler) {
                clearTimeout(track.scheduler);
            }
            this.#removeTrack(track);
        });
    }

    /**
     * Принудительно останавливает трек
     * @param trackId ID трека для остановки
     * @throws Error если трек не найден
     */
    stopTrack(trackId: string): void {
        const track = this.pool.get(trackId);
        if (!track) {
            throw new Error(`Track with id ${trackId} not found`);
        }
        if (track.scheduler) {
            clearTimeout(track.scheduler);
        }
        this.#removeTrack(track);
    }

    /**
     * Проверяет статус трека
     * @param trackId ID трека
     * @returns true если трек активен, false если нет
     */
    isTrackActive(trackId: string): boolean {
        return this.pool.has(trackId);
    }

    /**
     * Получает количество активных треков
     * @returns Количество активных треков
     */
    getActiveTracksCount(): number {
        return this.pool.size;
    }
}
