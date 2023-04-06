import React from "react";
import Table from "@/components/Table";

async function getTradeStrategyData() {
  return await fetch("http://localhost:3000/api/best-strategy", {
    cache: "no-store",
  }).then((response) => response.json());
}

export default async function Home() {
  const ledger = await getTradeStrategyData();

  return <Table ledger={ledger} />;
}
