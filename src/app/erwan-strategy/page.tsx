import React from 'react';
import Table from '@/components/Table';
import TimeConsumed from '@/components/TimeConsumed';
import { Ledger } from '@/types';

type TradeStrategyData = {
  ledger: Ledger[];
  executionTime: number;
};

async function getTradeStrategyData(): Promise<TradeStrategyData> {
  return await fetch(`${process.env.API_URL}/api/best-strategy`, {
    cache: 'no-store',
  }).then((response) => response.json());
}

export default async function Home() {
  const { ledger, executionTime }: TradeStrategyData =
    await getTradeStrategyData();

  return (
    <div className="flex items-center justify-center flex-col h-full">
      <Table ledger={ledger} />
      <TimeConsumed executionTime={executionTime} />
    </div>
  );
}
