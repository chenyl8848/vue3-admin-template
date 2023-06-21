<template>
  <div class="icon-select-body">
<!--    <el-popover placement="bottom" :width="400" trigger="click" v-model:visible="popoverVisible" style="height: 200px">-->
<!--      <template #reference>-->
<!--        <el-input v-model="icon" placeholder="请选择图标" clearable></el-input>-->
<!--      </template>-->
      <el-scrollbar height="200px">
        <div v-for="(item,index) in iconList" link @click="selectIcon(item)" :key="index" class="icon-select-list">
          <el-button>
            <SvgIcon :name="item"></SvgIcon>
          </el-button>
        </div>
      </el-scrollbar>
<!--    </el-popover>-->
  </div>
</template>

<script lang="ts" setup>

import {defineEmits, defineProps, ref} from "vue";
import iconList from "@/components/IconSelect/requireIcons";

const icon = ref<string>('')
let $emit = defineEmits(['getIconName']);

const selectIcon = (item: string) => {
  icon.value = item
  $emit('getIconName', icon.value)
}
</script>

<style scoped lang="scss">
.icon-select-body {
  width: 100%;
}

.icon-select-list {
  height: 30px;
  line-height: 30px;
  margin-bottom: -5px;
  cursor: pointer;
  float: left;
  margin-top: 6px;
}
</style>