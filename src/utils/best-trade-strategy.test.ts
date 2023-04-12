import {
  sellShares,
  buyShares,
  growthOfTomorrow,
} from './best-trade-strategy.utils';
import { Ledger } from '@/types';

describe('sellShares', () => {
  it('should add a sell transaction to the ledger', () => {
    const currentStock = 'google';
    const stockPrices = [
      {
        highestPriceOfTheDay: 200,
        lowestPriceOfTheDay: 180,
        timestamp: new Date('2022-01-01'),
      },
      {
        highestPriceOfTheDay: 210,
        lowestPriceOfTheDay: 190,
        timestamp: new Date('2022-01-02'),
      },
      {
        highestPriceOfTheDay: 220,
        lowestPriceOfTheDay: 200,
        timestamp: new Date('2022-01-03'),
      },
    ];
    const ledger: Ledger[] = [];
    const index = 1;
    const capital = 1000;

    sellShares(currentStock, stockPrices, ledger, index, capital);

    expect(ledger).toHaveLength(1);
    expect(ledger[0]).toMatchObject({
      date: stockPrices[index].timestamp.toDateString(),
      stock: currentStock,
      action: 'sell',
      unitPrice: stockPrices[index].highestPriceOfTheDay,
      stocksNumber:
        Math.floor((capital / stockPrices[index].highestPriceOfTheDay) * 100) /
        100,
      portfolioValue: capital,
    });
  });
});

describe('buyShares', () => {
  it('should add a buy transaction to the ledger', () => {
    const stock = 'AAPL';
    const stockPrices = [
      {
        highestPriceOfTheDay: 200,
        lowestPriceOfTheDay: 180,
        timestamp: new Date('2022-01-01'),
      },
      {
        highestPriceOfTheDay: 210,
        lowestPriceOfTheDay: 190,
        timestamp: new Date('2022-01-02'),
      },
      {
        highestPriceOfTheDay: 220,
        lowestPriceOfTheDay: 200,
        timestamp: new Date('2022-01-03'),
      },
    ];
    const ledger: Ledger[] = [];
    const index = 1;
    const capital = 1000;

    buyShares(stock, stockPrices, ledger, index, capital);

    expect(ledger).toHaveLength(1);
    expect(ledger[0]).toMatchObject({
      date: stockPrices[index].timestamp.toDateString(),
      stock,
      action: 'buy',
      unitPrice: stockPrices[index].lowestPriceOfTheDay,
      stocksNumber:
        Math.floor((capital / stockPrices[index].lowestPriceOfTheDay) * 100) /
        100,
      portfolioValue: capital,
    });
  });
});

describe('growthOfTomorrow', () => {
  it('should return the growth of tomorrow', () => {
    const stockPrices = [
      {
        highestPriceOfTheDay: 200,
        lowestPriceOfTheDay: 180,
        timestamp: new Date('2022-01-01'),
      },
      {
        highestPriceOfTheDay: 210,
        lowestPriceOfTheDay: 100,
        timestamp: new Date('2022-01-02'),
      },
      {
        highestPriceOfTheDay: 200,
        lowestPriceOfTheDay: 100,
        timestamp: new Date('2022-01-03'),
      },
    ];
    const index = 1;

    const growth = growthOfTomorrow(stockPrices, index);

    expect(growth).toBeCloseTo(1, 3);
  });
});
