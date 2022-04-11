<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core';
import { Head } from '@vueuse/head';
import { getRoutePosts } from '~/libs/markdown';
import { useMyI18n } from '~/plugins/i18n';
import RoutesList from './components/routes-list.vue';
import RoutesSwiper from './components/routes-swiper.vue';
import WorldMap from './components/world-map.vue';

interface HoverMeta {
  fileName: string;
  location: 'img' | 'map';
}

const { lg } = useBreakpoints(breakpointsTailwind);

const { t } = useMyI18n();

const posts = getRoutePosts()?.reverse();

const ulRef = ref<HTMLUListElement | null>(null);

const hoverMeta = ref<HoverMeta | null>(null);

watch(hoverMeta, () => {
  if (!hoverMeta.value) return;
  if (!ulRef.value) return;
  if (hoverMeta.value.location === 'img') return;
  const li = document.getElementById(hoverMeta.value.fileName);
  if (!li) return;
  const { left, top } = li.getBoundingClientRect();
  ulRef.value.scrollTo({ left, top, behavior: 'smooth' });
});
</script>

<template>
  <Head>
    <title>{{ t('travel') }} | {{ t('jon_ganebskis_blog') }}</title>
  </Head>
  <div class="h-14"></div>
  <div class="h-[90vh] grid grid-rows-[2fr,1fr] lg:grid-rows-1 lg:grid-cols-[1.5fr,1fr]">
    <client-only>
      <world-map v-model:hoverMeta="hoverMeta" :posts="posts" />
    </client-only>
    <RoutesList v-if="lg" v-model:hoverMeta="hoverMeta" :posts="posts" />
    <RoutesSwiper v-else v-model:hoverMeta="hoverMeta" :posts="posts" />
  </div>
  <ui-contour-lines />
</template>
