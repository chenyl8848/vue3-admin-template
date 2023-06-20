// 角色Api接口
import request from '@/utils/request'
import {
  AddOrUpdateRoleRequest,
  GetRoleListRequest,
  GetRoleListResponse,
  SysRoleResponse,
  SysRoleResponseData,
} from '@/api/auth/role/type'
import { ResponseData } from '@/api/type'

enum API {
  GET_ROLE_LIST_URL = '/sysrole/list',
  GET_ROLE_URL = '/sysrole/',
  ADD_ROLE_URL = '/sysrole/add',
  UPDATE_ROLE_URL = '/sysrole/update',
  DELETE_ROLE_URL = '/sysrole/delete',
}

export const getRoleList = (requestData: GetRoleListRequest) =>
  request.post<any, GetRoleListResponse>(
    `${API.GET_ROLE_LIST_URL}/${requestData.pageNo}/${requestData.pageSize}`,
    requestData.queryParams,
  )

export const getRoleById = (requestData: number) =>
  request.post<any, SysRoleResponseData>(`${API.GET_ROLE_URL}/${requestData}`)

export const addRole = (requestData: AddOrUpdateRoleRequest) =>
  request.post<any, ResponseData>(API.ADD_ROLE_URL, requestData)

export const updateRole = (requestData: AddOrUpdateRoleRequest) =>
  request.post<any, ResponseData>(API.UPDATE_ROLE_URL, requestData)

export const deleteRole = (requestData: number) =>
  request.post<any, ResponseData>(`${API.DELETE_ROLE_URL}/${requestData}`)
