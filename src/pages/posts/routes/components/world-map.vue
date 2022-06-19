<script setup lang="ts">
import mapboxgl from 'mapbox-gl';
import colors from 'windicss/colors';
import { usePointsSummaryQuery } from '~/api/usePointsSummaryQuery';
import { mapboxAccessToken } from '~/libs/env';
import { RoutesPostMeta } from '~/libs/markdown';
import { useHighlight } from '../composables/useHighlight';
import { useSearchParams } from '../composables/useSearchParams';

interface Props {
  swiperActive: boolean;
}

interface Emits {
  (event: 'onLoaded'): void;
}

const COORD_SEOUL = { lon: 127.024612, lat: 37.5326 };

const HIGHLIGHT_COLOR = colors.rose[700];
const COLOR = colors.coolGray[700];

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { filterBySearchParams } = useSearchParams();
const router = useRouter();
const route = useRoute();

const mapContainerRef = ref<HTMLDivElement | null>(null);

const { data } = usePointsSummaryQuery();

const posts = computed(() => data.value?.filter(filterBySearchParams));

const { highlight } = useHighlight();

const stopWatch = watchEffect(() => {
  if (!mapContainerRef.value) return;
  if (!data.value) return;

  stopWatch();

  const map = new mapboxgl.Map({
    cooperativeGestures: props.swiperActive,
    accessToken: mapboxAccessToken,
    container: mapContainerRef.value,
    maxZoom: 10,
    minZoom: 2,
    center: COORD_SEOUL,
    style: 'mapbox://styles/mapbox/outdoors-v11',
  });

  map.addControl(new mapboxgl.NavigationControl());

  function highlightRoute(fileName?: string) {
    if (!fileName) return;
    if (!map.getLayer(fileName)) return;
    map.setPaintProperty(fileName, 'line-color', HIGHLIGHT_COLOR);
    map.setPaintProperty(fileName, 'line-width', 8);
    map.getCanvas().style.cursor = 'pointer';
  }

  function normalizeRoute(fileName?: string) {
    if (!fileName) return;
    if (!map.getLayer(fileName)) return;
    map.setPaintProperty(fileName, 'line-color', COLOR);
    map.setPaintProperty(fileName, 'line-width', 4);
    map.getCanvas().style.cursor = 'grab';
  }

  function onMouseEnter(
    e: mapboxgl.MapMouseEvent & {
      features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
    } & mapboxgl.EventData,
  ) {
    const fileName = e.features?.[0].source;
    if (!fileName) return;
    highlight.value = { fileName, from: 'map' };
  }

  function onMouseLeave() {
    highlight.value = null;
  }

  function onMouseClick(
    e: mapboxgl.MapMouseEvent & {
      features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
    } & mapboxgl.EventData,
  ) {
    const fileName = e.features?.[0].source;
    if (!fileName) return;
    router.push(`${route.path}/${fileName}`);
  }

  function paintRoutes(posts?: RoutesPostMeta[]) {
    posts?.forEach(({ fileName, points }) => {
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
          'line-color': COLOR,
          'line-width': 4,
        },
      });
      map.on('mouseenter', fileName, onMouseEnter);
      map.on('mouseleave', fileName, onMouseLeave);
      map.on('click', fileName, onMouseClick);
    });
  }

  function removeRoutes(posts?: RoutesPostMeta[]) {
    posts?.forEach(({ fileName }) => {
      if (!map.getLayer(fileName)) return;
      map.removeLayer(fileName);
      map.removeSource(fileName);
      map.off('mouseenter', fileName, onMouseEnter);
      map.off('mouseleave', fileName, onMouseLeave);
      map.off('click', fileName, onMouseClick);
    });
  }

  function panToRoute(fileName?: string) {
    if (!fileName) return;
    const post = posts.value?.find((post) => post.fileName === fileName);
    if (!post) return;
    const midLon = (post.points[0].lon + post.points[post.points.length - 1].lon) / 2;
    const midLat = (post.points[0].lat + post.points[post.points.length - 1].lat) / 2;
    map.panTo([midLon, midLat]);
  }

  map.on('load', () => {
    paintRoutes(posts.value), emits('onLoaded');

    watch(posts, (current, prev) => {
      removeRoutes(prev);
      paintRoutes(current);
    });
    watch(highlight, (current, prev) => {
      normalizeRoute(prev?.fileName);
      highlightRoute(current?.fileName);
      if (highlight.value?.from === 'map') return;
      panToRoute(current?.fileName);
    });
  });
});
</script>

<template>
  <div ref="mapContainerRef" class="w-full h-full bg-gray-300" />
</template>
