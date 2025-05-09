import { Subject } from "rxjs";
import {BarrierContext, Track} from "../../interfaces";
import {NotifyTemplate, NotifyMode} from "../../interfaces/notify";
export class Notifier {
    modes: NotifyMode[];
    telegramMessageBus$: Subject<string> = new Subject<string>();
    private subscription: any;

    constructor(private ctx: BarrierContext, modes: NotifyMode[] = ['console']) {
        ctx.notifier = this;
        this.modes = modes;
        if(this.modes.includes('telegram')){
            this.subscription = this.telegramMessageBus$.subscribe((msg) => this.ctx.telegramBot.sendMessage(msg));
        }
    }

    notify(track: Track, tpl: keyof NotifyTemplate = 'start') {
        let text: string | undefined;
        const event = this.ctx.eventEngine.getEventByTrack(track);

        if (!event) {
            console.error('Event not found for track:', track);
            return;
        }

        switch (tpl) {
            case 'start':
                text = event?.notify?.['start']?.(this.ctx, track) ?? `Новое событие: ${event?.title ?? 'нет описания'}`;
                break;
            case 'resolve':
                text = event?.notify?.['resolve']?.(this.ctx, track) ?? `Событие ${event?.title} завершено`;
                break;
            case 'reject':
                text = event?.notify?.['reject']?.(this.ctx, track) ?? `Событие ${event?.title} провалено`;
                break;
        }

        if (!text) return;

        this.modes.forEach(mode => {
            switch (mode) {
                case 'console':
                    console.log('Noty: ', text);
                    break;
                case 'telegram':
                    this.telegramMessageBus$.next(text);
                    break;
                default:
                    break;
            }
        });
    }

    cleanup() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.telegramMessageBus$.complete();
        console.log('Notifier cleanup completed');
    }
}
