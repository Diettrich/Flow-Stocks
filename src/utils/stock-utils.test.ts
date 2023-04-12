import { StockPrice } from '@/databaseClient';
import { AveragePricePerDay, AveragePricePerMonth } from '@/types';
import { getAveragePricePerDay, getAveragePricePerMonth } from './stock.utils';

describe('getAveragePricePerDay', () => {
  it('should return an empty array when given an empty array', () => {
    const result = getAveragePricePerDay([]);
    expect(result).toEqual([]);
  });

  it('should return an array of AveragePricePerDay objects', () => {
    const stockPrices: StockPrice[] = [
      {
        timestamp: new Date('2022-01-01'),
        highestPriceOfTheDay: 10,
        lowestPriceOfTheDay: 5,
      },
      {
        timestamp: new Date('2022-01-02'),
        highestPriceOfTheDay: 15,
        lowestPriceOfTheDay: 10,
      },
    ];

    const expected: AveragePricePerDay[] = [
      { timestamp: new Date('2022-01-01'), averagePrice: 7.5 },
      { timestamp: new Date('2022-01-02'), averagePrice: 12.5 },
    ];

    const result = getAveragePricePerDay(stockPrices);
    expect(result).toEqual(expected);
  });
});

describe('getAveragePricePerMonth', () => {
  it('should return an empty array when given an empty array', () => {
    const result = getAveragePricePerMonth([]);
    expect(result).toEqual([]);
  });

  it('should return an array of AveragePricePerMonth objects', () => {
    const averagePricePerDay: AveragePricePerDay[] = [
      { timestamp: new Date('2022-01-01'), averagePrice: 7.5 },
      { timestamp: new Date('2022-01-02'), averagePrice: 12.5 },
      { timestamp: new Date('2022-02-01'), averagePrice: 10 },
      { timestamp: new Date('2022-02-02'), averagePrice: 15 },
    ];

    const expected: AveragePricePerMonth[] = [
      { month: 'January', monthNumber: 0, averagePrice: 10 },
      { month: 'February', monthNumber: 1, averagePrice: 12.5 },
    ];

    const result = getAveragePricePerMonth(averagePricePerDay);
    expect(result).toEqual(expected);
  });

  it('should handle multiple AveragePricePerDay objects with the same month', () => {
    const averagePricePerDay: AveragePricePerDay[] = [
      { timestamp: new Date('2022-01-01'), averagePrice: 7.5 },
      { timestamp: new Date('2022-01-02'), averagePrice: 12.5 },
      { timestamp: new Date('2022-01-03'), averagePrice: 10 },
    ];

    const expected: AveragePricePerMonth[] = [
      { month: 'January', monthNumber: 0, averagePrice: 10 },
    ];

    const result = getAveragePricePerMonth(averagePricePerDay);
    expect(result).toEqual(expected);
  });
});
