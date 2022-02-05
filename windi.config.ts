import { defineConfig } from 'windicss/helpers';
import typography from 'windicss/plugin/typography';

export const markdownWrapperClass = 'prose prose m-auto text-left';

export default defineConfig({
	attributify: true,
	darkMode: 'class',
	safelist: [markdownWrapperClass],
	plugins: [typography()],
});
