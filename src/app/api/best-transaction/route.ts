import { getBestTransaction } from '@/services/stockPrice.service';
import { ProfitData } from '@/types';

export async function GET() {
  try {
    const response: ProfitData = await getBestTransaction();

    return new Response(JSON.stringify(response), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    console.error(e);

    return new Response(JSON.stringify(e), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
}
