import { VueQueryPlugin } from 'vue-query';
import type { ViteSSGContext } from 'vite-ssg';

type Plugin = (ctx: ViteSSGContext) => void;
export const install: Plugin = ({ app }) => {
	app.use(VueQueryPlugin);
};
