import { defineConfig } from 'windicss/helpers';
import typography from 'windicss/plugin/typography';
import aspectRatio from 'windicss/plugin/aspect-ratio';

export const markdownWrapperClass = 'prose prose m-auto text-left';

export default defineConfig({
  attributify: true,
  darkMode: 'class',
  safelist: [markdownWrapperClass],
  plugins: [typography(), aspectRatio],
});