import { StockPrice } from '@/databaseClient';
import { BestTransaction, PersonProfitData } from '@/types';

export function getBestTransactionFromStockPrices(
  stockPrices: StockPrice[]
): BestTransaction {
  if (stockPrices.length < 1) {
    throw new Error('Not enough stock prices to calculate a transaction');
  }

  if (stockPrices.length === 1) {
    return {
      bestBuy: stockPrices[0],
      bestSell: stockPrices[0],
    };
  }

  let bestBuy: StockPrice = stockPrices[0];
  let bestSell: StockPrice = stockPrices[1];

  let bestGrowth: number =
    bestSell.highestPriceOfTheDay / bestBuy.lowestPriceOfTheDay;

  for (let i = 0; i < stockPrices.length; i++) {
    for (let j = i + 1; j < stockPrices.length; j++) {
      const growth: number =
        stockPrices[j].highestPriceOfTheDay /
        stockPrices[i].lowestPriceOfTheDay;
      if (growth > bestGrowth) {
        bestBuy = stockPrices[i];
        bestSell = stockPrices[j];
        bestGrowth = growth;
      }
    }
  }

  return {
    bestBuy,
    bestSell,
  };
}

export function getPersonProfitData(
  bestTransaction: BestTransaction,
  capital: number
): PersonProfitData {
  const { bestBuy, bestSell }: BestTransaction = bestTransaction;

  if (bestBuy.lowestPriceOfTheDay === 0) {
    return {
      bestBuy,
      bestSell,
      profit: 0,
    };
  }

  const growth: number =
    (capital / bestBuy.lowestPriceOfTheDay) * bestSell.highestPriceOfTheDay;

  const roundedProfit: number = Math.round((growth - capital) * 100) / 100;

  return {
    bestBuy,
    bestSell,
    profit: roundedProfit,
  };
}
