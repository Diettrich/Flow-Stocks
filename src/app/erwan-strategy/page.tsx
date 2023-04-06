import React from "react";
import Table from "@/components/Table";

async function getTradeStrategyData() {
  return await fetch(`${process.env.API_URL}/api/best-strategy`, {
    cache: "no-store",
  }).then((response) => response.json());
}

export default async function Home() {
  const ledger = await getTradeStrategyData();

  return <Table ledger={ledger} />;
}
