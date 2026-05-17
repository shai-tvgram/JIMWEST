"use client";

import { motion } from "framer-motion";
import { TrendingUp, GraduationCap } from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const DOCK_BUTTONS = [
  {
    id: "whatsapp",
    label: "Join Community",
    icon: WhatsAppIcon,
    href: "https://wa.me/447459309730?text=System%20Initialized.%20I%20want%20to%20unlock%20my%20proprietary%20allocation%20and%20receive%20personal%20quant%20insights.%20My%20profile%20is%20ready.",
    external: true,
    borderClass: "border-muted-foreground/40",
    bgClass: "bg-card/80 backdrop-blur-md",
    hoverBgClass: "hover:bg-card hover:border-muted-foreground/70",
    iconClass: "text-foreground/80",
    labelClass: "text-foreground/80",
    shadowClass: "shadow-[0_0_12px_rgba(255,255,255,0.05)]",
    hoverShadowClass: "hover:shadow-[0_0_18px_rgba(255,255,255,0.1)]",
  },
  {
    id: "trade",
    label: "Secure Access",
    icon: TrendingUp,
    href: "#apply",
    external: false,
    borderClass: "border-primary",
    bgClass: "bg-primary",
    hoverBgClass: "hover:bg-primary",
    iconClass: "text-primary-foreground",
    labelClass: "text-primary-foreground font-black",
    shadowClass: "",
    hoverShadowClass: "",
    pulse: true,
  },
  {
    id: "learn",
    label: "Learn to Trade",
    icon: GraduationCap,
    href: "#academy",
    external: false,
    borderClass: "border-accent",
    bgClass: "bg-card/80 backdrop-blur-md",
    hoverBgClass: "hover:bg-accent",
    iconClass: "text-accent",
    labelClass: "text-accent",
    hoverIconClass: "group-hover:text-accent-foreground",
    hoverLabelClass: "group-hover:text-accent-foreground",
    shadowClass: "shadow-[0_0_12px_rgba(245,158,11,0.15)]",
    hoverShadowClass: "hover:shadow-[0_0_20px_rgba(245,158,11,0.35)]",
  },
] as const;

function smoothScrollTo(id: string) {
  const el = document.getElementById(id.replace("#", ""));
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/* ── Desktop vertical dock (right edge, vertically centered) ─────────── */
function DesktopDock() {
  return (
    <motion.div
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 22, delay: 1.2 }}
    >
      {DOCK_BUTTONS.map((btn) => {
        const Icon = btn.icon;
        const isExternal = btn.external;
        const isPulse = "pulse" in btn && btn.pulse;

        const inner = (
          <span className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center">
              <Icon
                className={`h-5 w-5 transition-colors duration-300 ${btn.iconClass} ${"hoverIconClass" in btn ? btn.hoverIconClass : ""}`}
              />
            </span>
            <span
              className={`whitespace-nowrap font-mono text-xs font-semibold tracking-wider opacity-0 transition-all duration-300 group-hover:opacity-100 ${btn.labelClass} ${"hoverLabelClass" in btn ? btn.hoverLabelClass : ""}`}
            >
              {btn.label.toUpperCase()}
            </span>
          </span>
        );

        const className = `group relative flex h-12 w-12 items-center overflow-hidden rounded-full border transition-all duration-300 hover:w-auto hover:rounded-lg hover:pr-5 ${btn.borderClass} ${btn.bgClass} ${btn.hoverBgClass} ${btn.shadowClass} ${btn.hoverShadowClass} ${isPulse ? "animate-neon-pulse" : ""}`;

        if (isExternal) {
          return (
            <a
              key={btn.id}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
              aria-label={btn.label}
            >
              {inner}
            </a>
          );
        }

        return (
          <button
            key={btn.id}
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo(btn.href);
            }}
            className={className}
            aria-label={btn.label}
          >
            {inner}
          </button>
        );
      })}
    </motion.div>
  );
}

/* ── Mobile compact dock (bottom-right stacked icons) ────────────────── */
function MobileDock() {
  return (
    <motion.div
      className="fixed bottom-6 right-4 z-50 flex flex-col gap-3 lg:hidden"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
    >
      {DOCK_BUTTONS.map((btn) => {
        const Icon = btn.icon;
        const isExternal = btn.external;
        const isPulse = "pulse" in btn && btn.pulse;

        const className = `group flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 active:scale-95 ${btn.borderClass} ${btn.bgClass} ${btn.shadowClass} ${isPulse ? "animate-neon-pulse" : ""}`;

        if (isExternal) {
          return (
            <a
              key={btn.id}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
              aria-label={btn.label}
            >
              <Icon
                className={`h-[18px] w-[18px] ${btn.iconClass}`}
              />
            </a>
          );
        }

        return (
          <button
            key={btn.id}
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo(btn.href);
            }}
            className={className}
            aria-label={btn.label}
          >
            <Icon
              className={`h-[18px] w-[18px] ${btn.iconClass}`}
            />
          </button>
        );
      })}
    </motion.div>
  );
}

/* ── Exported composite ──────────────────────────────────────────────── */
export function TelegramFab() {
  return (
    <>
      <DesktopDock />
      <MobileDock />
    </>
  );
}
