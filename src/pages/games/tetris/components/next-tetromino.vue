<script setup lang="ts">
import { NODE } from '../composables/@types';
import { useNodes } from '../composables/useNodes';

const { nextNode } = useNodes();
</script>

<template>
  <div
    class="w-20 md:w-28 h-20 md:h-28 flex items-center justify-center bg-gray-900 border border-gray-600 rounded-md"
  >
    <div v-if="nextNode === NODE.I" class="grid gap-px">
      <div
        v-for="num in 4"
        :key="num"
        class="w-3 md:w-4 h-3 md:h-4 border border-[0.375rem] md:border-[0.5rem] tetromino__I"
      />
    </div>
    <div v-if="nextNode === NODE.J" class="grid gap-px grid-cols-2">
      <div
        v-for="num in 6"
        :key="num"
        class="w-3 md:w-4 h-3 md:h-4"
        :class="{
          'border border-[0.375rem] md:border-[0.5rem] tetromino__J': num === 5 || num % 2 === 0,
        }"
      />
    </div>
    <div v-if="nextNode === NODE.L" class="grid gap-px grid-cols-2">
      <div
        v-for="num in 6"
        :key="num"
        class="w-3 md:w-4 h-3 md:h-4"
        :class="{
          'border border-[0.375rem] md:border-[0.5rem] tetromino__L': num === 6 || num % 2 === 1,
        }"
      />
    </div>
    <div v-if="nextNode === NODE.O" class="grid gap-px grid-cols-2">
      <div
        v-for="num in 4"
        :key="num"
        class="w-3 md:w-4 h-3 md:h-4 border border-[0.375rem] md:border-[0.5rem] tetromino__O"
      />
    </div>
    <div v-if="nextNode === NODE.S" class="grid gap-px grid-cols-3">
      <div
        v-for="num in 6"
        :key="num"
        class="w-3 md:w-4 h-3 md:h-4"
        :class="{
          'border border-[0.375rem] md:border-[0.5rem] tetromino__S': [2, 3, 4, 5].includes(num),
        }"
      />
    </div>
    <div v-if="nextNode === NODE.T" class="grid gap-px grid-cols-3">
      <div
        v-for="num in 6"
        :key="num"
        class="w-3 md:w-4 h-3 md:h-4"
        :class="{
          'border border-[0.375rem] md:border-[0.5rem] tetromino__T': [2, 4, 5, 6].includes(num),
        }"
      />
    </div>
    <div v-if="nextNode === NODE.Z" class="grid gap-px grid-cols-3">
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
