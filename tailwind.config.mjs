/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Tron: Ares Palette
        "tron-black": "#0d1117", // Very dark blue-gray, almost black
        "tron-dark-200": "#161b22", // Slightly lighter for cards/headers
        "tron-red": "#ef233c", // The Ares vibrant red
        "tron-red-dim": "rgba(239, 35, 60, 0.1)", // For backgrounds
        "tron-orange": "#ffa500", // For warnings/accents (keep as secondary if needed)
        "tron-grid": "#1a2634", // Grid line color

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
        "primary-blue": "#ef233c",
        "primary-blue-dark": "#d90429",
      },
      fontFamily: {
        sans: ["Orbitron", "Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      boxShadow: {
        "glow-red": "0 0 10px rgba(239, 35, 60, 0.5), 0 0 20px rgba(239, 35, 60, 0.3)",
        "glow-orange": "0 0 10px rgba(255, 165, 0, 0.5), 0 0 20px rgba(255, 165, 0, 0.3)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
};
