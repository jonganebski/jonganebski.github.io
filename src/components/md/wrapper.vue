<script setup lang="ts">
import { Head } from '@vueuse/head';
import type { Frontmatter } from '~/libs/markdown';
import { useMyI18n } from '~/plugins/i18n';

interface Props {
  frontmatter: Frontmatter;
}

const props = defineProps<Props>();

// This doesn't need to be a computedRef because this component is static.
const { frontmatter } = props;
const { locale } = useMyI18n();

const route = useRoute();
const isRoutePost = route.path.startsWith('/posts/routes/');
</script>

<template>
  <Head>
    <title>{{ frontmatter.title[locale] }} | Jon Ganebski</title>
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
        class="mt-8"
        :src="frontmatter.cover_image_url"
        alt=""
      />
      <div class="mt-24">
        <slot />
      </div>
    </article>
  </div>
  <client-only v-if="isRoutePost">
    <md-route-visualization />
  </client-only>
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
::v-slotted(img) {
  @apply w-full mt-20 mb-10;
}
::v-slotted(p) {
  @apply mt-5 px-5 text-sm xl:text-lg;
}
::v-slotted(pre) {
  @apply mt-5 p-5 text-sm xl:text-lg overflow-x-auto;
}
</style>
