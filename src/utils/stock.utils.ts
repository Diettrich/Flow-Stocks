import { StockPrice } from '@/databaseClient';
import { AveragePricePerDay, AveragePricePerMonth, Month } from '@/types';
import { getMonth } from './date.utils';

export function getAveragePricePerDay(
  stockPrices: StockPrice[]
): AveragePricePerDay[] {
  return stockPrices.map((stockPrice: StockPrice): AveragePricePerDay => {
    const averagePrice: number =
      (stockPrice.highestPriceOfTheDay + stockPrice.lowestPriceOfTheDay) / 2;
    return {
      timestamp: stockPrice.timestamp,
      averagePrice,
    };
  });
}

export function getAveragePricePerMonth(
  averagePricePerDay: AveragePricePerDay[]
): AveragePricePerMonth[] {
  const averagePricePerMonth: AveragePricePerMonth[] = [];
  averagePricePerDay.forEach((averagePricePerDay: AveragePricePerDay) => {
    const month: Month = getMonth(averagePricePerDay.timestamp);
    const monthNumber: number = averagePricePerDay.timestamp.getMonth();
    const averagePrice: number = averagePricePerDay.averagePrice;

    const averagePricePerMonthIndex: number = averagePricePerMonth.findIndex(
      (averagePricePerMonth: AveragePricePerMonth) =>
        averagePricePerMonth.month === month
    );

    if (averagePricePerMonthIndex === -1) {
      averagePricePerMonth.push({
        month,
        monthNumber,
        averagePrice,
      });
    } else {
      averagePricePerMonth[averagePricePerMonthIndex].averagePrice +=
        averagePrice;
    }
  });

  averagePricePerMonth.forEach((averagePricePerMonth: AveragePricePerMonth) => {
    averagePricePerMonth.averagePrice /= averagePricePerDay.filter(
      (averagePricePerDay: AveragePricePerDay) =>
        averagePricePerDay.timestamp.getMonth() ===
        averagePricePerMonth.monthNumber
    ).length;
  });

  return averagePricePerMonth;
}
