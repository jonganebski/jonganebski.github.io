<script setup lang="ts">
import type { ComputedRef } from 'vue';
import colors from 'windicss/colors';

export interface Props {
  value: string | number;
  label: string;
}

const props = defineProps<Props>();

const modelValue = inject<ComputedRef<string | number>>('modelValue');
const setSelectedOptionLabel = inject<(value: string) => void>('setSelectedOptionLabel');

watchEffect(() => {
  if (props.value !== modelValue?.value) return;
  if (!setSelectedOptionLabel) return;
  setSelectedOptionLabel(props.label);
});
</script>

<template>
  <ListboxOption v-slot="{ active, selected }" :value="props.value" as="template">
    <li
      :class="[selected ? 'bg-rose-50' : '', 'cursor-default select-none relative py-2 pl-4 pr-4']"
    >
      <span
        :class="[
          selected
            ? 'font-medium text-rose-600'
            : active
            ? 'text-rose-600 translate-x-1'
            : 'text-gray-900',
          'block truncate transition-all transform',
        ]"
        >{{ props.label }}</span
      >
    </li>
  </ListboxOption>
</template>

<style scoped lang="css">
button:hover > .inactive {
  transform: translateX(0.25rem);
  color: v-bind('colors.rose[600]');
}
</style>
