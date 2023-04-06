import React from "react";
import Chart from "@/components/Chart";
import ProfitText from "@/components/ProfitText";
import { AveragePricePerMonth, ChartData, ProfitData } from "@/types";
import { transformToChartFormat } from "@/utils/chart.utils";

async function getStockData(): Promise<{
  averagePricePerMonth: ChartData[];
  profitData: ProfitData;
}> {
  const [googleStock, amazonStock, profitData]: [
    AveragePricePerMonth[],
    AveragePricePerMonth[],
    ProfitData
  ] = await Promise.all([
    fetch("http://localhost:3000/api/stocks?name=google", {
      cache: "no-store",
    }).then((response) => response.json()),
    fetch("http://localhost:3000/api/stocks?name=amazon", {
      cache: "no-store",
    }).then((response) => response.json()),
    fetch("http://localhost:3000/api/best-transaction", {
      cache: "no-store",
    }).then((response) => response.json()),
  ]);

  // this transformation is intentional by design, the API must be generic
  // this is still server side
  return {
    averagePricePerMonth: transformToChartFormat(googleStock, amazonStock),
    profitData,
  };
}

export default async function Home() {
  const { averagePricePerMonth, profitData } = await getStockData();

  return (
    <>
      <Chart averagePricePerMonth={averagePricePerMonth} />
      <ProfitText profitData={profitData} />
    </>
  );
}
