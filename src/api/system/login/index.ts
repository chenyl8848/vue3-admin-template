// 统一管理项目用户相关的接口哦
import request from '@/utils/request'
import {
  LoginRequest,
  LoginResponse,
} from './type'

enum API {
  LOGIN_URL = '/login/',
}

// 登录接口
export const login = (data: LoginRequest) => request.post<any, LoginResponse>(API.LOGIN_URL, data)
