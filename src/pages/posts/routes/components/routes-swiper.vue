<script setup lang="ts">
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

const { next, prev, index, state } = useCycleList(props.posts);

watch(index, () => emits('update:hoverMeta', { fileName: state.value.fileName, location: 'img' }), {
  immediate: true,
});

const posts = computed(() => [
  props.posts[index.value - 1 < 0 ? props.posts.length - 1 : index.value - 1],
  props.posts[index.value],
  props.posts[index.value + 1 > props.posts.length - 1 ? 0 : index.value + 1],
]);

const swipeListenerEl = ref<HTMLDivElement | null>(null);

const { lengthX, isSwiping } = useSwipe(swipeListenerEl, {
  onSwipeEnd: (_, direction) => {
    if (direction === 'RIGHT') prev();
    if (direction === 'LEFT') next();
  },
});
</script>

<template>
  <div class="relative flex justify-center overflow-hidden">
    <ul
      ref="swipeListenerEl"
      class="flex"
      :style="{ transform: `translateX(${isSwiping ? -lengthX : 0}px)` }"
    >
      <li v-for="{ cover_image_url, fileName, path } in posts" :key="fileName" :id="fileName">
        <router-link
          :to="path"
          class="w-screen h-full p-3 block bg-cover bg-center"
          :style="{ backgroundImage: `url(${cover_image_url})` }"
        >
        </router-link>
      </li>
    </ul>
    <button class="absolute inset-y-0 left-0 rounded-r-1/2" @click="prev()">
      <carbon-chevron-left />
    </button>
    <button class="absolute inset-y-0 right-0 rounded-l-1/2" @click="next()">
      <carbon-chevron-right />
    </button>
  </div>
  <h2 class="mt-2 text-center">{{ state.title[locale] }}</h2>
  <p class="text-center text-sm">{{ state.from }} ~ {{ state.to }}</p>
</template>

<style scoped lang="css">
button {
  @apply w-[10%] min-w-12 flex justify-center items-center text-white text-2xl bg-white bg-opacity-0 active:bg-opacity-40;
}
</style>
