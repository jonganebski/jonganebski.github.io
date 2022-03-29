<script setup lang="ts"></script>

<template>
  <div class="mt-20 p-10 lg:p-20 max-w-screen-lg grid gap-3">
    <router-link to="/games/mine-sweeper">
      <div class="w-full px-2 py-4 shadow-lg sm:shadow-none sm:hover:shadow-lg">Mine Sweeper</div>
    </router-link>
    <router-link to="/games/sliding-puzzle">
      <div class="w-full px-2 py-4 shadow-lg sm:shadow-none sm:hover:shadow-lg">Sliding Puzzle</div>
    </router-link>
  </div>
  <ui-contour-lines />
</template>
