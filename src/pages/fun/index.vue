<script setup lang="ts">
// @ts-ignore
import init, { easy } from 'mine-sweeper';

onMounted(() => {
  init().then(() => {
    easy();
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
  grid-template-columns: repeat(8, 40px);
  grid-template-rows: repeat(8, 40px);
  font-size: 0.5rem;
}
</style>

<style lang="css">
#wasm > .veiled {
  background-color: gray;
}

#wasm > .unveiled {
  background-color: transparent;
}
</style>
