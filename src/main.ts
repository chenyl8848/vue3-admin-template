import { createApp } from 'vue'
import App from './App.vue'

// 引入 element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
// 配置 elemen-plus 国际化
// @ts-ignore 忽略当前文件 ts 类型的检测，否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// svg 插件需要配置代码
import 'virtual:svg-icons-register'
// 引入自定义插件对象
import globalComponent from '@/components/index'
// 引入全局样式
import '@/styles/index.scss'
// 引入路由
import router from '@/router'
// 引入路由全局守卫
import '@/utils/permission'
// 引入 store
import store from '@/store'
// 引入全局指令
import { hasPermission } from '@/directive/hasPermission'
// 引入百度地图
import baiduMap from 'vue3-baidu-map-gl'

// 获取应用实例
const app = createApp(App)

// 安装 element-plus 插件
app.use(ElementPlus, {
  // 配置国际化-中文
  locale: zhCn,
})

// 安装自定义插件
app.use(globalComponent)

// 注册路由
app.use(router)

// 注册 store
app.use(store)

// 全局指令
hasPermission(app)

// 注册百度地图
app.use(baiduMap, {
  ak: 'cwHsf5i2fAQAlijOyELx5COtkFhItaSm',
  plugins: ['TrackAnimation'],
})

// 挂载应用
app.mount('#app')
