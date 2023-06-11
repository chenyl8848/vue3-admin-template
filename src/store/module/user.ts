// 引入 pinia
import { defineStore } from 'pinia'
import { loginRequest, loginResponse } from '@/api/user/type'
import { login } from '@/api/user/index'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
import { constantRoute } from '@/router/routes'
// 定义 userStore
const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: GET_TOKEN,
      menuList: constantRoute,
      username: 'admin',
      avater:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    }
  },
  actions: {
    async userLogin(data: loginRequest) {
      const result: loginResponse = await login(data)
      if (result.code === 200) {
        this.token = result.data
        SET_TOKEN(result.data)

        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})

// 暴露 userStore
export default useUserStore
