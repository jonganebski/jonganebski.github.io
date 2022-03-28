<script setup lang="ts">
import colors from 'windicss/colors';

export interface Props {
  value: {
    value: string | number;
    label: string;
  };
}

const props = defineProps<Props>();
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
        >{{ props.value.label }}</span
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
