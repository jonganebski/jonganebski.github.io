import { useModesQuery } from '../apis/useModesQuery';

export function useModes() {
  const { data: modes, findModeById, isLoading } = useModesQuery('mine-sweeper-modes');

  const router = useRouter();
  const route = useRoute();

  const modeId = computed<number>(() => (route.query.mode ? Number(route.query.mode) : 1));
  const modeName = computed(() => findModeById(modeId.value));

  watchEffect(() => {
    if (isLoading.value) return;
    if (modeName.value) return;
    router.replace({ path: route.path });
  });

  watchEffect(() => Array.isArray(route.query.mode) && router.replace({ path: route.path }));

  return { modeId, modeName, modes };
}
