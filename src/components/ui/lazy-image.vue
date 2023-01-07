<script setup lang="ts">
interface Props {
  cfVariant?: 'public' | 'post' | 'avatar';
  cfId?: string;
  height?: number;
  width?: number;
  src?: string;
}

const props = withDefaults(defineProps<Props>(), { height: 400, width: 600, cfVariant: 'post' });

const isLoading = ref<boolean>(true);
</script>

<template>
  <img
    loading="lazy"
    :height="props.height"
    :width="props.width"
    :src="
      props.cfId
        ? `https://imagedelivery.net/fOEhHq_KNsIgC-hb-3NU0w/${props.cfId}/${props.cfVariant}`
        : props.src
    "
    class="bg-gray-400"
    :class="{ 'animate-pulse': isLoading }"
    @load="isLoading = false"
  />
</template>
