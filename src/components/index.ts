// 引入要项目中所有的全局组件
import SvgIcon from './SvgIcon/index.vue'

// 全局组件对象
const allGlobalComponent = {
  SvgIcon,
}

// 对外暴露一个插件
export default {
  // 一定要叫做 install 方法
  install(app) {
    // 遍历所有的全局组件并注册成全局组件
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key])
    })
  },
}
