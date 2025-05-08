export enum EventType {
    EVENT = 'event'
}

export enum ActorType {
    MILITARY = 'military',
    CIVILIAN = 'civilian',
    TERRORIST = 'terrorist'
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
    EVENT: 1000
} as const; 