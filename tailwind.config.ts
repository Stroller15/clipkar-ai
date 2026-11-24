import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const token = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        background: token("background"),
        sidebar: token("sidebar"),
        raised: token("raised"),
        foreground: token("foreground"),
        subtle: token("subtle"),
        card: {
          DEFAULT: token("card"),
          foreground: token("card-foreground"),
        },
        popover: {
          DEFAULT: token("popover"),
          foreground: token("popover-foreground"),
        },
        primary: {
          DEFAULT: token("primary"),
          foreground: token("primary-foreground"),
        },
        secondary: {
          DEFAULT: token("secondary"),
          foreground: token("secondary-foreground"),
        },
        muted: {
          DEFAULT: token("muted"),
          foreground: token("muted-foreground"),
        },
        accent: {
          DEFAULT: token("accent"),
          foreground: token("accent-foreground"),
        },
        caption: {
          DEFAULT: token("caption"),
          foreground: token("caption-foreground"),
        },
        positive: token("positive"),
        destructive: {
          DEFAULT: token("destructive"),
          foreground: token("destructive-foreground"),
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: token("ring"),
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        DEFAULT: "160ms",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
