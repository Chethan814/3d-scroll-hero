import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "lambo-black": "var(--color-lambo-black)",
                "lambo-gold": "var(--color-lambo-gold)",
                "bright-gold": "var(--color-bright-gold)",
                "carbon-gray": "var(--color-carbon-gray)",
            },
            fontFamily: {
                orbitron: ["var(--font-orbitron)"],
                rajdhani: ["var(--font-rajdhani)"],
            },
        },
    },
    plugins: [],
};
export default config;
