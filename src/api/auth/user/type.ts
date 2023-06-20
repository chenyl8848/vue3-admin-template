import { PageRequestData, PageResponseData, ResponseData } from '../../type'
import ex = CSS.ex

// 登录接口请求参数类型
export interface LoginRequest {
  username: string
  password: string
}

// 登录接口响应参数类型
export interface LoginResponse extends ResponseData {
  data: string
}

interface UserInfo {
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
export interface UserInfoResponse extends ResponseData {
  data: UserInfo
}

// 获取用户列表接口请求参数类型
export interface SysUserQuery {
  username: string
  name: string
}

export interface SysUserResponse {
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

export interface GetUserByIdResponse extends ResponseData {
  data: SysUserResponse
}

export interface SysUserPageData extends PageResponseData {
  records: Array<SysUserResponse>
}

export interface GetUserListRequest extends PageRequestData {
  queryParams: SysUserQuery
}

export interface GetUserListResponse extends ResponseData {
  data: SysUserPageData
}

// 新增用户请求实体
export interface AddOrUpdateUserRequest {
  username: string
  name: string
  password: string
  phone: string
  id?: number
}
