<script setup lang="ts">
import { getTechPosts } from '~/libs/markdown';
import { useMyI18n } from '~/plugins/i18n';

const { locale } = useMyI18n();

const posts = getTechPosts()?.sort((a, b) => b.date.localeCompare(a.date));
</script>

<template>
  <div class="container my-10 mx-auto">
    <ul class="space-y-16">
      <li
        v-for="({ cover_image_url, fileName, title, date }, index) in posts"
        :key="index"
        class="flex"
      >
        <img
          :src="cover_image_url"
          width="400"
          height="400"
          class="w-28rem aspect-video object-cover"
        />
        <div class="px-16 max-w-lg flex-1">
          <div class="flex items-center">
            <p class="text-xs mr-auto">{{ date }}</p>
          </div>
          <h5 class="mt-6 text-5xl">{{ title[locale] }}</h5>
          <router-link
            :to="`/posts/techs/${fileName}`"
            class="inline-block mt-5 px-5 py-2 bg-red-200"
          >
            Click
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>
