<script setup lang="ts">
import CountryFlag from 'vue-country-flag-next';
import { getRoutePosts } from '~/libs/markdown';

const posts = getRoutePosts();
</script>

<template>
  <div class="container my-10 mx-auto grid grid-cols-2">
    <div></div>
    <ul class="">
      <ui-block
        v-for="({ cover_image_url, countries, fileName, from, to, title }, index) in posts"
        :key="index"
        as="li"
        content-class="flex p-4 bg-gray-400 rounded"
      >
        <img
          :src="cover_image_url"
          width="400"
          height="400"
          class="w-28rem aspect-video object-cover"
        />
        <div class="px-16 max-w-lg flex-1 text-gray-900">
          <div class="flex items-center">
            <p class="text-xs mr-auto">{{ from }} ~ {{ to }}</p>
            <country-flag v-for="country in countries" :key="country" :country="country" />
          </div>
          <h5 class="mt-6 text-5xl">{{ title.ko }}</h5>
          <h6 class="mt-2 text-sm">{{ title.en }}</h6>
          <router-link
            :to="`/posts/routes/${fileName}`"
            class="inline-block mt-5 px-5 py-2 bg-red-200"
          >
            Click
          </router-link>
        </div>
      </ui-block>
    </ul>
  </div>
</template>
