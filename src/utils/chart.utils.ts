import { AveragePricePerMonth, ChartData } from '@/types';

export function transformToChartFormat(
  googleStock: AveragePricePerMonth[],
  amazonStock: AveragePricePerMonth[]
): ChartData[] {
  return Array.from({ length: 12 }).map((_, index) => {
    const googleStockMonth: AveragePricePerMonth | undefined = googleStock.find(
      (stock: AveragePricePerMonth) => stock.monthNumber === index
    );
    const amazonStockMonth: AveragePricePerMonth | undefined = amazonStock.find(
      (stock: AveragePricePerMonth) => stock.monthNumber === index
    );

    if (!googleStockMonth || !amazonStockMonth) {
      throw new Error('Invalid data');
    }

    return {
      month: googleStockMonth.month,
      google: googleStockMonth.averagePrice,
      amazon: amazonStockMonth.averagePrice,
    };
  });
}
