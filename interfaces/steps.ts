import {BarrierEvent} from "./event";

export interface Steps extends BarrierEvent {
    type: 'step';
    final: boolean;
}