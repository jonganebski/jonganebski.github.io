<script setup lang="ts">
import { NODE } from '../composables/@types';
import { useNodes } from '../composables/useNodes';
import { useStyles } from '../composables/useStyles';

const { nextNode } = useNodes();

const { bg } = useStyles();
</script>

<template>
  <div class="w-28 h-28 flex items-center justify-center border border-gray-400 rounded-md">
    <div v-if="nextNode === NODE.I" class="grid gap-px">
      <div v-for="num in 4" :key="num" class="w-6 h-6" :class="[bg.I]" />
    </div>
    <div v-if="nextNode === NODE.J" class="grid gap-px grid-cols-2">
      <div
        v-for="num in 6"
        :key="num"
        class="w-6 h-6"
        :class="[num === 5 || num % 2 === 0 ? bg.J : '']"
      />
    </div>
    <div v-if="nextNode === NODE.L" class="grid gap-px grid-cols-2">
      <div
        v-for="num in 6"
        :key="num"
        class="w-6 h-6"
        :class="[num === 6 || num % 2 === 1 ? bg.L : '']"
      />
    </div>
    <div v-if="nextNode === NODE.O" class="grid gap-px grid-cols-2">
      <div v-for="num in 4" :key="num" class="w-6 h-6" :class="[bg.O]" />
    </div>
    <div v-if="nextNode === NODE.S" class="grid gap-px grid-cols-3">
      <div
        v-for="num in 6"
        :key="num"
        class="w-6 h-6"
        :class="[[2, 3, 4, 5].includes(num) ? bg.S : '']"
      />
    </div>
    <div v-if="nextNode === NODE.T" class="grid gap-px grid-cols-3">
      <div
        v-for="num in 6"
        :key="num"
        class="w-6 h-6"
        :class="[[2, 4, 5, 6].includes(num) ? bg.T : '']"
      />
    </div>
    <div v-if="nextNode === NODE.Z" class="grid gap-px grid-cols-3">
      <div
        v-for="num in 6"
        :key="num"
        class="w-6 h-6"
        :class="[[1, 2, 5, 6].includes(num) ? bg.Z : '']"
      />
    </div>
  </div>
</template>
