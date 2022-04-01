<script setup lang="ts">
import { Head } from '@vueuse/head';
import CountryFlag from 'vue-country-flag-next';
import { getRoutePosts } from '~/libs/markdown';
import { useMyI18n } from '~/plugins/i18n';
import WorldMap from './components/world-map.vue';

interface HoverMeta {
  fileName: string;
  location: 'img' | 'map';
}

const { locale, t } = useMyI18n();

const posts = getRoutePosts()?.reverse();

const ulRef = ref<HTMLUListElement | null>(null);

const hoverMeta = ref<HoverMeta | null>(null);
const hoverPost = computed(() =>
  posts?.find(({ fileName }) => fileName === hoverMeta.value?.fileName),
);

function onMouseEnter(fileName: string, location: 'img' | 'map') {
  hoverMeta.value = { fileName, location };
}

function onMouseLeave() {
  hoverMeta.value = null;
}

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
  <div class="h-screen grid grid-rows-[65fr,10fr,auto] bg-light-500 dark:bg-dark-500">
    <client-only>
      <world-map v-model:hoverMeta="hoverMeta" :posts="posts" />
    </client-only>
    <div class="grid place-items-center">
      <div v-show="hoverPost">
        <div class="flex justify-center gap-3">
          <country-flag v-for="country in hoverPost?.countries" :key="country" :country="country" />
        </div>
        <h4 class="text-center text-dark-500 dark:text-light-500 text-lg">
          {{ hoverPost?.title[locale] }}
        </h4>
        <p class="text-center text-dark-300 dark:text-light-300 text-xs">
          {{ hoverPost?.from }} ~ {{ hoverPost?.to }}
        </p>
      </div>
    </div>
    <ul ref="ulRef" class="flex space-x-12 overflow-x-scroll">
      <li v-for="{ cover_image_url, fileName, path } in posts" :key="fileName" :id="fileName">
        <router-link :to="path" class="block min-w-xs overflow-hidden">
          <img
            :src="cover_image_url"
            width="400"
            height="400"
            class="aspect-video object-cover transition-all duration-300 filter transform"
            :class="[
              hoverMeta?.fileName === fileName
                ? 'grayscale-0 scale-110'
                : 'grayscale-100 scale-100',
            ]"
            @mouseenter="onMouseEnter(fileName, 'img')"
            @mouseleave="onMouseLeave"
          />
        </router-link>
      </li>
    </ul>
  </div>
  <ui-contour-lines />
</template>
