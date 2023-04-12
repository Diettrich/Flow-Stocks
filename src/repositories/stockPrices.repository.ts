import { STOCK_NAME } from '@/types';
import prismaClient, { StockPrice } from '@/databaseClient';

export async function getStockPrices(name: STOCK_NAME): Promise<StockPrice[]> {
  return prismaClient.stockPrice.findMany({
    where: {
      stock: {
        name,
      },
    },
    orderBy: {
      timestamp: 'asc',
    },
  });
}
