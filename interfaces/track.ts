import {BarrierEvent} from "./event";

export interface Track {
    id: string;
    timeout: number;
    eventId: BarrierEvent["id"];
}