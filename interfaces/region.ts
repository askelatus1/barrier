export interface Region {
    id: string;
    title: string;
    status: Status;
    neighbour: Region ['id'][]
}
export type Status = 'war' | 'wreckage' | 'peace';