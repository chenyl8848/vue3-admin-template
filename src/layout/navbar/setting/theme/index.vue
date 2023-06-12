<template>
  <div class="theme">
    <el-button icon="Setting" circle @click="changeTheme" />

    <el-drawer
      v-model="drawer"
      title="I am the title"
      :with-header="true"
      append-to-body
      size="18%"
    >
      <template #header>
        <h4>主题设置</h4>
      </template>
      <template #default>
        <div>
          <!-- 表单元素 -->
          <el-form>
            <el-form-item label="主题颜色">
              <el-color-picker
                @change="changeThemeColor"
                v-model="color"
                size="small"
                show-alpha
                :predefine="predefineColors"
              />
            </el-form-item>
            <el-form-item label="暗黑模式">
              <el-switch
                @change="changeDark"
                v-model="dark"
                class="mt-2"
                style="margin-left: 24px"
                inline-prompt
                active-icon="MoonNight"
                inactive-icon="Sunny"
              />
            </el-form-item>
          </el-form>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 抽屉
let drawer = ref(false)
// 颜色选择器
const color = ref('#409EFF')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
// 暗黑模式
let dark = ref(false)

// 修改设置
const changeTheme = () => {
  console.log('changeSetting')
  drawer.value = true
}

// 修改主题颜色
const changeThemeColor = (value: string) => {
  // document.documentElement 是全局变量时
  const el = document.documentElement
  // const el = document.getElementById('xxx')

  // 获取 css 变量
  getComputedStyle(el).getPropertyValue(`--el-color-primary`)

  // 设置 css 变量
  el.style.setProperty('--el-color-primary', value)
}

// 修改主题模式
const changeDark = () => {
  console.log(dark.value, 'ffffffffff')
  // 通过 js 修改根节点的样式对象的属性与属性值
  // 获取HTML根节点
  let html = document.documentElement
  // 判断 HTML 标签是否有类名 dark
  dark.value ? (html.className = 'dark') : (html.className = '')
}
</script>

<style scoped lang="scss">
.theme {
  margin-left: 12px;
}
</style>
