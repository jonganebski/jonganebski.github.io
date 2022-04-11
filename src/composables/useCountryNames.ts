import { useMyI18n } from '~/plugins/i18n';

export function useCountryNames() {
  const { t } = useMyI18n();

  const countryName = computed<{ [key: string]: string }>(() => ({
    CN: t('countries.china'),
    KR: t('countries.south_korea'),
    MN: t('countries.mongolia'),
    RU: t('countries.russia'),
  }));

  return { countryName };
}
