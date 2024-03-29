import { useQuery } from '@tanstack/vue-query';
import { Ref } from 'vue';
import { MineSweeperRecord, Profile, supabase } from '~/libs/supabase';
import { ONE_HOUR } from '~/libs/time';

export interface UseRecordsQueryData extends MineSweeperRecord {
  user: Pick<Profile, 'user_name' | 'avatar_url'>;
}

export function useRecordsQuery(modeId: Ref<number | undefined>) {
  return useQuery(
    reactive(['mine-sweeper-records', modeId]),
    async () =>
      modeId.value
        ? (
            await supabase
              .from<UseRecordsQueryData>('mine-sweeper-records')
              .select('*, user: user_id (user_name, avatar_url)')
              .eq('mode_id', modeId.value)
              .order('score', { ascending: true })
              .limit(100)
          ).data
        : null,
    reactive({
      enabled: !!modeId,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      staleTime: ONE_HOUR,
      retry: false,
    }),
  );
}
