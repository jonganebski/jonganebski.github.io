<script setup lang="ts">
/**
 * @file
 * This file will catch all not-found routes.
 * But Github Pages needs 404.html file to handle their not-found pages.
 * That is why this file replaces the route to '/404'
 */
const router = useRouter();

onBeforeMount(() => router.replace('/404'));
</script>

<template></template>
