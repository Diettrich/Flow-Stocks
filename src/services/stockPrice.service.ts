import prismaClient, { StockPrice } from "@/databaseClient";
import {
  getAveragePricePerDay,
  getAveragePricePerMonth,
} from "@/utils/stock.utils";
import { AveragePricePerDay, AveragePricePerMonth } from "@/types";
import { getBestTransactionFromStockPrices } from "@/utils/best-transaction.util";

export async function getAverageStockPricePerMonth(
  name: "google" | "amazon"
): Promise<AveragePricePerMonth[]> {
  const stockPrices: StockPrice[] = await prismaClient.stockPrice.findMany({
    where: {
      stock: {
        name,
      },
    },
  });

  const averagePricePerDay: AveragePricePerDay[] =
    getAveragePricePerDay(stockPrices);

  return getAveragePricePerMonth(averagePricePerDay);
}

export async function getBestTransaction(
  name: "google" | "amazon"
): Promise<[StockPrice, StockPrice]> {
  const stockPrices: StockPrice[] = await prismaClient.stockPrice.findMany({
    where: {
      stock: {
        name,
      },
    },
    orderBy: {
      timestamp: "asc",
    },
  });

  return getBestTransactionFromStockPrices(stockPrices);
}
