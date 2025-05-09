import { Telegraf, Context as TelegrafContext } from 'telegraf';
import { BarrierContext } from '../../interfaces';

export class TelegramBot {
  private bot: Telegraf;
  private ctx: BarrierContext;
  private notificationChatId: number | null = null;

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
        '/regions - Информация о регионах\n' +
        '/setnotify - Установить этот чат для получения уведомлений'
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

    // Установка текущего чата для уведомлений
    this.bot.command('setnotify', (ctx) => {
      this.notificationChatId = ctx.chat.id;
      ctx.reply(`Этот чат (ID: ${ctx.chat.id}) будет получать уведомления игровой системы`);
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
  public sendMessage(chatId: number, message: string) {
    this.bot.telegram.sendMessage(chatId, message)
      .catch(error => console.error('Ошибка при отправке сообщения:', error));
  }

  // Запуск бота
  public start() {
    this.bot.launch();
    console.log('Telegram бот запущен');

    // Корректное завершение работы бота при остановке процесса
    process.once('SIGINT', () => this.bot.stop('SIGINT'));
    process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
  }
}
