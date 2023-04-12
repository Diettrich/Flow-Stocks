import type { StockPrice } from '@/databaseClient';
import {
  AveragePricePerDay,
  AveragePricePerMonth,
  BestTransaction,
  Ledger,
  ProfitData,
  STOCK_NAME,
} from '@/types';
import {
  getAveragePricePerDay,
  getAveragePricePerMonth,
} from '@/utils/stock.utils';
import {
  getBestTransactionFromStockPrices,
  getPersonProfitData,
} from '@/utils/best-transaction.util';
import { getLedger } from '@/utils/best-trade-strategy.utils';
import { getStockPrices } from '@/repositories/stockPrices.repository';
import { CAPITAL } from '@/constants';

export async function getAverageStockPricePerMonth(
  name: STOCK_NAME
): Promise<AveragePricePerMonth[]> {
  const stockPrices: StockPrice[] = await getStockPrices(name);

  const averagePricePerDay: AveragePricePerDay[] =
    getAveragePricePerDay(stockPrices);

  return getAveragePricePerMonth(averagePricePerDay);
}

export async function getBestTransaction(): Promise<ProfitData> {
  const [googleStockPrices, amazonStockPrices] = await Promise.all([
    getStockPrices(STOCK_NAME.GOOGLE),
    getStockPrices(STOCK_NAME.AMAZON),
  ]);

  const AnouarBestTransaction: BestTransaction =
    getBestTransactionFromStockPrices(googleStockPrices);
  const AymanBestTransaction: BestTransaction =
    getBestTransactionFromStockPrices(amazonStockPrices);

  return {
    Anouar: getPersonProfitData(AnouarBestTransaction, CAPITAL),
    Ayman: getPersonProfitData(AymanBestTransaction, CAPITAL),
  };
}

export async function getBestTradeStrategy(): Promise<Ledger[]> {
  const [amazonStockPrices, googleStockPrices] = await Promise.all([
    getStockPrices(STOCK_NAME.AMAZON),
    getStockPrices(STOCK_NAME.GOOGLE),
  ]);

  if (amazonStockPrices.length !== googleStockPrices.length) {
    throw new Error('Stock prices are not the same length');
  }

  for (let i = 0; i < amazonStockPrices.length; i++) {
    if (
      amazonStockPrices[i].timestamp.getDate() !==
      googleStockPrices[i].timestamp.getDate()
    ) {
      console.log(
        amazonStockPrices[i].timestamp,
        googleStockPrices[i].timestamp
      );
      throw new Error('Stock prices are not the same dates');
    }
  }

  return getLedger({ amazonStockPrices, googleStockPrices });
}
