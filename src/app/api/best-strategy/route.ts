import { getBestTradeStrategy } from '@/services/stockPrice.service';
import { Ledger } from '@/types';

export async function GET() {
  try {
    const start = performance.now();
    const ledger: Ledger[] = await getBestTradeStrategy();
    const end = performance.now();
    const executionTime = end - start;

    return new Response(JSON.stringify({ ledger, executionTime }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
}
