export interface Region {
    id: string;
    title: string;
    status: Status;
}
export type Status = 'war' | 'wreckage' | 'peace';