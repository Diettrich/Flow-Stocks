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
