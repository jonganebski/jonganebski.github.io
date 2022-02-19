<script setup lang="ts">
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getTechPosts } from '~/libs/markdown';
import { computeRandInt } from '~/libs/random';
import { useMyI18n } from '~/plugins/i18n';

gsap.registerPlugin(ScrollTrigger);

const { locale, t } = useMyI18n();

const posts = getTechPosts()?.sort((a, b) => b.date.localeCompare(a.date));

const imageRefs = ref<HTMLImageElement[]>([]);
const iconContainerRefs = ref<HTMLSpanElement[]>([]);

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}

onMounted(() => {
  imageRefs.value.forEach((imageElement) => {
    ScrollTrigger.create({
      trigger: imageElement,
      onEnter: () => {
        imageElement.src = imageElement.dataset.src ?? '';
      },
    });
  });
  iconContainerRefs.value.forEach((icon) => {
    const initialRotate = computeRandInt(20, 180);
    gsap.fromTo(
      icon,
      { rotate: initialRotate },
      {
        rotate: initialRotate - 360,
        ease: 'none',
        y: -300,
        scrollTrigger: {
          trigger: icon,
          scrub: true,
        },
      },
    );
  });
});
</script>

<template>
  <div class="mt-20 mb-40 px-16 mx-auto">
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
        class="relative max-w-6xl flex"
      >
        <img
          :data-src="cover_image_url"
          :ref="(el) => imageRefs.push(el as HTMLImageElement)"
          class="h-[300px] aspect-video object-cover bg-gray-300"
          width="500"
          height="300"
          loading="lazy"
        />
        <div class="z-1 px-16 max-w-lg flex-1">
          <p class="text-xs mr-auto">
            {{ formatDate(date) }}
          </p>
          <h5 class="mt-6 text-5xl">{{ title[locale] }}</h5>
          <ui-party-btn
            :content="t('click').toUpperCase()"
            :to="`/posts/techs/${fileName}`"
            class="mt-10 text-sm"
          />
        </div>
        <span
          :ref="(el) => iconContainerRefs.push(el as HTMLSpanElement)"
          class="absolute z-0 inline-block"
          :style="{
            top: `${computeRandInt(0, 50)}%`,
            left: `${computeRandInt(0, 100)}%`,
          }"
        >
          <icon-javascript v-if="index === 2" class="w-16 text-yellow-500" />
          <icon-react v-if="index === 3" class="w-16 text-light-blue-500" />
          <icon-typescript v-if="index === 4" class="w-16 text-blue-500" />
          <icon-vue v-if="index === 5" class="w-16 text-green-600" />
        </span>
      </li>
    </ul>
  </div>
  <ui-contour-lines />
</template>
