import {
  PageDataResponse,
  PageRequest,
  PageResponse,
  Response,
} from '../../type'
import { SysMenu } from '@/api/auth/menu/type'
import { SysRole } from '@/api/auth/role/type'

// 登录接口请求参数类型
export interface LoginRequest {
  username: string
  password: string
}

// 登录接口响应参数类型
export interface LoginResponse extends Response<string> {
  data: string
}

interface UserInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: Array<SysRole>
  buttons: Array<string>
  menus: Array<SysMenu>
  token: string
}

// 获取用户列表接口请求参数类型
export interface SysUserQuery {
  username: string
  name: string
}

export interface SysUser {
  id: number
  createTime: string
  updateTime: string
  version: number
  username: string
  password: string
  name: string
  phone: string
  wareId: number
  roleName: string
}

// 新增用户请求实体
export interface AddOrUpdateUserRequest {
  username: string
  name: string
  password: string
  phone: string
  id?: number
}

// 获取用户信息接口响应参数类型
export interface UserInfoResponse extends Response<UserInfo> {
  data: UserInfo
}

export interface SysUserResponse extends Response<SysUser> {
  data: SysUser
}

export interface SysUserPageRequest extends PageRequest<SysUserQuery> {
  queryParams: SysUserQuery
}

export interface SysUserPageResponse extends PageResponse<SysUser> {
  data: PageDataResponse<SysUser>
}

// export interface SysUserPageResponse extends Response<SysUserPageResponse> {
//   data: SysUserPageResponse
// }
