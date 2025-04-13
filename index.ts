import {BarrierContext} from "./interfaces/core";
import {BarrierRandom, BarrierTracker, EventEngine, GameCore} from "./apps/domain";

console.log('Engine init');

const ctx: BarrierContext = {
    core: undefined,
    eventEngine: undefined,
    tracker: undefined,
    random: undefined,
};

new GameCore(ctx, 5000);
new EventEngine(ctx);
new BarrierTracker(ctx);
new BarrierRandom(ctx);

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

