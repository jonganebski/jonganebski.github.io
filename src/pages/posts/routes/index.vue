<script setup lang="ts">
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import mapboxgl from 'mapbox-gl';
import CountryFlag from 'vue-country-flag-next';
import colors from 'windicss/colors';
import { usePointsSummaryQuery } from '~/api/usePointsSummaryQuery';
import { mapboxAccessToken } from '~/libs/env';
import { getRoutePosts } from '~/libs/markdown';
import { useMyI18n } from '~/plugins/i18n';

gsap.registerPlugin(ScrollToPlugin);

const router = useRouter();
const { locale } = useMyI18n();

const mapContainerRef = ref<HTMLDivElement | null>(null);
const ulRef = ref<HTMLUListElement | null>(null);

const posts = getRoutePosts()?.reverse();
const { data } = usePointsSummaryQuery(posts);

const hoverMeta = ref<{ fileName: string; location: 'li' | 'map' } | null>(null);
const hoverPost = computed(() =>
  posts?.find(({ fileName }) => fileName === hoverMeta.value?.fileName),
);

const COORD_SEOUL = { lon: 127.024612, lat: 37.5326 };

function onMouseEnter(fileName: string, location: 'li' | 'map') {
  hoverMeta.value = { fileName, location };
}

function onMouseLeave() {
  hoverMeta.value = null;
}

const stopWatch = watchEffect(() => {
  if (!mapContainerRef.value) return;
  if (!ulRef.value) return;
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
      map.on('mouseenter', fileName, () => onMouseEnter(fileName, 'map'));
      map.on('mouseleave', fileName, onMouseLeave);
      map.on('click', fileName, () => {
        router.push(path);
      });
    });
    watch(hoverMeta, (current, prev) => {
      if (current) {
        map.setPaintProperty(current.fileName, 'line-color', hoverColor);
        map.setPaintProperty(current.fileName, 'line-width', 8);
        map.getCanvas().style.cursor = 'pointer';
        if (current.location === 'li') return;
        const scrollTo = document.getElementById(current.fileName);
        if (!scrollTo) return;
        gsap.to(ulRef.value, { duration: 0.5, ease: 'none', scrollTo });
      }
      if (prev) {
        map.setPaintProperty(prev.fileName, 'line-color', color);
        map.setPaintProperty(prev.fileName, 'line-width', 4);
        map.getCanvas().style.cursor = 'grab';
      }
    });
  });
});
</script>

<template>
  <div class="h-screen grid grid-rows-[65vh,10vh,25vh] 2xl:(grid grid-rows-1 grid-cols-2) bg-white">
    <div ref="mapContainerRef" class="w-full h-full bg-gray-300" />
    <div class="grid place-items-center">
      <div v-show="hoverPost">
        <div class="flex justify-center gap-3">
          <country-flag v-for="country in hoverPost?.countries" :key="country" :country="country" />
        </div>
        <h4 class="text-center text-gray-900 text-lg">{{ hoverPost?.title[locale] }}</h4>
        <p class="text-center text-gray-700 text-xs">{{ hoverPost?.from }} ~ {{ hoverPost?.to }}</p>
      </div>
    </div>
    <ul ref="ulRef" class="flex 2xl:flex-col space-x-12 overflow-x-scroll 2xl:overflow-x-hidden">
      <li v-for="{ cover_image_url, fileName, path } in posts" :key="fileName" :id="fileName">
        <router-link :to="path" class="block min-w-[400px] overflow-hidden">
          <img
            :src="cover_image_url"
            width="400"
            height="400"
            class="min-w-[400px] aspect-video object-cover transition-all duration-300 filter transform"
            :class="[
              hoverMeta?.fileName === fileName
                ? 'grayscale-0 scale-110'
                : 'grayscale-100 scale-100',
            ]"
            @mouseenter="onMouseEnter(fileName, 'li')"
            @mouseleave="onMouseLeave"
          />
        </router-link>
      </li>
    </ul>
  </div>
  <ui-contour-lines />
</template>
