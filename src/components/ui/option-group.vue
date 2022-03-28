<script setup lang="ts">
interface Props {
  label: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div>
    <span class="pl-1">{{ props.label }}</span>
    <div display="pl-2 grid">
      <slot />
    </div>
  </div>
</template>
