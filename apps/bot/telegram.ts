import { Telegraf, Context as TelegrafContext } from 'telegraf';
import { BarrierContext } from '../../interfaces';

const BOT_STOP_TIMEOUT = Number(process.env.BOT_STOP_TIMEOUT) || 5000; // таймаут в миллисекундах

export class TelegramBot {
  private bot: Telegraf;
  private ctx: BarrierContext;
  private notificationChatId: number | null = null;
  private isRunning: boolean = false;

  constructor(ctx: BarrierContext, token: string) {
    this.ctx = ctx;
    this.bot = new Telegraf(token);
    this.setupCommands();
  }

  private setupCommands() {
    // Стартовая команда
    this.bot.command('start', (ctx) => {
      ctx.reply('Добро пожаловать в Barrier! Используйте /help для просмотра доступных команд.');
    });

    // Команда помощи
    this.bot.command('help', (ctx) => {
      ctx.reply(
        'Доступные команды:\n' +
        '/start - Приветствие\n' +
        '/status - Текущий статус игры\n' +
        '/factions - Список фракций\n' +
        '/regions - Информация о регионах'
      );
    });

    // Информация о статусе игры
    this.bot.command('status', (ctx) => {
      const gameInfo = this.getGameStatusInfo();
      ctx.reply(gameInfo);
    });

    // Список фракций
    this.bot.command('factions', (ctx) => {
      const factions = this.getFactionsList();
      ctx.reply(factions);
    });

    // Информация о регионах
    this.bot.command('regions', (ctx) => {
      const regionsInfo = this.getRegionsInfo();
      ctx.reply(regionsInfo);
    });
  }

  // Получение информации о статусе игры
  private getGameStatusInfo(): string {
    // Здесь добавить получение данных из ctx
    return 'Статус игры: активна';
  }

  // Получение списка фракций
  private getFactionsList(): string {
    const actors = this.ctx.actorEngine.getActorsAll();
    if (!actors || actors.length === 0) {
      return 'Нет доступных фракций';
    }
    
    return 'Фракции:\n' + actors.map(actor => `- ${actor.name}`).join('\n');
  }

  // Получение информации о регионах
  private getRegionsInfo(): string {
    const regions = this.ctx.regionService.getRegionsAll();
    if (!regions || regions.length === 0) {
      return 'Нет доступных регионов';
    }
    
    return 'Регионы:\n' + regions.map(region => 
      `- ${region.title}: ${region.status}`
    ).join('\n');
  }

  // Метод для установки чата для уведомлений
  public setNotificationChatId(chatId: number) {
    this.notificationChatId = chatId;
    console.log(`Установлен чат для уведомлений: ${chatId}`);
  }

  // Метод для отправки сообщения конкретному пользователю
  public async sendMessage(message: string) {
    if (this.notificationChatId) {
      try {
        await this.bot.telegram.sendMessage(this.notificationChatId, message);
      } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
      }
    }
  }

  // Запуск бота
  public async start() {
    if (this.isRunning) {
      console.log('Telegram бот уже запущен');
      return;
    }
    
    try {
      // Запускаем бота и проверяем его готовность
      this.bot.launch();
      await this.bot.telegram.getMe();
      
      this.isRunning = true;
      console.log('Telegram бот запущен');
      await this.sendMessage('Telegram бот запущен');
    } catch (error) {
      this.isRunning = false;
      console.error('Ошибка при запуске бота:', error);
      throw error;
    }
  }

  // Остановка бота
  public async stop(signal?: string) {
    console.log('Остановка бота', signal);
    if (!this.isRunning) {
      console.log(`Telegram бот не был запущен${signal ? ` (сигнал: ${signal})` : ''}`);
      return;
    }
    
    try {
      await this.sendMessage('Telegram бот остановлен');
      // Используем Promise.race чтобы не зависнуть, если бот не ответит
      await Promise.race([
        this.bot.stop(signal),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout stopping bot')), BOT_STOP_TIMEOUT))
      ]);
      this.isRunning = false;
      console.log(`Telegram бот остановлен${signal ? ` (сигнал: ${signal})` : ''}`);
    } catch (error) {
      console.error('Ошибка при остановке бота:', error);
      throw error;
    }
  }
}
