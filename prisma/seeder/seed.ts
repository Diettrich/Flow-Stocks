import { PrismaClient } from '@prisma/client';

import googleStock from './stockData/google.json';
import amazonStock from './stockData/amazon.json';

const prisma = new PrismaClient();

type SeedStockPrice = {
  highestPriceOfTheDay: number;
  lowestPriceOfTheDay: number;
  timestamp: number;
};

const seed = async () => {
  try {
    await prisma.stockPrice.deleteMany({});
    await prisma.stock.deleteMany({});

    const googleStockPrice = googleStock.map((stockPrice: SeedStockPrice) => {
      return {
        highestPriceOfTheDay: stockPrice.highestPriceOfTheDay,
        lowestPriceOfTheDay: stockPrice.lowestPriceOfTheDay,
        timestamp: new Date(stockPrice.timestamp),
      };
    });

    const amazonStockPrice = amazonStock.map((stockPrice: SeedStockPrice) => {
      return {
        highestPriceOfTheDay: stockPrice.highestPriceOfTheDay,
        lowestPriceOfTheDay: stockPrice.lowestPriceOfTheDay,
        timestamp: new Date(stockPrice.timestamp),
      };
    });

    await prisma.stock.create({
      data: {
        name: 'Google',
        stockPrices: {
          create: googleStockPrice,
        },
      },
    });
    await prisma.stock.create({
      data: {
        name: 'Amazon',
        stockPrices: {
          create: amazonStockPrice,
        },
      },
    });

    console.log('Database seeded!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seed().then(() => process.exit(0));
