const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const count = new Intl.NumberFormat("en-US");

export const money = (n: number) => usd.format(n);
/** "$75" rather than "$75.00", for thresholds in running text. */
export const wholeMoney = (n: number) => usd.format(n).replace(/\.00$/, "");
export const number = (n: number) => count.format(n);
export const plural = (n: number, one: string, many = `${one}s`) => `${number(n)} ${n === 1 ? one : many}`;
