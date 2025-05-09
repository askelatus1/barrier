import {BarrierContext} from "./interfaces";
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
    telegramBot.start();
    
    if (TELEGRAM_NOTIFICATION_CHAT_ID) {
        telegramBot.setNotificationChatId(Number(TELEGRAM_NOTIFICATION_CHAT_ID));
    }
}
// Создаем Notifier с указанием режимов 'console' и 'telegram'
new Notifier(ctx, ['console', 'telegram']);

// const actor = ctx.actorEngine.getActorById('skyline');
// const zone = ctx.actorZoneService.getZoneByFactionId(actor.id);
// console.log(`regions by faction: ${zone.regions.map(r => r.id)}`);
// zone.regions[0].status = RegionStatus.WRECKAGE;

// ctx.eventEngine.createEventById('restore_residential_area', actor);

ctx.core.start();