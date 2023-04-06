const { PrismaClient } = require("@prisma/client");

const googleStock = require("./stockData/google.json");
const amazonStock = require("./stockData/amazon.json");

const prisma = new PrismaClient();

type StockPrice = {
  highestPriceOfTheDay: number;
  lowestPriceOfTheDay: number;
  timestamp: number;
};

const seed = async () => {
  try {
    await prisma.stock.deleteMany({});
    await prisma.stockPrice.deleteMany({});

    const googleStockPrice = googleStock.map((stockPrice: StockPrice) => {
      return {
        highestPriceOfTheDay: stockPrice.highestPriceOfTheDay,
        lowestPriceOfTheDay: stockPrice.lowestPriceOfTheDay,
        timestamp: new Date(stockPrice.timestamp),
      };
    });

    const amazonStockPrice = amazonStock.map((stockPrice: StockPrice) => {
      return {
        highestPriceOfTheDay: stockPrice.highestPriceOfTheDay,
        lowestPriceOfTheDay: stockPrice.lowestPriceOfTheDay,
        timestamp: new Date(stockPrice.timestamp),
      };
    });

    await prisma.stock.create({
      data: {
        name: "Google",
        stockPrices: {
          create: googleStockPrice,
        },
      },
    });
    await prisma.stock.create({
      data: {
        name: "Amazon",
        stockPrices: {
          create: amazonStockPrice,
        },
      },
    });

    console.log("Database seeded!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seed().then(() => process.exit(0));
