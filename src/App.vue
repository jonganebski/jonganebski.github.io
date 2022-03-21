<script setup lang="ts"></script>

<template>
  <router-view />
  <client-only>
    <dev-tools-vue-query />
  </client-only>
</template>
