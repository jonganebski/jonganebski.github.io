<script setup lang="ts">
const { locale } = useI18n();
</script>

<template>
  <div v-show="locale === 'en'"><slot /></div>
</template>
