import {BarrierEvent} from "./event";
import {Faction} from "./faction";

export interface Track {
    id: string;
    eventId: BarrierEvent["id"];
    actors: Faction[];
}
