import {BarrierEvent} from "./event";
import { NotifyTemplate } from "./notify";

export interface Step extends BarrierEvent {
    type: 'step';
    final: boolean;
    notify?: NotifyTemplate
    timeout: number;
}
