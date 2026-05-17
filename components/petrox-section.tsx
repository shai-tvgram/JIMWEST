"use client";

import { useState } from "react";
import { Fuel, Lock, ArrowRight } from "lucide-react";

export function PetroxSection() {
  const [usdtAmount, setUsdtAmount] = useState("1000");
  const ptxRate = 0.042;
  const ptxAmount = usdtAmount
    ? (parseFloat(usdtAmount) / ptxRate).toFixed(2)
    : "0";

  return (
    <section id="petrox" className="relative py-24">
      {/* Gold accent glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
            <Fuel size={14} className="text-accent" />
            <span className="font-mono text-xs tracking-wider text-accent">
              PETROX PRESALE
            </span>
          </div>
          <h2 className="font-mono text-3xl font-black tracking-tight text-foreground md:text-4xl lg:text-5xl">
            PETROX ($PTX):{" "}
            <span className="text-accent">THE GEOPOLITICAL ASSET SHIELD</span>
          </h2>
          <p className="mt-6 text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
            A decentralized synthetic token pegged to global crude oil dynamics.
            Turn Middle-Eastern supply chain instability into your financial
            fortress.
          </p>
        </div>

        {/* Quote */}
        <div className="mx-auto mt-12 max-w-2xl rounded-lg border border-accent/20 bg-card/50 p-6 backdrop-blur-sm">
          <blockquote className="text-center text-sm leading-relaxed text-foreground/80 italic md:text-base">
            {'"While the world panics, insiders hedge. We anchored liquidity to the world\'s most defended asset: Oil."'}
          </blockquote>
          <p className="mt-3 text-center font-mono text-xs tracking-wider text-accent">
            -- JIM WEST
          </p>
        </div>

        {/* Presale Widget */}
        <div className="mx-auto mt-12 max-w-lg rounded-xl border border-accent/30 bg-card/80 p-8 backdrop-blur-sm">
          {/* Progress */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">
                ALLOCATION PROGRESS
              </span>
              <span className="font-mono text-sm font-bold text-accent">
                78%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-accent shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                style={{ width: "78%" }}
              />
            </div>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              7,800,000 / 10,000,000 PTX ALLOCATED
            </p>
          </div>

          {/* Conversion */}
          <div className="flex flex-col gap-4">
            <div className="rounded-lg border border-border bg-secondary/50 p-4">
              <label className="mb-1 block font-mono text-xs text-muted-foreground">
                YOU PAY (USDT)
              </label>
              <input
                type="number"
                value={usdtAmount}
                onChange={(e) => setUsdtAmount(e.target.value)}
                className="w-full bg-transparent font-mono text-xl font-bold text-foreground outline-none placeholder:text-muted-foreground/50"
                placeholder="0.00"
              />
            </div>
            <div className="flex justify-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card">
                <ArrowRight size={14} className="rotate-90 text-muted-foreground" />
              </div>
            </div>
            <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
              <label className="mb-1 block font-mono text-xs text-accent/70">
                YOU RECEIVE (PTX)
              </label>
              <p className="font-mono text-xl font-bold text-accent">
                {ptxAmount}
              </p>
            </div>
          </div>

          {/* CTA */}
          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 font-mono text-sm font-bold tracking-wider text-accent-foreground shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all hover:shadow-[0_0_50px_rgba(245,158,11,0.35)]">
            <Lock size={16} />
            SECURE ALLOCATION
          </button>

          <p className="mt-4 text-center font-mono text-xs text-muted-foreground">
            Rate: 1 PTX = $0.042 USDT
          </p>
        </div>
      </div>
    </section>
  );
}
