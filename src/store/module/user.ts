// 引入 pinia
import { defineStore } from 'pinia'
import { LoginRequest, LoginResponse, UserInfoResponse } from '@/api/user/type'
import { getUserInfo, login } from '@/api/user/index'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token'
import { constantRoute } from '@/router/routes'
import { UserState } from '@/store/module/types/type'
// 定义 userStore
const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuList: constantRoute,
      username: '',
      avatar: '',
    }
  },
  actions: {
    // 用户登录
    async userLogin(data: LoginRequest) {
      // const result: LoginResponse = await login(data)
      const result: LoginResponse = {
        code: 200,
        message: '登录成功',
        data: 'Admin Token',
      }
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
      // const result: UserInfoResponse = await getUserInfo()
      const result: UserInfoResponse = {
        code: 200,
        message: '获取用户信息成功',
        data: {
          userId: 1,
          avatar:
            'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          username: 'admin',
          password: '111111',
          desc: '平台管理员',
          roles: ['平台管理员'],
          buttons: ['cuser.detail'],
          routes: ['home'],
          token: 'Admin Token',
        },
      }
      if (result.code === 200) {
        this.username = result.data.username
        this.avatar = result.data.avatar
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
