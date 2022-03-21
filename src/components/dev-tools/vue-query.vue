<script setup lang="ts">
/**
 * @file
 * This should be separated and used inside of the <client-only> tag.
 * ViteSSG cannot handle this devtool at the point of the build time.
 */
import { VueQueryDevTools } from 'vue-query/devtools';
</script>

<template>
  <VueQueryDevTools />
</template>
