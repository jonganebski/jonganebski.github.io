import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';
import type { RouterOptions } from 'vite-ssg';

export const routerOptions: RouterOptions = {
  routes: setupLayouts(generatedRoutes),
  base: import.meta.env.BASE_URL,
  scrollBehavior: (_, __, savedPosition) => savedPosition ?? { top: 0 },
};
