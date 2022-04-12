import { RoutesPostMeta } from '~/libs/markdown';

interface SearchParams {
  country?: string | string[];
}

export type CountryParam = string;

export function useSearchParams() {
  const params = useUrlSearchParams<SearchParams>('history');

  const countryParam = computed<CountryParam>(() =>
    !params.country ? 'all' : Array.isArray(params.country) ? params.country[0] : params.country,
  );

  function filterBySearchParams({ countries }: RoutesPostMeta): boolean {
    if (countryParam.value === 'all') return true;
    return countries.includes(countryParam.value);
  }

  function changeParam(code: string) {
    params.country = code;
  }

  return { filterBySearchParams, changeParam, countryParam };
}
