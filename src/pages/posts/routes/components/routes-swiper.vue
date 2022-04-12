<script setup lang="ts">
import type { RoutesPostMeta } from '~/libs/markdown';
import { useMyI18n } from '~/plugins/i18n';
import { useHighlight } from '../composables/useHighlight';

interface Props {
  isLoading: boolean;
  posts?: RoutesPostMeta[];
}

const props = withDefaults(defineProps<Props>(), {
  posts: [] as any,
});

const { locale } = useMyI18n();

const { highlight } = useHighlight();

const idx = ref(0);
const prevIdx = computed(() => (idx.value === 0 ? props.posts.length - 1 : idx.value - 1));
const nextIdx = computed(() => (idx.value === props.posts.length - 1 ? 0 : idx.value + 1));

const isPostsNone = computed(() => props.posts.length === 0);
const isLonePost = computed(() => props.posts.length === 1);
const isDualPosts = computed(() => props.posts.length === 2);

const targetPosts = computed(() =>
  isPostsNone.value
    ? []
    : isLonePost.value
    ? [props.posts[idx.value]]
    : isDualPosts.value
    ? [props.posts[idx.value], props.posts[nextIdx.value]]
    : [props.posts[prevIdx.value], props.posts[idx.value], props.posts[nextIdx.value]],
);

function updateHighlight() {
  !props.isLoading && props.posts[idx.value]
    ? (highlight.value = { fileName: props.posts[idx.value].fileName, from: 'swiper' })
    : null;
}

watch(
  () => [props.isLoading, props.posts],
  () => {
    idx.value = 0;
    updateHighlight();
  },
);

watch(
  () => [props.isLoading, idx.value],
  () => updateHighlight(),
  { immediate: true },
);

onBeforeUnmount(() => {
  highlight.value = null;
});

function prev() {
  if (isDualPosts.value && idx.value === 0) return;
  idx.value = prevIdx.value;
}
function next() {
  if (isDualPosts.value && idx.value === 1) return;
  idx.value = nextIdx.value;
}

const swipeListenerEl = ref<HTMLDivElement | null>(null);

const { lengthX, isSwiping } = useSwipe(swipeListenerEl, {
  onSwipeEnd: (_, direction) => {
    if (isLonePost.value) return;
    if (direction === 'RIGHT') prev();
    if (direction === 'LEFT') next();
  },
});
</script>

<template>
  <div
    class="relative flex overflow-hidden"
    :class="[isDualPosts ? 'justify-start' : 'justify-center']"
  >
    <ul
      ref="swipeListenerEl"
      class="flex"
      :style="{ transform: `translateX(${isSwiping && !isLonePost ? -lengthX : 0}px)` }"
    >
      <li v-for="{ cover_image_url, fileName, path } in targetPosts" :key="fileName" :id="fileName">
        <router-link
          :to="path"
          class="w-screen h-full p-3 block bg-cover bg-center"
          :style="{ backgroundImage: `url(${cover_image_url})` }"
        >
        </router-link>
      </li>
    </ul>
    <button
      v-if="!isPostsNone && !isLonePost"
      class="absolute inset-y-0 left-0 rounded-r-1/2"
      @click="prev"
    >
      <carbon-chevron-left />
    </button>
    <button
      v-if="!isPostsNone && !isLonePost"
      class="absolute inset-y-0 right-0 rounded-l-1/2"
      @click="next"
    >
      <carbon-chevron-right />
    </button>
  </div>
  <h2 class="mt-2 text-center">{{ props.posts[idx]?.title[locale] }}</h2>
  <p class="text-center text-sm">{{ props.posts[idx]?.from }} ~ {{ props.posts[idx]?.to }}</p>
</template>

<style scoped lang="css">
button {
  @apply w-[10%] min-w-12 flex justify-center items-center text-white text-2xl bg-white bg-opacity-0 active:bg-opacity-40;
}
</style>
