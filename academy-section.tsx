"use client";

import {
  useEffect,
  useState,
  useRef,
  type ReactNode,
} from "react";
import { Check, Zap, Brain, Terminal, Crown, Shield, Gem } from "lucide-react";

// ── Course data ────────────────────────────────────────────────────────
const COURSES = [
  {
    title: "The Cypriot Squeeze",
    tag: "MASTERCLASS",
    tagColor: "text-primary border-primary/30 bg-primary/10",
    description:
      "Master the art of liquidity traps and market maker manipulation. Learn to identify and exploit the exact zones where smart money engineers retail liquidation cascades.",
    features: [
      "Liquidity trap identification framework",
      "Market maker order-flow deconstruction",
      "Stop-hunt reversal entries with precision timing",
      "Real-time manipulation alert system access",
      "3 recorded sessions with Jim (12+ hours)",
    ],
    icon: Brain,
    accent: "primary",
  },
  {
    title: "Midnight Leviathan Flow",
    tag: "ADVANCED",
    tagColor: "text-accent border-accent/30 bg-accent/10",
    description:
      "Track whale rotations and institutional order flow during the illiquid Asian sessions. Exploit the time zones where 70% of violent moves originate.",
    features: [
      "Asian session whale-tracking dashboard",
      "Cross-exchange order flow correlation engine",
      "Dark pool volume spike detector",
      "Midnight accumulation pattern recognition",
      "Live Asian session trading room (30 days)",
    ],
    icon: Zap,
    accent: "accent",
  },
  {
    title: "Algorithmic Warfare",
    tag: "ELITE",
    tagColor: "text-destructive border-destructive/30 bg-destructive/10",
    description:
      "Deploy Jim's proprietary Python execution scripts for autonomous, emotion-free trading. Full source code access to battle-tested algorithms running on institutional infrastructure.",
    features: [
      "5 production-grade Python trading bots",
      "Custom backtesting engine with 3 years of data",
      "Low-latency execution API integration",
      "Risk management & position sizing algorithms",
      "Direct 1-on-1 code review with Jim's quant team",
    ],
    icon: Terminal,
    accent: "destructive",
  },
];

// ── Tier comparison data ───────────────────────────────────────────────
const TIERS = [
  {
    name: "QUANT SILVER",
    price: "$2,500",
    icon: Shield,
    color: "text-muted-foreground",
    borderColor: "border-border",
    bgGlow: "",
    features: {
      cypSqueze: true,
      leviathan: false,
      algoWarfare: false,
      liveRoom: "30 Days",
      support: "Community",
      signals: "Delayed (1h)",
      botAccess: false,
      jimDirect: false,
    },
  },
  {
    name: "QUANT GOLD",
    price: "$7,500",
    icon: Crown,
    color: "text-accent",
    borderColor: "border-accent/40",
    bgGlow: "shadow-[0_0_30px_rgba(245,158,11,0.08)]",
    features: {
      cypSqueze: true,
      leviathan: true,
      algoWarfare: false,
      liveRoom: "90 Days",
      support: "Priority",
      signals: "Real-Time",
      botAccess: false,
      jimDirect: false,
    },
  },
  {
    name: "QUANT PLATINUM",
    price: "$25,000",
    icon: Gem,
    color: "text-primary",
    borderColor: "border-primary/40",
    bgGlow: "shadow-[0_0_30px_rgba(34,197,94,0.08)]",
    features: {
      cypSqueze: true,
      leviathan: true,
      algoWarfare: true,
      liveRoom: "Lifetime",
      support: "Direct Line",
      signals: "Real-Time + Pre-Market",
      botAccess: true,
      jimDirect: true,
    },
  },
];

const FEATURE_LABELS: {
  key: keyof (typeof TIERS)[0]["features"];
  label: string;
}[] = [
  { key: "cypSqueze", label: "The Cypriot Squeeze" },
  { key: "leviathan", label: "Midnight Leviathan Flow" },
  { key: "algoWarfare", label: "Algorithmic Warfare" },
  { key: "liveRoom", label: "Live Trading Room" },
  { key: "support", label: "Support Level" },
  { key: "signals", label: "Signal Delivery" },
  { key: "botAccess", label: "Bot Source Code" },
  { key: "jimDirect", label: "Direct Access to Jim" },
];

// ── Reusable fade carousel for mobile ──────────────────────────────────
const ROTATION_MS = 4500;

