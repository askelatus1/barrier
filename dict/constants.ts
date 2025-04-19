export enum EventType {
    EVENT = 'event',
    STEP = 'step'
}

export enum ActorType {
    MILITARY = 'military',
    CIVILIAN = 'civilian'
}

export enum TerritoryRuleType {
    INITIATOR = 'initiator',
    VICTIM = 'victim',
    BOTH = 'both'
}

export enum RegionStatus {
    WAR = 'war',
    WRECKAGE = 'wreckage',
    PEACE = 'peace'
}

export enum NotifyType {
    START = 'start',
    RESOLVE = 'resolve',
    REJECT = 'reject'
}

export const TIMEOUTS = {
    DEFAULT: 1000,
    STEP: 1000,
    EVENT: 1000
} as const; 