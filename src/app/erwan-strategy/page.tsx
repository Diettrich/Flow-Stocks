import React from "react";
import Table from "@/components/Table";
import { Ledger } from "@/types";

async function getTradeStrategyData(): Promise<{
  ledger: Ledger[];
  executionTime: number;
}> {
  return await fetch(`${process.env.API_URL}/api/best-strategy`, {
    cache: "no-store",
  }).then((response) => response.json());
}

export default async function Home() {
  const { ledger, executionTime } = await getTradeStrategyData();

  return <Table ledger={ledger} executionTime={executionTime} />;
}
