<script setup lang="ts">
import type { Slot, VNode } from 'vue';
import type { Props as OptionProps } from './option.vue';

interface Props {
  modelValue: string | number;
  label: string;
}

interface Emits {
  (event: 'update:modelValue', value: string | number): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const slots = useSlots() as Readonly<{ default: Slot }>;

const isOptionsOpen = ref(false);

const selectedOptionLabel = computed(
  () =>
    (slots.default()[0].children as VNode<{}, {}, OptionProps>[]).find(
      (vNode) => vNode.props?.value === props.modelValue,
    )?.props?.label,
);

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
  emits('update:modelValue', value);
}

provide('onClickOption', onClickOption);
provide(
  'modelValue',
  computed(() => props.modelValue),
);
</script>

<template>
  <div class="relative group mt-5">
    <label
      class="block rounded cursor-pointer transition-all transform group-hover:shadow"
      @mousedown="toggleOptions"
      @focusin="openOptions"
      @focusout="closeOptions"
    >
      <input
        type="text"
        :value="selectedOptionLabel"
        class="px-2 py-1 outline-none bg-gray-200 rounded transition-all transform group-hover:bg-white cursor-pointer group-hover:-translate-y-1"
      />
      <span
        class="absolute top-0 left-0 z-10 px-2 py-1 h-full flex items-center text-sm transition-transform transform"
        :class="[
          isOptionsOpen || selectedOptionLabel
            ? '-translate-y-7 -translate-x-2'
            : 'text-gray-500 group-hover:-translate-y-1',
        ]"
      >
        {{ props.label }}
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
    <div
      v-show="isOptionsOpen"
      class="absolute p-1 max-h-96 grid w-full border bg-light-200 shadow-lg overflow-auto"
    >
      <slot />
    </div>
  </div>
</template>
