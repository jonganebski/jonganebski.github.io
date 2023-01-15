<script setup lang="ts">
import Footer from './components/footer.vue';
import Header from './components/header.vue';
import Menu from './components/menu.vue';
</script>

<template>
  <Menu />
  <Header />
  <main class="lg:ml-14 min-h-3xl">
    <router-view />
  </main>
  <Footer />
</template>

<style lang="css">
body {
  @apply transition-colors bg-light-500 dark:bg-dark-500 text-dark-500 dark: text-light-500;
}
</style>
