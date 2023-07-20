<template>
  <div class="content">
    <SliderCaptcha style="margin-left: 12px"></SliderCaptcha>
    <RotateCaptcha style="margin-left: 12px"></RotateCaptcha>
    <ConcatCaptcha style="margin-left: 12px"></ConcatCaptcha>
    <WordClickCaptcha style="margin-left: 12px"></WordClickCaptcha>
  </div>
</template>

<script lang="ts" setup>
import SliderCaptcha from '@/components/Captcha/SliderCaptcha/index.vue'
import RotateCaptcha from '@/components/Captcha/RotateCaptcha/index.vue'
import ConcatCaptcha from '@/components/Captcha/ConcatCaptcha/index.vue'
import WordClickCaptcha from '@/components/Captcha/WordClickCaptcha/index.vue'
</script>

<style scoped lang="scss">
.content {
  display: flex;
}
</style>
