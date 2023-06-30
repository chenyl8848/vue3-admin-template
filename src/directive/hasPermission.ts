// 全局自定义指令：按钮权限指令
import store from '@/store'
import useUserStore from '@/store/module/user'
const userStore = useUserStore(store)

export const hasPermission = (app: any) => {
  app.directive('hasPermission', {
    // 代表使用这个全局自定义指令的 DOM|组件 挂载完毕的时候会执行一次
    mounted(el: any, options: any) {
      // 自定义指令右侧的数值: 如果在用户信息 btnPermissions 数组当中没有就从 DOM 树上移除
      if (!userStore.btnPermissions.includes(options.value)) {
        el.parent.removeChild(el)
      }
    },
  })
}
