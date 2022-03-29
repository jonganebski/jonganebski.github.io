import { useQuery } from 'vue-query';
import type { Profile, SlidingPuzzleRecord } from '~/libs/supabase';
import { supabase } from '~/libs/supabase';

interface UseRecordsQueryData extends SlidingPuzzleRecord {
  user: Pick<Profile, 'user_name' | 'avatar_url'>;
}

const ONE_HOUR = 1000 * 60 * 60;

export function useRecordsQuery() {
  return useQuery(
    'sliding-puzzle-records',
    async () =>
      (
        await supabase
          .from<UseRecordsQueryData>('sliding-puzzle-records')
          .select('*, user: user_id (user_name, avatar_url)')
          .order('score', { ascending: true })
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
