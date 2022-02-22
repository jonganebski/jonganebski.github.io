<script setup lang="ts">
import { useMyI18n } from '~/plugins/i18n';

const { setLocaleTo, locale, t } = useMyI18n();
</script>

<template>
  <header
    class="fixed top-0 left-0 z-10 h-screen w-14 pb-10 hidden lg:flex flex-col items-center bg-white text-sm shadow-2xl"
  >
    <div class="mt-22 w-0 h-0">
      <nav class="nav">
        <router-link to="/posts/techs" :class="[locale === 'ko' && 'transform rotate-90']">
          {{ t('nav.techs') }}
        </router-link>
        <router-link to="/posts/routes" :class="[locale === 'ko' && 'transform rotate-90']">
          {{ t('nav.routes') }}
        </router-link>
        <router-link to="/" :class="[locale === 'ko' && 'transform rotate-90']">
          {{ t('nav.home') }}
        </router-link>
      </nav>
    </div>
    <div class="mt-auto grid justify-center">
      <button>
        <span
          class="write-vertical-right"
          :class="locale === 'ko' && 'text-red-300'"
          @click="setLocaleTo('ko')"
        >
          한국어
        </span>
      </button>
      <span class="text-center"> - </span>
      <button>
        <span
          class="write-vertical-right write-orient-upright"
          :class="locale === 'en' && 'text-red-300'"
          @click="setLocaleTo('en')"
        >
          en
        </span>
      </button>
    </div>
  </header>
</template>

<style scoped lang="css">
.nav {
  display: flex;
  gap: 1.5rem;
  width: fit-content;
  transform-origin: right;
  transform: translate(-100%) rotate(-90deg);
}
</style>
