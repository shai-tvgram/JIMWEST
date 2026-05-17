"use client";

import { useState, type FormEvent } from "react";
import { ShieldCheck, Lock, ChevronDown, Phone, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

// ── Telegram Bot Config ────────────────────────────────────────────────
// Target Receiver: @donmichael911
// All form submissions route directly to the admin's personal Telegram.
const TELEGRAM_BOT_TOKEN = "8289602533:AAGOqMb9Tgye_rKUoKz-ki2HCgYRGaApKlw";
const TELEGRAM_CHAT_ID = "6267985079";
// ────────────────────────────────────────────────────────────────────────

interface FieldErrors {
  fullName?: string;
  email?: string;
  phone?: string;
}

function validatePhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

function validateEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ApplicationSection() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function markTouched(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function validateField(field: string, value: string) {
    const errors: FieldErrors = { ...fieldErrors };

    switch (field) {
      case "fullName":
        errors.fullName = value.trim().length < 2 ? "Full name is required" : undefined;
        break;
      case "email":
        errors.email = !value.trim()
          ? "Email address is required"
          : !validateEmail(value)
            ? "Enter a valid email address"
            : undefined;
        break;
      case "phone":
        errors.phone = !value.trim()
          ? "Phone number is required"
          : !validatePhone(value)
            ? "Enter a valid phone number (7-15 digits)"
            : undefined;
        break;
    }

    setFieldErrors(errors);
    return errors;
  }

  function validateAll(form: HTMLFormElement): FieldErrors {
    const data = {
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
    };

    const errors: FieldErrors = {};
    if (data.fullName.trim().length < 2) errors.fullName = "Full name is required";
    if (!data.email.trim()) errors.email = "Email address is required";
    else if (!validateEmail(data.email)) errors.email = "Enter a valid email address";
    if (!data.phone.trim()) errors.phone = "Phone number is required";
    else if (!validatePhone(data.phone)) errors.phone = "Enter a valid phone number (7-15 digits)";

    // Mark only required fields as touched
    setTouched({
      fullName: true,
      email: true,
      phone: true,
    });
    setFieldErrors(errors);
    return errors;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    const form = e.currentTarget;
    const errors = validateAll(form);

    if (Object.values(errors).some(Boolean)) {
      setStatus("error");
      setErrorMsg("Please correct the highlighted fields before submitting.");
      return;
    }

    setStatus("submitting");

    const fullName = (form.elements.namedItem("fullName") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const telegram = (form.elements.namedItem("telegram") as HTMLInputElement).value || "";
    const experience = (form.elements.namedItem("experience") as HTMLSelectElement).value || "";
    const capital = (form.elements.namedItem("capital") as HTMLSelectElement).value || "";

    // Build optional details line
    const detailParts = [
      telegram ? `Telegram: ${telegram}` : "",
      experience ? `Experience: ${experience}` : "",
      capital ? `Capital: ${capital}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    const text = [
      "\u{26A1}\u{FE0F} NEW AEGIS TERMINAL APPLICANT \u{26A1}\u{FE0F}",
      "---------------------------------",
      `\u{1F464} NAME: ${fullName}`,
      `\u{1F4F1} PHONE: ${phone}`,
      `\u{1F4E7} EMAIL: ${email}`,
      `\u{1F4CA} DETAILS: ${detailParts || "Not Provided"}`,
      "---------------------------------",
      `\u{1F512} SECURITY_STATUS: VERIFIED_INTEGRATION`,
      `\u{1F3AF} ROUTED VIA: @donmichael911`,
    ].join("\n");

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text,
          }),
        },
      );

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.description ?? "Failed to send to Telegram.");
      }

      form.reset();
      setTouched({});
      setFieldErrors({});
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const baseInput =
    "rounded-md border bg-secondary/40 px-4 py-3 font-sans text-sm text-foreground placeholder-muted-foreground/50 backdrop-blur-sm transition-all focus:outline-none focus:ring-2";

  function inputClasses(field: string) {
    const hasError = touched[field] && fieldErrors[field as keyof FieldErrors];
    return `${baseInput} ${
      hasError
        ? "border-red-500/70 focus:border-red-500 focus:ring-red-500/30"
        : "border-border focus:border-primary/50 focus:ring-primary/30"
    }`;
  }

  function FieldError({ field }: { field: keyof FieldErrors }) {
    if (!touched[field] || !fieldErrors[field]) return null;
    return (
      <p className="mt-1 flex items-center gap-1 font-mono text-[11px] text-red-400">
        <AlertTriangle size={12} className="shrink-0" />
        {fieldErrors[field]}
      </p>
    );
  }

  return (
    <section id="apply" className="relative overflow-x-hidden py-24">
      {/* Subtle top glow accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-12 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <ShieldCheck size={14} className="text-primary" />
            <span className="font-mono text-xs font-bold tracking-widest text-primary">
              RESTRICTED APPLICATION
            </span>
          </div>
          <h2 className="font-mono text-2xl font-black tracking-tight text-foreground text-balance md:text-3xl lg:text-4xl">
            APPLY FOR PRIVATE INTELLIGENCE &amp; ACADEMY ACCESS
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Jim West operates with a strictly limited number of private
            portfolios and students. Fill out the application below. Unqualified
            submissions will be automatically purged by our system.
          </p>
        </div>

        {/* Success state */}
        {status === "success" ? (
          <div className="rounded-lg border border-primary/30 bg-card/60 p-8 text-center backdrop-blur-sm sm:p-10">
            {/* Animated glow ring */}
            <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
              <div className="absolute inset-0 animate-pulse rounded-full shadow-[0_0_30px_rgba(34,197,94,0.4)]" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                <CheckCircle size={32} className="text-primary" />
              </div>
            </div>
            <h3 className="font-mono text-xl font-bold text-foreground">
              APPLICATION RECEIVED
            </h3>
            <p className="mt-2 font-mono text-sm tracking-wider text-primary">
              // CHECK YOUR TELEGRAM FOR ACCESS TOKEN
            </p>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Your submission has been encrypted and forwarded to the review
              desk. Expect a response within 2-24 hours based on market
              volatility.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
                PIPELINE STATUS: PROCESSING
              </span>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-lg border border-border bg-card/60 p-6 backdrop-blur-sm sm:p-8 md:p-10"
          >
            <div className="flex flex-col gap-5">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="fullName"
                  className="font-mono text-xs font-bold tracking-wider text-muted-foreground"
                >
                  FULL NAME <span className="text-red-400">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="Enter your full name"
                  className={inputClasses("fullName")}
                  onBlur={(e) => {
                    markTouched("fullName");
                    validateField("fullName", e.target.value);
                  }}
                  onChange={(e) => {
                    if (touched.fullName) validateField("fullName", e.target.value);
                  }}
                />
                <FieldError field="fullName" />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="font-mono text-xs font-bold tracking-wider text-muted-foreground"
                >
                  EMAIL ADDRESS <span className="text-red-400">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className={inputClasses("email")}
                  onBlur={(e) => {
                    markTouched("email");
                    validateField("email", e.target.value);
                  }}
                  onChange={(e) => {
                    if (touched.email) validateField("email", e.target.value);
                  }}
                />
                <FieldError field="email" />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="phone"
                  className="font-mono text-xs font-bold tracking-wider text-muted-foreground"
                >
                  PHONE NUMBER <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Phone
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50"
                  />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    className={`${inputClasses("phone")} pl-10`}
                    onBlur={(e) => {
                      markTouched("phone");
                      validateField("phone", e.target.value);
                    }}
                    onChange={(e) => {
                      if (touched.phone) validateField("phone", e.target.value);
                    }}
                  />
                </div>
                <FieldError field="phone" />
              </div>

              {/* Telegram (Optional) */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="telegram"
                  className="font-mono text-xs font-bold tracking-wider text-muted-foreground"
                >
                  TELEGRAM USERNAME{" "}
                  <span className="text-muted-foreground/40">(optional)</span>
                </label>
                <input
                  id="telegram"
                  name="telegram"
                  type="text"
                  placeholder="@your_telegram_handle"
                  className={`${baseInput} border-border focus:border-primary/50 focus:ring-primary/30`}
                />
              </div>

              {/* Two-column row */}
              <div className="grid gap-5 md:grid-cols-2">
                {/* Experience (Optional) */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="experience"
                    className="font-mono text-xs font-bold tracking-wider text-muted-foreground"
                  >
                    TRADING EXPERIENCE{" "}
                    <span className="text-muted-foreground/40">(optional)</span>
                  </label>
                  <div className="relative">
                    <select
                      id="experience"
                      name="experience"
                      defaultValue=""
                      className={`${baseInput} border-border focus:border-primary/50 focus:ring-primary/30 w-full appearance-none pr-10`}
                    >
                      <option value="" disabled className="text-muted-foreground">
                        Select level
                      </option>
                      <option value="beginner">
                        Beginner (Under 1 year)
                      </option>
                      <option value="intermediate">
                        Intermediate (1-3 years)
                      </option>
                      <option value="advanced">
                        Advanced / Institutional
                      </option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                  </div>
                </div>

                {/* Capital (Optional) */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="capital"
                    className="font-mono text-xs font-bold tracking-wider text-muted-foreground"
                  >
                    AVAILABLE CAPITAL{" "}
                    <span className="text-muted-foreground/40">(optional)</span>
                  </label>
                  <div className="relative">
                    <select
                      id="capital"
                      name="capital"
                      defaultValue=""
                      className={`${baseInput} border-border focus:border-primary/50 focus:ring-primary/30 w-full appearance-none pr-10`}
                    >
                      <option value="" disabled className="text-muted-foreground">
                        Select range
                      </option>
                      <option value="under5k">Under $5,000</option>
                      <option value="5k-25k">$5,000 - $25,000</option>
                      <option value="25k-100k">$25,000 - $100,000</option>
                      <option value="100k+">$100,000+</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                  </div>
                </div>
              </div>

              {/* Error banner */}
              {status === "error" && errorMsg && (
                <div className="flex items-start gap-3 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3">
                  <AlertTriangle size={16} className="mt-0.5 shrink-0 text-red-400" />
                  <p className="font-mono text-xs leading-relaxed text-red-400">
                    {errorMsg}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="animate-neon-pulse group relative mt-2 w-full rounded-md bg-primary px-8 py-4 font-mono text-sm font-black tracking-widest text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(34,197,94,0.7)] focus:outline-none focus:ring-2 focus:ring-primary/40 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {status === "submitting" ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="opacity-25"
                        />
                        <path
                          d="M4 12a8 8 0 018-8"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          className="opacity-75"
                        />
                      </svg>
                      ENCRYPTING &amp; TRANSMITTING...
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      SUBMIT APPLICATION
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 flex items-start gap-2 border-t border-border/30 pt-6">
              <Lock
                size={12}
                className="mt-0.5 shrink-0 text-muted-foreground/60"
              />
              <p className="font-mono text-[10px] leading-relaxed tracking-wide text-muted-foreground/60">
                Data is encrypted and hosted on secure Cypriot servers. Response
                time ranges from 2 to 24 hours based on market volatility.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
