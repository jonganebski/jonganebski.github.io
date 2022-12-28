<script setup lang="ts">
import Footer from './components/footer.vue';
import Header from './components/header.vue';
import Menu from './components/menu.vue';

const { top, bottom } = useScreenSafeArea();

const mainMinHeight = computed(() => `100vh + ${top.value} + ${bottom.value}`);
</script>

<template>
  <Menu />
  <Header />
  <main class="lg:ml-14 min-h-screen">
    <router-view />
  </main>
  <Footer />
</template>

<style lang="css">
body {
  @apply transition-colors bg-light-500 dark:bg-dark-500 text-dark-500 dark: text-light-500;
}
main {
  height: 100%;
  min-height: calc(v-bind(mainMinHeight));
}
</style>
