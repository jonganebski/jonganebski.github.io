<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDarkMode = useToggle(isDark);
</script>

<template>
  <button @click="toggleDarkMode()">
    <carbon-moon v-if="isDark" />
    <carbon-sun v-else />
  </button>
</template>
