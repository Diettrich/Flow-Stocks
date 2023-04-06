import { StockPrice } from "@/databaseClient";

export function getBestTransactionFromStockPrices(
  stockPrices: StockPrice[]
): [StockPrice, StockPrice] {
  if (stockPrices.length < 1) {
    throw new Error("Not enough stock prices to calculate a transaction");
  }

  if (stockPrices.length === 1) {
    return [stockPrices[0], stockPrices[0]];
  }

  if (stockPrices.length === 2) {
    if (
      stockPrices[0].highestPriceOfTheDay > stockPrices[1].highestPriceOfTheDay
    ) {
      return [stockPrices[0], stockPrices[0]];
    }
    return [stockPrices[0], stockPrices[1]];
  }

  let bestBuy: StockPrice = stockPrices[0];
  let bestSell: StockPrice = stockPrices[1];
  let bestProfit: number =
    bestSell.highestPriceOfTheDay - bestBuy.lowestPriceOfTheDay;

  for (let i = 0; i < stockPrices.length; i++) {
    for (let j = i + 1; j < stockPrices.length; j++) {
      const profit: number =
        stockPrices[j].highestPriceOfTheDay -
        stockPrices[i].lowestPriceOfTheDay;
      if (profit > bestProfit) {
        bestBuy = stockPrices[i];
        bestSell = stockPrices[j];
        bestProfit = profit;
      }
    }
  }

  return [bestBuy, bestSell];
}
