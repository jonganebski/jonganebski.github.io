import { createI18n } from 'vue-i18n';
import type { ViteSSGContext } from 'vite-ssg';
import koMessages from '../../locales/ko.json';
import enMessages from '../../locales/en.json';

type Plugin = (ctx: ViteSSGContext) => void;

export type Locale = 'en' | 'ko';

// const messages = Object.fromEntries(
//   Object.entries(import.meta.globEager('../../locales/*.json')).map(([key, value]) => {
//     const json = key.endsWith('.json');
//     return [key.slice(14, json ? -5 : -4), value.default];
//   }),
// );

export function useMyI18n() {
  return useI18n<[typeof enMessages], Locale>();
}

export const install: Plugin = ({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: { ko: koMessages, en: enMessages },
  });

  app.use(i18n);
};
