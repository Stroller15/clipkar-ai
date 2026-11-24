"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Caption, Logo, ShortFrame, STYLES } from "@/components/custom/Brand";
import { cn } from "@/lib/utils";

const HERO_CAPTION = ["Nobody", "noticed", "the", "second", "sun", "until", "it", "started", "setting"];

const PIPELINE = [
  { step: "Script", detail: "6 scenes", state: "done" },
  { step: "Voiceover", detail: "0:28", state: "done" },
  { step: "Captions", detail: "74 words", state: "done" },
  { step: "Images", detail: "4 of 6", state: "running" },
] as const;

function useCaptionCursor(length: number, interval = 420) {
  const [index, setIndex] = useState(3);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % length), interval);
    return () => window.clearInterval(id);
  }, [length, interval]);
  return index;
}

const HeroPreview = () => {
  const active = useCaptionCursor(HERO_CAPTION.length);
  const progress = 12 + active * 1.6;

  return (
    <div className="relative mx-auto flex w-full max-w-[520px] items-end justify-center gap-4 sm:gap-6 lg:mx-0 lg:justify-end">
      {/* The short itself */}
      <ShortFrame className="w-[220px] shrink-0 shadow-[0_24px_64px_rgba(0,0,0,0.45)] sm:w-[260px]">
        <Image
          src="/imaginary.png"
          alt="Imaginary-style scene: travellers on a ridge walking toward a second sun"
          fill
          priority
          sizes="260px"
          className="scale-[1.35] object-cover object-[70%_50%]"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute inset-x-4 bottom-16">
          <Caption words={HERO_CAPTION} active={active} className="text-[19px]" />
        </div>
        <div className="absolute inset-x-4 bottom-4 flex items-center gap-2 font-mono text-[11px] tabular-nums text-white/80">
          <span>0:{String(Math.round(progress)).padStart(2, "0")}</span>
          <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/25">
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-white transition-[width] duration-300"
              style={{ width: `${(progress / 30) * 100}%` }}
            />
          </span>
          <span>0:30</span>
        </div>
      </ShortFrame>

      {/* Render queue */}
      <div className="hidden w-[220px] shrink-0 rounded-2xl border border-border bg-card p-4 sm:block">
        <div className="flex items-baseline justify-between">
          <p className="text-[13px] font-medium">Rendering</p>
          <p className="font-mono text-[12px] text-muted-foreground">30s · Imaginary</p>
        </div>
        <p className="mt-1 text-[13px] leading-5 text-subtle">The second sun</p>
        <ol className="mt-4 space-y-1">
          {PIPELINE.map((item) => (
            <li
              key={item.step}
              className={cn(
                "flex h-9 items-center gap-2 rounded-lg px-2 text-[13px]",
                item.state === "running" && "bg-raised shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
              )}
            >
              <span className="grid h-4 w-4 place-items-center">
                {item.state === "done" ? (
                  <Check className="h-4 w-4 text-positive" strokeWidth={1.5} />
                ) : (
                  <Loader2 className="h-4 w-4 animate-spin text-caption" strokeWidth={1.5} />
                )}
              </span>
              <span className={item.state === "done" ? "text-subtle" : "text-foreground"}>
                {item.step}
              </span>
              <span className="ml-auto font-mono text-[12px] tabular-nums text-muted-foreground">
                {item.detail}
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-4 grid grid-cols-3 gap-1">
          {["/imaginary.png", "/realistic.png", "/watercolor.png"].map((src, i) => (
            <div key={src} className="relative aspect-[9/16] overflow-hidden rounded-md bg-raised">
              {i < 2 && (
                <Image src={src} alt="" fill sizes="64px" className="object-cover" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CHOICES = [
  {
    n: "01",
    title: "Pick a topic",
    body: "Scary stories, historical facts, bedtime stories, fun facts — or write your own prompt.",
    chips: ["Scary story", "Historical facts", "Bedtime story", "Your own prompt"],
  },
  {
    n: "02",
    title: "Choose a look",
    body: "Every scene is illustrated in one consistent art style.",
    styles: true,
  },
  {
    n: "03",
    title: "Set the length",
    body: "ClipKar paces the script and voiceover to fit.",
    chips: ["15s", "30s", "45s", "60s"],
    mono: true,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <Logo />
        <nav className="flex items-center gap-2">
          <a
            href="#how"
            className="hidden rounded-md px-3 py-2 text-sm text-subtle transition-colors hover:text-foreground sm:block"
          >
            How it works
          </a>
          <SignedOut>
            <Link
              href="/sign-in"
              className="rounded-md px-3 py-2 text-sm text-subtle transition-colors hover:text-foreground"
            >
              Sign in
            </Link>
          </SignedOut>
          <Button asChild size="sm">
            <Link href="/dashboard">Open ClipKar</Link>
          </Button>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-12 sm:pt-16 lg:min-h-[calc(100vh-64px)] lg:grid-cols-[1fr_auto] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-0">
          <div className="animate-rise max-w-xl">
            <p className="font-mono text-[12px] text-muted-foreground">
              Topic → script → voice → captions → images
            </p>
            <h1 className="mt-4 text-balance text-[40px] font-medium leading-[1.05] tracking-[-0.02em] sm:text-[56px] lg:text-[64px] lg:tracking-[-0.03em]">
              Type a topic. Get a narrated short
            </h1>
            <p className="mt-6 max-w-[34rem] text-[18px] leading-[28px] text-subtle">
              ClipKar writes the script, records the voiceover, times every
              caption and illustrates each scene in the style you pick. No
              editing timeline to learn.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/dashboard/create">
                  Make your first short
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="#how">How it works</a>
              </Button>
            </div>
          </div>

          <div className="animate-rise [animation-delay:80ms]">
            <HeroPreview />
          </div>
        </section>

        {/* Three choices */}
        <section id="how" className="scroll-mt-8 border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="grid gap-4 lg:grid-cols-[320px_1fr] lg:gap-16">
              <h2 className="text-[32px] font-medium leading-[1.15] tracking-[-0.02em]">
                Three choices, one finished short
              </h2>
              <p className="max-w-lg text-[16px] leading-[26px] text-subtle lg:pt-2">
                You decide what it&apos;s about, how it looks and how long it
                runs. ClipKar handles the writing, narration, captions and art.
              </p>
            </div>

            <ol className="mt-12 divide-y divide-border border-y border-border">
              {CHOICES.map((c) => (
                <li
                  key={c.n}
                  className="grid gap-4 py-8 lg:grid-cols-[320px_1fr] lg:gap-16"
                >
                  <div className="flex gap-4">
                    <span className="pt-[3px] font-mono text-[12px] text-muted-foreground">
                      {c.n}
                    </span>
                    <div>
                      <h3 className="text-[18px] font-medium leading-7">{c.title}</h3>
                      <p className="mt-1 text-[15px] leading-[22px] text-subtle">{c.body}</p>
                    </div>
                  </div>

                  {c.styles ? (
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                      {STYLES.map((s) => (
                        <figure key={s.name}>
                          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-raised">
                            <Image
                              src={s.image}
                              alt={`${"label" in s ? s.label : s.name} style sample`}
                              fill
                              sizes="(min-width: 1024px) 120px, 30vw"
                              className="object-cover"
                            />
                          </div>
                          <figcaption className="mt-2 text-[13px] text-subtle">
                            {"label" in s ? s.label : s.name}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap content-start gap-2">
                      {c.chips?.map((chip) => (
                        <span
                          key={chip}
                          className={cn(
                            "inline-flex h-8 items-center rounded-md border border-border bg-card px-3 text-[13px] text-subtle",
                            c.mono && "font-mono tabular-nums"
                          )}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Call to action */}
        <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-card p-8 sm:flex-row sm:items-center lg:p-12">
            <div>
              <h2 className="text-[28px] font-medium leading-[1.15] tracking-[-0.01em]">
                Your first short is three choices away
              </h2>
              <p className="mt-2 text-[15px] leading-[22px] text-subtle">
                Sign in, pick a topic, a style and a length
              </p>
            </div>
            <Button asChild size="lg" className="shrink-0">
              <Link href="/dashboard/create">
                Start creating
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 text-[13px] text-muted-foreground lg:px-8">
          <span>© {new Date().getFullYear()} ClipKar</span>
          <span className="font-mono text-[12px]">9:16 · 15–60s</span>
        </div>
      </footer>
    </div>
  );
}
