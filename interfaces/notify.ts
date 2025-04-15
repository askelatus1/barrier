import {BarrierContext} from "./core";

export type NotifyGenerator = (ctx: BarrierContext, payload: unknown) => string;

export interface NotifyTemplate {
    start?: NotifyGenerator;
    end?: NotifyGenerator;
}
