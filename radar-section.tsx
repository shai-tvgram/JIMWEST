"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { TrendingUp, TrendingDown, Activity, Lock } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";

// ── Types ──────────────────────────────────────────────────────────────
interface ChartPoint {
  time: number;
  price: number;
}

interface CoinData {
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  chart: ChartPoint[];
}

interface CryptoResponse {
  bitcoin: CoinData;
  ethereum: CoinData;
  solana: CoinData;
  binancecoin: CoinData;
  avalanche: CoinData;
  timestamp: number;
}

// ── Asset config ───────────────────────────────────────────────────────
const ASSETS: {
  key: keyof Omit<CryptoResponse, "timestamp">;
  symbol: string;
  pair: string;
  label: string;
  badge: string;
  commentary: string;
}[] = [
  {
    key: "bitcoin",
    symbol: "BTC",
    pair: "BTC/USDT",
    label: "MARKET ALPHA",
    badge: "HIGH CONVICTION",
    commentary:
      "Wall Street short orders stacked at key resistance. Violent squeeze imminent during Asian session. Smart money accumulation detected on-chain.",
  },
  {
    key: "ethereum",
    symbol: "ETH",
    pair: "ETH/USDT",
    label: "INSTITUTIONAL LIQUIDITY",
    badge: "CORE POSITION",
    commentary:
      "ETF inflows accelerating while exchange reserves hit 5-year lows. Institutional smart contracts deploying massive staking positions. Supply shock forming.",
  },
  {
    key: "solana",
    symbol: "SOL",
    pair: "SOL/USDT",
    label: "HIGH VOLATILITY DEGEN HUNT",
    badge: "HIGH VOLATILITY",
    commentary:
      "Whale distribution detected. Engineering a retail flush before next accumulation phase. DeFi TVL metrics indicate hidden institutional rotation.",
  },
  {
    key: "binancecoin",
    symbol: "BNB",
    pair: "BNB/USDT",
    label: "EXCHANGE WHALE TRACKING",
    badge: "ACCUMULATION",
    commentary:
      "Exchange token cold-wallet accumulation detected. Whales are preparing for a massive launchpad absorption. Direction: ACCUMULATING.",
  },
  {
    key: "avalanche",
    symbol: "AVAX",
    pair: "AVAX/USDT",
    label: "ALGORITHMIC ANOMALY",
    badge: "BREAKOUT WATCH",
    commentary:
      "Subnet volume shrinking while open interest spikes. A violent volatility expansion is being compressed. Direction: BREAKOUT IMMINENT.",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────
function formatPrice(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatCompact(n: number) {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  return formatPrice(n);
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// ── Countdown hook ─────────────────────────────────────────────────────
function useCountdown(resetSignal: number) {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    setSeconds(10);
  }, [resetSignal]);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s <= 0 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return seconds;
}

// ── Custom tooltip ─────────────────────────────────────────────────────
function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: number;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded border border-border bg-card/95 px-3 py-2 shadow-lg backdrop-blur-sm">
      <p className="font-mono text-[10px] text-muted-foreground">
        {label ? formatTime(label) : ""}
      </p>
      <p className="font-mono text-sm font-bold text-foreground">
        {formatPrice(payload[0].value)}
      </p>
    </div>
  );
}

