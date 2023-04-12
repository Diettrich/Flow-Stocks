import { getBestTransaction } from '@/services/stockPrice.service';
import { ProfitData, STOCK_NAME } from '@/types';

export async function GET() {
  const capital = 100_000;

  const [AnouarBestBuy, AnouarBestSell] = await getBestTransaction(
    STOCK_NAME.GOOGLE
  );
  const [AymanBestBuy, AymanBestSell] = await getBestTransaction(
    STOCK_NAME.AMAZON
  );

  const AnouarProfit: number =
    (capital / AnouarBestBuy.lowestPriceOfTheDay) *
    AnouarBestSell.highestPriceOfTheDay;
  const AymanProfit: number =
    (capital / AymanBestBuy.lowestPriceOfTheDay) *
    AymanBestSell.highestPriceOfTheDay;

  const response: ProfitData = {
    Anouar: {
      bestBuy: AnouarBestBuy,
      bestSell: AnouarBestSell,
      profit: Math.round((AnouarProfit - 100000) * 100) / 100,
    },
    Ayman: {
      bestBuy: AymanBestBuy,
      bestSell: AymanBestSell,
      profit: Math.round((AymanProfit - 100000) * 100) / 100,
    },
  };

  return new Response(JSON.stringify(response), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
