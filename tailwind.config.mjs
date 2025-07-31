/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Neutrals (from web dev portfolio)
        "gray-50": "#F9FAFB",
        "gray-100": "#F3F4F6",
        "gray-200": "#E5E7EB",
        "gray-300": "#D1D5DB",
        "gray-400": "#9CA3AF",
        "gray-500": "#6B7280",
        "gray-600": "#4B5563",
        "gray-700": "#374151",
        "gray-800": "#1F2937",
        "gray-900": "#111827",

        // Primary Accent Color (from web dev portfolio)
        "primary-blue": "#1A73E8", // Google's classic blue
        "primary-blue-light": "#4285F4", // Lighter for hover
        "primary-blue-dark": "#125CBF", // Darker for active/focus

        // Secondary Accent Color (from web dev portfolio)
        "accent-green": "#10B981", // A calm, fresh green
        "accent-green-light": "#34D399",
        "accent-green-dark": "#059669",

        // Additional Semantic Colors (optional, keep if used)
        success: "#15803D",
        warning: "#FACC15",
        error: "#DC2626",
      },
      fontFamily: {
        // Adopt Poppins from web dev portfolio
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontWeight: {
        // Poppins generally uses 400, 600, 700 (bold)
        bold: "700", // Mapping Tailwind's 'bold' to 700 for Poppins
        // Remove 'extrabold' if Poppins doesn't have 800 weight unless desired fallback
      },
      boxShadow: {
        // Keep the same custom shadows as before
        light:
          "0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.04)",
        medium:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        strong:
          "0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.08)",
        "inset-light": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      },
      borderRadius: {
        // Keep same border radius
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
