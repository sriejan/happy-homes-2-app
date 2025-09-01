export const tokens = {
  radii: {
    none: "0",
    sm: "0.375rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.04)",
    md: "0 6px 20px rgba(0,0,0,0.06)",
    lg: "0 14px 40px rgba(0,0,0,0.08)",
    glow: "0 0 0 2px rgba(191,164,94,0.15)",
  },
  spacing: {
    container: "max-w-[1280px]",
    sectionY: "py-16 md:py-24",
  },
  motion: {
    fast: "150ms",
    base: "200ms",
    slow: "300ms",
    easing: "cubic-bezier(.2,.7,.2,1)",
  },
  colors: {
    bg: "#FFFFFF",
    bgMuted: "#F5F3EF",
    text: "#121212",
    border: "#EAE6DA",
    brand: "#BFA45E",
    brandMuted: "rgba(191,164,94,0.12)",
  },
} as const;

export type Tokens = typeof tokens;

// Helper utilities
export const ringFocus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#BFA45E] focus-visible:ring-offset-white";
export const cardClass = "rounded-2xl shadow-md border border-[var(--kk-border)] bg-white";

// CSS variable helpers
export const cssVars = {
  "--kk-bg": tokens.colors.bg,
  "--kk-text": tokens.colors.text,
  "--kk-border": tokens.colors.border,
  "--kk-brand": tokens.colors.brand,
  "--kk-motion-base": tokens.motion.base,
  "--kk-motion-ease": tokens.motion.easing,
} as const;
