<script setup lang="ts">
import CountryFlag from 'vue-country-flag-next';
import { getRoutePosts } from '~/libs/markdown';
import { useMyI18n } from '~/plugins/i18n';

interface HoverMeta {
  fileName: string;
  location: 'img' | 'map';
}

const { locale } = useMyI18n();

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
  <div class="h-screen grid grid-rows-[65vh,10vh,25vh] bg-white">
    <client-only>
      <map-summary v-model:hoverMeta="hoverMeta" :posts="posts" />
    </client-only>
    <div class="grid place-items-center">
      <div v-show="hoverPost">
        <div class="flex justify-center gap-3">
          <country-flag v-for="country in hoverPost?.countries" :key="country" :country="country" />
        </div>
        <h4 class="text-center text-gray-900 text-lg">{{ hoverPost?.title[locale] }}</h4>
        <p class="text-center text-gray-700 text-xs">{{ hoverPost?.from }} ~ {{ hoverPost?.to }}</p>
      </div>
    </div>
    <ul ref="ulRef" class="flex space-x-12 overflow-x-scroll">
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
            @mouseenter="onMouseEnter(fileName, 'img')"
            @mouseleave="onMouseLeave"
          />
        </router-link>
      </li>
    </ul>
  </div>
  <ui-contour-lines />
</template>
