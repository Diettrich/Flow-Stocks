import { StockPrice } from '@/databaseClient';
import { getBestTransactionFromStockPrices } from './best-transaction.util';

describe('getBestTransactionFromStockPrices', () => {
  const stockPrices: StockPrice[] = [
    {
      highestPriceOfTheDay: 60,
      lowestPriceOfTheDay: 20,
      timestamp: new Date('2022-01-02'),
    },
    {
      highestPriceOfTheDay: 50,
      lowestPriceOfTheDay: 10,
      timestamp: new Date('2022-01-01'),
    },
    {
      highestPriceOfTheDay: 30,
      lowestPriceOfTheDay: 5,
      timestamp: new Date('2022-01-03'),
    },
    {
      highestPriceOfTheDay: 70,
      lowestPriceOfTheDay: 15,
      timestamp: new Date('2022-01-04'),
    },
    {
      highestPriceOfTheDay: 40,
      lowestPriceOfTheDay: 5,
      timestamp: new Date('2022-01-05'),
    },
  ];
  it('should return the best buy and sell stock prices based on the highest profit', () => {
    const [bestBuy, bestSell]: [StockPrice, StockPrice] =
      getBestTransactionFromStockPrices(stockPrices);

    expect(bestBuy).toEqual(stockPrices[2]);
    expect(bestSell).toEqual(stockPrices[3]);
  });

  it('throws an error if there are no stock prices to calculate a transaction', () => {
    expect(() => getBestTransactionFromStockPrices([])).toThrow(
      'Not enough stock prices to calculate a transaction'
    );
  });

  it('returns a transaction with a single stock price', () => {
    const [bestBuy, bestSell]: [StockPrice, StockPrice] =
      getBestTransactionFromStockPrices([stockPrices[0]]);
    expect(bestBuy).toEqual(stockPrices[0]);
    expect(bestSell).toEqual(stockPrices[0]);
  });

  it('returns the correct transaction when there are only two stock prices', () => {
    const [bestBuy, bestSell]: [StockPrice, StockPrice] =
      getBestTransactionFromStockPrices([stockPrices[0], stockPrices[1]]);
    expect(bestBuy).toEqual(stockPrices[0]);
    expect(bestSell).toEqual(stockPrices[1]);
  });
});
