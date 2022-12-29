import { ViteSSG } from 'vite-ssg';
import App from './App.vue';

// windicss layers
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
// your custom styles here
import './styles/main.css';
import 'mapbox-gl/dist/mapbox-gl.css';
// windicss utilities should be the last style import
import 'virtual:windi-utilities.css';
// windicss devtools support (dev only)
import 'virtual:windi-devtools';

import { routerOptions } from './router';
import { Plugin } from './plugins/@types';

export const createApp = ViteSSG(App, routerOptions, (ctx) => {
  Object.values(import.meta.glob<{ install?: Plugin }>('./plugins/*.ts', { eager: true })).forEach(
    (plugin) => plugin.install?.(ctx),
  );
});
