import type { ReactNode } from "react";

export default function Home() {
  const phoneDisplay = "773.287.3716";
  const phoneHref = "+17732873716";
  const noiseTexture =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='.25'/%3E%3C/svg%3E";
  const accent = "#1D3370";

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-8 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url("${noiseTexture}")`,
          mixBlendMode: "screen",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_55%)] opacity-70" />

      <article className="relative w-full max-w-xs space-y-5 overflow-hidden rounded-[30px] border border-white/10 bg-black/70 px-6 py-7 text-slate-100 shadow-[0_35px_70px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:max-w-sm">
        <div
          className="pointer-events-none absolute inset-0 rounded-[30px]"
          style={{
            background:
              "linear-gradient(140deg, rgba(255,255,255,0.18), rgba(255,255,255,0))",
            opacity: 0.3,
          }}
        />

        <div className="relative space-y-6">
          <header
            className="rounded-2xl border border-white/15 px-5 py-5 shadow-inner shadow-black/40"
            style={{ background: "linear-gradient(145deg,#03050b,#101422)" }}
          >
            <p className="text-[0.55rem] uppercase tracking-[0.45rem] text-white/65">
              Chromium Industries LLC.
            </p>
            <h1 className="mt-4 text-[1.7rem] font-semibold leading-tight text-white">
              Mike Tannura
            </h1>
            <p className="text-sm text-white/70">President</p>
          </header>

          <section className="space-y-5 px-1 text-sm leading-6">
            <p className="text-[0.7rem] font-semibold tracking-[0.1em] text-white">
              YOU&apos;LL BE SURPRISED WHAT ROLLS OFF OF OUR ROLLS
            </p>

            <dl className="space-y-3 text-sm">
              <Detail label="Company" value="Chromium Industries LLC." />
              <Detail label="Title" value="President" />
              <Detail
                label="Phone"
                value={
                  <a
                    className="font-semibold text-white underline decoration-white/30 underline-offset-4 transition hover:text-[#9fb3ff]"
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
                    className="font-semibold text-white underline decoration-white/30 underline-offset-4 transition hover:text-[#9fb3ff]"
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
              className="cta-button flex items-center justify-center rounded-2xl px-5 py-3 text-base font-semibold text-white shadow-[0_18px_32px_rgba(0,0,0,0.4)] transition"
              style={{ backgroundColor: accent }}
            >
              Save Contact
            </a>

            <p className="text-center text-[0.68rem] text-white/65">
              Built in America, on Earth.
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
