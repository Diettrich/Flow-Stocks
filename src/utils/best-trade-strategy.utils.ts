import { StockPrice } from '@/databaseClient';
import { ACTION, Ledger, STOCK_NAME } from '../types';
import { CAPITAL } from '../constants';

export function sellShares(
  currentStock: string,
  stockPrices: StockPrice[],
  ledger: Ledger[],
  index: number,
  capital: number,
  stocksNumber: number
): Ledger[] {
  ledger.push({
    date: stockPrices[index].timestamp.toDateString(),
    stock: currentStock,
    action: ACTION.SELL,
    unitPrice: stockPrices[index].highestPriceOfTheDay,
    stocksNumber,
    portfolioValue: capital,
  });

  return ledger;
}

export function buyShares(
  stock: string,
  stockPrices: StockPrice[],
  ledger: Ledger[],
  index: number,
  capital: number
): Ledger[] {
  ledger.push({
    date: stockPrices[index].timestamp.toDateString(),
    stock,
    action: ACTION.BUY,
    unitPrice: stockPrices[index].lowestPriceOfTheDay,
    stocksNumber: Math.floor(capital / stockPrices[index].lowestPriceOfTheDay),
    portfolioValue: capital,
  });

  return ledger;
}

export function capitalGrowth(
  capital: number,
  stockPrices: StockPrice[],
  index: number
): number {
  return (
    Math.floor(capital / stockPrices[index].lowestPriceOfTheDay) *
    stockPrices[index + 1].highestPriceOfTheDay
  );
}

export function getLedger({
  amazonStockPrices,
  googleStockPrices,
}: {
  amazonStockPrices: StockPrice[];
  googleStockPrices: StockPrice[];
}): Ledger[] {
  const length = amazonStockPrices.length;
  let ledger: Ledger[] = [];
  let capital = CAPITAL;
  let hasShares = false;
  let currentStock: STOCK_NAME | null = null;
  let currentStocksNumber = 0;

  for (let i = 0; i < length; i++) {
    if (i === length - 1) {
      if (hasShares && currentStock) {
        ledger = sellShares(
          currentStock,
          currentStock === STOCK_NAME.GOOGLE
            ? googleStockPrices
            : amazonStockPrices,
          ledger,
          i,
          capital,
          currentStocksNumber
        );
      }
      break;
    }

    const googleNextCapital = capitalGrowth(capital, googleStockPrices, i);
    const amazonNextCapital = capitalGrowth(capital, amazonStockPrices, i);

    if (hasShares) {
      if (currentStock === STOCK_NAME.GOOGLE && googleNextCapital < capital) {
        ledger = sellShares(
          currentStock,
          googleStockPrices,
          ledger,
          i,
          capital,
          currentStocksNumber
        );
        currentStock = null;
        hasShares = false;
        currentStocksNumber = 0;

        if (amazonNextCapital > capital) {
          currentStock = STOCK_NAME.AMAZON;
          ledger = buyShares(
            currentStock,
            amazonStockPrices,
            ledger,
            i,
            capital
          );
          hasShares = true;
          currentStocksNumber = Math.floor(
            capital / amazonStockPrices[i].lowestPriceOfTheDay
          );
          capital = amazonNextCapital;
        }
      }

      if (currentStock === STOCK_NAME.AMAZON && amazonNextCapital < capital) {
        ledger = sellShares(
          currentStock,
          amazonStockPrices,
          ledger,
          i,
          capital,
          currentStocksNumber
        );
        currentStock = null;
        hasShares = false;
        currentStocksNumber = 0;

        if (googleNextCapital > capital) {
          currentStock = STOCK_NAME.GOOGLE;
          ledger = buyShares(
            currentStock,
            googleStockPrices,
            ledger,
            i,
            capital
          );
          hasShares = true;
          currentStocksNumber = Math.floor(
            capital / googleStockPrices[i].lowestPriceOfTheDay
          );
          capital = googleNextCapital;
        }
      }

      if (
        currentStock === STOCK_NAME.GOOGLE &&
        googleNextCapital > capital &&
        amazonNextCapital > googleNextCapital
      ) {
        ledger = sellShares(
          currentStock,
          googleStockPrices,
          ledger,
          i,
          capital,
          currentStocksNumber
        );
        currentStock = STOCK_NAME.AMAZON;
        hasShares = true;
        currentStocksNumber = 0;

        ledger = buyShares(currentStock, amazonStockPrices, ledger, i, capital);
        currentStocksNumber = Math.floor(
          capital / amazonStockPrices[i].lowestPriceOfTheDay
        );
        capital = amazonNextCapital;
      }

      if (
        currentStock === STOCK_NAME.AMAZON &&
        amazonNextCapital > capital &&
        googleNextCapital > amazonNextCapital
      ) {
        ledger = sellShares(
          currentStock,
          amazonStockPrices,
          ledger,
          i,
          capital,
          currentStocksNumber
        );
        currentStock = STOCK_NAME.GOOGLE;
        hasShares = true;
        currentStocksNumber = 0;

        ledger = buyShares(currentStock, googleStockPrices, ledger, i, capital);
        currentStocksNumber = Math.floor(
          capital / googleStockPrices[i].lowestPriceOfTheDay
        );
        capital = googleNextCapital;
      } else {
        if (currentStock === STOCK_NAME.GOOGLE) {
          capital = googleNextCapital;
        } else {
          capital = amazonNextCapital;
        }
      }
    } else {
      if (
        amazonNextCapital < googleNextCapital &&
        googleNextCapital > capital
      ) {
        currentStock = STOCK_NAME.GOOGLE;
        ledger = buyShares(currentStock, googleStockPrices, ledger, i, capital);
        currentStocksNumber = Math.floor(
          capital / googleStockPrices[i].lowestPriceOfTheDay
        );
        capital = googleNextCapital;
      } else if (
        googleNextCapital < amazonNextCapital &&
        amazonNextCapital > capital
      ) {
        currentStock = STOCK_NAME.AMAZON;
        ledger = buyShares(currentStock, amazonStockPrices, ledger, i, capital);
        currentStocksNumber = Math.floor(
          capital / amazonStockPrices[i].lowestPriceOfTheDay
        );
        capital = amazonNextCapital;
      }

      hasShares = true;
    }
  }

  return ledger;
}
