import { useMyI18n } from '~/plugins/i18n';

export function useNav() {
  const route = useRoute();
  const { t } = useMyI18n();

  const links = computed(() => [
    { path: '/', label: t('nav.home'), isMatch: route.path === '/' },
    {
      path: '/posts/routes',
      label: t('nav.routes'),
      isMatch: route.path.startsWith('/posts/routes'),
    },
    { path: '/posts/techs', label: t('nav.techs'), isMatch: route.path.startsWith('/posts/techs') },
    { path: '/games', label: t('nav.games'), isMatch: route.path.startsWith('/games') },
  ]);

  return links;
}
