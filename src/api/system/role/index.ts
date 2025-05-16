// 角色 Api 接口
import request from '@/utils/request'
import {
  SysRoleListResponse,
  SysRoleModel,
  SysRolePageResponse,
  SysRoleQueryRequest,
  SysRoleResponse,
} from '@/api/system/role/type'
import { Response } from '@/api/type'
import { MenuTreeResponse } from '@/api/system/menu/type'

enum API {
  GET_ROLE_PAGE_LIST_URL = '/sysrole/pageList',
  GET_ROLE_LIST_URL = '/sysrole/list',
  GET_ROLE_URL = '/sysrole/',
  ADD_ROLE_URL = '/sysrole/',
  UPDATE_ROLE_URL = '/sysrole/',
  DELETE_ROLE_URL = '/sysrole/',
  GET_ASSIGNED_MENU_URL = '/sysrole/getAssignedMenu',
  ASSIGN_ROLE_MENU_URL = '/sysrole/assignRoleMenu',
}

export default {

  getPageList(pageNo: number, pageSize: number, requestData: SysRoleQueryRequest) {
    return request.post<any, SysRolePageResponse>(
      `${API.GET_ROLE_PAGE_LIST_URL}/${pageNo}/${pageSize}`,
      requestData,
    )
  },

  getList(requestData: SysRoleQueryRequest) {
    return request.post<any, SysRoleListResponse>(API.GET_ROLE_LIST_URL, requestData)
  },

  getById(id: number) {
    return request.get<any, SysRoleResponse>(`${API.GET_ROLE_URL}/${id}`)
  },

  add(requestData: SysRoleModel) {
    return request.post<any, Response<null>>(API.ADD_ROLE_URL, requestData)
  },

  update(id: number, requestData: SysRoleModel) {
    return request.put<any, Response<null>>(`${API.UPDATE_ROLE_URL}/${id}`, requestData)
  },

  delete(id: number) {
    return request.delete<any, Response<null>>(`${API.DELETE_ROLE_URL}/${id}`)
  },

  getAssignedMenu(requestData: number) {
    return request.post<any, MenuTreeResponse>(
      `${API.GET_ASSIGNED_MENU_URL}/${requestData}`,
    )
  },

  assignMenu(roleId: number, menuIds: Array<number>) {
    return request.post<any, Response<null>>(
      `${API.ASSIGN_ROLE_MENU_URL}/${roleId}`,
      menuIds,
    )
  },
}