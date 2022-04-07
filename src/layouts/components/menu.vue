<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router';
import bg from '~/assets/menu-bg.svg';
import bgDark from '~/assets/menu-bg-dark.svg';
import { useMyI18n } from '~/plugins/i18n';
import { isDark } from '~/composables/useDarkMode';
import { useNav } from '../composables/useNav';
import { useUserQuery } from '~/api/useUserQuery';

const { setLocaleTo, t } = useMyI18n();

const { data: user } = useUserQuery();

const links = useNav();

const menuBtnRef = ref<HTMLDivElement | null>(null);

const isMenuOpen = ref(false);

function onClickMenuBtn() {
  isMenuOpen.value = !isMenuOpen.value;
  menuBtnRef.value?.classList.add('anim-move');
}

function onAnimationEnd() {
  menuBtnRef.value?.classList.remove('anim-move');
}

onBeforeRouteLeave((_, __, next) => {
  isMenuOpen.value = false;
  next();
});
</script>

<template>
  <div class="fixed z-50 top-0 left-0">
    <section
      class="absolute top-0 left-0 w-screen h-full min-h-screen text-light-300 bg-black overflow-hidden transition-all delay-300 duration-300"
      :style="{
        clipPath: isMenuOpen
          ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
          : 'polygon(0 0, 0% 0, 0% 0%, 0 0%)',
        opacity: isMenuOpen ? 1 : 0,
      }"
    >
      <div class="bg" :style="{ backgroundImage: `url(${bgDark})`, opacity: isDark ? 1 : 0 }" />
      <div class="bg" :style="{ backgroundImage: `url(${bg})`, opacity: isDark ? 0 : 1 }" />
      <div
        class="py-28 md:py-[20vh] px-10 md:px-[20vw] h-full grid gap-30 lg:grid-cols-2 overflow-auto"
      >
        <div class="grid gap-30">
          <div class="flex items-center">
            <h1 class="text-5xl">{{ t('menu') }}</h1>
            <client-only>
              <ui-toggle-dark-mode-btn class="ml-20" />
            </client-only>
          </div>
          <nav class="grid gap-3 text-xl font-normal">
            <router-link
              v-for="{ path, isMatch, label } in links"
              :key="path"
              :class="[isMatch ? 'text-rose-600' : 'hover:text-rose-500']"
              :to="path"
            >
              {{ label }}
            </router-link>
          </nav>
          <div>
            <button @click="setLocaleTo('ko')">한국어</button>
            <span> / </span>
            <button @click="setLocaleTo('en')">English</button>
          </div>
        </div>
        <div class="max-w-96 flex flex-col gap-3 justify-end max-w-80">
          <template v-if="user">
            <auth-btn sign-out />
          </template>
          <template v-else>
            <auth-btn provider="github" />
            <auth-btn provider="google" />
            <auth-btn provider="facebook" />
            <p class="mt-4 text-xs text-light-500">
              <carbon-warning-hex-filled class="mb-2 mx-auto text-lg text-red-400" />
              {{ t('sign_up_notice') }}
            </p>
          </template>
        </div>
      </div>
    </section>
    <section ref="menuBtnRef" @animationend="onAnimationEnd">
      <button class="relative w-14 h-14" :aria-label="t('menu')" @click="onClickMenuBtn">
        <div
          class="absolute inset-0 grid place-items-center bg-red-800 transition-transform delay-300 duration-300"
          style="backface-visibility: hidden; transform-style: preserve-3d"
          :style="{ transform: `rotateY(${isMenuOpen ? -180 : 0}deg)` }"
          @transitionend=""
        >
          <carbon-menu class="text-xl text-white" />
        </div>
        <div
          class="absolute inset-0 grid place-items-center bg-red-800 transition-transform delay-300 duration-300"
          style="
            backface-visibility: hidden;
            transform-style: preserve-3d;
            transform: rotateY(180deg);
          "
          :style="{ transform: `rotateY(${isMenuOpen ? 0 : -180}deg)` }"
        >
          <carbon-close class="text-xl text-white" />
        </div>
      </button>
    </section>
  </div>
</template>

<style lang="css" scoped>
.bg {
  @apply absolute -z-1 top-0 left-0 bg-cover w-full h-full transition-opacity duration-500;
}

@keyframes move {
  0% {
    transform: translate(0px, 0px);
  }
  5% {
    transform: translate(8px, 8px);
  }
  95% {
    transform: translate(8px, 8px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}

.anim-move {
  animation: move 1s linear;
}
</style>
