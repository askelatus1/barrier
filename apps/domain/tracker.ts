import {BarrierContext, BarrierEvent, Track, Faction, Region, MilitaryFaction} from "../../interfaces";
import {getTerritoryByRule} from "./rules/territoryRule";
import {BarrierRandom} from "./random";
import {TIMEOUTS, ActorType, NotifyType, RegionStatus, ActorRuleType, TerritoryRuleType} from "../../dict/constants";
import {ActionType} from "../../interfaces/event";
import {getRegionByFaction} from "./rules/territoryRule";

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
        let firstActor = initializer;
        let secondActor: Faction | undefined;
        let territory: Region | undefined;
        
        try {
            if (!firstActor) {
                throw new Error('No initializer available');
            }
            
            // Определяем территорию в зависимости от типа события
            switch (event.actionType) {
                case ActionType.CAPTURE:
                    const actorZone = this.ctx.actorZoneService.getZoneByFactionId(firstActor.id);
                    if (!actorZone) {
                        throw new Error(`Actor zone not found for faction ${firstActor.id}`);
                    }

                    // Получаем пустые соседние регионы
                    const emptyNeighbourRegions = this.ctx.actorZoneService.getEmptyNeighbourRegions(actorZone);
                    if (emptyNeighbourRegions.length === 0) {
                        console.warn(`No wreckage regions available for faction ${firstActor.id}, skipping turn`);
                        return;
                    }
                    
                    // Выбираем случайный пустой соседний регион
                    territory = emptyNeighbourRegions[BarrierRandom.getRandomInt(emptyNeighbourRegions.length)];
                    break;
                
                case ActionType.WAR:
                    // Для войны используем фронтовые регионы из зоны актора
                    const warActorZone = this.ctx.actorZoneService.getZoneByFactionId(firstActor.id);
                    if (!warActorZone) {
                        throw new Error(`Actor zone not found for faction ${firstActor.id}`);
                    }
                    
                    const frontRegions = this.ctx.actorZoneService.getFrontRegions(warActorZone);
                    if (frontRegions.length === 0) {
                        console.warn(`No front regions available for faction ${firstActor.id}, skipping turn`);
                        return;
                    }
                    
                    // Выбираем случайный фронтовой регион
                    territory = frontRegions[BarrierRandom.getRandomInt(frontRegions.length)];
                    secondActor = territory.faction;
                    
                    // Устанавливаем статус WAR для территории
                    this.ctx.regionService.updateRegionStatus(territory.id, RegionStatus.WAR);
                    break;
                
                case ActionType.WRECKAGE:
                    // Для WRECKAGE ищем регионы с типом WRECKAGE среди соседей или в зоне инициатора
                    const wreckageZone = this.ctx.actorZoneService.getZoneByFactionId(firstActor.id);
                    if (!wreckageZone) {
                        throw new Error(`Actor zone not found for faction ${firstActor.id}`);
                    }

                    // Получаем все регионы в зоне актора с типом WRECKAGE
                    const zoneWreckageRegions = this.ctx.actorZoneService.getRegionsByTerritoryRule(wreckageZone, TerritoryRuleType.WRECKAGE);
                    
                    // Получаем соседние регионы с типом WRECKAGE
                    const neighbourWreckageRegions = this.ctx.actorZoneService.getNeighbourRegionsByTerritoryRule(wreckageZone, TerritoryRuleType.WRECKAGE);
                    
                    // Объединяем регионы и выбираем случайный
                    const availableWreckageRegions = [...zoneWreckageRegions, ...neighbourWreckageRegions];
                    if (availableWreckageRegions.length === 0) {
                        console.warn(`No wreckage regions available for faction ${firstActor.id}, skipping turn`);
                        return;
                    }
                    
                    territory = availableWreckageRegions[BarrierRandom.getRandomInt(availableWreckageRegions.length)];
                    secondActor = territory.faction ?? territory ? BarrierRandom.selectRandom(this.ctx.actorEngine.getActorsByBaseRegion(territory.id)) : undefined;
                    break;

                case ActionType.PEACE:
                    let availableRegions: Region[] = [];

                    if (firstActor.type === ActorType.MILITARY) {
                        // Для военных фракций
                        const zone = this.ctx.actorZoneService.getZoneByFactionId(firstActor.id);
                        if (!zone) {
                            throw new Error(`Zone not found for military faction ${firstActor.id}`);
                        }
                        availableRegions = this.ctx.actorZoneService.getNeighbourRegions(zone);
                    } else {
                        // Для не военных фракций
                        const baseRegion = this.ctx.regionService.getRegionById(firstActor.baseRegion);
                        if (!baseRegion) {
                            throw new Error(`Base region not found for faction ${firstActor.id}`);
                        }
                        availableRegions = this.ctx.regionService.getNeighbourRegions(baseRegion.id);
                    }

                    if (availableRegions.length === 0) {
                        console.warn(`No available regions for faction ${firstActor.id}, skipping turn`);
                        return;
                    }

                    // Если нет второго правила, просто выбираем случайный регион
                    if (!event.actorRule[1]) {
                        territory = BarrierRandom.selectRandom(availableRegions);
                        break;
                    }

                    // Для каждого региона получаем подходящих акторов
                    const availableActors = new Set<Faction>();
                    availableRegions.forEach(region => {
                        const actors = this.ctx.actorEngine.filterActorsByRule(this.ctx.actorEngine.getActorsByRegion(region), event.actorRule[1]);
                        actors.forEach(actor => availableActors.add(actor));
                    });
                

                    if (availableActors.size === 0) {
                        console.warn(`No regions with suitable actors found for rule ${event.actorRule[1]}, skipping turn`);
                        return;
                    }

                    // Выбираем случайного актора из доступных
                    secondActor = BarrierRandom.selectRandom([...availableActors]);
                    territory = BarrierRandom.selectRandom(this.ctx.regionService.getRegionsByFaction(secondActor.id));
                    
                    if (!territory) {
                        console.warn(`No territory found for selected actor ${secondActor?.id}, skipping turn`);
                        return;
                    }
                    
                    break;

                case ActionType.TRADE:
                case ActionType.DIPLOMACY:
                case ActionType.ESPIONAGE: {
                    // Для остальных событий используем стандартную логику территориальных правил
                    const secondRule = event.actorRule[1];
                    if (!secondRule) {
                        console.warn(`No second actor rule for event ${event.id}, skipping turn`);
                        return;
                    }

                    // Получаем всех возможных акторов из всех регионов
                    const allRegions = this.ctx.regionService.getRegionsAll();
                    const allActors = allRegions.flatMap(region => this.ctx.actorEngine.getActorsByRegion(region));

                    // Фильтруем дубликаты и исключаем инициатора
                    const uniqueActors: Faction[] = [...new Map(allActors.map(actor => [actor.id, actor])).values()]
                        .filter(actor => actor.id !== firstActor.id);

                    // Применяем правило для выбора подходящего актора
                    const suitableActors = this.ctx.actorEngine.filterActorsByRule(uniqueActors, secondRule);
                    
                    if (suitableActors.length === 0) {
                        console.warn(`No suitable actors found for rule ${secondRule}, skipping turn`);
                        return;
                    }

                    // Выбираем случайного подходящего актора
                    secondActor = BarrierRandom.selectRandom(suitableActors);
                    
                    // Определяем территорию в зависимости от типа выбранного актора
                    if (secondActor.type === ActorType.MILITARY) {
                        const secondActorZone = this.ctx.actorZoneService.getZoneByFactionId(secondActor.id);
                        if (!secondActorZone || secondActorZone.regions.length === 0) {
                            console.warn(`No regions found in zone for military faction ${secondActor.id}, skipping turn`);
                            return;
                        }
                        territory = BarrierRandom.selectRandom(secondActorZone.regions);
                    } else {
                        territory = this.ctx.regionService.getRegionById(secondActor.baseRegion);
                        if (!territory) {
                            console.warn(`Base region not found for faction ${secondActor.id}, skipping turn`);
                            return;
                        }
                    }
                    break;
                }
            }
            
            const actors = [firstActor, secondActor].filter(Boolean);
            if((event.actorRule?.length ?? 0) !== actors.length ) {
                console.warn(`Invalid number of actors for event ${event.id}, expected ${event.actorRule?.length ?? 0}, got ${actors.length}`);
                return;
            }
           
            const track: Track = {
                id: crypto.randomUUID(),
                eventId: event.id,
                timeout: BarrierRandom.getRandomInt(this.timeoutRange),
                territory,
                actors
            };
            
            this.#addTrack(track);
        } catch (error) {
            console.error('Failed to track event:', {
                error: error.message,
                stack: error.stack,
                eventId: event?.id,
                firstActor: firstActor?.id,
                secondActor: secondActor?.id,
                territory: territory?.id
            });
            // Пропускаем ход при ошибке
            console.warn('Skipping turn due to tracking error');
            return; // Выходим из функции без выброса ошибки
        }
    }

    getTracksByEvent(event: BarrierEvent): Track[] {
        return [...this.pool.values()].filter(t => t.eventId === event.id)
    }

    #addTrack(track: Track) {
        const targetTrack: Track = {...track};
        targetTrack.scheduler = setTimeout(() => this.#handleTrackCompletion(targetTrack), track.timeout ?? this.timeoutRange);
        this.pool.set(targetTrack.id, targetTrack);
        this.ctx.notifier.notify(track, NotifyType.START);
    }

    #removeTrack(track: Track) {
        this.pool.delete(track.id);
    }

    #handleTrackCompletion(track: Track) {
        // Randomly choose between resolve and reject
        const status = BarrierRandom.getRandomInt(2) === 0 ? 'resolve' : 'reject';
        track.status = status;
        const actor = track.actors[0];
        
        const notifyType = status === 'resolve' ? NotifyType.RESOLVE : NotifyType.REJECT;
        // Для события захвата при успешном выполнении устанавливаем фракцию
        const event = this.ctx.eventEngine.getEventById(track.eventId);
        if (event?.actionType === ActionType.CAPTURE && status === 'resolve' && track.territory) {
            // Инициализируем фракцию в регионе
            const initiator = track.actors[0];
            if (initiator) {
                this.ctx.regionService.setFactionToRegion(track.territory.id, initiator as MilitaryFaction);
                this.ctx.actorZoneService.refreshZone(this.ctx.actorZoneService.getZoneByFactionId(actor.id));                
            }
        }
        console.log(`track ${track.id} ending with status: ${status}`);
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
