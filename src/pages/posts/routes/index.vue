<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core';
import { Head } from '@vueuse/head';
import { getRoutePosts } from '~/libs/markdown';
import { useMyI18n } from '~/plugins/i18n';
import RoutesList from './components/routes-list.vue';
import RoutesSwiper from './components/routes-swiper.vue';
import SelectCountry from './components/select-country.vue';
import WorldMap from './components/world-map.vue';

interface HoverMeta {
  fileName: string;
  location: 'img' | 'map';
}

const { lg } = useBreakpoints(breakpointsTailwind);

const { t } = useMyI18n();
const route = useRoute();

const DEFAULT_VALUE = 'all';
const countryQuery = computed(() => {
  const { country } = route.query;
  if (Array.isArray(country)) return country[0] ? country[0]?.toString() : DEFAULT_VALUE;
  return country ? country.toString() : DEFAULT_VALUE;
});

const posts = computed(() =>
  countryQuery.value === DEFAULT_VALUE
    ? getRoutePosts()?.reverse()
    : getRoutePosts()
        ?.filter(({ countries }) => countries.includes(countryQuery.value))
        .reverse(),
);

const hoverMeta = ref<HoverMeta | null>(null);
</script>

<template>
  <Head>
    <title>{{ t('travel') }} | {{ t('jon_ganebskis_blog') }}</title>
  </Head>
  <div class="px-15 h-14">
    <SelectCountry :DEFAULT_VALUE="DEFAULT_VALUE" :countryQuery="countryQuery" />
  </div>
  <div class="h-[90vh] grid grid-rows-[2fr,1fr] lg:grid-rows-1 lg:grid-cols-[1.5fr,1fr]">
    <client-only>
      <world-map v-model:hoverMeta="hoverMeta" :posts="posts" />
    </client-only>
    <RoutesList v-if="lg" v-model:hoverMeta="hoverMeta" :posts="posts" />
    <RoutesSwiper v-else v-model:hoverMeta="hoverMeta" :posts="posts" />
  </div>
  <ui-contour-lines />
</template>
