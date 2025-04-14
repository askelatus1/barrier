import {Faction} from "../../../interfaces";

export function getMilitary(actors: Faction[]): Faction[] {
    return actors.filter(actor => actor.military);
}

export function getCivilian(actors: Faction[]): Faction[] {
    return actors.filter(actor => !actor.military);
}
