<script setup lang="ts">
interface Props {
  modelValue?: { value: string | number; label: string };
  label: string;
}

interface Emits {
  (event: 'update:modelValue', payload: { value: string | number; label: string }): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
</script>

<template>
  <Listbox
    :model-value="props.modelValue"
    @update:model-value="emits('update:modelValue', $event)"
    v-slot="{ open }"
  >
    <div class="relative z-10 mt-1">
      <ListboxLabel
        class="relative z-1 block pl-2 text-sm transition-transform transform"
        :class="[
          !open && !props.modelValue ? 'translate-y-7 translate-x-1 pointer-events-none' : '',
        ]"
      >
        {{ props.label }}
      </ListboxLabel>
      <ListboxButton
        class="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
      >
        <span class="block h-5 truncate">{{ props.modelValue?.label }}</span>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <carbon-chevron-down class="w-5 h-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <slot />
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
