"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";

const tickerItems = [
  "CYPRIOT SQUEEZE: +412%",
  "MIDNIGHT LEVIATHAN: 89% WIN RATE",
  "ORDER BLOCK WARFARE: ACTIVE",
  "WHALE FLUSH DETECTED: $42M LIQUIDATED",
  "DARK POOL SIGNAL: CONFIRMED",
  "ASIA SESSION SQUEEZE: +187%",
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-20">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,197,94,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <div className="mb-8 flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5">
            <Shield size={14} className="text-primary" />
            <span className="font-mono text-xs tracking-wider text-muted-foreground">
              INSTITUTIONAL-GRADE INTELLIGENCE
            </span>
          </div>

          {/* Main headline */}
          <h1 className="max-w-5xl font-mono text-4xl font-black leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
            THE MARKET IS{" "}
            <span className="text-primary">MANIPULATED.</span>
            <br />
            LEARN TO HUNT THE{" "}
            <span className="text-primary">WHALES.</span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
            No fluff. No hype. Raw, institutional-grade crypto trading
            frameworks engineered by Jim West -- former Wall Street quant, now
            operating from the shadows of Cyprus.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <a
              href="#radar"
              className="animate-neon-pulse group flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 font-mono text-sm font-black tracking-wider text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(34,197,94,0.7)] sm:w-auto"
            >
              START THE HUNT NOW
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#terminal"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-secondary/30 px-8 py-3.5 font-mono text-sm font-bold tracking-wider text-foreground backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-secondary/50 sm:w-auto"
            >
              JOIN THE INNER CIRCLE
            </a>
          </div>
        </motion.div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border/50 bg-card/60 backdrop-blur-sm">
        <div className="overflow-hidden whitespace-nowrap py-3">
          <div className="animate-marquee inline-flex">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="mx-8 font-mono text-xs tracking-wider text-primary/70">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
