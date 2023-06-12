// 引入要项目中所有的全局组件
import SvgIcon from './SvgIcon/index.vue'
// 引入 element-plus 所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 全局组件对象
const allGlobalComponent = {
  SvgIcon,
}

// 对外暴露一个插件
export default {
  // 一定要叫做 install 方法
  install(app: any) {
    // 遍历所有的全局组件并注册成全局组件
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key])
    })

    // 注册 element-plus 所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
