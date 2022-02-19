import { defineConfig } from 'windicss/helpers';
import typography from 'windicss/plugin/typography';
import aspectRatio from 'windicss/plugin/aspect-ratio';

export const markdownWrapperClass = 'prose prose m-auto text-left';

export default defineConfig({
  attributify: true,
  darkMode: 'class',
  safelist: [markdownWrapperClass, 'animate-wiggle'],
  plugins: [typography(), aspectRatio],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '50%': { transform: 'rotate(-2deg)' },
          '75%': { transform: 'rotate(1deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.2s linear infinite',
      },
    },
  },
});
