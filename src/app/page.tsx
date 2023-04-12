import React from 'react';
import Chart from '@/components/Chart';
import ProfitText from '@/components/ProfitText';
import { ChartData, ProfitData } from '@/types';

type StockData = {
  averagePricePerMonth: ChartData[];
  profitData: ProfitData;
};

async function getStockData(): Promise<StockData> {
  const [averagePricePerMonth, profitData]: [ChartData[], ProfitData] =
    await Promise.all([
      fetch(`${process.env.API_URL}/api/monthly-stocks`, {
        cache: 'no-store',
      }).then((response) => response.json()),
      fetch(`${process.env.API_URL}/api/best-transaction`, {
        cache: 'no-store',
      }).then((response) => response.json()),
    ]);

  return {
    averagePricePerMonth,
    profitData,
  };
}

export default async function Home() {
  const { averagePricePerMonth, profitData }: StockData = await getStockData();

  return (
    <>
      <Chart averagePricePerMonth={averagePricePerMonth} />
      <ProfitText profitData={profitData} />
    </>
  );
}
