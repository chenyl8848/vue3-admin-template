// 角色Api接口
import request from '@/utils/request'
import {
    AddOrUpdateRoleRequest,
    GetRoleListRequest,
    GetRoleListResponse, SysRoleData, SysRoleQueryRequest,
    SysRoleResponse,
    SysRoleResponseData,
} from '@/api/auth/role/type'
import {ResponseData} from '@/api/type'
import {GetMenuTreeResponse} from "@/api/auth/menu/type";

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

export const getRolePageList = (requestData: GetRoleListRequest) =>
    request.post<any, GetRoleListResponse>(
        `${API.GET_ROLE_PAGE_LIST_URL}/${requestData.pageNo}/${requestData.pageSize}`,
        requestData.queryParams,
    )

export const getRoleList = (requestData: SysRoleQueryRequest) =>
    request.post<any, SysRoleData>(
        API.GET_ROLE_LIST_URL,
        requestData,
    )

export const getRoleById = (requestData: number) =>
    request.post<any, SysRoleResponseData>(`${API.GET_ROLE_URL}/${requestData}`)

export const addRole = (requestData: AddOrUpdateRoleRequest) =>
    request.post<any, ResponseData>(API.ADD_ROLE_URL, requestData)

export const updateRole = (requestData: AddOrUpdateRoleRequest) =>
    request.post<any, ResponseData>(API.UPDATE_ROLE_URL, requestData)

export const deleteRole = (requestData: number) =>
    request.post<any, ResponseData>(`${API.DELETE_ROLE_URL}/${requestData}`)

export const getAssignedMenu = (requestData: number) =>
    request.post<any, GetMenuTreeResponse>(`${API.GET_ASSIGNED_MENU_URL}/${requestData}`)

export const assignMenu = (roleId: number, menuIds: Array<number>) =>
    request.post<any, ResponseData>(`${API.ASSIGN_ROLE_MENU_URL}/${roleId}`, menuIds)
