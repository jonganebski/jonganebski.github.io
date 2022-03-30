<script setup lang="ts">
interface Props {
  alt: string;
  ariaLabel?: string;
  height?: number;
  width?: number;
  src?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <button
    class="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden bg-gray-100 dark:bg-dark-800 transform active:scale-90"
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
