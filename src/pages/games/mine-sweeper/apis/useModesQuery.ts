import { useQuery } from 'vue-query';
import { MineSweeperMode, supabase } from '~/libs/supabase';

interface UseModesQueryData extends Pick<MineSweeperMode, 'id' | 'mode'> {}

const ONE_DAY = 1000 * 60 * 60 * 24;

export function useModesQuery(key: 'mine-sweeper-modes') {
  return useQuery(
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
}
