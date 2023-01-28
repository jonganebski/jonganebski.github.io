import { useMyI18n } from '~/plugins/i18n';

export function useCountryNames() {
  const { t } = useMyI18n();

  const countryName = computed<{ [key: string]: string }>(() => ({
    AZ: t('countries.azerbaijan'),
    CN: t('countries.china'),
    IR: t('countries.iran'),
    KR: t('countries.south_korea'),
    KG: t('countries.kyrgyzstan'),
    KZ: t('countries.kazakhstan'),
    MN: t('countries.mongolia'),
    TJ: t('countries.tajikistan'),
    RU: t('countries.russia'),
    UZ: t('countries.uzbekistan'),
  }));

  return { countryName };
}
