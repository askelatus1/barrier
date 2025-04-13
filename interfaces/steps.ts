import {BarrierEvent} from "./event";

export interface Step extends BarrierEvent {
    type: 'step';
    final: boolean;
    timeout: number;
}