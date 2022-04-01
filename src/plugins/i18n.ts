import { createI18n } from 'vue-i18n';
import type { ViteSSGContext } from 'vite-ssg';
import koMessages from '../../locales/ko.json';
import enMessages from '../../locales/en.json';

type Plugin = (ctx: ViteSSGContext) => void;

export type Locale = 'en' | 'ko';

export function useMyI18n() {
  const i18n = useI18n<[typeof enMessages], Locale>();

  const setLocaleTo = (to: Locale) => {
    i18n.locale.value = to;
  };

  return { ...i18n, setLocaleTo };
}

export const install: Plugin = ({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'ko',
    messages: { ko: koMessages, en: enMessages },
  });

  app.use(i18n);
};
