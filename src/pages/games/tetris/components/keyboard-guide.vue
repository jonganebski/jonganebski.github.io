<script setup lang="ts"></script>

<template>
  <ul class="grid gap-2">
    <li>
      <div><carbon-arrow-left /></div>
      : Move block left
    </li>
    <li>
      <div><carbon-arrow-right /></div>
      : Move block right
    </li>
    <li>
      <div><carbon-arrow-up /></div>
      : Rotate block
    </li>
    <li>
      <div><carbon-arrow-down /></div>
      : Move block downwards
    </li>
    <li>
      <div class="px-1">Space</div>
      : Drop block
    </li>
  </ul>
</template>

<style scoped lang="css">
li {
  @apply flex items-center gap-1 text-sm;
}
li > div {
  @apply border rounded;
}
</style>
