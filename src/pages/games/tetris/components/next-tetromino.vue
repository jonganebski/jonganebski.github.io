<script setup lang="ts">
import { NODE } from '../composables/@types';
import { useGameInfo } from '../composables/useGameInfo';
import { useNodes } from '../composables/useNodes';

const { nextNode } = useNodes();

const { isGameStarted } = useGameInfo();
</script>

<template>
  <div
    class="w-20 md:w-28 h-20 md:h-28 flex items-center justify-center bg-gray-900 border border-gray-600 rounded-md"
  >
    <div v-if="nextNode === NODE.I && isGameStarted" class="grid gap-px">
      <div
        v-for="num in 4"
        :key="num"
        class="w-3 md:w-4 h-3 md:h-4 border border-[0.375rem] md:border-[0.5rem] tetromino__I"
      />
    </div>
    <div v-if="nextNode === NODE.J && isGameStarted" class="grid gap-px grid-cols-2">
      <div
        v-for="num in 6"
        :key="num"
        class="w-3 md:w-4 h-3 md:h-4"
        :class="{
          'border border-[0.375rem] md:border-[0.5rem] tetromino__J': num === 5 || num % 2 === 0,
        }"
      />
    </div>
    <div v-if="nextNode === NODE.L && isGameStarted" class="grid gap-px grid-cols-2">
      <div
        v-for="num in 6"
        :key="num"
        class="w-3 md:w-4 h-3 md:h-4"
        :class="{
          'border border-[0.375rem] md:border-[0.5rem] tetromino__L': num === 6 || num % 2 === 1,
        }"
      />
    </div>
    <div v-if="nextNode === NODE.O && isGameStarted" class="grid gap-px grid-cols-2">
      <div
        v-for="num in 4"
        :key="num"
        class="w-3 md:w-4 h-3 md:h-4 border border-[0.375rem] md:border-[0.5rem] tetromino__O"
      />
    </div>
    <div v-if="nextNode === NODE.S && isGameStarted" class="grid gap-px grid-cols-3">
      <div
        v-for="num in 6"
        :key="num"
        class="w-3 md:w-4 h-3 md:h-4"
        :class="{
          'border border-[0.375rem] md:border-[0.5rem] tetromino__S': [2, 3, 4, 5].includes(num),
        }"
      />
    </div>
    <div v-if="nextNode === NODE.T && isGameStarted" class="grid gap-px grid-cols-3">
      <div
        v-for="num in 6"
        :key="num"
        class="w-3 md:w-4 h-3 md:h-4"
        :class="{
          'border border-[0.375rem] md:border-[0.5rem] tetromino__T': [2, 4, 5, 6].includes(num),
        }"
      />
    </div>
    <div v-if="nextNode === NODE.Z && isGameStarted" class="grid gap-px grid-cols-3">
      <div
        v-for="num in 6"
        :key="num"
        class="w-3 md:w-4 h-3 md:h-4"
        :class="{
          'border border-[0.375rem] md:border-[0.5rem] tetromino__Z': [1, 2, 5, 6].includes(num),
        }"
      />
    </div>
  </div>
</template>
