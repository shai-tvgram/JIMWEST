"use client";

import {
  Brain,
  Check,
  BookOpen,
  Target,
  TrendingDown,
  AlertTriangle,
  BarChart3,
  Clock,
} from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

const LESSONS = [
  {
    module: "MODULE 1",
    title: "The Anatomy of a Liquidity Trap",
    duration: "3h 45m",
    icon: Target,
    topics: [
      "Identifying engineered support/resistance zones",
      "How market makers build false liquidity walls",
      "Reading the DOM (Depth of Market) for hidden intent",
      "Case study: BTC $42K liquidity vacuum (Jan 2024)",
    ],
  },
  {
    module: "MODULE 2",
    title: "Stop-Hunt Mechanics & Reversal Entries",
    duration: "4h 10m",
    icon: TrendingDown,
    topics: [
      "The psychology behind retail stop placement",
      "Mapping stop-loss clusters with heat maps",
      "Precision entry after the sweep: the 15-second window",
      "Multi-timeframe confluence for high-probability reversals",
    ],
  },
  {
    module: "MODULE 3",
    title: "Market Maker Order Flow Deconstruction",
    duration: "3h 20m",
    icon: BarChart3,
    topics: [
      "Reading CVD (Cumulative Volume Delta) divergences",
      "Spoofing detection and front-running institutional flow",
      "Footprint chart mastery for real-time manipulation signals",
      "Building your personal manipulation alert dashboard",
    ],
  },
  {
    module: "MODULE 4",
    title: "The Cypriot Execution Framework",
    duration: "2h 55m",
    icon: AlertTriangle,
    topics: [
      "Jim's personal 7-step entry checklist",
      "Position sizing based on liquidation cascade probability",
      "Risk management: the 2% rule adapted for squeeze plays",
      "Live trade recordings with real-time commentary (5 sessions)",
    ],
  },
];

export function CypriotSqueezeModule() {
  return (
    <section id="cypriot-squeeze" className="relative py-24">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/4 h-[500px] w-[600px] rounded-full bg-primary/3 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <ScrollReveal>
          {/* Section header */}
          <div className="mb-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
              <Brain size={14} className="text-primary" />
              <span className="font-mono text-xs tracking-wider text-primary">
                MASTERCLASS
              </span>
            </div>
            <h2 className="text-balance font-mono text-3xl font-black tracking-tight text-foreground md:text-4xl lg:text-5xl">
              THE CYPRIOT SQUEEZE
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Master the art of liquidity traps and market maker manipulation.
              Learn to identify and exploit the exact zones where smart money
              engineers retail liquidation cascades.
            </p>

            {/* Stats row */}
            <div className="mt-8 flex flex-wrap gap-6">
              {[
                { label: "Total Duration", value: "14+ Hours" },
                { label: "Live Sessions", value: "5 Recorded" },
                { label: "Difficulty", value: "Intermediate" },
                { label: "Students", value: "347" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded border border-border bg-card/50 px-5 py-3 backdrop-blur-sm"
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
              <div className="flex h-full flex-col rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 lg:p-8">
                {/* Module header */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold tracking-widest text-primary">
                    {lesson.module}
                  </span>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock size={12} />
                    <span className="font-mono text-xs">{lesson.duration}</span>
                  </div>
                </div>

                {/* Icon + title */}
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                    <lesson.icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-mono text-lg font-black tracking-tight text-foreground">
                    {lesson.title}
                  </h3>
                </div>

                {/* Topics */}
                <ul className="mt-auto flex flex-col gap-2.5">
                  {lesson.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2.5">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0 text-primary"
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

        {/* Key takeaway */}
        <ScrollReveal delay={0.3}>
          <div className="mt-10 flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/5 p-6">
            <BookOpen size={20} className="mt-0.5 shrink-0 text-primary" />
            <div>
              <p className="font-mono text-sm font-bold text-foreground">
                KEY OUTCOME
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                After completing The Cypriot Squeeze, you will be able to
                identify, anticipate, and profit from the exact manipulation
                events that liquidate 90% of retail traders. Average student
                win-rate improvement: +34%.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
