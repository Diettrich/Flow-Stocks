import { StockPrice } from '@/databaseClient';
import { ACTION, Ledger } from '../types';

export function sellShares(
  currentStock: string,
  stockPrices: StockPrice[],
  ledger: Ledger[],
  index: number,
  capital: number
): void {
  ledger.push({
    date: stockPrices[index].timestamp.toDateString(),
    stock: currentStock,
    action: ACTION.SELL,
    unitPrice: stockPrices[index].highestPriceOfTheDay,
    stocksNumber:
      Math.floor((capital / stockPrices[index].highestPriceOfTheDay) * 100) /
      100,
    portfolioValue: capital,
  });
}

export function buyShares(
  stock: string,
  stockPrices: StockPrice[],
  ledger: Ledger[],
  index: number,
  capital: number
): void {
  ledger.push({
    date: stockPrices[index].timestamp.toDateString(),
    stock,
    action: ACTION.BUY,
    unitPrice: stockPrices[index].lowestPriceOfTheDay,
    stocksNumber:
      Math.floor((capital / stockPrices[index].lowestPriceOfTheDay) * 100) /
      100,
    portfolioValue: capital,
  });
}

export function growthOfTomorrow(
  stockPrices: StockPrice[],
  index: number
): number {
  return (
    (stockPrices[index + 1].highestPriceOfTheDay -
      stockPrices[index].lowestPriceOfTheDay) /
    stockPrices[index].lowestPriceOfTheDay
  );
}
