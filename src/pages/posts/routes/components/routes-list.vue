<script setup lang="ts">
import CountryFlag from 'vue-country-flag-next';
import type { RoutesPostMeta } from '~/libs/markdown';
import { useMyI18n } from '~/plugins/i18n';
import { useHighlight } from '../composables/useHighlight';

interface Props {
  posts?: RoutesPostMeta[];
}

const props = withDefaults(defineProps<Props>(), {
  posts: () => [],
});

const { locale } = useMyI18n();

const { highlight } = useHighlight();

const ITEM_HEIGHT = 500;
const IMG_HEIGHT = 350;
const DESC_HEIGHT = 100;

const { list, wrapperProps, containerProps, scrollTo } = useVirtualList(
  computed(() => props.posts),
  { itemHeight: ITEM_HEIGHT },
);

watch(highlight, () => {
  if (highlight.value?.from === 'list') return;
  const index = props.posts.findIndex(({ fileName }) => fileName === highlight.value?.fileName);
  if (index < 0) return;
  scrollTo(index);
});
</script>

<template>
  <div v-bind="(containerProps as any)">
    <ul v-bind="wrapperProps" class="px-5">
      <li
        v-for="{ data: { cover_image_url, fileName, countries, path, title, from, to } } in list"
        :key="fileName"
        :id="fileName"
        :style="{ height: `${ITEM_HEIGHT}px`, width: '100%' }"
      >
        <router-link :to="path" class="block rounded">
          <div class="overflow-hidden rounded-t">
            <ui-lazy-image
              :src="cover_image_url"
              :width="400"
              :height="400"
              class="aspect-video object-cover transition-all duration-300 filter transform"
              :class="[
                highlight?.fileName === fileName
                  ? 'grayscale-0 scale-110'
                  : 'grayscale-100 scale-100',
              ]"
              :style="{ height: `${IMG_HEIGHT}px`, width: '100%' }"
              @mouseenter="highlight = { fileName, from: 'list' }"
              @mouseleave="highlight = null"
            />
          </div>
          <div
            class="rounded-b bg-light-500 dark:bg-dark-500 shadow-lg"
            :style="{ height: `${DESC_HEIGHT}px` }"
          >
            <div class="flex justify-center gap-3">
              <country-flag v-for="country in countries" :key="country" :country="country" />
            </div>
            <h4 class="text-center text-dark-500 dark:text-light-500 text-lg">
              {{ title[locale] }}
            </h4>
            <p class="text-center text-dark-300 dark:text-light-300 text-xs">
              {{ from }} ~ {{ to }}
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
