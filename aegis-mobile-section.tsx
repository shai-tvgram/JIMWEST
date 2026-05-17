"use client";

import {
  Shield,
  Radio,
  Smartphone,
  Lock,
  TrendingUp,
  TrendingDown,
  Activity,
  ArrowRight,
  Fingerprint,
  Signal,
  GripHorizontal,
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

// ── Latency comparison data ────────────────────────────────────────────
const LATENCY_DATA = [
  { name: "Standard\nExchange App", latency: 1.8, color: "rgba(239,68,68,0.5)" },
  { name: "Retail\nTrading Bots", latency: 1.2, color: "rgba(245,158,11,0.6)" },
  { name: "Aegis\nMobile v1.0", latency: 0.3, color: "#22c55e" },
];

// ── Features data ──────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Fingerprint,
    title: "ATOMIC FEEDBACK",
    description:
      "Tactile haptics, heavy UI responses, and military-grade encryption behind FaceID. Every interaction is verified, every tap is deliberate. Zero accidental orders.",
    stats: ["AES-256 Encryption", "FaceID / Biometric Lock", "Haptic Order Confirmation"],
    accent: "primary",
  },
  {
    icon: Signal,
    title: "NEURAL ALERTS",
    description:
      "Proprietary AEGIS AI push notifications streaming trade data 2.4s faster than standard exchange feeds. You see it before the market moves.",
    stats: ["2.4s Faster Than Exchanges", "Priority Push Routing", "Smart Threshold Filters"],
    accent: "accent",
  },
  {
    icon: GripHorizontal,
    title: "THE MOBILE RADAR",
    description:
      "Smooth, touch-optimized horizontal swiping across the 5 assets (BTC, ETH, SOL, BNB, AVAX) built specifically for fast thumb execution in the field.",
    stats: ["5-Asset Swipe Radar", "60fps Touch Scroll", "One-Thumb Execution Mode"],
    accent: "destructive",
  },
];

// ── Latency chart tooltip ──────────────────────────────────────────────
function LatencyTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; payload: { color: string } }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded border border-border bg-card/95 px-4 py-3 shadow-lg backdrop-blur-sm">
      <p className="mb-1 font-mono text-xs text-muted-foreground">
        {label?.replace("\n", " ")}
      </p>
      <p
        className="font-mono text-lg font-black"
        style={{ color: payload[0].payload.color }}
      >
        {payload[0].value}s
      </p>
    </div>
  );
}

// ── Phone mockup component ─────────────────────────────────────────────
function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]">
      {/* Phone frame */}
      <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-zinc-700 bg-black p-2 shadow-[0_0_60px_rgba(34,197,94,0.15)]">
        {/* Inner bezel */}
        <div className="relative overflow-hidden rounded-[2rem] bg-black">
          {/* Notch */}
          <div className="relative z-10 mx-auto h-7 w-28 rounded-b-2xl bg-black" />

          {/* Screen content */}
          <div className="relative -mt-3 space-y-3 px-3 pb-6 pt-1">
            {/* Status bar */}
            <div className="flex items-center justify-between px-1 pt-1">
              <span className="font-mono text-[9px] text-muted-foreground">9:41</span>
              <div className="flex items-center gap-1">
                <Signal size={10} className="text-primary" />
                <Activity size={10} className="text-muted-foreground" />
                <div className="h-2.5 w-5 rounded-sm border border-primary/60 p-px">
                  <div className="h-full w-3/4 rounded-[1px] bg-primary" />
                </div>
              </div>
            </div>

            {/* App header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[8px] tracking-widest text-muted-foreground">
                  AEGIS TERMINAL
                </p>
                <p className="font-mono text-xs font-black text-foreground">
                  WAR ROOM
                </p>
              </div>
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
                <Lock size={11} className="text-primary" />
              </div>
            </div>

            {/* Portfolio value */}
            <div className="rounded-lg border border-border/60 bg-card/80 p-3">
              <p className="font-mono text-[8px] tracking-widest text-muted-foreground">
                PORTFOLIO VALUE
              </p>
              <p className="font-mono text-lg font-black text-foreground">
                $2,847,621
              </p>
              <div className="mt-1 flex items-center gap-1">
                <TrendingUp size={10} className="text-primary" />
                <span className="font-mono text-[9px] font-bold text-primary">
                  +12.4%
                </span>
                <span className="font-mono text-[8px] text-muted-foreground">
                  24H
                </span>
              </div>
            </div>

            {/* Asset radar row */}
            <div className="flex gap-2 overflow-hidden">
              {[
                { sym: "BTC", price: "$64,235", change: "+2.4%", up: true },
                { sym: "ETH", price: "$3,412", change: "-0.8%", up: false },
                { sym: "SOL", price: "$142.5", change: "+5.1%", up: true },
              ].map((a) => (
                <div
                  key={a.sym}
                  className="flex-1 rounded-md border border-border/50 bg-secondary/50 p-2"
                >
                  <p className="font-mono text-[8px] font-bold text-foreground">
                    {a.sym}
                  </p>
                  <p className="font-mono text-[9px] text-muted-foreground">
                    {a.price}
                  </p>
                  <p
                    className={`font-mono text-[8px] font-bold ${
                      a.up ? "text-primary" : "text-destructive"
                    }`}
                  >
                    {a.change}
                  </p>
                </div>
              ))}
            </div>

            {/* Signal alerts */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 rounded-md border border-primary/30 bg-primary/5 px-2.5 py-1.5">
                <TrendingUp size={10} className="shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="truncate font-mono text-[8px] font-bold text-primary">
                    BUY SIGNAL: BTC/USDT
                  </p>
                  <p className="truncate font-mono text-[7px] text-muted-foreground">
                    Neural confidence: 94.2%
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-2.5 py-1.5">
                <TrendingDown size={10} className="shrink-0 text-destructive" />
                <div className="min-w-0">
                  <p className="truncate font-mono text-[8px] font-bold text-destructive">
                    SELL ALERT: AVAX/USDT
                  </p>
                  <p className="truncate font-mono text-[7px] text-muted-foreground">
                    Whale distribution detected
                  </p>
                </div>
              </div>
            </div>

            {/* Biometric bar */}
            <div className="flex items-center justify-center gap-2 rounded-full border border-border/40 bg-secondary/30 py-2">
              <Fingerprint size={12} className="text-primary" />
              <span className="font-mono text-[8px] tracking-wider text-muted-foreground">
                BIOMETRIC VERIFIED
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Glow effects */}
      <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-gradient-to-b from-primary/5 via-transparent to-primary/5 blur-2xl" />
    </div>
  );
}

