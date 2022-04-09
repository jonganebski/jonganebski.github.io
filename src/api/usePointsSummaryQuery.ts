import { useQuery } from 'vue-query';
import type { Point } from '~/libs/supabase';
import { supabase } from '~/libs/supabase';
import type { RoutesPostMeta } from '~/libs/markdown';
import { ONE_DAY } from '~/libs/time';

interface UsePointsSummaryQueryData extends Pick<Point, 'date' | 'points_summary'> {}

export function usePointsSummaryQuery(posts?: RoutesPostMeta[]) {
  return useQuery(
    'points-summary',
    async () => {
      if (!posts) return null;

      const { data } = await supabase
        .from<UsePointsSummaryQueryData>('points')
        .select('date, points_summary')
        .order('date', { ascending: true });

      data?.forEach(({ date, points_summary }) => {
        const postIndex = posts.findIndex(({ from, to }) => {
          const dateNum = new Date(date).getTime();
          return new Date(from).getTime() <= dateNum && dateNum <= new Date(to).getTime();
        });
        if (postIndex < 0) return;
        posts[postIndex].points.push(...points_summary);
      });

      return posts;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      staleTime: ONE_DAY,
      retry: false,
    },
  );
}
