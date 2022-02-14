<script setup lang="ts">
import { getRoutePosts, getTechPosts } from '~/libs/markdown';
import { useMyI18n } from '~/plugins/i18n';

const { locale, t } = useMyI18n();

const routePosts = getRoutePosts();
const routePostsRecent = routePosts?.reverse().slice(-5);

const techPosts = getTechPosts();
const techPostsRecent = techPosts?.reverse().slice(-5);
</script>

<template>
  <footer class="min-h-96 pt-20 pb-2 flex flex-col justify-between bg-transparent">
    <div class="w-full max-w-screen-lg mx-auto grid grid-cols-3 gap-10">
      <div>
        <h6><carbon-campsite class="icon" /></h6>
        <nav class="nav">
          <router-link
            v-for="{ fileName, title, path } in routePostsRecent"
            :key="fileName"
            :to="path"
            class="recent-post-link"
          >
            {{ title[locale] }}
          </router-link>
        </nav>
      </div>
      <div>
        <h6><carbon-code class="icon" /></h6>
        <nav class="nav">
          <router-link
            v-for="{ fileName, title, path } in techPostsRecent"
            :key="fileName"
            :to="path"
            class="recent-post-link"
          >
            {{ title }}
          </router-link>
        </nav>
      </div>
      <div class="text-right">
        <h6><carbon-link class="icon" /></h6>
        <nav class="nav">
          <a
            class="recent-post-link"
            href="https://github.com/jonganebski"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ t('github') }}
          </a>
          <a
            class="recent-post-link"
            href="https://jinseokbang.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ t('portfolio') }}
          </a>
        </nav>
      </div>
    </div>
    <div class="text-center text-sm text-gray-500">
      <p>Built with Vue</p>
      <p>{{ new Date().getFullYear() }} &copy; Jon Ganebski</p>
    </div>
  </footer>
</template>

<style scoped lang="css">
.nav {
  @apply mt-4 space-y-2;
}
.icon {
  @apply inline-block text-lg;
}
.recent-post-link {
  @apply block w-full cursor-pointer truncate whitespace-nowrap text-sm text-gray-600 hover:text-gray-900 hover:underline underline-offset-2;
}
</style>
