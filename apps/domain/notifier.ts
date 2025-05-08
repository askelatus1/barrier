import {BarrierContext, Track} from "../../interfaces";
import {NotifyTemplate} from "../../interfaces/notify";

export type NotifyMode = 'console' | 'telegram'
export class Notifier {
    modes: NotifyMode[];
    constructor(private ctx: BarrierContext, modes: NotifyMode[] = ['console']) {
        ctx.notifier = this;
        this.modes = modes;
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

        this.modes.forEach(mode => {
            switch (mode) {
                case 'console':
                    console.log('Noty: ', text);
                    break;
                case 'telegram':
                    break;
                default:
                    break;
            }
        });
    }
}
