import { BaseModel, PageDataResponse, PageResponse, Response } from '../../type'
import { SysMenuModel } from '@/api/system/menu/type'
import { SysRoleModel } from '@/api/system/role/type'

interface UserInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: Array<SysRoleModel>
  buttons: Array<string>
  menus: Array<SysMenuModel>
  token: string
}

// 获取用户列表接口请求参数类型
export interface SysUserQuery {
  username: string
  nickName: string
}

export interface SysUserModel extends BaseModel {
  username: string
  nickName: string
  password: string
  phone: string
  email: string
}

// 获取用户信息接口响应参数类型
export interface UserInfoResponse extends Response<UserInfo> {
  data: UserInfo
}

export interface SysUserResponse extends Response<SysUserModel> {
  data: SysUserModel
}

export interface SysUserPageResponse extends PageResponse<SysUserModel> {
  data: PageDataResponse<SysUserModel>
}
