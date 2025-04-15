import {BarrierEvent} from "./event";
import {Faction} from "./faction";
import {Region} from "./region";

export interface Track {
    id: string;
    eventId: BarrierEvent["id"];
    actors: Faction[];
    territory: Region;
    timeout: number;
}
