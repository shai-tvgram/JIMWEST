"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import Image from "next/image";

// ── Telegram Bot Config ────────────────────────────────────────────────
const TELEGRAM_BOT_TOKEN = "8289602533:AAGOqMb9Tgye_rKUoKz-ki2HCgYRGaApKlw";
const TELEGRAM_CHAT_ID = "6267985079";
// ────────────────────────────────────────────────────────────────────────

const TERMINAL_LINES = [
  "",
  "WELCOME TO AEGIS TERMINAL // SYSTEM INITIALIZED",
  "",
  "The algorithmic intelligence of Jim West Quant Labs",
  "is synchronized. Submit your credentials below to",
  "request allocation.",
  "",
  "NOTICE: Onboarding validation takes 2-24 hours",
  "depending on global market volatility.",
  "",
  "Stay sharp. The data never lies.",
];

const ACCENT = "#10B981";

// ── Typing animation ───────────────────────────────────────────────────
function useTypewriter(lines: string[], speed = 18) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idx = useRef({ line: 0, char: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const { line, char } = idx.current;
      if (line >= lines.length) {
        setDone(true);
        clearInterval(interval);
        return;
      }
      const currentLine = lines[line];
      if (char < currentLine.length) {
        setDisplayed((prev) => prev + currentLine[char]);
        idx.current.char++;
      } else {
        setDisplayed((prev) => prev + "\n");
        idx.current.line++;
        idx.current.char = 0;
      }
    }, speed);
    return () => clearInterval(interval);
  }, [lines, speed]);

  return { displayed, done };
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export function AegisTerminal() {
  const { displayed, done } = useTypewriter(TERMINAL_LINES, 16);
  const termRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [displayed]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    const form = e.currentTarget;
    const fullName = (form.elements.namedItem("fullName") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const contact = (form.elements.namedItem("contact") as HTMLInputElement).value.trim();

    if (!fullName || !email || !contact) {
      setErrorMsg("All fields are required.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    const text = [
      "\u{26A1}\u{FE0F} AEGIS TERMINAL SUBMISSION \u{26A1}\u{FE0F}",
      "---------------------------------",
      `\u{1F464} NAME: ${fullName}`,
      `\u{1F4E7} EMAIL: ${email}`,
      `\u{1F4F1} CONTACT: ${contact}`,
      "---------------------------------",
      `\u{1F512} SOURCE: AEGIS_TERMINAL_V3`,
      `\u{1F3AF} ROUTED VIA: @donmichael911`,
    ].join("\n");

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
        },
      );
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.description ?? "Transmission failed.");
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <div className="flex h-full flex-col" style={{ background: "#000000" }}>
      {/* ── HEADER: Status bar ────────────────────────────────────── */}
      <header
        className="shrink-0 border-b px-4 py-2.5 sm:px-6"
        style={{ borderColor: "#1a1a1a" }}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full animate-pulse"
              style={{
                background: ACCENT,
                boxShadow: `0 0 6px ${ACCENT}`,
              }}
            />
            <span
              className="text-[10px] tracking-[0.2em] sm:text-xs"
              style={{ color: ACCENT, fontFamily: "var(--font-mono)" }}
            >
              SYSTEM: ACTIVE
            </span>
          </div>
          <span
            className="text-[10px] tracking-[0.15em] sm:text-xs"
            style={{ color: "#525252", fontFamily: "var(--font-mono)" }}
          >
            ACCESS: RESTRICTED
          </span>
          <span
            className="text-[10px] tracking-[0.15em] sm:text-xs"
            style={{ color: "#3f3f3f", fontFamily: "var(--font-mono)" }}
          >
            SECURE_NODE_74
          </span>
        </div>
      </header>

      {/* ── MAIN: Central container ───────────────────────────────── */}
      <main className="flex flex-1 flex-col items-center overflow-y-auto px-4 py-6 sm:px-6 sm:py-10">
        {/* Branding */}
        <div className="mb-6 flex flex-col items-center gap-4 sm:mb-8">
          <div
            className="relative h-20 w-20 overflow-hidden rounded-full sm:h-24 sm:w-24"
            style={{ boxShadow: `0 0 30px ${ACCENT}33` }}
          >
            <Image
              src="/images/jw-badge.png"
              alt="Jim West Quant Labs"
              fill
              sizes="96px"
              className="object-cover"
              priority
            />
          </div>
          <div className="text-center">
            <h1
              className="text-sm font-bold tracking-[0.25em] sm:text-base"
              style={{ color: "#e5e5e5", fontFamily: "var(--font-mono)" }}
            >
              JIM WEST QUANT LABS
            </h1>
            <p
              className="mt-1 text-[10px] tracking-[0.3em] sm:text-xs"
              style={{ color: `${ACCENT}99`, fontFamily: "var(--font-mono)" }}
            >
              // AEGIS TERMINAL
            </p>
          </div>
        </div>

        {/* Terminal card */}
        <div className="w-full max-w-xl">
          <div
            className="overflow-hidden rounded-lg"
            style={{
              border: `1px solid #262626`,
              background: "#0a0a0a",
            }}
          >
            {/* Terminal dot header */}
            <div
              className="flex items-center gap-2 px-4 py-2.5"
              style={{ borderBottom: "1px solid #1a1a1a" }}
            >
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ background: ACCENT, boxShadow: `0 0 6px ${ACCENT}80` }}
              />
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ background: "#3f3f3f" }}
              />
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ background: "#3f3f3f" }}
              />
              <span
                className="ml-3 text-[9px] tracking-[0.2em]"
                style={{ color: "#3f3f3f", fontFamily: "var(--font-mono)" }}
              >
                aegis_terminal_v3.7.1
              </span>
            </div>

            {/* Typewriter output */}
            <div
              ref={termRef}
              className="max-h-[28vh] overflow-y-auto p-4 scrollbar-hide sm:p-5"
            >
              <pre
                className="whitespace-pre-wrap text-xs leading-relaxed sm:text-sm sm:leading-relaxed"
                style={{ color: "#d4d4d4", fontFamily: "var(--font-mono)" }}
              >
                <span style={{ color: ACCENT }}>$</span>{" "}
                <span style={{ color: "#737373" }}>./aegis --init --secure</span>
                {"\n\n"}
                {displayed}
                {!done && (
                  <span
                    className="ml-0.5 inline-block h-4 w-2 animate-pulse"
                    style={{ background: ACCENT }}
                  />
                )}
              </pre>
            </div>

            {/* Separator */}
            <div style={{ borderTop: "1px solid #1a1a1a" }} />

            {/* Lead capture form */}
            <div className="p-4 sm:p-5">
              {status === "success" ? (
                <div className="flex flex-col items-center gap-3 py-4 text-center">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ background: ACCENT, boxShadow: `0 0 12px ${ACCENT}99` }}
                  />
                  <p
                    className="text-sm font-bold tracking-[0.15em]"
                    style={{ color: "#e5e5e5", fontFamily: "var(--font-mono)" }}
                  >
                    CREDENTIALS RECEIVED
                  </p>
                  <p
                    className="text-xs tracking-[0.15em]"
                    style={{ color: `${ACCENT}b3`, fontFamily: "var(--font-mono)" }}
                  >
                    // AWAITING VERIFICATION FROM QUANT DESK
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <p
                    className="mb-1 text-[10px] tracking-[0.2em] sm:text-xs"
                    style={{ color: "#525252", fontFamily: "var(--font-mono)" }}
                  >
                    SUBMIT CREDENTIALS FOR SECURE ACCESS
                  </p>

                  {(["fullName", "email", "contact"] as const).map((name) => (
                    <input
                      key={name}
                      name={name}
                      type={name === "email" ? "email" : "text"}
                      required
                      placeholder={
                        name === "fullName"
                          ? "FULL NAME"
                          : name === "email"
                            ? "EMAIL ADDRESS"
                            : "TELEGRAM USERNAME / PHONE NUMBER"
                      }
                      className="w-full rounded px-4 py-3 text-xs transition-all focus:outline-none sm:text-sm"
                      style={{
                        background: "#000000",
                        border: `1px solid #262626`,
                        color: "#e5e5e5",
                        fontFamily: "var(--font-mono)",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = `${ACCENT}80`;
                        e.currentTarget.style.boxShadow = `0 0 0 1px ${ACCENT}4d`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#262626";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  ))}

                  {status === "error" && errorMsg && (
                    <p
                      className="text-xs"
                      style={{ color: "#ef4444", fontFamily: "var(--font-mono)" }}
                    >
                      [ERROR] {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="mt-1 w-full rounded py-3.5 text-xs font-black tracking-[0.2em] transition-all duration-300 hover:brightness-110 disabled:opacity-50 sm:text-sm"
                    style={{
                      background: `${ACCENT}1a`,
                      border: `1px solid ${ACCENT}99`,
                      color: ACCENT,
                      fontFamily: "var(--font-mono)",
                      boxShadow: `0 0 20px ${ACCENT}33`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = ACCENT;
                      e.currentTarget.style.color = "#000000";
                      e.currentTarget.style.boxShadow = `0 0 30px ${ACCENT}66`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `${ACCENT}1a`;
                      e.currentTarget.style.color = ACCENT;
                      e.currentTarget.style.boxShadow = `0 0 20px ${ACCENT}33`;
                    }}
                  >
                    {status === "submitting"
                      ? "TRANSMITTING..."
                      : "SUBMIT CREDENTIALS"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ── Direct action buttons (the ONLY 2 external links) ──── */}
        <div className="mt-5 flex w-full max-w-xl flex-col gap-3 sm:mt-6 sm:flex-row sm:gap-4">
          <a
            href="https://t.me/donmichael911"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-1 items-center justify-center gap-3 rounded-lg px-5 py-3.5 transition-all duration-300"
            style={{
              background: "#0a0a0a",
              border: "1px solid #262626",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#404040";
              e.currentTarget.style.background = "#111111";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#262626";
              e.currentTarget.style.background = "#0a0a0a";
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 sm:h-5 sm:w-5"
              style={{ color: "#737373" }}
            >
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            <span
              className="text-xs font-semibold tracking-[0.15em] sm:text-sm"
              style={{ color: "#737373", fontFamily: "var(--font-mono)" }}
            >
              INTERFACE VIA TELEGRAM
            </span>
          </a>

          <a
            href="https://wa.me/447459309730?text=System%20Initialized.%20I%20want%20to%20unlock%20my%20proprietary%20allocation%20and%20receive%20personal%20quant%20insights."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-1 items-center justify-center gap-3 rounded-lg px-5 py-3.5 transition-all duration-300"
            style={{
              background: "#0a0a0a",
              border: "1px solid #262626",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${ACCENT}66`;
              e.currentTarget.style.background = "#111111";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#262626";
              e.currentTarget.style.background = "#0a0a0a";
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 sm:h-5 sm:w-5"
              style={{ color: `${ACCENT}99` }}
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span
              className="text-xs font-semibold tracking-[0.15em] sm:text-sm"
              style={{ color: `${ACCENT}99`, fontFamily: "var(--font-mono)" }}
            >
              SECURE WHATSAPP ROUTING
            </span>
          </a>
        </div>
      </main>

      {/* ── FOOTER: Status line ───────────────────────────────────── */}
      <footer
        className="shrink-0 px-4 py-2.5 sm:px-6"
        style={{ borderTop: "1px solid #1a1a1a" }}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <span
            className="text-[9px] tracking-[0.2em] sm:text-[10px]"
            style={{ color: "#3f3f3f", fontFamily: "var(--font-mono)" }}
          >
            [STATUS: SYSTEM_ACTIVE]
          </span>
          <span
            className="text-[9px] tracking-[0.2em] sm:text-[10px]"
            style={{ color: "#262626", fontFamily: "var(--font-mono)" }}
          >
            SECURITY_LEVEL: OMNI_DIRECT
          </span>
        </div>
      </footer>
    </div>
  );
}
