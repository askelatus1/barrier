import {BarrierContext} from "./context";
import {Track} from "./track";
import {NotifyType} from "../dict/constants";

export type NotifyGenerator = (ctx: BarrierContext, track: Track) => string;

export interface NotifyTemplate {
    start?: NotifyGenerator;
    resolve?: NotifyGenerator;
    reject?: NotifyGenerator;
}

export interface INotifier {
    /**
     * Уведомляет о событии
     * @param track Трек события
     * @param type Тип уведомления
     */
    notify(track: Track, type: NotifyType): void;
}
