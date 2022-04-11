<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import CountryFlag from 'vue-country-flag-next';
import type { RoutesPostMeta } from '~/libs/markdown';
import { useMyI18n } from '~/plugins/i18n';

interface HoverMeta {
  fileName: string;
  location: 'img' | 'map';
}

interface Props {
  hoverMeta: HoverMeta | null;
  posts?: RoutesPostMeta[];
}

interface Emits {
  (event: 'update:hoverMeta', payload: HoverMeta | null): void;
}

const props = withDefaults(defineProps<Props>(), {
  posts: [] as any,
});
const emits = defineEmits<Emits>();

const { locale } = useMyI18n();

const ITEM_HEIGHT = 500;
const IMG_HEIGHT = 350;
const DESC_HEIGHT = 100;

const { list, wrapperProps, containerProps, scrollTo } = useVirtualList(
  computed(() => props.posts),
  { itemHeight: ITEM_HEIGHT },
);

watch(
  () => props.hoverMeta,
  () => {
    if (props.hoverMeta?.location === 'img') return;
    const index = props.posts.findIndex(({ fileName }) => fileName === props.hoverMeta?.fileName);
    if (index < 0) return;
    scrollTo(index);
  },
);
</script>

<template>
  <div v-bind="(containerProps as HTMLAttributes)">
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
                props.hoverMeta?.fileName === fileName
                  ? 'grayscale-0 scale-110'
                  : 'grayscale-100 scale-100',
              ]"
              :style="{ height: `${IMG_HEIGHT}px`, width: '100%' }"
              @mouseenter="emits('update:hoverMeta', { fileName, location: 'img' })"
              @mouseleave="emits('update:hoverMeta', null)"
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
