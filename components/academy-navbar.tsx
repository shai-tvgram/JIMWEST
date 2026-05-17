"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const leftLinks = [
  { label: "Cypriot Squeeze", href: "#cypriot-squeeze" },
  { label: "Leviathan", href: "#midnight-leviathan" },
];

const rightLinks = [
  { label: "Warfare", href: "#order-block-warfare" },
  { label: "Tiers", href: "#tiers" },
];

const allLinks = [...leftLinks, ...rightLinks];

export function AcademyNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-primary/10 bg-black/90 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-7xl items-center px-4 sm:px-6">
        {/* ── Desktop: left links ─────────────────────────────── */}
        <div className="hidden flex-1 items-center justify-end gap-8 pr-10 md:flex">
          {leftLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* ── Mobile: back to home (left) ─────────────────────── */}
        <Link
          href="/"
          className="flex items-center justify-center text-primary md:hidden"
          aria-label="Back to home"
        >
          <ArrowLeft size={22} />
        </Link>

        {/* ── Center medallion ────────────────────────────────── */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-label="Jim West Quant Labs - Home"
        >
          <div
            className={`relative overflow-hidden rounded-full transition-all duration-500 ${
              scrolled
                ? "h-16 w-16 drop-shadow-[0_0_14px_rgba(34,197,94,0.35)] sm:h-18 sm:w-18"
                : "h-16 w-16 drop-shadow-[0_0_20px_rgba(34,197,94,0.4)] sm:h-24 sm:w-24"
            }`}
          >
            <Image
              src="/images/jw-badge.png"
              alt="Jim West Quant Labs official medallion"
              fill
              sizes="96px"
              className="object-cover"
              priority
            />
          </div>
          <div
            className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 transition-all duration-500 ${
              scrolled
                ? "h-[68px] w-[68px] sm:h-[76px] sm:w-[76px]"
                : "h-[68px] w-[68px] sm:h-[100px] sm:w-[100px]"
            }`}
          />
        </Link>

        {/* ── Desktop: right links ────────────────────────────── */}
        <div className="hidden flex-1 items-center justify-start gap-8 pl-10 md:flex">
          {rightLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* ── Desktop: CTA ────────────────────────────────────── */}
        <a
          href="#enroll"
          className="animate-neon-pulse hidden shrink-0 rounded-md bg-primary px-5 py-2 font-mono text-xs font-black tracking-wider text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(34,197,94,0.7)] md:block"
        >
          ENROLL NOW
        </a>

        {/* ── Mobile: hamburger (right) ───────────────────────── */}
        <div className="flex flex-1 justify-end md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-primary"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Spacer for medallion height */}
      <div
        className={`transition-all duration-500 ${
          scrolled ? "h-6 sm:h-5" : "h-6 sm:h-10"
        }`}
      />

      {/* ── Mobile menu ───────────────────────────────────────── */}
      {mobileOpen && (
        <div className="border-t border-zinc-900 bg-black/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {allLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded px-3 py-3 font-sans text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#enroll"
              onClick={() => setMobileOpen(false)}
              className="animate-neon-pulse mt-3 rounded-md bg-primary px-5 py-3 text-center font-mono text-xs font-black tracking-wider text-primary-foreground"
            >
              ENROLL NOW
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
