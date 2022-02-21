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
  <div class="p-20">
    <article class="py-10 max-w-screen-lg bg-gray-50 shadow-lg">
      <h1 class="mx-16 text-7xl font-bold">
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
::v-slotted(img) {
  width: 100%;
}
::v-slotted(p) {
  font-size: 0.9rem;
}
</style>
