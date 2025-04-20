import {BarrierEvent} from "./event";
import {EventType} from "../dict/constants";

export interface Step extends BarrierEvent {
    type: EventType.STEP;
    final: boolean;
    timeout: number;
}
