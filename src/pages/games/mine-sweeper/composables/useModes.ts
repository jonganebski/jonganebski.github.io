import { useMyI18n } from '~/plugins/i18n';
import { useModesQuery } from '../apis/useModesQuery';

export function useModes() {
  const { t } = useMyI18n();

  const { data } = useModesQuery('mine-sweeper-modes');

  const router = useRouter();
  const route = useRoute();

  const modes = computed(() =>
    data.value?.map(({ id, mode }) => ({
      id,
      mode:
        mode === 'expert'
          ? t('expert')
          : mode === 'intermediate'
          ? t('intermediate')
          : t('beginner'),
    })),
  );

  const selectedMode = ref<number>(route.query.mode ? Number(route.query.mode) : 1);

  watchEffect(() => {
    if (!modes.value) return;
    const modeId = route.query.mode ? Number(route.query.mode) : 1;
    const mode = modes.value.find(({ id }) => id === modeId);
    if (!mode) return router.replace({ path: route.path });
    selectedMode.value = modeId;
  });

  watchEffect(() => Array.isArray(route.query.mode) && router.replace({ path: route.path }));

  return { selectedMode, modes };
}
