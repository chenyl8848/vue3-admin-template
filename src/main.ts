import { createApp } from 'vue'
import App from './App.vue'

// 引入 element-plus 插件于样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 配置 elemen-plus 国际化
// @ts-ignore 忽略当前文件 ts 类型的检测，否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 获取应用实例
const app = createApp(App)

// 安装 element-plus 插件
app.use(ElementPlus, {
  // 配置国际化-中文
  locale: zhCn,
})

// 挂载应用
app.mount('#app')
