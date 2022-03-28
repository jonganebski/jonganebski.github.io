<script setup lang="ts">
interface Props {
  modelValue: string;
}

interface Emits {
  (event: 'update:modelValue', value: string): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const images = [
  {
    name: 'Jean Alter',
    url: 'https://preview.redd.it/m2dst4o2hds61.png?width=640&crop=smart&auto=webp&s=29b4040ebc7ca6f7c368ef690cec55212a51bc29',
  },
  {
    name: 'Fox',
    url: 'https://images.unsplash.com/photo-1647821172233-d1b0d2926b1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
  },
  { name: 'Lena-1', url: 'https://wallpapercave.com/wp/wp9322869.jpg' },
  { name: 'Lena-2', url: 'https://wallpapercave.com/wp/wp9322942.jpg' },
];
</script>

<template>
  <ui-select
    :model-value="props.modelValue"
    label="Image"
    class="w-56"
    @update:model-value="emits('update:modelValue', $event.toString())"
  >
    <ui-option
      v-for="(image, index) in images"
      :key="index"
      :value="image.url"
      :label="image.name"
    />
  </ui-select>
</template>