// ── Main section ───────────────────────────────────────────────────────
export function AegisMobileSection() {
  return (
    <section id="aegis-mobile" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5">
            <Smartphone size={14} className="text-primary" />
            <span className="font-mono text-xs font-bold tracking-widest text-primary">
              MOBILE COMMAND
            </span>
          </div>
          <h2 className="text-balance font-mono text-3xl font-black tracking-tight text-foreground md:text-4xl lg:text-5xl">
            AEGIS TERMINAL{" "}
            <span className="text-primary">//</span>{" "}
            <span className="text-primary">POCKET WAR ROOM</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            Institutional intelligence. Zero-latency access. Jim West in your
            pocket.
          </p>
        </div>

        {/* ── Phone mockup + features grid ───────────────────────── */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: phone mockup */}
          <div className="flex justify-center">
            <PhoneMockup />
          </div>

          {/* Right: feature cards */}
          <div className="flex flex-col gap-5">
            {FEATURES.map((feature) => {
              const accentMap: Record<string, { border: string; icon: string; stat: string }> = {
                primary: {
                  border: "hover:border-primary/30",
                  icon: "text-primary",
                  stat: "text-primary",
                },
                accent: {
                  border: "hover:border-accent/30",
                  icon: "text-accent",
                  stat: "text-accent",
                },
                destructive: {
                  border: "hover:border-destructive/30",
                  icon: "text-destructive",
                  stat: "text-destructive",
                },
              };
              const colors = accentMap[feature.accent] ?? accentMap.primary;

              return (
                <div
                  key={feature.title}
                  className={`group rounded-lg border border-border bg-card/50 p-5 backdrop-blur-sm transition-all ${colors.border}`}
                >
                  <div className="mb-3 flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary/50">
                      <feature.icon size={20} className={colors.icon} />
                    </div>
                    <div>
                      <h3 className="font-mono text-base font-black tracking-tight text-foreground">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <div className="ml-15 flex flex-wrap gap-2 pl-15">
                    {feature.stats.map((stat) => (
                      <span
                        key={stat}
                        className={`rounded border border-border/50 bg-secondary/30 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider ${colors.stat}`}
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Live Latency Delta Chart ───────────────────────────── */}
        <div className="mt-20">
          <div className="mb-8 text-center">
            <h3 className="font-mono text-xl font-black tracking-tight text-foreground md:text-2xl">
              EXECUTION LATENCY:{" "}
              <span className="text-primary">SPEED KILLS</span>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Data execution speed comparison across mobile trading platforms.
              Benchmarked under live market conditions.
            </p>
          </div>

          <div className="mx-auto max-w-3xl rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={LATENCY_DATA}
                layout="vertical"
                margin={{ top: 8, right: 40, bottom: 8, left: 8 }}
                barSize={36}
              >
                <XAxis
                  type="number"
                  domain={[0, 2]}
                  stroke="#262626"
                  tick={{
                    fill: "#525252",
                    fontSize: 10,
                    fontFamily: "monospace",
                  }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `${v}s`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#262626"
                  tick={{
                    fill: "#737373",
                    fontSize: 11,
                    fontFamily: "monospace",
                  }}
                  axisLine={false}
                  tickLine={false}
                  width={100}
                />
                <RechartsTooltip
                  content={<LatencyTooltip />}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar dataKey="latency" radius={[0, 6, 6, 0]}>
                  {LATENCY_DATA.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.color}
                      style={
                        entry.name.includes("Aegis")
                          ? {
                              filter:
                                "drop-shadow(0 0 8px rgba(34,197,94,0.5))",
                            }
                          : undefined
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {/* Inline stat callout */}
            <div className="mt-4 flex items-center justify-center gap-3 border-t border-border/50 pt-4">
              <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
                AEGIS ADVANTAGE:
              </span>
              <span className="font-mono text-lg font-black text-primary">
                6x FASTER
              </span>
              <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
                THAN STANDARD APPS
              </span>
            </div>
          </div>
        </div>

        {/* ── CTA ────────────────────────────────────────────────── */}
        <div className="mt-16 flex flex-col items-center gap-4 px-4 sm:px-0">
          <a
            href="#apply"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("apply")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="animate-neon-pulse group relative inline-flex w-full items-center justify-center gap-3 rounded-lg bg-primary px-10 py-5 font-mono text-sm font-black uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(34,197,94,0.7)] sm:w-auto sm:px-16 sm:text-base"
          >
            <Shield size={18} />
            SECURE BETA ACCESS TOKEN
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <p className="font-mono text-[10px] tracking-widest text-muted-foreground/40">
            SYSTEM_ACCESS_TOKEN: JIMWEST_MOBILE_2026{" "}
            <span className="text-primary/40">//</span> STATUS:{" "}
            <span className="text-accent/60">CLOSED BETA</span>
          </p>
        </div>
      </div>
    </section>
  );
}
