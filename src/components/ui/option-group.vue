<script setup lang="ts">
interface Props {
  label: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="mt-2 text-sm font-bold">
    <span class="pl-1">{{ props.label }}</span>
    <div display="pl-2 grid">
      <slot />
    </div>
  </div>
</template>
