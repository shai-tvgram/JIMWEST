"use client";

import Image from "next/image";
import { MapPin, Clock, Target } from "lucide-react";

const stats = [
  { label: "EXPERIENCE", value: "15+ Years", icon: Clock },
  { label: "WIN RATE", value: "84.2%", icon: Target },
  { label: "HEADQUARTERS", value: "Cyprus", icon: MapPin },
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Portrait */}
          <div className="lg:w-1/2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-zinc-800">
              <Image
                src="/images/jim-west-portrait.png"
                alt="Jim West, quantitative trader and founder of Quant Labs, seated at his desk in Cyprus"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
                priority
              />
              {/* Dark vignette overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/20" />
              {/* Caption bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-background/80 px-6 py-4 backdrop-blur-sm">
                <p className="font-mono text-xs tracking-wider text-muted-foreground">
                  JIM WEST{" "}
                  <span className="text-primary">//</span> Operating from
                  Anarita, Cyprus
                </p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="lg:w-1/2">
            <h2 className="font-mono text-2xl font-black tracking-tight text-foreground md:text-3xl">
              THE MAN BEHIND THE{" "}
              <span className="text-primary">SIGNAL</span>
            </h2>

            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Jim West spent 15 years embedded in the highest echelons of
                Wall Street quantitative finance. From the algorithmic trading
                desks of New York to the systematic hedge funds of London, he
                built and deployed models that moved billions.
              </p>
              <p>
                In 2019, he walked away. Disillusioned with the institutional
                machine, he relocated to Cyprus -- the quiet nexus between
                European regulation and Middle-Eastern capital flows. From his
                compound in Anarita, he now runs an independent intelligence
                operation, decoding the crypto markets for a select inner
                circle.
              </p>
              <p className="text-foreground/70">
                His methods are unorthodox. His track record is undeniable. He
                does not trade for you. He teaches you to see what the market
                makers don&apos;t want you to see.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border bg-card/50 p-4 text-center backdrop-blur-sm"
                >
                  <stat.icon
                    size={18}
                    className="mx-auto mb-2 text-primary"
                  />
                  <p className="font-mono text-lg font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
