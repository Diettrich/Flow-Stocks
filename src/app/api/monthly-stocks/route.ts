import { getAverageStockPricePerMonth } from '@/services/stockPrice.service';
import { AveragePricePerMonth, ChartData, STOCK_NAME } from '@/types';
import { transformToChartFormat } from '@/utils/chart.utils';

export async function GET() {
  const [googleMonthlyStockPrices, amazonMonthlyStockPrices]: [
    AveragePricePerMonth[],
    AveragePricePerMonth[]
  ] = await Promise.all([
    getAverageStockPricePerMonth(STOCK_NAME.GOOGLE),
    getAverageStockPricePerMonth(STOCK_NAME.AMAZON),
  ]);

  const chartData: ChartData[] = transformToChartFormat(
    googleMonthlyStockPrices,
    amazonMonthlyStockPrices
  );

  return new Response(JSON.stringify(chartData), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
