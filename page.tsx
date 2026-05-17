import type { Metadata } from "next";
import { AcademyNavbar } from "@/components/academy-navbar";
import { CypriotSqueezeModule } from "@/components/academy/cypriot-squeeze-module";
import { MidnightLeviathanModule } from "@/components/academy/midnight-leviathan-module";
import { OrderBlockWarfareModule } from "@/components/academy/order-block-warfare-module";
import { MembershipTiersSection } from "@/components/academy/membership-tiers-section";
import { TelegramFab } from "@/components/telegram-fab";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "THE ACADEMY // JIM WEST QUANT LABS",
  description:
    "Access the exact quantitative frameworks and algorithmic scripts Jim uses to extract millions from the markets. Three signature courses: The Cypriot Squeeze, Midnight Leviathan Flow, and Order Block Warfare.",
};

export default function AcademyPage() {
  return (
    <main className="min-h-screen bg-background">
      <AcademyNavbar />
      <TelegramFab />

      {/* Hero banner */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Ambient glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/5 blur-[150px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <span className="font-mono text-xs tracking-wider text-primary">
              CURRICULUM 2024-2025
            </span>
          </div>
          <h1 className="text-balance font-mono text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl">
            THE ACADEMY:{" "}
            <span className="text-primary">WEAPONIZE YOUR TRADING</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Access the exact quantitative frameworks and algorithmic scripts Jim
            uses to extract millions from the markets. Three battle-tested
            courses. Zero theory. Pure execution.
          </p>

          {/* Quick nav pills */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {[
              {
                label: "Cypriot Squeeze",
                href: "#cypriot-squeeze",
                tag: "MASTERCLASS",
                tagClass: "text-primary",
              },
              {
                label: "Midnight Leviathan",
                href: "#midnight-leviathan",
                tag: "ADVANCED",
                tagClass: "text-accent",
              },
              {
                label: "Order Block Warfare",
                href: "#order-block-warfare",
                tag: "ELITE",
                tagClass: "text-destructive",
              },
            ].map((pill) => (
              <a
                key={pill.label}
                href={pill.href}
                className="flex items-center gap-2 rounded-full border border-border bg-card/50 px-5 py-2.5 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80"
              >
                <span className={`font-mono text-[10px] font-bold ${pill.tagClass}`}>
                  {pill.tag}
                </span>
                <span className="font-mono text-xs tracking-wider text-foreground">
                  {pill.label}
                </span>
              </a>
            ))}
          </div>

          {/* Stats bar */}
          <div className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-8 border-t border-border/50 pt-8">
            {[
              { value: "45+", label: "Hours of Content" },
              { value: "623", label: "Active Students" },
              { value: "10", label: "Production Scripts" },
              { value: "$4.2M+", label: "Student Profits" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-mono text-2xl font-black text-foreground">
                  {stat.value}
                </p>
                <p className="font-mono text-[10px] tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 1 */}
      <div className="border-t border-border/30">
        <CypriotSqueezeModule />
      </div>

      {/* Module 2 */}
      <div className="border-t border-border/30">
        <MidnightLeviathanModule />
      </div>

      {/* Module 3 */}
      <div className="border-t border-border/30">
        <OrderBlockWarfareModule />
      </div>

      {/* Membership tiers + CTA */}
      <div className="border-t border-border/30">
        <MembershipTiersSection />
      </div>

      <Footer />
    </main>
  );
}
