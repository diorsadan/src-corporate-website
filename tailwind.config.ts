import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      /* ===== COLORS ===== */
      colors: {
        /* Primary Palette */
        primary: {
          DEFAULT: "hsl(var(--color-primary) / <alpha-value>)",
          dark: "hsl(var(--color-primary-dark) / <alpha-value>)",
          light: "hsl(var(--color-primary-light) / <alpha-value>)",
          foreground: "hsl(var(--color-primary-foreground) / <alpha-value>)",
        },
        /* Secondary Palette */
        secondary: {
          DEFAULT: "hsl(var(--color-secondary) / <alpha-value>)",
          dark: "hsl(var(--color-secondary-dark) / <alpha-value>)",
          light: "hsl(var(--color-secondary-light) / <alpha-value>)",
          foreground: "hsl(var(--color-secondary-foreground) / <alpha-value>)",
        },
        /* Neutral Palette */
        muted: {
          DEFAULT: "hsl(var(--color-muted) / <alpha-value>)",
          foreground: "hsl(var(--color-muted-foreground) / <alpha-value>)",
        },
        /* Status Colors */
        destructive: "hsl(var(--color-destructive) / <alpha-value>)",
        success: "hsl(var(--color-success) / <alpha-value>)",
        warning: "hsl(var(--color-warning) / <alpha-value>)",
        info: "hsl(var(--color-info) / <alpha-value>)",
        /* UI Colors */
        accent: {
          DEFAULT: "hsl(var(--color-accent) / <alpha-value>)",
          foreground: "hsl(var(--color-accent-foreground) / <alpha-value>)",
        },
        background: "hsl(var(--color-background) / <alpha-value>)",
        foreground: "hsl(var(--color-foreground) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--color-card) / <alpha-value>)",
          foreground: "hsl(var(--color-card-foreground) / <alpha-value>)",
        },
        border: "hsl(var(--color-border) / <alpha-value>)",
        ring: "hsl(var(--color-ring) / <alpha-value>)",
      },

      /* ===== FONT WEIGHTS ===== */
      fontWeight: {
        light: "var(--font-weight-light)",
        normal: "var(--font-weight-normal)",
        medium: "var(--font-weight-medium)",
        semibold: "var(--font-weight-semibold)",
        bold: "var(--font-weight-bold)",
        "extra-bold": "var(--font-weight-extra-bold)",
        black: "var(--font-weight-black)",
      },

      /* ===== LINE HEIGHT ===== */
      lineHeight: {
        tight: "var(--line-height-tight)",
        normal: "var(--line-height-normal)",
        relaxed: "var(--line-height-relaxed)",
      },

      /* ===== BOX SHADOWS ===== */
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
      },

      /* ===== BORDER RADIUS ===== */
      borderRadius: {
        none: "var(--radius-none)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },

      /* ===== SPACING SCALE ===== */
      spacing: {
        "0": "var(--space-0)",
        "1": "var(--space-1)",
        "2": "var(--space-2)",
        "3": "var(--space-3)",
        "4": "var(--space-4)",
        "6": "var(--space-6)",
        "8": "var(--space-8)",
        "12": "var(--space-12)",
        "16": "var(--space-16)",
        "20": "var(--space-20)",
        "24": "var(--space-24)",
      },

      /* ===== ANIMATION DURATIONS ===== */
      transitionDuration: {
        fast: "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)",
        slower: "var(--duration-slower)",
        slowest: "var(--duration-slowest)",
      },

      /* ===== ANIMATION TIMING FUNCTIONS ===== */
      transitionTimingFunction: {
        "ease-out": "var(--easing-ease-out)",
        "ease-in": "var(--easing-ease-in)",
        "ease-in-out": "var(--easing-ease-in-out)",
        linear: "var(--easing-ease-linear)",
        spring: "var(--easing-ease-spring)",
      },
    },
  },
  plugins: [],
};

export default config;
