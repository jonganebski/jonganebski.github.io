<script setup lang="ts">
import { Frontmatter, getRoutePosts, getTechPosts } from '~/libs/markdown';
import { useMyI18n } from '~/plugins/i18n';

interface Props {
  frontmatter: Frontmatter;
  isRoutePost: boolean;
  isTechPost: boolean;
}

const props = defineProps<Props>();

const { locale } = useMyI18n();

const posts = computed(() =>
  props.isRoutePost
    ? getRoutePosts()
    : props.isTechPost
    ? getTechPosts()?.sort((a, b) => a.date.localeCompare(b.date))
    : null,
);

const [prevPost, nextPost] = computed(() => {
  const currIdx = posts.value?.findIndex(({ title }) => title.ko === props.frontmatter.title.ko);
  if (!posts.value || currIdx === undefined || currIdx < 0) return [null, null];
  return [
    currIdx === 0 ? null : posts.value[currIdx - 1],
    currIdx === posts.value.length - 1 ? null : posts.value[currIdx + 1],
  ];
}).value;
</script>

<template>
  <div class="my-20 lg:mx-20 max-w-screen-lg flex justify-between space-x-10">
    <router-link
      v-if="prevPost"
      :to="prevPost.path"
      class="flex-1 flex items-center space-x-2 transform transition-transform hover:(-translate-x-5)"
    >
      <carbon-chevron-left class="text-3xl" />
      <div>
        <ui-lazy-image :src="prevPost.cover_image_url" class="mb-2 max-w-72 w-full" />
        <h6 class="text-sm">{{ prevPost.title[locale] }}</h6>
      </div>
    </router-link>
    <router-link
      v-if="nextPost"
      :to="nextPost.path"
      class="relative flex-1 flex justify-end items-center space-x-2 text-right transform transition-transform hover:(translate-x-5)"
    >
      <div>
        <ui-lazy-image :src="nextPost.cover_image_url" class="mb-2 max-w-72 w-full" />
        <h6 class="text-sm">{{ nextPost.title[locale] }}</h6>
      </div>
      <carbon-chevron-right class="text-3xl" />
    </router-link>
  </div>
</template>
