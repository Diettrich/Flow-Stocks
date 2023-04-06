import { AveragePricePerMonth } from "@/types";
import { transformToChartFormat } from "@/utils/chart.utils";
import Chart from "@/components/Chart";
import React from "react";

async function getStockData() {
  const [googleStock, amazonStock]: [
    AveragePricePerMonth[],
    AveragePricePerMonth[]
  ] = await Promise.all([
    fetch("http://localhost:3000/api/stocks?name=google", {
      cache: "no-store",
    }).then((response) => response.json()),
    fetch("http://localhost:3000/api/stocks?name=amazon", {
      cache: "no-store",
    }).then((response) => response.json()),
  ]);

  // this transformation is intentional by design, the API must be generic
  // this is still server side
  return transformToChartFormat(googleStock, amazonStock);
}

export default async function Home() {
  const averagePricePerMonth = await getStockData();

  return <Chart averagePricePerMonth={averagePricePerMonth} />;
}
