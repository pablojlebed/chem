/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Tron: Ares Palette (Reference: icpms-sim.thelabguy.org)
        "tron-black": "#000000", // Pure black
        "tron-dark-200": "#0a0a0f", // Deep black/gray
        "tron-red": "#FF0033", // Vibrant Crimson
        "tron-red-dim": "rgba(255, 0, 51, 0.1)", // For backgrounds
        "tron-cyan": "#00F0FF", // Re-added for text
        "tron-orange": "#FF4500", // Tron Orange if needed
        "tron-grid": "rgba(0, 240, 255, 0.15)", // Cyan tint for grid from ref

        // Neutrals (adapted for dark mode)
        "gray-50": "#f9fafb", // Keep for text on light (if any)
        "gray-100": "#f3f4f6",
        "gray-200": "#e5e7eb",
        "gray-300": "#d1d5db",
        "gray-400": "#9ca3af",
        "gray-500": "#6b7280",
        "gray-600": "#4b5563",
        "gray-700": "#374151",
        "gray-800": "#1f2937",
        "gray-900": "#111827",

        // Mapping to "primary" for compatibility if needed, but prefer specific names
        "primary-blue": "#FF0033",
        "primary-blue-dark": "#DC143C",
      },
      fontFamily: {
        sans: ["Orbitron", "Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      boxShadow: {
        "glow-red": "0 0 10px rgba(255, 0, 51, 0.6), 0 0 20px rgba(255, 0, 51, 0.3)",
        "glow-orange": "0 0 10px rgba(255, 69, 0, 0.6), 0 0 20px rgba(255, 69, 0, 0.3)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
};
