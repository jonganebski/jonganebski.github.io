<script setup lang="ts">
// @ts-ignore
import init, { initialize } from 'mine-sweeper';

onMounted(() => {
  init().then(() => {
    initialize('Easy');
  });
});
</script>

<template>
  <div class="min-h-screen flex justify-center items-center">
    <div id="wasm"></div>
  </div>
</template>

<style scoped lang="css">
#wasm {
  display: grid;
  grid-template-columns: repeat(8, 20px);
  grid-template-rows: repeat(8, 20px);
  font-size: 0.5rem;
}
</style>
