<script setup lang="ts">
import Footer from './components/footer.vue';
import Header from './components/header.vue';
import Menu from './components/menu.vue';
</script>

<template>
  <Menu />
  <Header />
  <main class="min-h-screen lg:ml-14">
    <router-view />
  </main>
  <Footer />
</template>
