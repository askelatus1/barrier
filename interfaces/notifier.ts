import {BarrierEvent} from "./event";
import {Track} from "./track";
import {NotifyType} from "../dict/constants";

export interface INotifier {
    /**
     * Уведомляет о событии
     * @param event Событие
     * @param type Тип уведомления
     */
    notify(event: BarrierEvent | Track, type: NotifyType): void;
} 