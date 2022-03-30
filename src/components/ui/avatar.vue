<script setup lang="ts">
interface Props {
  alt: string;
  ariaLabel?: string;
  height?: number;
  width?: number;
  src?: string;
}

const props = withDefaults(defineProps<Props>(), { height: 40, width: 40 });
</script>

<template>
  <button
    class="flex items-center justify-center rounded-full overflow-hidden bg-gray-100 dark:bg-dark-800 transform active:scale-90"
    :style="{ width: `${props.width}px`, height: `${props.height}px` }"
    :aria-label="props.ariaLabel"
  >
    <ui-lazy-image
      v-if="props.src"
      :src="props.src"
      :alt="props.alt"
      :height="props.height"
      :width="props.width"
    />
    <carbon-user v-else class="text-lg" />
  </button>
</template>
