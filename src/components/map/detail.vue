<script setup lang="ts">
import mapboxgl from 'mapbox-gl';
import colors from 'windicss/colors';
import type { UsePointsQueryResult } from '~/api/usePointsQuery';
import { mapboxAccessToken } from '~/libs/env';

interface Props {
  hoverPoint: UsePointsQueryResult | null;
  fileName: string;
  points?: UsePointsQueryResult[];
}

const props = defineProps<Props>();

const mapContainerRef = ref<HTMLDivElement | null>(null);

const COORD_SEOUL = { lon: 127.024612, lat: 37.5326 };

const stopWatch = watchEffect(() => {
  if (!mapContainerRef.value) return;
  if (!props.points) return;
  stopWatch();

  const map = new mapboxgl.Map({
    cooperativeGestures: true,
    accessToken: mapboxAccessToken,
    container: mapContainerRef.value,
    maxZoom: 14,
    minZoom: 4,
    center: COORD_SEOUL,
    style: 'mapbox://styles/mapbox/outdoors-v11',
  });

  map.addControl(new mapboxgl.NavigationControl());

  const color = colors.coolGray[700];
  map.on('load', () => {
    if (!props.points) return;
    const bounds = new mapboxgl.LngLatBounds(
      props.points[0],
      props.points[props.points.length - 1],
    );
    map.fitBounds(bounds, { padding: 30 });
    map.addSource(props.fileName, {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {
          test: 'test',
        },
        geometry: {
          type: 'LineString',
          coordinates: props.points.map(({ lon, lat }) => [lon, lat]),
        },
      },
    });
    map.addLayer({
      id: props.fileName,
      type: 'line',
      source: props.fileName,
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: {
        'line-color': color,
        'line-width': 4,
      },
    });
    map.on('mousemove', props.fileName, ({ lngLat }) => {});
    map.on('mouseleave', props.fileName, () => {});

    const element = document.createElement('div');
    element.className = 'text-3xl';
    element.innerText = '🐌';
    const startingPoint = props.points[0];
    const marker = new mapboxgl.Marker(element)
      .setLngLat([startingPoint.lon, startingPoint.lat])
      .addTo(map);

    watch(
      () => props.hoverPoint,
      () => {
        if (!props.hoverPoint) return;
        const { lon, lat } = props.hoverPoint;
        marker.setLngLat({ lon, lat });
      },
    );
  });
});
</script>

<template>
  <div ref="mapContainerRef" class="w-full bg-gray-300" />
</template>
