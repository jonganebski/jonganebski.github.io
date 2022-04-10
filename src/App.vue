<script setup lang="ts">
import type { Component } from 'vue';
import { IssueModalProvider } from './libs/issue';

// ==================================================
// This codes fixes following error on build time.
//
// (node:3606) UnhandledPromiseRejectionWarning: Error [ERR_UNSUPPORTED_DIR_IMPORT]: Directory import
// '/home/jonganebski/github/jonganebski.github.io/node_modules/vue-query/devtools' is not supported
// resolving ES modules imported from /home/jonganebski/github/jonganebski.github.io/.vite-ssg-temp/main.mjs
//
const VueQueryDevTools = shallowRef<Component | null>(null);
//
onMounted(async () => {
  VueQueryDevTools.value = (await import('vue-query/devtools')).VueQueryDevTools;
});
// ==================================================
</script>

<template>
  <IssueModalProvider>
    <router-view />
  </IssueModalProvider>
  <component :is="VueQueryDevTools" />
</template>
