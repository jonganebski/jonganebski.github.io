<script setup lang="ts">
const props = withDefaults(defineProps<{ as: keyof HTMLElementTagNameMap }>(), { as: 'div' });

const { locale } = useI18n();
</script>

<template>
  <props.as v-show="locale === 'en'"> <slot /> </props.as>
</template>
