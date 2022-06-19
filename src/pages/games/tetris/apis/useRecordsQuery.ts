import { useQuery } from 'vue-query';
import type { Profile, TetrisRecord } from '~/libs/supabase';
import { supabase } from '~/libs/supabase';
import { ONE_HOUR } from '~/libs/time';

export interface UseRecordsQueryData extends TetrisRecord {
  user: Pick<Profile, 'user_name' | 'avatar_url'>;
}

export function useRecordsQuery() {
  return useQuery(
    'tetris-records',
    async () =>
      (
        await supabase
          .from<UseRecordsQueryData>('tetris-records')
          .select('*, user: user_id (user_name, avatar_url)')
          .order('score', { ascending: false })
          .limit(100)
      ).data,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      staleTime: ONE_HOUR,
      retry: false,
    },
  );
}
