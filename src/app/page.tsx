"use client";

import { FormEvent, useCallback, useMemo, useState } from "react";

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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [formError, setFormError] = useState("");

  const headerDetails = [
    { label: "First Name", value: "Mike" },
    { label: "Last Name", value: "Tannura" },
    { label: "Title", value: "President" },
  ];

  const cleanedMikePhone = useMemo(
    () => `+1${phoneDisplay.replace(/\D/g, "")}`,
    [phoneDisplay]
  );

  const openSmsComposer = useCallback(
    (message: string) => {
      const userAgent = navigator.userAgent;
      const isIOS = /iP(ad|hone|od)/i.test(userAgent);
      const isSamsung = /Samsung|SM-|SAMSUNG/i.test(userAgent);
      const separator = isIOS ? "&" : "?";
      // Samsung Messages handles CRLF line breaks more consistently than LF-only.
      const normalizedMessage = isSamsung
        ? message.replace(/\n/g, "\r\n")
        : message;
      const smsBody = encodeURIComponent(normalizedMessage);
      const smsUrl = `sms:${cleanedMikePhone}${separator}body=${smsBody}`;
      window.location.href = smsUrl;
    },
    [cleanedMikePhone]
  );

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

    // Then ask whether to open a form and prepare a text to Mike.
    const promptDelayMs = 1200;

    const promptForSms = () => {
      const shouldText = window.confirm(
        "Contact saved. Do you want to prepare a text message to Mike?"
      );
      if (shouldText) {
        setIsFormOpen(true);
      }
    };

    window.setTimeout(promptForSms, promptDelayMs);
  }, []);

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const trimmedName = senderName.trim();
      const trimmedEmail = senderEmail.trim();
      const trimmedPhone = senderPhone.trim();

      if (!trimmedName || !trimmedEmail || !trimmedPhone) {
        setFormError("Please fill in your name, email, and phone number.");
        return;
      }

      const shareParams = new URLSearchParams({
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
      });
      const shareableContactLink = `${window.location.origin}/api/contact-card?${shareParams.toString()}`;

      const smsMessage = [
        `Hi Mike, I just saved your contact from Chromium Industries.`,
        `Name: ${trimmedName}`,
        `Email: ${trimmedEmail}`,
        `Phone: ${trimmedPhone}`,
        `Save my contact: ${shareableContactLink}`,
      ].join("\n");

      setFormError("");
      setIsFormOpen(false);
      openSmsComposer(smsMessage);
    },
    [openSmsComposer, senderEmail, senderName, senderPhone]
  );

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

      {isFormOpen ? (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/65 px-4">
          <div className="w-full max-w-sm rounded-3xl border border-white/15 bg-[#171d23] p-5 shadow-2xl">
            <h2 className="text-base font-semibold text-white">
              Text Mike Your Contact Info
            </h2>
            <p className="mt-1 text-xs text-white/70">
              Fill this in to prefill your text message and include a shareable
              contact card link.
            </p>

            <form className="mt-4 space-y-3" onSubmit={handleFormSubmit}>
              <label className="block text-xs text-white/75">
                Full name
                <input
                  type="text"
                  value={senderName}
                  onChange={(event) => setSenderName(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/40"
                  placeholder="Your name"
                />
              </label>

              <label className="block text-xs text-white/75">
                Email
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(event) => setSenderEmail(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/40"
                  placeholder="name@email.com"
                />
              </label>

              <label className="block text-xs text-white/75">
                Phone number
                <input
                  type="tel"
                  value={senderPhone}
                  onChange={(event) => setSenderPhone(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/40"
                  placeholder="(555) 555-5555"
                />
              </label>

              {formError ? (
                <p className="text-xs text-red-300">{formError}</p>
              ) : null}

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    setFormError("");
                  }}
                  className="flex-1 rounded-xl border border-white/25 px-3 py-2 text-sm text-white/90"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl px-3 py-2 text-sm font-semibold"
                  style={{ backgroundColor: accent, color: "#081207" }}
                >
                  Create Text
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
