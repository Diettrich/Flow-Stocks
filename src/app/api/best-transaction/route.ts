import {
  getAverageStockPricePerMonth,
  getBestTransaction,
} from "@/services/stockPrice.service";
import { AveragePricePerMonth } from "@/types";
export async function GET(request: Request) {
  // const searchParams: URLSearchParams = new URL(request.url).searchParams;
  // const nameParam: string | null = searchParams.get("name");

  // if (!nameParam || !["amazon", "google"].includes(nameParam)) {
  //     return new Response(JSON.stringify({ error: "Invalid name" }), {
  //         headers: {
  //             "Content-Type": "application/json",
  //         },
  //         status: 400,
  //     });
  // }

  // const name = nameParam as "amazon" | "google";
  //
  // const averageStockPricePerMonth: AveragePricePerMonth[] =
  //     await getAverageStockPricePerMonth(name);

  console.log(await getBestTransaction("google"));

  return new Response('{"test": "test"}', {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
