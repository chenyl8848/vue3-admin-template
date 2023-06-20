<template>
  <div class="message">
    <el-popover
      placement="bottom"
      title="Title"
      :width="200"
      trigger="hover"
      content="this is content, this is content, this is content"
    >
      <template #reference>
        <el-button icon="Message" circle />
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.message {
  margin-left: 12px;
}
</style>
