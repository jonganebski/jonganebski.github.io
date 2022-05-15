import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Plugin } from './@types';

export const install: Plugin = ({ isClient, router }) => {
  if (!isClient) return;

  router.beforeEach(() => {
    NProgress.start();
  });
  router.afterEach(() => {
    NProgress.done();
  });
};
