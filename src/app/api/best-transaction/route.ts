import {
  getAverageStockPricePerMonth,
  getBestTransaction,
} from "@/services/stockPrice.service";
import { AveragePricePerMonth, ProfitData } from "@/types";
export async function GET(request: Request) {
  const capital: number = 100_000;

  const [AnouarBestBuy, AnouarBestSell] = await getBestTransaction("google");
  const [AymanBestBuy, AymanBestSell] = await getBestTransaction("amazon");

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
      profit: Math.round(AnouarProfit * 100) / 100,
    },
    Ayman: {
      bestBuy: AymanBestBuy,
      bestSell: AymanBestSell,
      profit: Math.round(AymanProfit * 100) / 100,
    },
  };

  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
