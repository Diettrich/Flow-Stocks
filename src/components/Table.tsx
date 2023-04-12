'use client';

import { Ledger } from '@/types';
import React from 'react';
import { formatDate } from '@/utils/date.utils';

function formatPrice(price: number): string {
  return price.toFixed(2);
}

type Props = {
  ledger: Ledger[];
};
export default function Table({ ledger }: Props) {
  return (
    <div className="h-1/2 overflow-y-auto m-20 rounded-lg drop-shadow-2xl border-2 border-stale-400">
      <table className="w-full table-fixed rounded-lg">
        <thead>
          <tr className="bg-stale-800">
            <th className="p-2 border-t border-l border-stale-400">Date</th>
            <th className="p-2 border-t border-stale-400">Stock</th>
            <th className="p-2 border-t border-stale-400">Action</th>
            <th className="p-2 border-t border-stale-400">Unit Price</th>
            <th className="p-2 border-t border-stale-400">Stocks Number</th>
            <th className="p-2 border-t border-r border-stale-400gray-400">
              Portfolio Value
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {ledger.map((row, index) => (
            <tr key={index} className="bg-stale-900">
              <td className="p-2 border-t border-l border-stale-400">
                {formatDate(row.date)}
              </td>
              <td className="p-2 border-t border-stale-400">{row.stock}</td>
              {row.action === 'buy' ? (
                <td className="p-2 border-t border-stale-400 text-green-500">
                  ACHAT
                </td>
              ) : (
                <td className="p-2 border-t border-stale-400 text-red-500">
                  VENTE
                </td>
              )}
              <td className="p-2 border-t border-stale-400">
                {formatPrice(row.unitPrice)}
              </td>
              <td className="p-2 border-t border-stale-400">
                {row.stocksNumber}
              </td>
              <td className="p-2 border-t border-r border-stale-400">
                {formatPrice(row.portfolioValue)} €
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
