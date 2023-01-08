<script setup lang="ts">
import type { ShareOptions } from '@vueuse/core';
import { Head } from '@vueuse/head';
import type { Frontmatter } from '~/libs/markdown';
import { useMyI18n } from '~/plugins/i18n';

interface Props {
  frontmatter: Frontmatter;
}

const props = defineProps<Props>();

const { frontmatter } = props;
const { locale } = useMyI18n();

const route = useRoute();
const isRoutePost = route.path.startsWith('/posts/routes/');
const isTechPost = route.path.startsWith('/posts/techs/');

const title = computed(() => `${frontmatter.title[locale.value]} | Jon Ganebski`);

const { isSupported, share } = useShare(
  reactive<ShareOptions>({
    title: title.value,
    text: frontmatter.title[locale.value],
    url: route.fullPath,
  }),
);
</script>

<template>
  <Head>
    <title>{{ title }}</title>
  </Head>
  <div class="md:p-10 lg:p-20">
    <article
      class="py-15 max-w-screen-lg w-full bg-light-300 dark:bg-dark-300 text-dark-300 dark:text-light-300 shadow-lg"
    >
      <h1 class="mx-4 text-4xl md:text-7xl font-bold">
        {{ frontmatter.title[locale] }}
      </h1>
      <img
        v-if="frontmatter.cover_image_url"
        class="mt-8 w-full"
        :src="frontmatter.cover_image_url"
        alt=""
      />
      <div class="mt-10 flex justify-center">
        <button
          v-if="isSupported"
          class="p-3 rounded-full bg-gray-200 dark:bg-gray-600 text-dark-500 dark:text-light-500 active:(transform scale-95)"
          @click="share()"
        >
          <carbon-share />
        </button>
      </div>
      <div class="mt-24">
        <slot />
      </div>
    </article>
  </div>
  <client-only v-if="isRoutePost">
    <md-route-visualization />
  </client-only>
  <md-paginator
    :frontmatter="frontmatter"
    :is-route-post="isRoutePost"
    :is-tech-post="isTechPost"
  />
  <client-only>
    <ui-contour-lines />
  </client-only>
</template>

<style scoped lang="css">
::v-slotted(h1) {
  @apply mt-30 px-5 text-4xl font-bold;
}
::v-slotted(h2) {
  @apply mt-20 px-5 text-3xl font-bold;
}
::v-slotted(h3) {
  @apply mt-20 px-5 text-2xl font-bold;
}
::v-slotted(h4) {
  @apply mt-8 px-5 text-xl font-bold;
}
::v-slotted(img) {
  @apply w-full md:w-[95%] mt-20 mb-10 mx-auto;
}
::v-slotted(p) {
  @apply mt-5 px-5 text-sm xl:text-base;
}
::v-slotted(a) {
  @apply underline hover:underline-double;
}
::v-slotted(.images-layout__horizontal) {
  @apply grid grid-flow-col gap-1;
}
</style>
