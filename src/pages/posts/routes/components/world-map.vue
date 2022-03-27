<script setup lang="ts">
import mapboxgl from 'mapbox-gl';
import colors from 'windicss/colors';
import { usePointsSummaryQuery } from '~/api/usePointsSummaryQuery';
import { mapboxAccessToken } from '~/libs/env';
import type { RoutesPostMeta } from '~/libs/markdown';

interface HoverMeta {
  fileName: string;
  location: 'img' | 'map';
}

interface Props {
  hoverMeta: HoverMeta | null;
  posts: RoutesPostMeta[] | undefined;
}

interface Emits {
  (event: 'update:hoverMeta', payload: HoverMeta | null): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const router = useRouter();

const mapContainerRef = ref<HTMLDivElement | null>(null);

const { data } = usePointsSummaryQuery(props.posts);

const COORD_SEOUL = { lon: 127.024612, lat: 37.5326 };

const stopWatch = watchEffect(() => {
  if (!mapContainerRef.value) return;
  if (!data.value) return;

  stopWatch();

  const map = new mapboxgl.Map({
    accessToken: mapboxAccessToken,
    container: mapContainerRef.value,
    maxZoom: 10,
    minZoom: 2,
    center: COORD_SEOUL,
    style: 'mapbox://styles/mapbox/outdoors-v11',
  });

  map.addControl(new mapboxgl.NavigationControl());

  const color = colors.coolGray[700];
  const hoverColor = colors.rose[700];
  map.on('load', () => {
    data.value?.forEach(({ fileName, points, path }, index) => {
      map.addSource(fileName, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: points.map(({ lon, lat }) => [lon, lat]),
          },
        },
      });
      map.addLayer({
        id: fileName,
        type: 'line',
        source: fileName,
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': color,
          'line-width': 4,
        },
      });
      map.on('mouseenter', fileName, () =>
        emits('update:hoverMeta', { fileName, location: 'map' }),
      );
      map.on('mouseleave', fileName, () => emits('update:hoverMeta', null));
      map.on('click', fileName, () => {
        router.push(path);
      });
    });
    watch(
      () => props.hoverMeta,
      (current, prev) => {
        if (current) {
          map.setPaintProperty(current.fileName, 'line-color', hoverColor);
          map.setPaintProperty(current.fileName, 'line-width', 8);
          map.getCanvas().style.cursor = 'pointer';
        }
        if (prev) {
          map.setPaintProperty(prev.fileName, 'line-color', color);
          map.setPaintProperty(prev.fileName, 'line-width', 4);
          map.getCanvas().style.cursor = 'grab';
        }
      },
    );
  });
});
</script>

<template>
  <div ref="mapContainerRef" class="w-full h-full bg-gray-300" />
</template>