function FadeCarousel({
  items,
  labels,
}: {
  items: ReactNode[];
  labels: string[];
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % items.length);
      setAnimKey((k) => k + 1);
    }, ROTATION_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, animKey, items.length]);

  useEffect(() => {
    return () => {
      if (resumeRef.current) clearTimeout(resumeRef.current);
    };
  }, []);

  const handleSelect = (index: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (resumeRef.current) clearTimeout(resumeRef.current);
    setPaused(true);
    setActive(index);
    setAnimKey((k) => k + 1);
    resumeRef.current = setTimeout(() => {
      setPaused(false);
      setAnimKey((k) => k + 1);
    }, 10_000);
  };

  return (
    <div className="flex flex-col gap-4 overflow-x-hidden">
      {/* Active card with fade */}
      <div className="relative w-full">
        <div
          key={`${active}-${animKey}`}
          className="w-full animate-in fade-in duration-500"
        >
          {items[active]}
        </div>
      </div>

      {/* Progress indicator bars */}
      <div className="flex items-center gap-2 px-1">
        {labels.map((label, i) => (
          <button
            key={label}
            onClick={() => handleSelect(i)}
            className="group relative flex h-8 flex-1 flex-col items-center justify-end gap-1"
            aria-label={`View ${label}`}
          >
            <span
              className={`font-mono text-[9px] font-bold tracking-wider transition-colors ${
                i === active
                  ? "text-primary"
                  : "text-muted-foreground/50 group-hover:text-muted-foreground"
              }`}
            >
              {label}
            </span>
            <div className="relative h-1 w-full overflow-hidden rounded-full bg-border/50">
              {i === active && (
                <div
                  key={animKey}
                  className="absolute inset-y-0 left-0 rounded-full bg-primary shadow-[0_0_6px_rgba(34,197,94,0.6)]"
                  style={{
                    animation: `radar-fill ${ROTATION_MS}ms linear forwards`,
                  }}
                />
              )}
              {i < active && (
                <div className="absolute inset-y-0 left-0 w-full rounded-full bg-primary/30" />
              )}
            </div>
          </button>
        ))}
      </div>

      {paused && (
        <p className="text-center font-mono text-[10px] tracking-wider text-muted-foreground/50">
          PAUSED &middot; RESUMING IN 10s
        </p>
      )}
    </div>
  );
}

