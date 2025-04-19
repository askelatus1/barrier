import {BarrierEvent} from "./event";
import {Faction} from "./faction";
import {Region} from "./region";
import {Step} from "./steps";

export interface Track {
    id: string;
    eventId: BarrierEvent["id"];
    actors: Faction[];
    territory: Region;
    timeout: number;
}

export type EnhancedTrack = Track & {
    scheduler: NodeJS.Timeout;
    steps: Step[];
}
