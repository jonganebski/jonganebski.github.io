<script setup lang="ts">
import { Head } from '@vueuse/head';
import { useMyI18n } from '~/plugins/i18n';

const { t, locale } = useMyI18n();

const STORAGE_URL = 'https://ijivzwfsihdcvwrntdpe.supabase.co/storage/v1/object/public/game-images';

const links = computed(() => [
  {
    path: '/games/mine-sweeper',
    name: t('minesweeper'),
    src: `${STORAGE_URL}/screenshot-minesweeper.jpg`,
  },
  {
    path: '/games/sliding-puzzle',
    name: t('sliding_puzzle'),
    src: `${STORAGE_URL}/screenshot-sliding-puzzle.jpg`,
  },
]);
</script>

<template>
  <Head>
    <title>{{ t('nav.games') }} | {{ t('jon_ganebskis_blog') }}</title>
  </Head>
  <div class="mx-auto py-20 px-15 lg:px-20 max-w-screen-xl text-dark-500 dark:text-light-500">
    <h1 class="text-6xl">{{ t('nav.games') }}</h1>
    <ul class="mt-30 flex flex-wrap gap-16">
      <li v-for="{ path, name, src } in links" :key="path">
        <router-link
          class="group"
          :to="path"
          :aria-label="
            locale === 'ko' ? `${name}을(를) 플레이하려면 클릭하세요` : `Click to play ${name}`
          "
        >
          <ui-lazy-image
            class="transition-shadow shadow-sm group-hover:shadow-xl"
            :style="{ transitionDelay: `${name.length * 10}ms` }"
            :height="240"
            :width="200"
            :src="src"
          />
          <h4 class="mt-2 text-center overflow-hidden">
            <span
              v-for="(char, index) in name.split('')"
              :key="index"
              class="inline-block transition-all transform translate-y-[1em] group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
              :style="{ transitionDelay: `${index * 10}ms` }"
            >
              {{ char }}
            </span>
          </h4>
        </router-link>
      </li>
    </ul>
  </div>
  <client-only>
    <ui-contour-lines />
  </client-only>
</template>
