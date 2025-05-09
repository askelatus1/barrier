import {BarrierContext} from "./context";
import {Track} from "./track";
import {NotifyType} from "../dict/constants";

// Тип режима уведомлений
export type NotifyMode = 'console' | 'telegram';

export type NotifyGenerator = (ctx: BarrierContext, track: Track) => string;

export interface NotifyTemplate {
    start?: NotifyGenerator;
    resolve?: NotifyGenerator;
    reject?: NotifyGenerator;
}

export interface INotifier {
    // Режимы уведомлений
    modes: NotifyMode[];
    
    /**
     * Уведомляет о событии
     * @param track Трек события
     * @param type Тип уведомления
     */
    notify(track: Track, type: NotifyType): void;

}
