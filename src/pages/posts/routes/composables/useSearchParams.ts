import { RoutesPostMeta } from '~/libs/markdown';

export type CountryParam = string;

export function useSearchParams() {
  const router = useRouter();
  const route = useRoute();

  const countryParam = computed<CountryParam>(() => {
    if (!route.query.country) return 'all';
    if (Array.isArray(route.query.country)) {
      const firstParam = route.query.country[0];
      return firstParam?.toString() ?? 'all';
    }
    return route.query.country.toString();
  });

  function filterBySearchParams({ countries }: RoutesPostMeta): boolean {
    if (countryParam.value === 'all') return true;
    return countries.includes(countryParam.value);
  }

  function changeParam(code: string) {
    router.replace({ query: { country: code } });
  }

  return { filterBySearchParams, changeParam, countryParam };
}
