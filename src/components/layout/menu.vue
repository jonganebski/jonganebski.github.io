<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router';
import bg from '~/assets/menu-bg.svg';
import { useMyI18n } from '~/plugins/i18n';

const { setLocaleTo, t } = useMyI18n();

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
      class="absolute top-0 left-0 w-screen h-screen px-[30vw] py-[30vh] bg-cover text-light-300 transition-all delay-300 duration-300"
      :style="{
        clipPath: isMenuOpen
          ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
          : 'polygon(0 0, 0% 0, 0% 0%, 0 0%)',
        opacity: isMenuOpen ? 1 : 0,
        backgroundImage: `url(${bg})`,
      }"
    >
      <h1 class="mb-20 text-5xl">{{ t('menu') }}</h1>
      <nav class="grid gap-3 text-xl font-normal">
        <router-link to="/">{{ t('nav.home') }}</router-link>
        <router-link to="/posts/routes">{{ t('nav.routes') }}</router-link>
        <router-link to="/posts/techs">{{ t('nav.techs') }}</router-link>
      </nav>
      <div class="mt-30">
        <button @click="setLocaleTo('ko')">한국어</button>
        <span> / </span>
        <button @click="setLocaleTo('en')">English</button>
      </div>
    </section>
    <section ref="menuBtnRef" @animationend="onAnimationEnd">
      <button class="relative w-14 h-14" @click="onClickMenuBtn">
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
