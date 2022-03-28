<script setup lang="ts">
interface Props {
  shuffleCount: number;
  clickCount: number;
  score: number;
}

const props = defineProps<Props>();
</script>

<template>
  <div>
    <div>{{ props.clickCount }}</div>
    <div
      :class="[
        props.score < 0
          ? 'text-green-500'
          : props.score < props.shuffleCount
          ? 'text-yellow-500'
          : 'text-red-500',
      ]"
    >
      {{ props.score > 0 ? `+${props.score}` : props.score }} moves
    </div>
  </div>
</template>
