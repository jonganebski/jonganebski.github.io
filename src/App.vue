<script setup lang="ts">
import { IssueModalProvider } from './libs/issue';
</script>

<template>
  <IssueModalProvider>
    <router-view />
  </IssueModalProvider>
</template>
