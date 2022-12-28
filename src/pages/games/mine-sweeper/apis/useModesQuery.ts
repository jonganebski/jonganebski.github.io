import { useQuery } from '@tanstack/vue-query';
import { MineSweeperMode, supabase } from '~/libs/supabase';
import { ONE_HOUR } from '~/libs/time';

interface UseModesQueryData extends Pick<MineSweeperMode, 'id' | 'mode'> {}

export function useModesQuery(key: 'mine-sweeper-modes') {
  return useQuery(
    [key],
    async () => (await supabase.from<UseModesQueryData>(key).select('id, mode')).data,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      staleTime: ONE_HOUR,
      retry: false,
    },
  );
}
