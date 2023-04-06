import prismaClient, { StockPrice } from "@/databaseClient";
import {
  getAveragePricePerDay,
  getAveragePricePerMonth,
} from "@/utils/stock.utils";
import {
  ACTION,
  AveragePricePerDay,
  AveragePricePerMonth,
  Ledger,
} from "@/types";
import { getBestTransactionFromStockPrices } from "@/utils/best-transaction.util";
import {
  buyShares,
  growthOfTomorrow,
  sellShares,
} from "@/utils/best-trade-strategy.utils";

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

export async function getBestTradeStrategy(): Promise<Ledger[]> {
  const [amazonStockPrices, googleStockPrices] = await Promise.all([
    prismaClient.stockPrice.findMany({
      where: {
        stock: {
          name: "amazon",
        },
      },
      orderBy: {
        timestamp: "asc",
      },
    }),
    prismaClient.stockPrice.findMany({
      where: {
        stock: {
          name: "google",
        },
      },
      orderBy: {
        timestamp: "asc",
      },
    }),
  ]);

  if (amazonStockPrices.length !== googleStockPrices.length) {
    throw new Error("Stock prices are not the same length");
  }

  const length = amazonStockPrices.length;
  const ledger: Ledger[] = [];
  let hasStock = false;
  let capital = 100000;
  let currentStock = null;

  for (let i = 0; i < length - 1; i++) {
    const googleGrowth = growthOfTomorrow(googleStockPrices, i);
    const amazonGrowth = growthOfTomorrow(amazonStockPrices, i);
    if (hasStock) {
      if (currentStock === "google" && googleGrowth < 0) {
        sellShares(currentStock, googleStockPrices, ledger, i, capital);
        currentStock = null;
        hasStock = false;

        if (amazonGrowth > 0) {
          currentStock = "amazon";
          buyShares(currentStock, amazonStockPrices, ledger, i, capital);
          hasStock = true;
          capital += capital * amazonGrowth;
        }
      }

      if (currentStock === "amazon" && amazonGrowth < 0) {
        sellShares(currentStock, amazonStockPrices, ledger, i, capital);
        currentStock = null;
        hasStock = false;

        if (googleGrowth > 0) {
          currentStock = "google";
          buyShares(currentStock, googleStockPrices, ledger, i, capital);
          hasStock = true;
          capital += capital * googleGrowth;
        }
      }

      if (
        currentStock === "google" &&
        googleGrowth > 0 &&
        amazonGrowth > googleGrowth
      ) {
        sellShares(currentStock, googleStockPrices, ledger, i, capital);
        currentStock = "amazon";
        buyShares(currentStock, amazonStockPrices, ledger, i, capital);
        capital += capital * amazonGrowth;
      }

      if (
        currentStock === "amazon" &&
        amazonGrowth > 0 &&
        googleGrowth > amazonGrowth
      ) {
        sellShares(currentStock, amazonStockPrices, ledger, i, capital);
        currentStock = "google";
        buyShares(currentStock, googleStockPrices, ledger, i, capital);
        capital += capital * googleGrowth;
      }
    } else {
      if (amazonGrowth < googleGrowth) {
        currentStock = "google";
        buyShares(currentStock, amazonStockPrices, ledger, i, capital);
        capital += capital * googleGrowth;
      } else {
        currentStock = "amazon";
        buyShares(currentStock, googleStockPrices, ledger, i, capital);
        capital += capital * amazonGrowth;
      }

      hasStock = true;
    }
  }

  return ledger;
}
