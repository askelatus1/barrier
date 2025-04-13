import {BarrierEvent} from "./event";

export interface Track {
    id: string;
    eventId: BarrierEvent["id"];
}