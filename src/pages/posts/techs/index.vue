<script setup lang="ts">
import { getTechPosts } from '~/libs/markdown';
import { useMyI18n } from '~/plugins/i18n';
import PartyBtn from './components/party-btn.vue';
import FloatingIcon from './components/floating-icon.vue';

const { locale, t } = useMyI18n();

const posts = getTechPosts()?.sort((a, b) => b.date.localeCompare(a.date));

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}
</script>

<template>
  <div class="mt-20 mb-40 px-4 md:px-16 mx-auto text-dark-500 dark:text-light-500">
    <div class="flex justify-between">
      <div>
        <h1 class="text-6xl">{{ t('tech_blog') }}</h1>
        <p class="mt-10">{{ t('posts_techs.p_1') }}</p>
        <p>{{ t('posts_techs.p_2') }}</p>
        <p>{{ t('posts_techs.p_3') }}</p>
      </div>
      <router-link to="/notes/tech">{{ t('note', 2) }}</router-link>
    </div>
    <ul class="mt-32 space-y-32">
      <li
        v-for="({ cover_image_url, fileName, title, date }, index) in posts"
        :key="index"
        class="relative max-w-6xl grid lg:grid-cols-2"
      >
        <ui-lazy-image
          :src="cover_image_url"
          class="w-full aspect-video object-cover bg-gray-300"
          :height="300"
          :width="500"
        />
        <div class="z-1 mt-5 lg:mt-0 lg:px-16 max-w-lg flex-1">
          <p class="text-xs mr-auto">
            {{ formatDate(date) }}
          </p>
          <h5 class="mt-6 text-5xl">{{ title[locale] }}</h5>
          <party-btn
            :content="t('click').toUpperCase()"
            :to="`/posts/techs/${fileName}`"
            class="mt-10 text-sm"
          />
        </div>
        <client-only>
          <floating-icon :index="index" />
        </client-only>
      </li>
    </ul>
  </div>
  <client-only>
    <ui-contour-lines />
  </client-only>
</template>
