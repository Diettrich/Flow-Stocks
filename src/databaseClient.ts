import { PrismaClient, StockPrice as _StockPrice } from '@prisma/client';

const prismaClient = new PrismaClient();

type StockPrice = Pick<
  _StockPrice,
  'timestamp' | 'highestPriceOfTheDay' | 'lowestPriceOfTheDay'
>;

export default prismaClient;
export type { StockPrice };
