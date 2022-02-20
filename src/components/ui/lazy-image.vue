<script setup lang="ts">
import { useElementVisibility } from '@vueuse/core';

interface Props {
  src: string;
}

const props = defineProps<Props>();

const imgRef = ref<HTMLImageElement | null>(null);

const isVisible = useElementVisibility(imgRef);
</script>

<template>
  <img ref="imgRef" :src="isVisible ? props.src : undefined" />
</template>
