import type { ReactNode } from "react";

export default function Home() {
  const phoneDisplay = "773.287.3716";
  const phoneHref = "+17732873716";
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
        className="relative w-full max-w-xs space-y-6 overflow-hidden rounded-[34px] border border-white/5 px-6 py-7 text-slate-100 shadow-[0_28px_70px_rgba(3,3,3,0.8)] sm:max-w-sm"
        style={{
          background: `linear-gradient(135deg, ${gunmetalStart}, ${gunmetalEnd})`,
        }}
      >
        <div className="pointer-events-none absolute inset-[1px] rounded-[32px] border border-white/10 shadow-inner shadow-black/70" />
        <div className="pointer-events-none absolute inset-0 rounded-[34px] opacity-25" style={{ background: "linear-gradient(150deg,rgba(255,255,255,0.2),transparent)" }} />
        <span
          className="absolute -right-6 top-8 h-28 w-28 rounded-full blur-3xl"
          style={{ backgroundColor: accent, opacity: 0.15 }}
          aria-hidden="true"
        />

        <div className="relative space-y-6">
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

          <section className="space-y-5 px-1 text-sm leading-6">
            <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-center text-[0.8rem] font-semibold tracking-[0.08em] text-white uppercase shadow-inner shadow-black/50">
              You&apos;ll be surprised what rolls off of our rolls.
            </div>

            <dl className="space-y-3 text-sm">
              <Detail
                label="Phone Number"
                value={
                  <a
                    className="font-semibold text-white underline decoration-white/30 underline-offset-4 transition hover:text-[#7cff3a]"
                    href={`tel:${phoneHref}`}
                  >
                    {phoneDisplay}
                  </a>
                }
              />
              <Detail
                label="Email"
                value={
                  <a
                    className="font-semibold text-white underline decoration-white/30 underline-offset-4 transition hover:text-[#7cff3a]"
                    href="mailto:mtannura@chormiumind.com"
                  >
                    mtannura@chormiumind.com
                  </a>
                }
              />
            </dl>

            <a
              href="/mike-tannura.vcf"
              download
              className="cta-button flex items-center justify-center rounded-2xl border border-white/15 px-5 py-3 text-base font-semibold text-white shadow-[0_18px_32px_rgba(0,0,0,0.7)] transition"
              style={{
                backgroundColor: accent,
                color: "#081207",
                boxShadow:
                  "0 8px 18px rgba(124,255,58,0.35), inset 0 1px 0 rgba(255,255,255,0.35)",
              }}
            >
              Save Contact
            </a>

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

type DetailProps = {
  label: string;
  value: ReactNode;
};

function Detail({ label, value }: DetailProps) {
  return (
    <div className="flex items-center justify-between text-white/70">
      <dt className="text-[0.65rem] uppercase tracking-[0.25em]">{label}</dt>
      <dd className="text-right text-sm font-medium text-white">{value}</dd>
    </div>
  );
}
