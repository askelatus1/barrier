import { RegionsType } from "../dict/regionMap";
import { RegionStatus } from "../dict/constants";
import { MilitaryFaction } from "./faction";

/**
 * Represents a region in the game world
 */
export interface Region {
    /**
     * Unique identifier of the region
     */
    id: RegionsType;

    /**
     * Display name of the region
     */
    title: string;

    /**
     * Current status of the region
     */
    status: RegionStatus;

    /**
     * Array of neighboring region IDs
     */
    neighbour: RegionsType[];

    /**
     * Military faction controlling the region, or null if uncontrolled
     */
    faction: MilitaryFaction | null;
}
