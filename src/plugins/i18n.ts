import { createI18n } from 'vue-i18n';
import enMessages from '../../locales/en.json';
import koMessages from '../../locales/ko.json';
import { Plugin } from './@types';

export type Locale = 'en' | 'ko';

export function useMyI18n() {
  const i18n = useI18n<[typeof enMessages], Locale>();

  const setLocaleTo = (to: Locale) => {
    i18n.locale.value = to;
  };

  return { ...i18n, setLocaleTo };
}

export const i18n = createI18n({
  legacy: false,
  locale: 'ko',
  messages: { ko: koMessages, en: enMessages },
});

export const install: Plugin = ({ app }) => app.use(i18n);
