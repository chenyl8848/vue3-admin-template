// 统一管理项目用户相关的接口哦
import request from '@/utils/request'
import { loginRequest, loginResponse, userInfoResponse } from './type'

enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}

// 登录接口
export const login = (data: loginRequest) =>
  request.post<any, loginResponse>(API.LOGIN_URL, data)

// 获取用户信息接口
export const getUserInfo = () =>
  request.get<any, userInfoResponse>(API.USERINFO_URL)