// ── Live chart card ────────────────────────────────────────────────────
function LiveChartCard({
  symbol,
  pair,
  label,
  data,
  badge,
  commentary,
}: {
  symbol: string;
  pair: string;
  label: string;
  data: CoinData | null;
  badge: string;
  commentary: string;
}) {
  const isPositive = (data?.change24h ?? 0) >= 0;
  const lineColor = isPositive ? "#22c55e" : "#ef4444";
  const direction = isPositive ? "LONG" : "SHORT";

  const chartConfig = {
    price: { label: "Price", color: lineColor },
  };

  // Loading skeleton
  if (!data) {
    return (
      <div className="group rounded-lg border border-border bg-card/50 p-5 backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <div className="h-4 w-8 animate-pulse rounded bg-primary/30" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-20 animate-pulse rounded bg-border" />
              <div className="h-3 w-16 animate-pulse rounded bg-border/50" />
            </div>
          </div>
        </div>
        <div className="flex h-[180px] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_8px_2px_rgba(34,197,94,0.5)]" />
            <p className="animate-pulse font-mono text-xs tracking-wider text-primary/70">
              CONNECTING TO EXCHANGE NODE...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const tickFormatter = (v: number) => {
    if (v >= 10000) return `${(v / 1000).toFixed(1)}k`;
    if (v >= 100) return `$${v.toFixed(0)}`;
    return `$${v.toFixed(2)}`;
  };

  return (
    <div
      className={`group rounded-lg border bg-card/50 p-5 backdrop-blur-sm transition-all ${
        isPositive
          ? "border-border hover:border-primary/30"
          : "border-border hover:border-destructive/30"
      }`}
    >
      {/* Header */}
      <div className="mb-1 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 overflow-hidden">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${
              isPositive
                ? "bg-primary/10 text-primary"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {symbol}
          </div>
          <div className="min-w-0">
            <p className="truncate font-mono text-sm font-bold text-foreground">
              {pair}
            </p>
            <p className="truncate font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold ${
            isPositive
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-destructive/30 bg-destructive/10 text-destructive"
          }`}
        >
          {badge}
        </span>
      </div>

      {/* Live price */}
      <div className="mb-2 flex items-baseline gap-2">
        <span
          className={`font-mono text-2xl font-black tracking-tight lg:text-3xl ${
            isPositive ? "text-primary" : "text-destructive"
          }`}
        >
          {formatPrice(data.price)}
        </span>
        <span
          className={`font-mono text-xs font-bold ${
            isPositive ? "text-primary" : "text-destructive"
          }`}
        >
          {isPositive ? "+" : ""}
          {data.change24h.toFixed(2)}%
        </span>
      </div>

      {/* Volume */}
      <p className="mb-3 font-mono text-[10px] text-muted-foreground">
        24H VOL: {formatCompact(data.volume24h)} &middot; MCAP:{" "}
        {formatCompact(data.marketCap)}
      </p>

      {/* Recharts area chart */}
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[180px] w-full"
      >
        <AreaChart
          data={data.chart}
          margin={{ top: 4, right: 4, bottom: 0, left: 4 }}
        >
          <defs>
            <linearGradient id={`fill-${symbol}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={lineColor} stopOpacity={0.25} />
              <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            tickFormatter={formatTime}
            stroke="#262626"
            tick={{ fill: "#525252", fontSize: 10, fontFamily: "monospace" }}
            axisLine={false}
            tickLine={false}
            minTickGap={40}
          />
          <YAxis
            domain={["auto", "auto"]}
            stroke="#262626"
            tick={{ fill: "#525252", fontSize: 10, fontFamily: "monospace" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={tickFormatter}
            width={48}
          />
          <RechartsTooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#404040", strokeDasharray: "4 4" }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={lineColor}
            strokeWidth={2}
            fill={`url(#fill-${symbol})`}
            dot={false}
            activeDot={{
              r: 4,
              fill: lineColor,
              stroke: "#000",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ChartContainer>

      {/* Commentary */}
      <div className="mt-3 rounded border border-border/50 bg-secondary/30 p-3">
        <p className="text-xs leading-relaxed text-muted-foreground">
          {commentary}
        </p>
        <div
          className={`mt-2 flex items-center gap-2 ${
            isPositive ? "text-primary" : "text-destructive"
          }`}
        >
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span className="font-mono text-xs font-bold">
            Direction: {direction}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Mobile auto-rotating carousel ──────────────────────────────────────
const ROTATION_MS = 4500;

function MobileCardCarousel({
  data,
}: {
  data: CryptoResponse | null;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-rotation
  useEffect(() => {
    if (paused) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % ASSETS.length);
      setAnimKey((k) => k + 1);
    }, ROTATION_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, animKey]);

  // Reset animation key when index changes (including auto-advance)
  // handled inline

  const handleManualSelect = (index: number) => {
    // Clear existing timers
    if (timerRef.current) clearInterval(timerRef.current);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);

    setPaused(true);
    setActiveIndex(index);
    setAnimKey((k) => k + 1);

    // Resume auto-rotation after 10 seconds of inactivity
    resumeTimeoutRef.current = setTimeout(() => {
      setPaused(false);
      setAnimKey((k) => k + 1);
    }, 10_000);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const asset = ASSETS[activeIndex];

  return (
    <div className="flex flex-col gap-4">
      {/* Progress indicator bars */}
      <div className="flex items-center gap-2 px-1">
        {ASSETS.map((a, i) => (
          <button
            key={a.key}
            onClick={() => handleManualSelect(i)}
            className="group relative flex h-8 flex-1 flex-col items-center justify-end gap-1"
            aria-label={`View ${a.symbol} chart`}
          >
            {/* Symbol label */}
            <span
              className={`font-mono text-[9px] font-bold tracking-wider transition-colors ${
                i === activeIndex
                  ? "text-primary"
                  : "text-muted-foreground/50 group-hover:text-muted-foreground"
              }`}
            >
              {a.symbol}
            </span>
            {/* Progress bar track */}
            <div className="relative h-1 w-full overflow-hidden rounded-full bg-border/50">
              {i === activeIndex && (
                <div
                  key={animKey}
                  className="absolute inset-y-0 left-0 rounded-full bg-primary shadow-[0_0_6px_rgba(34,197,94,0.6)]"
                  style={{
                    animation: `radar-fill ${ROTATION_MS}ms linear forwards`,
                  }}
                />
              )}
              {i < activeIndex && (
                <div className="absolute inset-y-0 left-0 w-full rounded-full bg-primary/30" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Active card */}
      <div className="w-full">
        <LiveChartCard
          symbol={asset.symbol}
          pair={asset.pair}
          label={asset.label}
          data={data?.[asset.key] ?? null}
          badge={asset.badge}
          commentary={asset.commentary}
        />
      </div>

      {/* Paused indicator */}
      {paused && (
        <p className="text-center font-mono text-[10px] tracking-wider text-muted-foreground/50">
          AUTO-ROTATION PAUSED &middot; RESUMING IN 10s
        </p>
      )}
    </div>
  );
}

// ── Main section ───────────────────────────────────────────────────────
export function RadarSection() {
  const [data, setData] = useState<CryptoResponse | null>(null);
  const [error, setError] = useState(false);
  const [fetchCount, setFetchCount] = useState(0);
  const countdown = useCountdown(fetchCount);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/crypto");
      if (!res.ok) throw new Error("API error");
      const json: CryptoResponse = await res.json();
      setData(json);
      setError(false);
      setFetchCount((c) => c + 1);
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 10_000);
    return () => clearInterval(id);
  }, [fetchData]);

  return (
    <section id="radar" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <h2 className="font-mono text-2xl font-black tracking-tight text-foreground md:text-3xl">
              THE 24-HOUR RADAR
            </h2>
            <div className="flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1">
              <div className="h-2 w-2 rounded-full bg-destructive animate-pulse-glow" />
              <span className="font-mono text-xs font-bold tracking-wider text-destructive">
                LIVE
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded border border-border bg-card px-4 py-2">
            <Activity size={14} className="text-muted-foreground" />
            <span className="font-mono text-xs text-muted-foreground">
              NEXT REFRESH:
            </span>
            <span className="font-mono text-sm font-bold text-primary">
              {String(countdown).padStart(2, "0")}s
            </span>
          </div>
        </div>

        {/* Error banner */}
        {error && data === null && (
          <div className="mb-6 flex items-center gap-3 rounded border border-destructive/30 bg-destructive/10 px-4 py-3">
            <Lock size={14} className="text-destructive" />
            <p className="font-mono text-xs text-destructive">
              EXCHANGE NODE UNREACHABLE. RETRYING IN 10s...
            </p>
          </div>
        )}

        {/* Mobile: single-card auto-rotating carousel */}
        <div className="lg:hidden">
          <MobileCardCarousel data={data} />
        </div>

        {/* Desktop: full grid layout */}
        <div className="hidden gap-6 lg:grid lg:grid-cols-3">
          {ASSETS.map((asset) => (
            <LiveChartCard
              key={asset.key}
              symbol={asset.symbol}
              pair={asset.pair}
              label={asset.label}
              data={data?.[asset.key] ?? null}
              badge={asset.badge}
              commentary={asset.commentary}
            />
          ))}
        </div>

        {/* Market cap footer */}
        {data && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded border border-border/50 bg-card/30 px-4 py-3">
            {ASSETS.map((asset) => {
              const coinData = data[asset.key];
              if (!coinData) return null;
              return (
                <span
                  key={asset.key}
                  className="font-mono text-[10px] tracking-wider text-muted-foreground"
                >
                  {asset.symbol} MCAP:{" "}
                  <span className="text-foreground">
                    {formatCompact(coinData.marketCap)}
                  </span>
                </span>
              );
            })}
            <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
              LAST UPDATE:{" "}
              <span className="text-primary">
                {new Date(data.timestamp).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })}
              </span>
            </span>
          </div>
        )}

        {/* CTA button */}
        <div className="mt-8 flex justify-center px-4 sm:px-0">
          <a
            href="#apply"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("apply")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="animate-neon-pulse group relative inline-flex w-full items-center justify-center rounded-lg bg-primary px-10 py-4 font-mono text-sm font-black uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(34,197,94,0.7)] sm:w-auto sm:px-14 sm:text-base"
          >
            SECURE ACCESS NOW
          </a>
        </div>
      </div>
    </section>
  );
}
