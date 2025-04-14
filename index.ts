import {BarrierContext} from "./interfaces";
import {BarrierRandom, BarrierTracker, EventEngine, GameCore} from "./apps/domain";
import {Notifier} from "./apps/domain/notifier";

console.log('Engine init');

const ctx: BarrierContext = {
    core: undefined,
    eventEngine: undefined,
    tracker: undefined,
    random: undefined,
    notifier: undefined,
};

new GameCore(ctx, 5000);
new EventEngine(ctx);
new BarrierTracker(ctx);
new BarrierRandom(ctx);
new Notifier(ctx);

console.log('random: ', ctx.random.selectRandomUniq([1,2,3,4,5,6,7,8,9], 3));
console.log('random: ', ctx.random.selectRandomUniq([1,2,3,4,5,6,7,8,9], 3));
console.log('random: ', ctx.random.selectRandomUniq([1,2,3,4,5,6,7,8,9], 3));
console.log('random: ', ctx.random.selectRandomUniq([1,2,3,4,5,6,7,8,9], 3));
console.log('random: ', ctx.random.selectRandomUniq([1,2,3,4,5,6,7,8,9], 3));
console.log('random: ', ctx.random.selectRandomUniq([1,2,3,4,5,6,7,8,9], 3));
console.log('randomItem: ', ctx.random.selectRandom([1,2,3,4,5,6,7,8,9]));
console.log('randomItem: ', ctx.random.selectRandom([1,2,3,4,5,6,7,8,9]));
console.log('randomItem: ', ctx.random.selectRandom([1,2,3,4,5,6,7,8,9]));
console.log('randomItem: ', ctx.random.selectRandom([1,2,3,4,5,6,7,8,9]));
console.log('randomItem: ', ctx.random.selectRandom([1,2,3,4,5,6,7,8,9]));
console.log('randomItem: ', ctx.random.selectRandom([1,2,3,4,5,6,7,8,9]));
console.log('randomItem: ', ctx.random.selectRandom([1,2,3,4,5,6,7,8,9]));
console.log('randomItem: ', ctx.random.selectRandom([1,2,3,4,5,6,7,8,9]));

