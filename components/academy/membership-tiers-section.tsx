"use client";

import { Check, Shield, Crown, Gem } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

const TIERS = [
  {
    name: "QUANT SILVER",
    price: "$2,500",
    period: "one-time",
    icon: Shield,
    color: "text-muted-foreground",
    borderColor: "border-border",
    bgGlow: "",
    highlighted: false,
    features: {
      cypriotSqueeze: true,
      midnightLeviathan: false,
      orderBlockWarfare: false,
      liveRoom: "30 Days",
      support: "Community Discord",
      signals: "Delayed (1h)",
      botAccess: false,
      jimDirect: false,
      codeReview: false,
      backtestData: "1 Year",
    },
  },
  {
    name: "QUANT GOLD",
    price: "$7,500",
    period: "one-time",
    icon: Crown,
    color: "text-accent",
    borderColor: "border-accent/40",
    bgGlow: "shadow-[0_0_40px_rgba(245,158,11,0.06)]",
    highlighted: false,
    features: {
      cypriotSqueeze: true,
      midnightLeviathan: true,
      orderBlockWarfare: false,
      liveRoom: "90 Days",
      support: "Priority Ticket",
      signals: "Real-Time",
      botAccess: false,
      jimDirect: false,
      codeReview: false,
      backtestData: "2 Years",
    },
  },
  {
    name: "QUANT PLATINUM",
    price: "$25,000",
    period: "one-time",
    icon: Gem,
    color: "text-primary",
    borderColor: "border-primary/40",
    bgGlow: "shadow-[0_0_40px_rgba(34,197,94,0.08)]",
    highlighted: true,
    features: {
      cypriotSqueeze: true,
      midnightLeviathan: true,
      orderBlockWarfare: true,
      liveRoom: "Lifetime",
      support: "Direct Line",
      signals: "Real-Time + Pre-Market",
      botAccess: true,
      jimDirect: true,
      codeReview: true,
      backtestData: "3 Years (Full)",
    },
  },
];

const FEATURE_LABELS: {
  key: keyof (typeof TIERS)[0]["features"];
  label: string;
}[] = [
  { key: "cypriotSqueeze", label: "The Cypriot Squeeze" },
  { key: "midnightLeviathan", label: "Midnight Leviathan Flow" },
  { key: "orderBlockWarfare", label: "Order Block Warfare" },
  { key: "liveRoom", label: "Live Trading Room" },
  { key: "support", label: "Support Level" },
  { key: "signals", label: "Signal Delivery" },
  { key: "botAccess", label: "Bot Source Code" },
  { key: "jimDirect", label: "Direct Admin Access" },
  { key: "codeReview", label: "1-on-1 Code Review" },
  { key: "backtestData", label: "Backtest Data Access" },
];

export function MembershipTiersSection() {
  return (
    <section id="tiers" className="relative py-24">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/3 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-mono text-3xl font-black tracking-tight text-foreground md:text-4xl lg:text-5xl">
              MEMBERSHIP TIERS
            </h2>
            <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
              Choose your level of operational clearance. Each tier is a
              permanent, one-time investment in your trading arsenal.
            </p>
          </div>
        </ScrollReveal>

        {/* Desktop table */}
        <ScrollReveal delay={0.15}>
          <div className="mt-14 hidden overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-6 text-left font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Feature
                  </th>
                  {TIERS.map((tier) => (
                    <th
                      key={tier.name}
                      className={`px-6 py-6 text-center ${tier.highlighted ? "bg-primary/5" : ""}`}
                    >
                      <div className="flex flex-col items-center gap-1.5">
                        <tier.icon size={22} className={tier.color} />
                        <span
                          className={`font-mono text-xs font-bold tracking-wider ${tier.color}`}
                        >
                          {tier.name}
                        </span>
                        <span className="font-mono text-2xl font-black text-foreground">
                          {tier.price}
                        </span>
                        <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
                          {tier.period.toUpperCase()}
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
                          className={`px-6 py-4 text-center ${tier.highlighted ? "bg-primary/5" : ""}`}
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
        </ScrollReveal>

        {/* Mobile tier cards -- horizontal scroll */}
        <div className="mt-14 flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 md:hidden">
          {TIERS.map((tier) => (
            <ScrollReveal key={tier.name}>
              <div
                className={`min-w-[85vw] shrink-0 snap-center rounded-xl border bg-card/50 p-6 backdrop-blur-sm ${tier.borderColor} ${tier.bgGlow}`}
              >
                <div className="mb-5 flex items-center gap-3">
                  <tier.icon size={24} className={tier.color} />
                  <div>
                    <p
                      className={`font-mono text-xs font-bold tracking-wider ${tier.color}`}
                    >
                      {tier.name}
                    </p>
                    <p className="font-mono text-2xl font-black text-foreground">
                      {tier.price}
                    </p>
                    <p className="font-mono text-[10px] tracking-wider text-muted-foreground">
                      {tier.period.toUpperCase()}
                    </p>
                  </div>
                </div>
                <ul className="flex flex-col gap-3">
                  {FEATURE_LABELS.map((feat) => {
                    const val = tier.features[feat.key];
                    return (
                      <li
                        key={feat.key}
                        className="flex items-center justify-between border-b border-border/30 pb-2.5"
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
                <a
                  href="https://wa.me/447459309730?text=System%20Initialized.%20I%20want%20to%20unlock%20my%20proprietary%20allocation%20and%20receive%20personal%20quant%20insights.%20My%20profile%20is%20ready."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-5 block rounded-md border px-4 py-2.5 text-center font-mono text-xs font-bold tracking-wider transition-all ${
                    tier.highlighted
                      ? "animate-neon-pulse border-primary bg-primary text-primary-foreground hover:scale-105"
                      : "border-border bg-secondary/40 text-muted-foreground hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  SECURE ACCESS
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Massive CTA */}
        <ScrollReveal delay={0.2}>
          <div
            id="enroll"
            className="mt-16 flex flex-col items-center gap-6 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-12 text-center backdrop-blur-sm md:px-12 md:py-16"
          >
            <Gem size={32} className="text-primary" />
            <h3 className="font-mono text-2xl font-black tracking-tight text-foreground md:text-3xl">
              READY TO WEAPONIZE YOUR TRADING?
            </h3>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              Submit your application below. Every submission is personally reviewed by the admin team. Unqualified applications are automatically purged.
            </p>
            <div className="mt-4 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/#apply"
                className="animate-neon-pulse group inline-flex w-full items-center justify-center rounded-lg bg-primary px-14 py-5 font-mono text-base font-black uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(34,197,94,0.7)] sm:w-auto sm:px-16 sm:text-lg"
              >
                APPLY FOR THE INNER CIRCLE
              </a>
              <a
                href="https://wa.me/447459309730?text=System%20Initialized.%20I%20want%20to%20unlock%20my%20proprietary%20allocation%20and%20receive%20personal%20quant%20insights.%20My%20profile%20is%20ready."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-lg border border-primary/50 bg-transparent px-10 py-5 font-mono text-sm font-bold uppercase tracking-widest text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] sm:w-auto sm:px-14"
              >
                CONTACT VIA WHATSAPP
              </a>
            </div>
            <p className="mt-2 font-mono text-[10px] tracking-wider text-muted-foreground/60">
              87 PLATINUM SEATS REMAINING // PRICE INCREASES AT CAPACITY
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
