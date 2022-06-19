import { VueQueryPlugin } from 'vue-query';
import { Plugin } from './@types';

export const install: Plugin = ({ app }) => {
  app.use(VueQueryPlugin);
};
