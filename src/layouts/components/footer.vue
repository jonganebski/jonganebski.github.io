<script setup lang="ts">
import { getRoutePosts, getTechPosts } from '~/libs/markdown';
import { useMyI18n } from '~/plugins/i18n';

const { locale, t } = useMyI18n();

const routePosts = getRoutePosts();
const routePostsRecent = routePosts?.slice(-5).reverse();

const techPosts = getTechPosts();
const techPostsRecent = techPosts?.sort((a, b) => b.date.localeCompare(a.date)).slice(-5);

const gameLinks = computed(() => [
  { path: '/games/mine-sweeper', name: t('minesweeper') },
  { path: '/games/sliding-puzzle', name: t('sliding_puzzle') },
]);
</script>

<template>
  <footer
    class="min-h-[32rem] mt-32 pt-32 pb-5 px-4 md:px-28 flex flex-col justify-between bg-transparent text-dark-500 dark:text-light-500"
  >
    <div class="w-full max-w-screen-lg mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
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
            {{ title[locale] }}
          </router-link>
        </nav>
      </div>
      <div>
        <h6><carbon-game-console class="icon" /></h6>
        <nav class="nav">
          <router-link
            v-for="{ name, path } in gameLinks"
            :key="path"
            :to="path"
            class="recent-post-link"
          >
            {{ name }}
          </router-link>
        </nav>
      </div>
      <div class="lg:text-right">
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
    <div class="mt-20 text-center text-sm">
      <a
        href="https://github.com/jonganebski/jonganebski.github.io/issues/new?labels=enhancement&template=feature-request.yaml&title=%5BFEAT%5D%3A+"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:underline"
      >
        {{ t('propose') }}
      </a>
      <p class="mt-5">Built with Vue</p>
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
  @apply block w-full cursor-pointer truncate whitespace-nowrap text-sm hover:underline underline-offset-2;
}
</style>
