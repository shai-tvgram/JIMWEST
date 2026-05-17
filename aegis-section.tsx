"use client";

import { useState } from "react";
import {
  Brain,
  Wallet,
  Zap,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Mail,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

// ── Feature cards data ─────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Brain,
    title: "NEURAL SENTIMENT ANALYSIS",
    tag: "AI CORE",
    tagColor: "text-primary border-primary/30 bg-primary/10",
    description:
      "AEGIS deploys transformer-based NLP models trained on 14M+ crypto-native data points -- Twitter, Discord alpha channels, on-chain governance votes, and dark-pool OTC chat logs. It produces a real-time Sentiment Polarity Index that front-runs retail narrative shifts by 4-12 hours.",
    highlights: [
      "Real-time processing of 50K+ social signals per minute",
      "Multi-language sentiment decoding (EN, CN, KR, JP, RU)",
      "Fear & Greed micro-cycle detection with 91.3% accuracy",
      "Automated alert triggers on sentiment divergence events",
    ],
  },
  {
    icon: Wallet,
    title: "WHALE WALLET TRACKING",
    tag: "ON-CHAIN",
    tagColor: "text-accent border-accent/30 bg-accent/10",
    description:
      "Every wallet holding $5M+ in liquid crypto assets is tagged, clustered, and tracked in real time. AEGIS maps wallet-to-wallet fund flows, identifies accumulation patterns before they hit exchange order books, and flags distribution events 6-24 hours before price impact.",
    highlights: [
      "12,400+ tagged whale wallets across 8 chains",
      "Cross-chain flow mapping (ETH, SOL, BNB, AVAX, ARB)",
      "Smart money accumulation/distribution scoring",
      "Exchange deposit spike alerts for early exit signals",
    ],
  },
  {
    icon: Zap,
    title: "HFT EXECUTION NODES",
    tag: "INFRASTRUCTURE",
    tagColor: "text-destructive border-destructive/30 bg-destructive/10",
    description:
      "Co-located execution nodes in Frankfurt, Tokyo, and Singapore connected directly to Binance, Bybit, and dYdX matching engines. Sub-2ms order routing with proprietary slippage minimization algorithms. This is the same infrastructure used by tier-1 prop desks.",
    highlights: [
      "Sub-2ms execution latency on major CEXs",
      "Co-located bare-metal servers in 3 global data centers",
      "Proprietary smart order routing across 14 venues",
      "MEV-protected execution for on-chain DeFi trades",
    ],
  },
];

// ── Performance comparison data ────────────────────────────────────────
const PERFORMANCE_DATA = [
  { metric: "Sentiment\nAccuracy", aegis: 91.3, retail: 52.1 },
  { metric: "Whale\nDetection", aegis: 96.7, retail: 18.4 },
  { metric: "Execution\nSpeed", aegis: 98.5, retail: 34.2 },
  { metric: "Risk\nModeling", aegis: 89.1, retail: 41.6 },
  { metric: "Signal\nPrecision", aegis: 87.4, retail: 29.8 },
  { metric: "Drawdown\nControl", aegis: 92.8, retail: 38.5 },
];

// ── Custom tooltip ─────────────────────────────────────────────────────
function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; fill: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded border border-border bg-card/95 px-4 py-3 shadow-lg backdrop-blur-sm">
      <p className="mb-1.5 font-mono text-xs text-muted-foreground">
        {label?.replace("\n", " ")}
      </p>
      {payload.map((entry) => (
        <p key={entry.name} className="font-mono text-sm font-bold" style={{ color: entry.fill }}>
          {entry.name}: {entry.value}%
        </p>
      ))}
    </div>
  );
}

