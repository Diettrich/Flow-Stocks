'use client';
import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartData } from '@/types';

type Props = {
  averagePricePerMonth: ChartData[];
};

export default function Chart({ averagePricePerMonth }: Props) {
  return (
    <div className="pt-20 h-1/2 border-slate-400 border-b-[0.5px] px-4 sm:px-6 lg:px-8 pb-12">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={300} data={averagePricePerMonth}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="google" stroke="#8884d8" />
          <Line type="monotone" dataKey="amazon" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
