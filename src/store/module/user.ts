// 引入 pinia
import { defineStore } from 'pinia'
import { loginRequest, loginResponse, userInfoResponse } from '@/api/user/type'
import { getUserInfo, login } from '@/api/user/index'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { constantRoute } from '@/router/routes'
// 定义 userStore
const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: GET_TOKEN(),
      menuList: constantRoute,
      username: '',
      avater: '',
    }
  },
  actions: {
    // 用户登录
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

    // 获取用户信息
    async getUserInfo() {
      const result: userInfoResponse = await getUserInfo()
      if (result.code === 200) {
        this.username = result.data.username
        this.avater = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    // 用户退出登录
    async userLogout() {
      REMOVE_TOKEN()
      this.username = ''
      this.avatar = ''
    },
  },
  getters: {},
})

// 暴露 userStore
export default useUserStore
