import { ComputedRef } from 'vue';
import { useQuery } from 'vue-query';
import { MineSweeperRecord, Profile, supabase } from '~/libs/supabase';

interface UseRecordsQueryData extends MineSweeperRecord {
  user: Pick<Profile, 'user_name' | 'avatar_url'>;
}

const ONE_HOUR = 1000 * 60 * 60;

export function useRecordsQuery(modeId: ComputedRef<number | undefined>) {
  return useQuery(
    reactive(['mine-sweeper-records', modeId]),
    async () =>
      modeId.value
        ? (
            await supabase
              .from<UseRecordsQueryData>('mine-sweeper-records')
              .select('*, user: user_id (user_name, avatar_url)')
              .eq('mode_id', modeId.value)
              .order('time', { ascending: true })
              .limit(100)
          ).data
        : null,
    reactive({
      enabled: !!modeId.value,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      staleTime: ONE_HOUR,
      retry: false,
    }),
  );
}
