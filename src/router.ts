import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';
import type { RouterOptions } from 'vite-ssg';

export const routerOptions: RouterOptions = {
  routes: setupLayouts(generatedRoutes),
  base: import.meta.env.BASE_URL,
  scrollBehavior: async (to, __, savedPosition) => {
    await nextTick();
    const { scrollTo } = to.query;
    if (scrollTo) {
      const el = document.getElementById(scrollTo.toString());
      return { el, top: 60 };
    }
    return savedPosition ?? { top: 0 };
  },
};
