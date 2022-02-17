<script setup lang="ts">
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getTechPosts } from '~/libs/markdown';
import { useMyI18n } from '~/plugins/i18n';

gsap.registerPlugin(ScrollTrigger);

const posts = getTechPosts()?.sort((a, b) => b.date.localeCompare(a.date));

const imageRefs = ref<HTMLImageElement[]>([]);

onMounted(() => {
  imageRefs.value.forEach((imageElement) => {
    ScrollTrigger.create({
      trigger: imageElement,
      onEnter: () => {
        imageElement.src = imageElement.dataset.src ?? '';
      },
    });
  });
});
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
          :data-src="cover_image_url"
          :ref="(x) => imageRefs.push(x as HTMLImageElement)"
          class="h-[300px] aspect-video object-cover bg-gray-300"
          width="500"
          height="300"
          loading="lazy"
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
