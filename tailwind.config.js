export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",

        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",

        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",

        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",

        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(2px, -2px)' },
          '50%': { transform: 'translate(0, -4px)' },
          '75%': { transform: 'translate(-2px, -2px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
      },
      animation: {
        orbit: 'orbit 0.6s ease-in-out',
      },
    },
  },
  plugins: [],
};