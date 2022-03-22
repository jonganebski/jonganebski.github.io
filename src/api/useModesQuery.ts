import { useQuery } from 'vue-query';
import { MineSweeperMode, supabase } from '~/libs/supabase';

interface UseModesQueryData extends Pick<MineSweeperMode, 'id' | 'mode'> {}

const ONE_DAY = 1000 * 60 * 60 * 24;

export function useModesQuery(key: 'mine-sweeper-modes') {
  const result = useQuery(
    [key],
    async () => (await supabase.from<UseModesQueryData>(key).select('id, mode')).data,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      staleTime: ONE_DAY,
      retry: false,
    },
  );

  function findModeById(id?: number) {
    return result.data.value?.find((mode) => mode.id === id)?.mode;
  }

  return { ...result, findModeById };
}
