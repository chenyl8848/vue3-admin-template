<template>
  <iframe
    :src="src"
    frameborder="no"
    scrolling="auto"
    style="width: 100%; height: 100%"
  ></iframe>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  src: {
    type: String,
    required: true,
  },
})
</script>
