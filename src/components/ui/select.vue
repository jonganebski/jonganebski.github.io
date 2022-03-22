<script setup lang="ts">
const isOptionsOpen = ref(false);

function openOptions() {
  isOptionsOpen.value = true;
}

function closeOptions() {
  isOptionsOpen.value = false;
}

function toggleOptions() {
  isOptionsOpen.value = !isOptionsOpen.value;
}

function onClickOption(value: string | number) {
  console.log(value);
}

provide('onClickOption', onClickOption);
</script>

<template>
  <div class="relative group">
    <label
      class="block rounded cursor-pointer transition-all transform group-hover:shadow"
      @mousedown="toggleOptions"
      @focusin="openOptions"
      @focusout="closeOptions"
    >
      <input
        type="text"
        class="px-2 py-1 outline-none bg-gray-200 rounded transition-all transform group-hover:bg-white cursor-pointer group-hover:-translate-y-1"
      />
      <span
        class="absolute top-0 left-0 z-10 px-2 py-1 h-full flex items-center text-sm transition-transform transform"
        :class="[
          isOptionsOpen
            ? '-translate-y-6 -translate-x-2'
            : 'text-gray-500 group-hover:-translate-y-1',
        ]"
      >
        Placeholder & label
      </span>
      <div
        class="absolute top-0 right-0 pr-1 h-full flex items-center text-xs pointer-events-none transition-transform transform group-hover:-translate-y-1"
      >
        <carbon-chevron-down
          class="transition-transform transform"
          :class="{ 'rotate-180': isOptionsOpen }"
        />
      </div>
    </label>
    <div v-show="isOptionsOpen" class="absolute grid w-full">
      <slot />
    </div>
  </div>
</template>
