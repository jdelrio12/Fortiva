import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:     '#081F3A',
        midnight: '#071426',
        electric: '#2563EB',
        silver:   '#C7CDD6',
        charcoal: '#475569',
      },
    },
  },
  plugins: [],
}
export default config
