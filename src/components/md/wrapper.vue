<script setup lang="ts">
const props = defineProps<{ frontmatter: { [key: string]: any } }>();
</script>

<template>
  <div class="p-20 bg-yellow-100">
    <article class="py-10 max-w-screen-lg bg-white">
      <md-ko as="h1" class="mx-16 text-7xl font-bold">
        {{ props.frontmatter.title.ko }}
      </md-ko>
      <md-en as="h1" class="mx-16 text-7xl font-bold">
        {{ props.frontmatter.title.en }}
      </md-en>
      <img class="mt-8" :src="props.frontmatter.cover_image_url" alt="" />
      <div class="mt-24">
        <slot />
      </div>
    </article>
  </div>
</template>

<style scoped lang="css">
::v-slotted(img) {
  width: 100%;
}
::v-slotted(p) {
  font-size: 0.9rem;
}
</style>
