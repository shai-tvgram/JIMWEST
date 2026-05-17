import { NextResponse } from "next/server";

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

interface MarketChartResponse {
  prices: [number, number][];
}

interface SimplePrice {
  [id: string]: {
    usd: number;
    usd_24h_change: number;
    usd_24h_vol: number;
    usd_market_cap: number;
  };
}

const COINS = ["bitcoin", "ethereum", "solana", "binancecoin", "avalanche-2"];

// Sample chart data to ~50 points for performance
function samplePoints(data: [number, number][], count: number) {
  if (!data || data.length === 0) return [];
  const step = Math.max(1, Math.floor(data.length / count));
  const sampled = [];
  for (let i = 0; i < data.length; i += step) {
    sampled.push({ time: data[i][0], price: data[i][1] });
  }
  const last = data[data.length - 1];
  if (sampled[sampled.length - 1]?.time !== last[0]) {
    sampled.push({ time: last[0], price: last[1] });
  }
  return sampled;
}

export async function GET() {
  try {
    // Fetch all chart data + prices concurrently
    const chartPromises = COINS.map((id) =>
      fetch(
        `${COINGECKO_BASE}/coins/${id}/market_chart?vs_currency=usd&days=1`,
        { next: { revalidate: 30 } }
      ).then((r) => r.json() as Promise<MarketChartResponse>)
    );

    const pricePromise = fetch(
      `${COINGECKO_BASE}/simple/price?ids=${COINS.join(",")}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`,
      { next: { revalidate: 10 } }
    ).then((r) => r.json() as Promise<SimplePrice>);

    const [btcChart, ethChart, solChart, bnbChart, avaxChart, prices] =
      await Promise.all([...chartPromises, pricePromise]) as [
        MarketChartResponse,
        MarketChartResponse,
        MarketChartResponse,
        MarketChartResponse,
        MarketChartResponse,
        SimplePrice,
      ];

    function buildCoin(
      id: string,
      chart: MarketChartResponse
    ) {
      const p = prices[id];
      return {
        price: p?.usd ?? 0,
        change24h: p?.usd_24h_change ?? 0,
        volume24h: p?.usd_24h_vol ?? 0,
        marketCap: p?.usd_market_cap ?? 0,
        chart: samplePoints(chart.prices ?? [], 50),
      };
    }

    return NextResponse.json({
      bitcoin: buildCoin("bitcoin", btcChart),
      ethereum: buildCoin("ethereum", ethChart),
      solana: buildCoin("solana", solChart),
      binancecoin: buildCoin("binancecoin", bnbChart),
      avalanche: buildCoin("avalanche-2", avaxChart),
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Crypto API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch market data" },
      { status: 500 }
    );
  }
}
