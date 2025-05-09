import {BarrierContext, MilitaryFaction} from "./interfaces";
import {BarrierTracker, EventEngine, GameCore} from "./apps/domain";
import {Notifier} from "./apps/domain/notifier";
import {ActorEngine} from "./apps/domain/actors";
import {ActorZoneService} from "./apps/domain/actorZone";
import { RegionService } from "./apps/domain/regions";
import { faction } from "./dict/factions";
import { RegionStatus } from "./dict/constants";
import { TelegramBot } from "./apps/bot";
import * as dotenv from 'dotenv';

// Загружаем переменные окружения из .env файла
dotenv.config();

console.log('Engine init');

const ctx: BarrierContext = {
    core: undefined,
    eventEngine: undefined,
    tracker: undefined,
    notifier: undefined,
    actorEngine: undefined,
    regionService: undefined,
    actorZoneService: undefined,
    telegramBot: undefined,
};

new GameCore(ctx, 1000);
new EventEngine(ctx);
new BarrierTracker(ctx);


new RegionService(ctx);
new ActorEngine(ctx);
new ActorZoneService(ctx);

// Инициализируем телеграм-бота, если задан токен в переменных окружения
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_NOTIFICATION_CHAT_ID = process.env.TELEGRAM_NOTIFICATION_CHAT_ID;
if (TELEGRAM_BOT_TOKEN) {
    const telegramBot = new TelegramBot(ctx, TELEGRAM_BOT_TOKEN);
    ctx.telegramBot = telegramBot;
    
    if (TELEGRAM_NOTIFICATION_CHAT_ID) {
        telegramBot.setNotificationChatId(Number(TELEGRAM_NOTIFICATION_CHAT_ID));
    }

    // telegramBot.start();
}
// Создаем Notifier с указанием режимов 'console' и 'telegram'
new Notifier(ctx, 
    [
        'console', 
        // 'telegram'
    ]);

// const actor = ctx.actorEngine.getActorById('sin') as MilitaryFaction;
// const region = ctx.regionService.getRegionById('center');
// region.faction = actor;
// const zone = ctx.actorZoneService.getZoneByFactionId(actor.id);
// ctx.actorZoneService.refreshZone(zone);
// console.log(`regions by faction: ${zone.regions.map(r => r.id)}`);
// zone.regions[0].status = RegionStatus.WRECKAGE;

// ctx.eventEngine.createEventById('air_superiority', actor);

ctx.core.start();

// Добавляем обработчики для корректного завершения всех процессов
const cleanup = () => {
    // Останавливаем основные компоненты
    if (ctx.core) {
        ctx.core.stop();
    }
    
    // Очищаем все треки
    if (ctx.tracker) {
        const tracks = ctx.tracker.getAllTracks();
        if (tracks) {
            tracks.forEach(track => ctx.tracker.stopTrack(track.id));
        }
    }
    
    // Закрываем RxJS подписки
    if (ctx.notifier) {
        ctx.notifier.cleanup();
    }
    
    // Останавливаем телеграм бота только если он был инициализирован
    if (ctx.telegramBot) {
        ctx.telegramBot.stop();
    }
    
    console.log('Все процессы остановлены');
    process.exit(0);
};

process.once('SIGINT', () => {
    console.log('Получен сигнал SIGINT, начинаем корректное завершение...');
    cleanup();
});

process.once('SIGTERM', () => {
    console.log('Получен сигнал SIGTERM, начинаем корректное завершение...');
    cleanup();
});