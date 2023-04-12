import { sellShares, buyShares, getLedger } from './best-trade-strategy.utils';
import { Ledger } from '@/types';
import { StockPrice } from '@/databaseClient';

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
    const stocksNumber = 5;

    sellShares(currentStock, stockPrices, ledger, index, capital, stocksNumber);

    expect(ledger).toHaveLength(1);
    expect(ledger[0]).toMatchObject({
      date: stockPrices[index].timestamp.toDateString(),
      stock: currentStock,
      action: 'sell',
      unitPrice: stockPrices[index].highestPriceOfTheDay,
      stocksNumber,
      portfolioValue: capital,
    });
  });
});

describe('buyShares', () => {
  it('should add a buy transaction to the ledger', () => {
    const stock = 'amazon';
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
      stocksNumber: Math.floor(
        capital / stockPrices[index].lowestPriceOfTheDay
      ),
      portfolioValue: capital,
    });
  });
});

// describe('growthOfTomorrow', () => {
//   it('should return the growth of tomorrow', () => {
//     const stockPrices = [
//       {
//         highestPriceOfTheDay: 200,
//         lowestPriceOfTheDay: 180,
//         timestamp: new Date('2022-01-01'),
//       },
//       {
//         highestPriceOfTheDay: 210,
//         lowestPriceOfTheDay: 100,
//         timestamp: new Date('2022-01-02'),
//       },
//       {
//         highestPriceOfTheDay: 200,
//         lowestPriceOfTheDay: 100,
//         timestamp: new Date('2022-01-03'),
//       },
//     ];
//     const index = 1;
//
//     const growth = growthOfTomorrow(stockPrices, index);
//
//     expect(growth).toBeCloseTo(1, 3);
//   });
// });

describe('getLedger', () => {
  const googlePrices: StockPrice[] = [
    {
      timestamp: new Date('2022-01-01'),
      lowestPriceOfTheDay: 100,
      highestPriceOfTheDay: 200,
    },
    {
      timestamp: new Date('2022-01-02'),
      lowestPriceOfTheDay: 150,
      highestPriceOfTheDay: 250,
    },
    {
      timestamp: new Date('2022-01-03'),
      lowestPriceOfTheDay: 200,
      highestPriceOfTheDay: 300,
    },
  ];

  const amazonPrices: StockPrice[] = [
    {
      timestamp: new Date('2022-01-01'),
      lowestPriceOfTheDay: 80,
      highestPriceOfTheDay: 180,
    },
    {
      timestamp: new Date('2022-01-02'),
      lowestPriceOfTheDay: 120,
      highestPriceOfTheDay: 220,
    },
    {
      timestamp: new Date('2022-01-03'),
      lowestPriceOfTheDay: 150,
      highestPriceOfTheDay: 250,
    },
  ];

  it('should return a valid ledger for the given stock prices', () => {
    const ledger = getLedger({
      googleStockPrices: googlePrices,
      amazonStockPrices: amazonPrices,
    });

    expect(ledger).toEqual([
      {
        date: 'Sat Jan 01 2022',
        stock: 'amazon',
        action: 'buy',
        unitPrice: 80,
        stocksNumber: 1250,
        portfolioValue: 100000,
      },
      {
        action: 'sell',
        date: 'Sun Jan 02 2022',
        portfolioValue: 275000,
        stock: 'amazon',
        stocksNumber: 1250,
        unitPrice: 220,
      },
      {
        action: 'buy',
        date: 'Sun Jan 02 2022',
        portfolioValue: 275000,
        stock: 'amazon',
        stocksNumber: 2291,
        unitPrice: 120,
      },
      {
        action: 'sell',
        date: 'Mon Jan 03 2022',
        portfolioValue: 572750,
        stock: 'amazon',
        stocksNumber: 2291,
        unitPrice: 250,
      },
    ]);
  });
});
