import {BarrierEvent} from "../interfaces";
import {barrierEvent} from "./barrierEvent";
import {additionalBarrierEvents} from "./additionalBarrierEvents";
import {additionalBarrierEvents2} from "./additionalBarrierEvents2";
import {additionalBarrierEvents3} from "./additionalBarrierEvents3";
import {captureBarrierEvents} from "./captureBarrierEvents";
import { wreckageBarrierEvents } from "./wreckageBarrierEvents";

export const allBarrierEvents: BarrierEvent[] = [
    ...barrierEvent,
    ...additionalBarrierEvents,
    ...additionalBarrierEvents2,
    ...additionalBarrierEvents3,
    ...captureBarrierEvents,
    ...wreckageBarrierEvents
]; 