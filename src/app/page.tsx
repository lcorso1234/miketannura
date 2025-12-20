"use client";

import { useCallback } from "react";

export default function Home() {
  const phoneDisplay = "773.287.3716";
  const noiseTexture =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='.22'/%3E%3C/svg%3E";
  const accent = "#7CFF3A";
  const gunmetalStart = "#161b20";
  const gunmetalEnd = "#20262d";
  const footerPrimary = "Built in America, on Earth.";
  const footerSecondary =
    "Making relationships built to last, the American Way.";

  const headerDetails = [
    { label: "First Name", value: "Mike" },
    { label: "Last Name", value: "Tannura" },
    { label: "Title", value: "President" },
  ];

  const handleSaveContact = useCallback(() => {
    const triggerDownload = (url: string, filename: string) => {
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    };

    // First, download the vCard so the contact is saved locally.
    triggerDownload("/mike-tannura.vcf", "mike-tannura.vcf");

    // Then ask whether to text Mike; only open the SMS composer if confirmed.
    const isIOS = /iP(ad|hone|od)/i.test(navigator.userAgent);
    const separator = isIOS ? "&" : "?";
    const smsMessage =
      "Hi Mike, I just saved your info from Chromium Industries. Let's find a time that works for us to connect.";
    const smsBody = encodeURIComponent(smsMessage);
    const smsUrl = `sms:+1${phoneDisplay.replace(/\D/g, "")}${separator}body=${smsBody}`;
    const promptDelayMs = 1200;

    const promptForSms = () => {
      const shouldText = window.confirm(
        `Contact saved. Do you want to send Mike this text?\n\n${smsMessage}`
      );
      if (shouldText) {
        window.location.href = smsUrl;
      }
    };

    window.setTimeout(promptForSms, promptDelayMs);
  }, [phoneDisplay]);

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-12 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: `url("${noiseTexture}")`,
          mixBlendMode: "soft-light",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_55%)] opacity-60" />

      <article
        className="relative w-full max-w-xs space-y-5 overflow-hidden rounded-[34px] border border-white/5 px-6 pt-7 pb-6 text-slate-100 shadow-[0_28px_70px_rgba(3,3,3,0.8)] sm:max-w-sm"
        style={{
          background: `linear-gradient(135deg, ${gunmetalStart}, ${gunmetalEnd})`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[34px] opacity-25" style={{ background: "linear-gradient(150deg,rgba(255,255,255,0.2),transparent)" }} />
        <span
          className="absolute -right-6 top-8 h-28 w-28 rounded-full blur-3xl"
          style={{ backgroundColor: accent, opacity: 0.15 }}
          aria-hidden="true"
        />

        <div className="relative space-y-5">
          <header className="space-y-4 rounded-3xl border border-white/15 bg-white/5 px-5 py-5 shadow-inner shadow-black/40 backdrop-blur-[2px]">
            <p
              className="text-right text-[0.55rem] uppercase tracking-[0.45rem]"
              style={{ color: accent }}
            >
              Chromium Industries LLC
            </p>
            <div className="space-y-2 text-sm">
              {headerDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-center justify-between text-white/75"
                >
                  <span className="text-[0.65rem] uppercase tracking-[0.35em]">
                    {detail.label}
                  </span>
                  <span className="text-base font-semibold text-white">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </header>

          <section className="space-y-4 px-1 text-sm leading-6">
            <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-center text-[0.8rem] font-semibold tracking-[0.08em] text-white uppercase shadow-inner shadow-black/50">
              You&apos;ll be surprised what rolls off of our rolls.
            </div>

            <button
              type="button"
              onClick={handleSaveContact}
              className="cta-button mx-auto flex items-center justify-center rounded-2xl border border-white/15 px-5 py-3 text-base font-semibold text-white shadow-[0_18px_32px_rgba(0,0,0,0.7)] transition"
              style={{
                backgroundColor: accent,
                color: "#081207",
                boxShadow:
                  "0 8px 18px rgba(124,255,58,0.35), inset 0 1px 0 rgba(255,255,255,0.35)",
              }}
            >
              Save Contact
            </button>

            <p className="text-center text-[0.7rem] text-white/70">
              <span className="block font-semibold text-white">{footerPrimary}</span>
              <span className="block italic">{footerSecondary}</span>
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
