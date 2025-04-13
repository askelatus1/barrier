import {Faction} from "./faction";

export interface Relation {
    id: number;
    side1: Faction['id'];
    side2: Faction['id'];
    status: RelationStatus
}

export type RelationStatusType = 'war' | 'friendship' | 'neutral';

export interface RelationStatus {
    id: RelationStatusType;
    title: string;
}


