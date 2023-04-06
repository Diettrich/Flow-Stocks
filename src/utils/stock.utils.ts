import { StockPrice } from "@/databaseClient";
import { AveragePricePerDay, AveragePricePerMonth, Month } from "@/types";

function getMonth(timestamp: Date): Month {
  const monthNumber: number = timestamp.getMonth();
  switch (monthNumber) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      throw new Error("Invalid month number");
  }
}

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
