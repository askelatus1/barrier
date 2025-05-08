import {Faction} from "../../../interfaces";
import {ActorType} from "../../../dict/constants";

export function getMilitary(actors: Faction[]): Faction[] {
    return actors.filter(actor => actor.type === ActorType.MILITARY);
}

export function getCivilian(actors: Faction[]): Faction[] {
    return actors.filter(actor => actor.type === ActorType.CIVILIAN);
}

export function getTerrors(actors: Faction[]): Faction[] {
    return actors.filter(actor => actor.type === ActorType.TERRORIST);
}
