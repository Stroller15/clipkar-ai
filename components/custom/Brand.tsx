import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** The ClipKar mark (white glyph from /public/logo.png) plus the wordmark. */
export const Logo = ({
  href = "/",
  className,
}: {
  href?: string;
  className?: string;
}) => (
  <Link
    href={href}
    className={cn(
      "inline-flex items-center gap-2 rounded-md text-foreground",
      className
    )}
  >
    <Image src="/logo.png" alt="" width={24} height={24} priority />
    <span className="text-[17px] font-semibold leading-none">ClipKar</span>
  </Link>
);

/**
 * Signature detail: a burned-in short-video caption.
 * Bold white words on the frame, one word picked out in caption yellow.
 */
export const Caption = ({
  words,
  active,
  className,
}: {
  words: string[];
  active?: number;
  className?: string;
}) => (
  <p
    className={cn(
      "text-balance text-center font-semibold leading-[1.15] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.55)]",
      className
    )}
  >
    {words.map((word, i) => (
      <span key={`${word}-${i}`}>
        <span
          className={cn(
            "rounded-[4px] px-[3px] transition-colors duration-150",
            i === active && "bg-caption text-caption-foreground [text-shadow:none]"
          )}
        >
          {word}
        </span>
        {i < words.length - 1 && " "}
      </span>
    ))}
  </p>
);

/** A 9:16 frame, the shape every ClipKar short ships in. */
export const ShortFrame = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "relative aspect-[9/16] overflow-hidden rounded-2xl border border-border bg-sidebar",
      className
    )}
  >
    {children}
  </div>
);

export const STYLES = [
  { name: "Realistic", image: "/realistic.png" },
  { name: "Cartoon", image: "/cartoon.png" },
  { name: "Comic", image: "/comic.png" },
  { name: "GTA", image: "/gta.png" },
  { name: "Imaginary", image: "/imaginary.png" },
  { name: "WaterColor", image: "/watercolor.png", label: "Watercolor" },
] as const;

export const TOPICS = [
  "Random AI Story",
  "Scary Story",
  "Historical Facts",
  "Bed Time Story",
  "Motivational",
  "Fun Facts",
  "Kids Story",
] as const;

export const DURATIONS = ["15 Seconds", "30 Seconds", "45 Seconds", "60 Seconds"] as const;
