import { ResponseData } from '../type'

// 登录接口请求参数类型
export interface loginRequest {
  username: string
  password: string
}

// 登录接口响应参数类型
export interface loginResponse extends ResponseData {
  data: string
}

interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: []
  buttons: []
  routes: []
  token: string
}

// 获取用户信息接口响应参数类型
export interface userInfoResponse extends ResponseData {
  data: userInfo
}
