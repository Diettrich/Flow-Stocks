import { AveragePricePerMonth } from "@/types";
import { transformToChartFormat } from "./chart.utils";

describe("transformToChartFormat", () => {
  const googleStock: AveragePricePerMonth[] = [
    { month: "January", monthNumber: 0, averagePrice: 100 },
    { month: "February", monthNumber: 1, averagePrice: 200 },
    { month: "March", monthNumber: 2, averagePrice: 300 },
    { month: "April", monthNumber: 3, averagePrice: 400 },
    { month: "May", monthNumber: 4, averagePrice: 500 },
    { month: "June", monthNumber: 5, averagePrice: 600 },
    { month: "July", monthNumber: 6, averagePrice: 700 },
    { month: "August", monthNumber: 7, averagePrice: 800 },
    { month: "September", monthNumber: 8, averagePrice: 900 },
    { month: "October", monthNumber: 9, averagePrice: 1000 },
    { month: "November", monthNumber: 10, averagePrice: 1100 },
    { month: "December", monthNumber: 11, averagePrice: 1200 },
  ];

  const amazonStock: AveragePricePerMonth[] = [
    { month: "January", monthNumber: 0, averagePrice: 50 },
    { month: "February", monthNumber: 1, averagePrice: 150 },
    { month: "March", monthNumber: 2, averagePrice: 250 },
    { month: "April", monthNumber: 3, averagePrice: 350 },
    { month: "May", monthNumber: 4, averagePrice: 450 },
    { month: "June", monthNumber: 5, averagePrice: 550 },
    { month: "July", monthNumber: 6, averagePrice: 650 },
    { month: "August", monthNumber: 7, averagePrice: 750 },
    { month: "September", monthNumber: 8, averagePrice: 850 },
    { month: "October", monthNumber: 9, averagePrice: 950 },
    { month: "November", monthNumber: 10, averagePrice: 1050 },
    { month: "December", monthNumber: 11, averagePrice: 1150 },
  ];

  it("transforms data to chart format", () => {
    const result = transformToChartFormat(googleStock, amazonStock);

    expect(result).toHaveLength(12);

    result.forEach((dataPoint) => {
      expect(dataPoint).toHaveProperty("month");
      expect(dataPoint).toHaveProperty("google");
      expect(dataPoint).toHaveProperty("amazon");
    });
  });

  it("throws error if data is invalid", () => {
    const invalidAmazonStock: AveragePricePerMonth[] = [
      {
        month: "January",
        monthNumber: 0,
        averagePrice: 50,
      },
      {
        month: "February",
        monthNumber: 1,
        averagePrice: 150,
      },
    ];

    expect(() =>
      transformToChartFormat(googleStock, invalidAmazonStock)
    ).toThrow("Invalid data");
  });
});
