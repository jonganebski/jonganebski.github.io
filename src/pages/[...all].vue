<script setup lang="ts">
import { Head } from '@vueuse/head';
import colors from 'windicss/colors';
import { useMyI18n } from '~/plugins/i18n';

const { t } = useMyI18n();

const content = ref('404');
</script>

<template>
  <Head>
    <title>{{ t('nav.not_found') }} | {{ t('jon_ganebskis_blog') }}</title>
  </Head>
  <div
    class="mt-16 min-h-screen-sm flex flex-col items-center overflow-hidden text-xl md:text-3xl lg:text-5xl"
  >
    <div class="relative w-full h-[1em]">
      <p
        class="text-not-found loop-to-right"
        :style="{ animationDuration: `${t('nav.not_found').length * 4}s` }"
      >
        <span v-for="num in 18" :key="num"> {{ t('nav.not_found') }}&nbsp; </span>
      </p>
      <p
        class="text-not-found loop-to-right__backup"
        :style="{ animationDuration: `${t('nav.not_found').length * 4}s` }"
      >
        <span v-for="num in 18" :key="num"> {{ t('nav.not_found') }}&nbsp; </span>
      </p>
    </div>
    <h1 class="text-404">{{ content }}</h1>
    <div class="relative w-full h-[1em]">
      <p
        class="text-not-found loop-to-left"
        :style="{ animationDuration: `${t('nav.not_found').length * 4}s` }"
      >
        <span v-for="num in 18" :key="num"> {{ t('nav.not_found') }}&nbsp; </span>
      </p>
      <p
        class="text-not-found loop-to-left__backup"
        :style="{ animationDuration: `${t('nav.not_found').length * 4}s` }"
      >
        <span v-for="num in 18" :key="num"> {{ t('nav.not_found') }}&nbsp; </span>
      </p>
    </div>
    <router-link
      to="/"
      class="mt-20 p-2 text-2xl text-dark-500 dark:text-light-500"
      aria-label="Click to go back to homepage"
      @mouseenter="content = 'Home'"
      @mouseleave="content = '404'"
    >
      <carbon-home />
    </router-link>
  </div>
  <ui-contour-lines />
</template>

<style scoped lang="css">
.text-404 {
  @apply my-20 text-[8rem] md:text-[16rem] lg:text-[20rem] font-extrabold;
  background: -webkit-linear-gradient(
    45deg,
    v-bind('colors.rose[600]'),
    v-bind('colors.fuchsia[600]')
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-not-found {
  @apply absolute left-0 opacity-50 whitespace-nowrap font-thin  text-dark-100 dark:text-light-100;
}

@keyframes translate-to-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
@keyframes translate-to-left-2 {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
}
@keyframes translate-to-right {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
}
@keyframes translate-to-right-2 {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}
.loop-to-left {
  animation: translate-to-left linear infinite;
}
.loop-to-left__backup {
  animation: translate-to-left-2 linear infinite;
}
.loop-to-right {
  animation: translate-to-right linear infinite;
}
.loop-to-right__backup {
  animation: translate-to-right-2 linear infinite;
}
</style>
