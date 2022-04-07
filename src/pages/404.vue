<script setup lang="ts">
/**
 * @file
 * `404.html` must be provided to handle custom 404 page on the Github Pages.
 * But there is a side effect.
 * After Github Pages renders this page, the router overrides it and renders [...all].vue file.
 * That's why this page's content is simple.
 */
import { Head } from '@vueuse/head';
import { useMyI18n } from '~/plugins/i18n';

const { t } = useMyI18n();

const router = useRouter();

/**
 * @description
 * There is possibility that the user just enters directly to the '/404' page.
 * Then the router will not render `[...all].vue`.
 * In that case this page will send the user to the homepage.
 */
onMounted(() => {
  const setTimeoutId = setTimeout(() => router.replace('/'), 1500);
  onBeforeUnmount(() => clearTimeout(setTimeoutId));
});
</script>

<template>
  <Head>
    <title>{{ t('redirecting') }}... | {{ t('jon_ganebskis_blog') }}</title>
  </Head>
  <h1 class="pt-40 text-2xl text-center text-dark-500 dark:text-light-500">
    {{ t('redirecting') }}...
  </h1>
</template>