// ── Course card renderer ───────────────────────────────────────────────
function CourseCard({ course }: { course: (typeof COURSES)[number] }) {
  const accentBorder =
    course.accent === "primary"
      ? "hover:border-primary/40"
      : course.accent === "accent"
        ? "hover:border-accent/40"
        : "hover:border-destructive/40";

  return (
    <div
      className={`flex h-full flex-col rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 ${accentBorder} lg:p-8`}
    >
      <div className="mb-5 flex items-center justify-between">
        <span
          className={`rounded-full border px-3 py-1 font-mono text-[10px] font-bold tracking-wider ${course.tagColor}`}
        >
          {course.tag}
        </span>
        <course.icon size={24} className="text-muted-foreground/50" />
      </div>
      <h3 className="mb-3 font-mono text-xl font-black tracking-tight text-foreground lg:text-2xl">
        {course.title}
      </h3>
      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
        {course.description}
      </p>
      <div className="mt-auto">
        <p className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-foreground/60">
          What you&apos;ll unlock:
        </p>
        <ul className="flex flex-col gap-2.5">
          {course.features.map((feat) => (
            <li key={feat} className="flex items-start gap-2.5">
              <Check size={14} className="mt-0.5 shrink-0 text-primary" />
              <span className="text-sm text-muted-foreground">{feat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Tier card renderer (mobile) ────────────────────────────────────────
function TierCard({ tier }: { tier: (typeof TIERS)[number] }) {
  return (
    <div
      className={`rounded-xl border bg-card/50 p-6 backdrop-blur-sm ${tier.borderColor} ${tier.bgGlow}`}
    >
      <div className="mb-4 flex items-center gap-3">
        <tier.icon size={20} className={tier.color} />
        <div>
          <p
            className={`font-mono text-xs font-bold tracking-wider ${tier.color}`}
          >
            {tier.name}
          </p>
          <p className="font-mono text-2xl font-black text-foreground">
            {tier.price}
          </p>
        </div>
      </div>
      <ul className="flex flex-col gap-2.5">
        {FEATURE_LABELS.map((feat) => {
          const val = tier.features[feat.key];
          return (
            <li
              key={feat.key}
              className="flex items-center justify-between border-b border-border/30 pb-2"
            >
              <span className="font-mono text-xs text-muted-foreground">
                {feat.label}
              </span>
              {typeof val === "boolean" ? (
                val ? (
                  <Check size={14} className="text-primary" />
                ) : (
                  <span className="font-mono text-xs text-muted-foreground/40">
                    --
                  </span>
                )
              ) : (
                <span className="font-mono text-xs font-bold text-foreground">
                  {val}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────
export function AcademySection() {
  // Pre-build card arrays for the carousels
  const courseCards = COURSES.map((c) => <CourseCard key={c.title} course={c} />);
  const courseLabels = COURSES.map((c) =>
    c.title === "The Cypriot Squeeze"
      ? "SQUEEZE"
      : c.title === "Midnight Leviathan Flow"
        ? "LEVIATHAN"
        : "WARFARE",
  );

  const tierCards = TIERS.map((t) => <TierCard key={t.name} tier={t} />);
  const tierLabels = TIERS.map((t) =>
    t.name.replace("QUANT ", ""),
  );

  return (
    <section id="academy" className="relative py-24">
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/3 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <Brain size={14} className="text-primary" />
            <span className="font-mono text-xs tracking-wider text-primary">
              ACADEMY BLUEPRINTS
            </span>
          </div>
          <h2 className="text-balance font-mono text-3xl font-black tracking-tight text-foreground md:text-4xl lg:text-5xl">
            THE ACADEMY:{" "}
            <span className="text-primary">WEAPONIZE YOUR TRADING</span>
          </h2>
          <p className="mt-6 text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
            Access the exact quantitative frameworks and algorithmic scripts Jim
            uses to extract millions from the markets.
          </p>
        </div>

        {/* ── Course cards ──────────────────────────────────────────── */}
        {/* Mobile: single-frame fade carousel */}
        <div className="mt-16 md:hidden">
          <FadeCarousel items={courseCards} labels={courseLabels} />
        </div>

        {/* Desktop: 3-column grid */}
        <div className="mt-16 hidden gap-6 md:grid md:grid-cols-3">
          {COURSES.map((course) => (
            <CourseCard key={course.title} course={course} />
          ))}
        </div>

        {/* ── Tier comparison ───────────────────────────────────────── */}
        <div className="mt-20">
          <h3 className="mb-2 text-center font-mono text-xl font-black tracking-tight text-foreground md:text-2xl">
            MEMBERSHIP TIERS
          </h3>
          <p className="mb-10 text-center font-mono text-xs tracking-wider text-muted-foreground">
            CHOOSE YOUR LEVEL OF OPERATIONAL CLEARANCE
          </p>

          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-5 text-left font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Feature
                  </th>
                  {TIERS.map((tier) => (
                    <th
                      key={tier.name}
                      className={`px-6 py-5 text-center ${tier.borderColor === "border-primary/40" ? "bg-primary/5" : ""}`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <tier.icon size={18} className={tier.color} />
                        <span
                          className={`font-mono text-xs font-bold tracking-wider ${tier.color}`}
                        >
                          {tier.name}
                        </span>
                        <span className="font-mono text-lg font-black text-foreground">
                          {tier.price}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURE_LABELS.map((feat, i) => (
                  <tr
                    key={feat.key}
                    className={`border-b border-border/50 ${i % 2 === 0 ? "bg-secondary/20" : ""}`}
                  >
                    <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                      {feat.label}
                    </td>
                    {TIERS.map((tier) => {
                      const val = tier.features[feat.key];
                      return (
                        <td
                          key={tier.name}
                          className={`px-6 py-4 text-center ${tier.borderColor === "border-primary/40" ? "bg-primary/5" : ""}`}
                        >
                          {typeof val === "boolean" ? (
                            val ? (
                              <Check
                                size={16}
                                className="mx-auto text-primary"
                              />
                            ) : (
                              <span className="font-mono text-xs text-muted-foreground/40">
                                --
                              </span>
                            )
                          ) : (
                            <span className="font-mono text-xs font-bold text-foreground">
                              {val}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: single-frame fade carousel for tiers */}
          <div className="md:hidden">
            <FadeCarousel items={tierCards} labels={tierLabels} />
          </div>
        </div>

        {/* ── CTA button ────────────────────────────────────────────── */}
        <div className="mt-16 flex justify-center px-4 sm:px-0">
          <a
            href="#apply"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("apply")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="animate-neon-pulse group relative inline-flex w-full items-center justify-center rounded-lg bg-primary px-12 py-5 font-mono text-sm font-black uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(34,197,94,0.7)] sm:w-auto sm:px-16 sm:text-base"
          >
            GIVE ME THE BLUEPRINTS
          </a>
        </div>
      </div>
    </section>
  );
}
