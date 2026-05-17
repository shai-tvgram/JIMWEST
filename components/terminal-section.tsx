"use client";

import { Lock, MessageSquare, Send } from "lucide-react";

const alerts = [
  {
    time: "14:22 UTC",
    type: "whale" as const,
    message: "WHALE ALERT: 4,200 BTC moved to exchange. Potential sell pressure incoming.",
  },
  {
    time: "18:05 UTC",
    type: "success" as const,
    message: "CYPRIOT SQUEEZE: Target hit. +12.4% captured in 3h window.",
  },
  {
    time: "21:47 UTC",
    type: "intel" as const,
    message: "DARK POOL: Unusual options activity detected on ETH $4,200 calls.",
  },
];

const blurredMessages = [
  "CLASSIFIED: Institutional accumulation pattern on...",
  "PRIORITY: $14M market buy detected across 3 exc...",
  "ALERT: Fed insider signal confirmed. Position adj...",
  "UPDATE: Liquidity void at $72,400. Target recalib...",
];

export function TerminalSection() {
  return (
    <section id="terminal" className="relative py-24">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <MessageSquare size={20} className="text-primary" />
          <h2 className="font-mono text-2xl font-black tracking-tight text-foreground md:text-3xl">
            LIVE INTEL FEED{" "}
            <span className="text-muted-foreground">//</span> THE WAR ROOM
          </h2>
        </div>

        {/* Terminal Window */}
        <div className="overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-destructive/60" />
            <div className="h-3 w-3 rounded-full bg-accent/60" />
            <div className="h-3 w-3 rounded-full bg-primary/60" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">
              war-room-terminal-v3.2.1
            </span>
          </div>

          {/* Visible messages */}
          <div className="flex flex-col gap-0.5 p-4">
            {alerts.map((alert, i) => (
              <div
                key={i}
                className="rounded border-l-2 border-l-primary/50 bg-secondary/30 p-3"
              >
                <div className="flex items-start gap-3">
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    [{alert.time}]
                  </span>
                  <span
                    className={`shrink-0 font-mono text-xs font-bold ${
                      alert.type === "whale"
                        ? "text-destructive"
                        : alert.type === "success"
                          ? "text-primary"
                          : "text-accent"
                    }`}
                  >
                    {alert.type === "whale"
                      ? "WHALE"
                      : alert.type === "success"
                        ? "WIN"
                        : "INTEL"}
                  </span>
                  <p className="font-mono text-sm text-foreground/80">
                    {alert.message}
                  </p>
                </div>
              </div>
            ))}

            {/* Blurred messages */}
            <div className="relative mt-2">
              <div className="flex flex-col gap-0.5 blur-sm select-none">
                {blurredMessages.map((msg, i) => (
                  <div
                    key={i}
                    className="rounded border-l-2 border-l-muted/50 bg-secondary/20 p-3"
                  >
                    <p className="font-mono text-sm text-muted-foreground">
                      {msg}
                    </p>
                  </div>
                ))}
              </div>

              {/* Lock overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
                  <Lock size={24} className="text-primary" />
                </div>
                <p className="mt-3 font-mono text-xs tracking-wider text-muted-foreground">
                  CLASSIFIED INTEL -- ACCESS REQUIRED
                </p>
              </div>
            </div>
          </div>

          {/* Input bar (disabled) */}
          <div className="flex items-center gap-3 border-t border-border bg-secondary/30 px-4 py-3">
            <span className="font-mono text-xs text-primary">{">"}</span>
            <span className="flex-1 font-mono text-xs text-muted-foreground/50">
              Authentication required to send messages...
            </span>
            <Send size={14} className="text-muted-foreground/30" />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a
            href="https://wa.me/447459309730?text=System%20Initialized.%20I%20want%20to%20unlock%20my%20proprietary%20allocation%20and%20receive%20personal%20quant%20insights.%20My%20profile%20is%20ready."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-10 py-4 font-mono text-sm font-bold tracking-wider text-primary-foreground shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all hover:shadow-[0_0_50px_rgba(34,197,94,0.35)]"
          >
            <Send size={16} />
            JOIN THE EMERGENCY WHATSAPP TERMINAL
          </a>
        </div>
      </div>
    </section>
  );
}