// ── Section component ──────────────────────────────────────────────────
export function AegisSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section id="aegis" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5">
            <ShieldCheck size={14} className="text-primary" />
            <span className="font-mono text-xs font-bold tracking-widest text-primary">
              SYNTHETIC INTELLIGENCE
            </span>
          </div>
          <h2 className="text-balance font-mono text-3xl font-black tracking-tight text-foreground md:text-4xl lg:text-5xl">
            AEGIS AI:{" "}
            <span className="text-primary">THE QUANT EDGE</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            The proprietary machine-intelligence layer that powers every trade
            signal, risk model, and execution decision inside Jim West&apos;s
            operation. Retail tools guess. AEGIS calculates.
          </p>
        </div>

        {/* ── Feature cards ───────────────────────────────────────── */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible lg:snap-none lg:pb-0">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="min-w-[85vw] shrink-0 snap-center sm:min-w-[70vw] md:min-w-[45vw] lg:min-w-0 lg:shrink"
            >
              <div className="group flex h-full flex-col rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/20">
                {/* Card header */}
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary/50">
                    <feature.icon size={22} className="text-primary" />
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold ${feature.tagColor}`}
                  >
                    {feature.tag}
                  </span>
                </div>

                <h3 className="mb-3 font-mono text-lg font-black tracking-tight text-foreground">
                  {feature.title}
                </h3>

                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>

                {/* Highlights */}
                <div className="mt-auto space-y-2.5 rounded border border-border/50 bg-secondary/30 p-4">
                  {feature.highlights.map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <CheckCircle
                        size={14}
                        className="mt-0.5 shrink-0 text-primary"
                      />
                      <span className="text-xs leading-relaxed text-foreground/80">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Performance comparison chart ─────────────────────── */}
        <div className="mt-20">
          <div className="mb-8 text-center">
            <h3 className="font-mono text-xl font-black tracking-tight text-foreground md:text-2xl">
              PERFORMANCE ACCURACY:{" "}
              <span className="text-primary">AEGIS</span>{" "}
              <span className="text-muted-foreground">vs</span>{" "}
              <span className="text-destructive/80">RETAIL SOFTWARE</span>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Benchmarked across 12 months of live market data. Independent
              audit by Quant Labs Cyprus Ltd.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
            {/* Legend */}
            <div className="mb-6 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-primary" />
                <span className="font-mono text-xs text-muted-foreground">
                  AEGIS AI
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-destructive/60" />
                <span className="font-mono text-xs text-muted-foreground">
                  RETAIL AVG.
                </span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={360}>
              <BarChart
                data={PERFORMANCE_DATA}
                barGap={4}
                barCategoryGap="20%"
                margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
              >
                <XAxis
                  dataKey="metric"
                  stroke="#262626"
                  tick={{
                    fill: "#737373",
                    fontSize: 10,
                    fontFamily: "monospace",
                  }}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                />
                <YAxis
                  domain={[0, 100]}
                  stroke="#262626"
                  tick={{
                    fill: "#525252",
                    fontSize: 10,
                    fontFamily: "monospace",
                  }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `${v}%`}
                  width={40}
                />
                <RechartsTooltip
                  content={<ChartTooltip />}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar dataKey="aegis" name="AEGIS AI" radius={[4, 4, 0, 0]}>
                  {PERFORMANCE_DATA.map((_, i) => (
                    <Cell key={i} fill="#22c55e" />
                  ))}
                </Bar>
                <Bar
                  dataKey="retail"
                  name="RETAIL AVG."
                  radius={[4, 4, 0, 0]}
                >
                  {PERFORMANCE_DATA.map((_, i) => (
                    <Cell key={i} fill="rgba(239,68,68,0.6)" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {/* Stats row beneath chart */}
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border/50 pt-6">
              <div className="text-center">
                <p className="font-mono text-2xl font-black text-primary">
                  2.4x
                </p>
                <p className="font-mono text-[10px] tracking-wider text-muted-foreground">
                  FASTER SIGNAL GENERATION
                </p>
              </div>
              <div className="text-center">
                <p className="font-mono text-2xl font-black text-accent">
                  91.3%
                </p>
                <p className="font-mono text-[10px] tracking-wider text-muted-foreground">
                  SENTIMENT ACCURACY
                </p>
              </div>
              <div className="text-center">
                <p className="font-mono text-2xl font-black text-foreground">
                  {"<"}2ms
                </p>
                <p className="font-mono text-[10px] tracking-wider text-muted-foreground">
                  EXECUTION LATENCY
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Newsletter: The Quant Brief ─────────────────────── */}
        <div className="mt-20">
          <div className="mx-auto max-w-2xl rounded-lg border border-border bg-card/50 p-8 backdrop-blur-sm md:p-10">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5">
                <Mail size={14} className="text-accent" />
                <span className="font-mono text-xs font-bold tracking-widest text-accent">
                  INTEL DISPATCH
                </span>
              </div>
              <h3 className="font-mono text-xl font-black tracking-tight text-foreground md:text-2xl">
                THE QUANT BRIEF
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A weekly encrypted dispatch containing Jim&apos;s highest-conviction
                macro thesis, AEGIS AI signal summaries, and early intelligence
                on upcoming whale rotations. Delivered before the Asian session
                opens every Sunday.
              </p>
            </div>

            {!subscribed ? (
              <form
                onSubmit={handleSubscribe}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your encrypted email"
                  required
                  className="flex-1 rounded-md border border-border bg-input px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="submit"
                  className="animate-neon-pulse flex shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-mono text-sm font-black tracking-wider text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(34,197,94,0.7)]"
                >
                  SUBSCRIBE
                  <ArrowRight size={14} />
                </button>
              </form>
            ) : (
              <div className="mt-8 flex flex-col items-center gap-2 rounded border border-primary/30 bg-primary/5 p-6">
                <CheckCircle size={24} className="text-primary" />
                <p className="font-mono text-sm font-bold text-primary">
                  INTEL LINK ESTABLISHED
                </p>
                <p className="text-center text-xs text-muted-foreground">
                  Your first encrypted dispatch will arrive before the next
                  Asian session opens.
                </p>
              </div>
            )}

            <p className="mt-4 text-center font-mono text-[10px] tracking-wider text-muted-foreground/50">
              256-BIT AES ENCRYPTION &middot; ZERO SPAM POLICY &middot;
              UNSUBSCRIBE ANYTIME
            </p>
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <div className="mt-16 flex justify-center px-4 sm:px-0">
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
            ACCESS AEGIS INTELLIGENCE
          </a>
        </div>
      </div>
    </section>
  );
}
