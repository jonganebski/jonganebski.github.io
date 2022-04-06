import mapboxgl from 'mapbox-gl';
import { useQuery } from 'vue-query';
import type { Point, Point__point } from '~/libs/supabase';
import { supabase } from '~/libs/supabase';

export interface UsePointsQueryData extends Pick<Point, 'date' | 'points'> {}

export interface UsePointsQueryResult extends Point__point {
  distance: number;
}

const ONE_DAY = 1000 * 60 * 60 * 24;

export function usePointsQuery(fileName: string) {
  const [from, to] = fileName.split('T');
  return useQuery(
    ['points', fileName],
    async () => {
      const { data } = await supabase
        .from<UsePointsQueryData>('points')
        .select('date, points')
        .gte('date', from)
        .lte('date', to)
        .order('date', { ascending: true });
      if (!data) return [];

      let distance = 0;

      const results: UsePointsQueryResult[] = data.flatMap(({ points }) => {
        return points.map((currentPoint, index) => {
          const previousPoint = points[Math.max(0, index - 1)];
          const km =
            new mapboxgl.LngLat(previousPoint.lon, previousPoint.lat).distanceTo(
              new mapboxgl.LngLat(currentPoint.lon, currentPoint.lat),
            ) / 1000;
          distance += km;
          return { ...currentPoint, distance };
        });
      });

      return results;
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
