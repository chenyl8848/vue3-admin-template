// 统一管理项目用户相关的接口哦
import request from '@/utils/request'
import {
  AddOrUpdateUserRequest,
  GetUserByIdResponse,
  GetUserListRequest,
  GetUserListResponse,
  LoginRequest,
  LoginResponse,
  UserInfoResponse,
} from './type'
import { ResponseData } from '@/api/type'

enum API {
  LOGIN_URL = '/user/login',
  GET_USER_INFO_URL = '/user/info',
  GET_USER_LIST_URL = '/sysuser/list',
  GET_USER_URL = '/sysuser/',
  ADD_USER_URL = '/sysuser/add',
  UPDATE_USER_URL = '/sysuser/update',
  DELETE_USER_URL = '/sysuser/delete',
  BATCH_DELETE_USER_URL = '/sysuser/batchDelete',
}

// 登录接口
export const login = (data: LoginRequest) =>
  request.post<any, LoginResponse>(API.LOGIN_URL, data)

// 获取用户信息接口
export const getUserInfo = () =>
  request.get<any, UserInfoResponse>(API.GET_USER_INFO_URL)

// 获取用户列表接口
export const getUserList = (requestData: GetUserListRequest) =>
  request.post<any, GetUserListResponse>(
    `${API.GET_USER_LIST_URL}/${requestData.pageNo}/${requestData.pageSize}`,
    requestData.queryParams,
  )

// 根据id获取用户信息
export const getUserById = (id: number) =>
  request.post<any, GetUserByIdResponse>(`${API.GET_USER_URL}/${id}`)

// 用户新增接口
export const addUser = (requestData: AddOrUpdateUserRequest) =>
  request.post<any, ResponseData>(API.ADD_USER_URL, requestData)

// 用户修改接口
export const updateUser = (requestData: AddOrUpdateUserRequest) =>
  request.post<any, ResponseData>(API.UPDATE_USER_URL, requestData)

// 用户删除接口
export const deleteUser = (requestData: number) =>
  request.post<any, ResponseData>(API.DELETE_USER_URL, requestData)

// 用户批量删除接口
export const batchDeleteUser = (requestData: Array<number>) =>
  request.post<any, ResponseData>(API.BATCH_DELETE_USER_URL, requestData)
