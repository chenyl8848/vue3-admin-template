import { Response } from '../../type'

// 登录接口请求参数类型
export interface LoginRequest {
  username: string
  password: string
}

// 登录接口响应参数类型
export interface LoginResponse extends Response<string> {
  data: string
}
