/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "IBM Plex Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      colors: {
        // Cool slate-gray scale — operator console, not warm
        ink: {
          50: "#f7f8fb",
          100: "#eef0f5",
          200: "#dde2eb",
          300: "#bcc3d4",
          400: "#838ba2",
          500: "#5b6379",
          600: "#41485c",
          700: "#2c3245",
          800: "#1c2132",
          900: "#0e1322",
        },
        // Indigo/violet brand — system-tool feel, distinct from sales-blue and onboarding-teal
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        success: {
          50: "#ecfdf5",
          100: "#d1fae5",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
        },
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
        },
        // SLA-breach urgent rose — only for high-pressure indicators
        urgent: {
          50: "#fff1f2",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
        },
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(14, 19, 34, 0.04)",
        pop: "0 8px 24px -8px rgba(14, 19, 34, 0.18), 0 2px 6px -1px rgba(14, 19, 34, 0.06)",
        drawer: "-12px 0 32px -12px rgba(14, 19, 34, 0.20)",
      },
      borderRadius: {
        // Tighter rounding — operator software, not consumer
        DEFAULT: "0.375rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.625rem",
      },
      spacing: {
        "px-half": "0.5px",
      },
    },
  },
  plugins: [],
};
