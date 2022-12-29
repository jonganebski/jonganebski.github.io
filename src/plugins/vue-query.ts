import { VueQueryPlugin } from '@tanstack/vue-query';
import { Plugin } from './@types';

export const install: Plugin = ({ app }) => {
  app.use(VueQueryPlugin);
};
