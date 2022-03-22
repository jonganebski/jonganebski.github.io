<script setup lang="ts">
interface Props {
  value: string | number;
  label: string;
}

const props = defineProps<Props>();

const onClickOption = inject<(value: string | number) => void>('onClickOption');
</script>

<template>
  <button @mousedown="onClickOption && onClickOption(props.value)">
    <span class="w-full flex transition-all transform hover:translate-x-1 hover:text-blue-700">
      {{ props.label }}
    </span>
  </button>
</template>
