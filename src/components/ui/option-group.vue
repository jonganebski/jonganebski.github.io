<script setup lang="ts">
interface Props {
  categoryName: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="mt-2 text-sm">
    <span class="pl-2 font-bold">{{ props.categoryName }}</span>
    <div display="mt-1 grid">
      <slot />
    </div>
  </div>
</template>
