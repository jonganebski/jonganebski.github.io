<script setup lang="ts">
import { NODE } from '../composables/@types';
import { useNodes } from '../composables/useNodes';
import { useStyles } from '../composables/useStyles';

defineProps<{
  rowIdx: number;
  colIdx: number;
  node: NODE;
  isCatHere: boolean;
  isGuide: boolean;
}>();

const { TOP_RESERVE } = useNodes();

const { nodeSize } = useStyles();
</script>

<template>
  <div
    class="bg-gray-900"
    :class="[
      node === NODE.VOID
        ? isGuide && !isCatHere
          ? 'border-color__guide'
          : ''
        : node === NODE.I || node === NODE.FOSSIL_I
        ? 'border-color__tetromino__I'
        : node === NODE.J || node === NODE.FOSSIL_J
        ? 'border-color__tetromino__J'
        : node === NODE.L || node === NODE.FOSSIL_L
        ? 'border-color__tetromino__L'
        : node === NODE.O || node === NODE.FOSSIL_O
        ? 'border-color__tetromino__O'
        : node === NODE.S || node === NODE.FOSSIL_S
        ? 'border-color__tetromino__S'
        : node === NODE.T || node === NODE.FOSSIL_T
        ? 'border-color__tetromino__T'
        : node === NODE.Z || node === NODE.FOSSIL_Z
        ? 'border-color__tetromino__Z'
        : '',
    ]"
    :style="{
      ...(node === NODE.WALL || rowIdx < TOP_RESERVE
        ? { display: 'none' }
        : { width: `${nodeSize}px`, height: `${nodeSize}px` }),
      ...(node === NODE.VOID
        ? isGuide && !isCatHere
          ? { borderWidth: '1px' }
          : {}
        : { borderWidth: `${nodeSize / 2}px` }),
    }"
  ></div>
</template>

<style scoped lang="css">
.border-color__guide {
  @apply border-t-red-500 border-r-red-500 border-b-red-500 border-l-red-500;
}
</style>
