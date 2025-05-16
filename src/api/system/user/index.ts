// 统一管理项目用户相关的接口
import request from '@/utils/request'
import { SysUserModel, SysUserPageResponse, SysUserQuery, SysUserResponse, UserInfoResponse } from './type'
import { Response } from '@/api/type'
import { SysRoleListResponse } from '@/api/system/role/type'

enum API {
  GET_USER_INFO_URL = '/sysuser/info',
  GET_USER_PAGE_LIST_URL = '/sysuser/pageList',
  GET_USER_URL = '/sysuser/',
  ADD_USER_URL = '/sysuser/',
  UPDATE_USER_URL = '/sysuser/',
  DELETE_USER_URL = '/sysuser/',
  BATCH_DELETE_USER_URL = '/sysuser/batchDelete',
  GET_ASSIGNED_USER_ROLE_URL = '/sysuser/getAssignedUserRole',
  ASSIGN_USER_ROLE_URL = '/sysuser/assignUserRole',
}

export default {
  // 获取用户信息接口
  getUserInfo() {
    return request.get<any, UserInfoResponse>(API.GET_USER_INFO_URL)
  },

  // 获取用户分页列表接口
  getPageList(pageNo: number, pageSize: number, requestData: SysUserQuery) {
    return request.post<any, SysUserPageResponse>(
      `${API.GET_USER_PAGE_LIST_URL}/${pageNo}/${pageSize}`,
      requestData,
    )
  },

  // 根据id获取用户信息
  getById(id: number) {
    return request.get<any, SysUserResponse>(`${API.GET_USER_URL}/${id}`)
  },

  // 用户新增接口
  add(requestData: SysUserModel) {
    return request.post<any, Response<null>>(API.ADD_USER_URL, requestData)
  },

  // 用户修改接口
  update(id: number, requestData: SysUserModel) {
    return request.put<any, Response<null>>(`${API.UPDATE_USER_URL}/${id}`, requestData)
  },

  // 用户删除接口
  delete(id: number) {
    request.delete<any, Response<null>>(`${API.DELETE_USER_URL}/${id}`)
  },

  // 用户批量删除接口
  batchDelete(ids: Array<number>) {
    return request.post<any, Response<null>>(API.BATCH_DELETE_USER_URL, ids)
  },

  // 获取用户已分配角色
  getAssignedUserRole(requestData: number) {
    return request.post<any, SysRoleListResponse>(
      `${API.GET_ASSIGNED_USER_ROLE_URL}/${requestData}`,
    )
  },

  // 用户分配角色
  assignedUserRole(userId: number, roldIds: Array<number>) {
    return request.post<any, Response<null>>(
      `${API.ASSIGN_USER_ROLE_URL}/${userId}`,
      roldIds,
    )
  },
}

// // 获取用户信息接口
// export const getUserInfo = () =>
//   request.get<any, UserInfoResponse>(API.GET_USER_INFO_URL)
//
// // 获取用户分页列表接口
// export const getUserPageList = (pageNo: number, pageSize: number, requestData: SysUserQuery) =>
//   request.post<any, SysUserPageResponse>(
//     `${API.GET_USER_PAGE_LIST_URL}/${pageNo}/${pageSize}`,
//     requestData,
//   )
//
// // 根据id获取用户信息
// export const getUserById = (id: number) =>
//   request.get<any, SysUserResponse>(`${API.GET_USER_URL}/${id}`)
//
// // 用户新增接口
// export const addUser = (requestData: AddOrUpdateUserRequest) =>
//   request.post<any, Response<null>>(API.ADD_USER_URL, requestData)
//
// // 用户修改接口
// export const updateUser = (id: number, requestData: AddOrUpdateUserRequest) =>
//   request.put<any, Response<null>>(`${API.UPDATE_USER_URL}/${id}`, requestData)
//
// // 用户删除接口
// export const deleteUser = (id: number) =>
//   request.delete<any, Response<null>>(`${API.DELETE_USER_URL}/${id}`)
//
// // 用户批量删除接口
// export const batchDeleteUser = (ids: Array<number>) =>
//   request.post<any, Response<null>>(API.BATCH_DELETE_USER_URL, ids)
//
// // 获取用户已分配角色
// export const getAssignedUserRole = (requestData: number) =>
//   request.post<any, SysRoleListResponse>(
//     `${API.GET_ASSIGNED_USER_ROLE_URL}/${requestData}`,
//   )
//
// // 用户分配角色
// export const assignedUserRole = (userId: number, roldIds: Array<number>) =>
//   request.post<any, Response<null>>(
//     `${API.ASSIGN_USER_ROLE_URL}/${userId}`,
//     roldIds,
//   )
