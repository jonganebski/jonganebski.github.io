import { defineConfig } from 'windicss/helpers';
import typography from 'windicss/plugin/typography';

export default defineConfig({
	attributify: true,
	darkMode: 'class',
	plugins: [typography()],
});
