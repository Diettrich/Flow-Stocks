import { getBestTradeStrategy } from "@/services/stockPrice.service";
import { Ledger } from "@/types";

export async function GET(request: Request) {
  try {
    let start = performance.now();
    const ledger: Ledger[] = await getBestTradeStrategy();
    let end = performance.now();
    const executionTime = end - start;

    return new Response(JSON.stringify({ ledger, executionTime }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
