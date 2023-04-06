import { getBestTradeStrategy } from "@/services/stockPrice.service";
import { Ledger } from "@/types";

export async function GET(request: Request) {
  try {
    const ledger: Ledger[] = await getBestTradeStrategy();

    return new Response(JSON.stringify(ledger), {
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
