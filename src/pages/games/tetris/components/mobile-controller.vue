<script setup lang="ts">
import { useMyI18n } from '~/plugins/i18n';

interface Emits {
  (event: 'onTouchArrowRightBtn', e: MouseEvent): void;
  (event: 'onTouchArrowLeftBtn', e: MouseEvent): void;
  (event: 'onTouchArrowDownBtn', e: MouseEvent): void;
  (event: 'onTouchRotateBtn', e: MouseEvent): void;
}

const emits = defineEmits<Emits>();

const { t } = useMyI18n();
</script>

<template>
  <div>
    <button
      class="fixed bottom-5 left-5 horizontal-btn"
      :aria-label="t('move_block_left')"
      @click="emits('onTouchArrowLeftBtn', $event)"
    >
      <carbon-arrow-left />
    </button>
    <button
      class="fixed bottom-5 right-5 horizontal-btn"
      :aria-label="t('move_block_right')"
      @click="emits('onTouchArrowRightBtn', $event)"
    >
      <carbon-arrow-right />
    </button>
    <button
      class="fixed bottom-5 left-1/2 transform -translate-x-1/2 horizontal-btn"
      :aria-label="t('move_block_downwards')"
      @click="emits('onTouchArrowDownBtn', $event)"
    >
      <carbon-arrow-shift-down />
    </button>
    <button
      class="fixed bottom-25 right-5 horizontal-btn"
      :aria-label="t('rotate_block')"
      @click="emits('onTouchRotateBtn', $event)"
    >
      <carbon-rotate-clockwise />
    </button>
  </div>
</template>

<style scoped lang="css">
.horizontal-btn {
  @apply w-12 h-12 flex items-center justify-center bg-gray-300 dark:bg-gray-500 rounded-full shadow-lg active:bg-gray-400;
}
</style>
