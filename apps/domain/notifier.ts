import {BarrierContext, BarrierEvent, Track} from "../../interfaces";
import {NotifyTemplate} from "../../interfaces/notify";

export type NotifyMode = 'console' | 'telegram'
export class Notifier {
    modes: NotifyMode[];
    constructor(private ctx: BarrierContext, modes: NotifyMode[] = ['console']) {
        ctx.notifier = this;
        this.modes = modes;
    }

    notify(payload: Track | BarrierEvent, tpl: keyof NotifyTemplate = 'start') {
        let text: string | undefined;
        const track: Track = isTrackGuard(payload) ? payload : undefined;
        const event: BarrierEvent = track ? this.ctx.eventEngine.getEventByTrack(track) : isEventGuard(payload) ? payload : undefined;
        switch (tpl) {
            case 'start':
                text = (track && event?.notify?.['start']?.(this.ctx, track)) ?? `Новое событие: ${event?.title ?? 'нет описания'}`;
                break;
            case 'resolve':
                text = (track && event?.notify?.['resolve']?.(this.ctx, track)) ?? `Событие ${event?.title} завершено`
                break;
            case 'reject':
                text = (track && event?.notify?.['reject']?.(this.ctx, track)) ?? `Событие ${event?.title} провалено`
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
        })
    }
}

function isTrackGuard(payload: unknown): payload is Track {
    return !!(payload as Track).eventId;
}

function isEventGuard(payload: unknown): payload is BarrierEvent {
    return (payload as BarrierEvent).type === 'event' || (payload as BarrierEvent).type === 'step';
}
