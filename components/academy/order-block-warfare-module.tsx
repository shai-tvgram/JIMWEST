"use client";

import { Terminal, Check, BookOpen, Code as Code2, Cpu, Shield, Crosshair, Clock } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

const LESSONS = [
  {
    module: "MODULE 1",
    title: "Python Trading Infrastructure",
    duration: "4h 00m",
    icon: Code2,
    topics: [
      "Setting up your institutional-grade Python trading environment",
      "Exchange API integration (Binance, Bybit, OKX) with failover",
      "WebSocket real-time data streaming architecture",
      "Building a modular bot framework from Jim's base template",
    ],
  },
  {
    module: "MODULE 2",
    title: "Signal Generation & Backtesting",
    duration: "4h 30m",
    icon: Cpu,
    topics: [
      "Converting The Cypriot Squeeze into algorithmic signals",
      "Building a backtesting engine with 3 years of tick-level data",
      "Walk-forward optimization to prevent curve fitting",
      "Statistical validation: Monte Carlo simulations & Sharpe ratios",
    ],
  },
  {
    module: "MODULE 3",
    title: "Risk Management Algorithms",
    duration: "3h 15m",
    icon: Shield,
    topics: [
      "Dynamic position sizing based on volatility regimes",
      "Drawdown circuit breakers and kill-switch implementation",
      "Portfolio-level risk allocation across multiple strategies",
      "Real-time P&L tracking and Telegram alert integration",
    ],
  },
  {
    module: "MODULE 4",
    title: "Autonomous Execution & Deployment",
    duration: "4h 45m",
    icon: Crosshair,
    topics: [
      "Low-latency order execution with smart routing",
      "VPS deployment for 24/7 autonomous operation",
      "Monitoring, logging, and automated recovery systems",
      "Jim's 5 production bots: full source code walkthrough",
    ],
  },
];

const BOT_SCRIPTS = [
  {
    name: "SQUEEZE_HUNTER_v3.py",
    description: "Automated liquidity trap detection and reversal execution",
    winRate: "73.2%",
  },
  {
    name: "LEVIATHAN_FLOW.py",
    description: "Asian session whale-tracking with auto-entry triggers",
    winRate: "68.7%",
  },
  {
    name: "ORDERBLOCK_SNIPER.py",
    description: "Institutional order block detection with multi-TF confluence",
    winRate: "71.4%",
  },
  {
    name: "DELTA_DIVERGENCE.py",
    description: "CVD divergence scanner across 50+ pairs simultaneously",
    winRate: "65.9%",
  },
  {
    name: "PORTFOLIO_SENTINEL.py",
    description: "Risk management overlay with drawdown protection and alerts",
    winRate: "N/A",
  },
];

export function OrderBlockWarfareModule() {
  return (
    <section id="order-block-warfare" className="relative py-24">
      {/* Ambient glow - red for elite module */}
      <div className="pointer-events-none absolute bottom-1/3 left-1/3 h-[500px] w-[600px] rounded-full bg-destructive/3 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-4 py-1.5">
              <Terminal size={14} className="text-destructive" />
              <span className="font-mono text-xs tracking-wider text-destructive">
                ELITE
              </span>
            </div>
            <h2 className="text-balance font-mono text-3xl font-black tracking-tight text-foreground md:text-4xl lg:text-5xl">
              ORDER BLOCK WARFARE
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {"Deploy Jim's proprietary Python scripts for autonomous, emotion-free execution. Full source code access to battle-tested algorithms running on institutional infrastructure."}
            </p>

            <div className="mt-8 flex flex-wrap gap-6">
              {[
                { label: "Total Duration", value: "16.5+ Hours" },
                { label: "Python Scripts", value: "5 Production Bots" },
                { label: "Difficulty", value: "Elite" },
                { label: "Students", value: "87" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded border border-destructive/20 bg-card/50 px-5 py-3 backdrop-blur-sm"
                >
                  <p className="font-mono text-xs tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="font-mono text-lg font-black text-foreground">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Module cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {LESSONS.map((lesson, i) => (
            <ScrollReveal key={lesson.title} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-destructive/30 lg:p-8">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold tracking-widest text-destructive">
                    {lesson.module}
                  </span>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock size={12} />
                    <span className="font-mono text-xs">{lesson.duration}</span>
                  </div>
                </div>

                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-destructive/20 bg-destructive/10">
                    <lesson.icon size={18} className="text-destructive" />
                  </div>
                  <h3 className="font-mono text-lg font-black tracking-tight text-foreground">
                    {lesson.title}
                  </h3>
                </div>

                <ul className="mt-auto flex flex-col gap-2.5">
                  {lesson.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2.5">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0 text-destructive"
                      />
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {topic}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bot scripts showcase */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12">
            <h3 className="mb-6 font-mono text-lg font-black tracking-tight text-foreground">
              INCLUDED PRODUCTION SCRIPTS
            </h3>
            <div className="overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm">
              {BOT_SCRIPTS.map((bot, i) => (
                <div
                  key={bot.name}
                  className={`flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between ${
                    i < BOT_SCRIPTS.length - 1
                      ? "border-b border-border/50"
                      : ""
                  } ${i % 2 === 0 ? "bg-secondary/20" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <Code2
                      size={14}
                      className="shrink-0 text-destructive"
                    />
                    <div>
                      <p className="font-mono text-sm font-bold text-foreground">
                        {bot.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {bot.description}
                      </p>
                    </div>
                  </div>
                  {bot.winRate !== "N/A" ? (
                    <span className="font-mono text-xs font-bold text-primary">
                      WIN RATE: {bot.winRate}
                    </span>
                  ) : (
                    <span className="font-mono text-xs text-muted-foreground">
                      UTILITY
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-10 flex items-start gap-4 rounded-xl border border-destructive/20 bg-destructive/5 p-6">
            <BookOpen
              size={20}
              className="mt-0.5 shrink-0 text-destructive"
            />
            <div>
              <p className="font-mono text-sm font-bold text-foreground">
                KEY OUTCOME
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {"Graduates deploy fully autonomous trading systems that operate 24/7 without emotional interference. Jim's bots have collectively generated $4.2M+ in verified profits across all student accounts in the last 12 months."}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
