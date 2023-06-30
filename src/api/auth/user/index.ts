// 统一管理项目用户相关的接口哦
import request from '@/utils/request'
import {
  AddOrUpdateUserRequest,
  SysUserResponse,
  SysUserPageRequest,
  SysUserPageResponse,
  LoginRequest,
  LoginResponse,
  UserInfoResponse,
} from './type'
import { Response } from '@/api/type'
import { SysRoleListResponse } from '@/api/auth/role/type'

enum API {
  // LOGIN_URL = '/user/login',
  // GET_USER_INFO_URL = '/user/info',
  LOGIN_URL = '/sysuser/login',
  GET_USER_INFO_URL = '/sysuser/info',
  GET_USER_PAGE_LIST_URL = '/sysuser/pageList',
  GET_USER_URL = '/sysuser/',
  ADD_USER_URL = '/sysuser/add',
  UPDATE_USER_URL = '/sysuser/update',
  DELETE_USER_URL = '/sysuser/delete',
  BATCH_DELETE_USER_URL = '/sysuser/batchDelete',
  GET_ASSIGNED_USER_ROLE_URL = '/sysuser/getAssignedUserRole',
  ASSIGN_USER_ROLE_URL = '/sysuser/assignUserRole',
}

// 登录接口
export const login = (data: LoginRequest) =>
  request.post<any, LoginResponse>(API.LOGIN_URL, data)

// 获取用户信息接口
export const getUserInfo = () =>
  request.get<any, UserInfoResponse>(API.GET_USER_INFO_URL)

// 获取用户分页列表接口
export const getUserPageList = (requestData: SysUserPageRequest) =>
  request.post<any, SysUserPageResponse>(
    `${API.GET_USER_PAGE_LIST_URL}/${requestData.pageNo}/${requestData.pageSize}`,
    requestData.queryParams,
  )

// 根据id获取用户信息
export const getUserById = (id: number) =>
  request.post<any, SysUserResponse>(`${API.GET_USER_URL}/${id}`)

// 用户新增接口
export const addUser = (requestData: AddOrUpdateUserRequest) =>
  request.post<any, Response<null>>(API.ADD_USER_URL, requestData)

// 用户修改接口
export const updateUser = (requestData: AddOrUpdateUserRequest) =>
  request.post<any, Response<null>>(API.UPDATE_USER_URL, requestData)

// 用户删除接口
export const deleteUser = (requestData: number) =>
  request.post<any, Response<null>>(API.DELETE_USER_URL, requestData)

// 用户批量删除接口
export const batchDeleteUser = (requestData: Array<number>) =>
  request.post<any, Response<null>>(API.BATCH_DELETE_USER_URL, requestData)

// 获取用户已分配角色
export const getAssignedUserRole = (requestData: number) =>
  request.post<any, SysRoleListResponse>(
    `${API.GET_ASSIGNED_USER_ROLE_URL}/${requestData}`,
  )

// 用户分配角色
export const assignedUserRole = (userId: number, roldIds: Array<number>) =>
  request.post<any, Response<null>>(
    `${API.ASSIGN_USER_ROLE_URL}/${userId}`,
    roldIds,
  )
