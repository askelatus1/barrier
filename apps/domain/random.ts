export class BarrierRandom {

    static getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    static selectRandom<T = unknown>(list: T[]): T {
        return this.selectRandomUniq(list, 1)[0];
    }

    static selectRandomUniq<T = unknown>(list: T[], count: number): T[] {
        if (count >= list.length) return list;
        const result = [];
        for (let i = 0; i < count; i++) {
            const virtualList = [...list.filter((item) => !result.includes(item))];
            result.push(virtualList[this.getRandomInt(virtualList.length)]);
        }
        return result;
    }
}
