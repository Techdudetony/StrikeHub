export const average = (nums=[]) => nums.length ? Math.round(nums.reduce((a,b) => a+b,0)/nums.length) : 0
export const high = (nums=[]) => nums.length ? Math.max(...nums) : 0

export function seriesAverage(games) {
    return average(games.map(g=>g.score))
}