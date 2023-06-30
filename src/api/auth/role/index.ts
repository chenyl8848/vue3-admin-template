// 角色Api接口
import request from '@/utils/request'
import {
  AddOrUpdateRoleRequest,
  SysRoleListResponse,
  SysRolePageRequest,
  SysRolePageResponse,
  SysRoleQueryRequest,
  SysRoleResponse,
} from '@/api/auth/role/type'
import { Response } from '@/api/type'
import { MenuTreeResponse } from '@/api/auth/menu/type'

enum API {
  GET_ROLE_PAGE_LIST_URL = '/sysrole/pageList',
  GET_ROLE_LIST_URL = '/sysrole/list',
  GET_ROLE_URL = '/sysrole/',
  ADD_ROLE_URL = '/sysrole/add',
  UPDATE_ROLE_URL = '/sysrole/update',
  DELETE_ROLE_URL = '/sysrole/delete',
  GET_ASSIGNED_MENU_URL = '/sysrole/getAssignedMenu',
  ASSIGN_ROLE_MENU_URL = '/sysrole/assignRoleMenu',
}

export const getRolePageList = (requestData: SysRolePageRequest) =>
  request.post<any, SysRolePageResponse>(
    `${API.GET_ROLE_PAGE_LIST_URL}/${requestData.pageNo}/${requestData.pageSize}`,
    requestData.queryParams,
  )

export const getRoleList = (requestData: SysRoleQueryRequest) =>
  request.post<any, SysRoleListResponse>(API.GET_ROLE_LIST_URL, requestData)

export const getRoleById = (requestData: number) =>
  request.post<any, SysRoleResponse>(`${API.GET_ROLE_URL}/${requestData}`)

export const addRole = (requestData: AddOrUpdateRoleRequest) =>
  request.post<any, Response<null>>(API.ADD_ROLE_URL, requestData)

export const updateRole = (requestData: AddOrUpdateRoleRequest) =>
  request.post<any, Response<null>>(API.UPDATE_ROLE_URL, requestData)

export const deleteRole = (requestData: number) =>
  request.post<any, Response<null>>(`${API.DELETE_ROLE_URL}/${requestData}`)

export const getAssignedMenu = (requestData: number) =>
  request.post<any, MenuTreeResponse>(
    `${API.GET_ASSIGNED_MENU_URL}/${requestData}`,
  )

export const assignMenu = (roleId: number, menuIds: Array<number>) =>
  request.post<any, Response<null>>(
    `${API.ASSIGN_ROLE_MENU_URL}/${roleId}`,
    menuIds,
  )
