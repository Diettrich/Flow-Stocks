import { StockPrice } from "@/databaseClient";

export type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type AveragePricePerDay = {
  timestamp: Date;
  averagePrice: number;
};

export type AveragePricePerMonth = {
  month: Month;
  monthNumber: number;
  averagePrice: number;
};

export type ChartData = {
  month: Month;
  google: number;
  amazon: number;
};

export type PersonProfitData = {
  bestBuy: StockPrice;
  bestSell: StockPrice;
  profit: number;
};

export type ProfitData = {
  Anouar: PersonProfitData;
  Ayman: PersonProfitData;
};

export enum ACTION {
  BUY = "buy",
  SELL = "sell",
}

export type Ledger = {
  date: string;
  stock: string;
  action: ACTION;
  unitPrice: number;
  stocksNumber: number;
  portfolioValue: number;
};
