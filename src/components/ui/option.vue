<script setup lang="ts">
import type { ComputedRef } from 'vue';
import colors from 'windicss/colors';

export interface Props {
  value: string | number;
  label: string;
}

const props = defineProps<Props>();

const onClickOption = inject<(value: string | number) => void>('onClickOption');
const modelValue = inject<ComputedRef<string | number>>('modelValue');
</script>

<template>
  <button
    class="py-1 px-2 rounded"
    :class="{ 'bg-rose-50 text-rose-600': modelValue === props.value }"
    @mousedown="onClickOption && onClickOption(props.value)"
  >
    <span class="flex transition-all transform" :class="{ inactive: modelValue !== props.value }">
      {{ props.label }}
    </span>
  </button>
</template>

<style scoped lang="css">
button:hover > .inactive {
  transform: translateX(0.25rem);
  color: v-bind('colors.rose[600]');
}
</style>
