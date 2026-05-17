"use client";

import {
  Zap,
  Check,
  BookOpen,
  Moon,
  Waves,
  Eye,
  Radar,
  Clock,
} from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

const LESSONS = [
  {
    module: "MODULE 1",
    title: "The Asian Session Advantage",
    duration: "3h 30m",
    icon: Moon,
    topics: [
      "Why 70% of violent crypto moves originate between 00:00-08:00 UTC",
      "Mapping global liquidity handoffs: NYC close to Tokyo open",
      "Low-liquidity exploitation: thinner books = larger moves",
      "Setting up your workspace for overnight monitoring",
    ],
  },
  {
    module: "MODULE 2",
    title: "Whale Rotation Tracking",
    duration: "4h 00m",
    icon: Waves,
    topics: [
      "On-chain whale wallet clustering and labeling",
      "Exchange inflow/outflow spike detection algorithms",
      "Cross-pair correlation: how whales rotate BTC > ETH > ALTs",
      "Building real-time whale alert dashboards with Python",
    ],
  },
  {
    module: "MODULE 3",
    title: "Dark Pool Volume & Hidden Liquidity",
    duration: "3h 15m",
    icon: Eye,
    topics: [
      "Understanding OTC desks and their market impact",
      "Dark pool volume spike detection across 12 exchanges",
      "Correlating dark pool activity with on-chain movements",
      "Front-running institutional block trades legally",
    ],
  },
  {
    module: "MODULE 4",
    title: "The Midnight Accumulation Pattern",
    duration: "3h 50m",
    icon: Radar,
    topics: [
      "Identifying accumulation vs. distribution in low volume",
      "Volume profile analysis during illiquid hours",
      "The Leviathan Signal: Jim's proprietary confluence indicator",
      "Live midnight session recordings with commentary (8 sessions)",
    ],
  },
];

export function MidnightLeviathanModule() {
  return (
    <section id="midnight-leviathan" className="relative py-24">
      {/* Ambient glow - gold/amber for this module */}
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-[500px] w-[600px] rounded-full bg-accent/3 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
              <Zap size={14} className="text-accent" />
              <span className="font-mono text-xs tracking-wider text-accent">
                ADVANCED
              </span>
            </div>
            <h2 className="text-balance font-mono text-3xl font-black tracking-tight text-foreground md:text-4xl lg:text-5xl">
              MIDNIGHT LEVIATHAN FLOW
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Track whale rotations and institutional order flow during the
              illiquid Asian sessions. Exploit the time zones where the biggest
              moves originate while the rest of the market sleeps.
            </p>

            <div className="mt-8 flex flex-wrap gap-6">
              {[
                { label: "Total Duration", value: "14.5+ Hours" },
                { label: "Live Sessions", value: "8 Recorded" },
                { label: "Difficulty", value: "Advanced" },
                { label: "Students", value: "189" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded border border-accent/20 bg-card/50 px-5 py-3 backdrop-blur-sm"
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

        <div className="grid gap-6 md:grid-cols-2">
          {LESSONS.map((lesson, i) => (
            <ScrollReveal key={lesson.title} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/30 lg:p-8">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold tracking-widest text-accent">
                    {lesson.module}
                  </span>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock size={12} />
                    <span className="font-mono text-xs">{lesson.duration}</span>
                  </div>
                </div>

                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10">
                    <lesson.icon size={18} className="text-accent" />
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
                        className="mt-0.5 shrink-0 text-accent"
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

        <ScrollReveal delay={0.3}>
          <div className="mt-10 flex items-start gap-4 rounded-xl border border-accent/20 bg-accent/5 p-6">
            <BookOpen size={20} className="mt-0.5 shrink-0 text-accent" />
            <div>
              <p className="font-mono text-sm font-bold text-foreground">
                KEY OUTCOME
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Graduates of Midnight Leviathan Flow consistently capture
                high-magnitude moves during the illiquid Asian session window,
                turning the hours most traders sleep into their highest-profit
                trading period. Average P&L improvement: +$12,400/month.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
