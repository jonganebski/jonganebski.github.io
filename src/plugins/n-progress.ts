import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { ViteSSGContext } from 'vite-ssg';

type Plugin = (ctx: ViteSSGContext) => void;

export const install: Plugin = ({ isClient, router }) => {
  if (!isClient) return;

  router.beforeEach(() => {
    NProgress.start();
  });
  router.afterEach(() => {
    NProgress.done();
  });
};
