import { PageRequestData, PageResponseData, ResponseData } from '@/api/type'

export interface SysRoleQueryRequest {
  roleCode: string
  roleName: string
}

export interface SysRoleResponseData extends ResponseData {
  data: SysRoleResponse
}

export interface SysRoleResponse {
  id: number
  roleCode: string
  roleName: string
  remark: string
}

export interface SysRolePageData extends PageResponseData {
  records: Array<SysRoleResponse>
}

export interface GetRoleListRequest extends PageRequestData {
  queryParams: SysRoleQueryRequest
}

export interface GetRoleListResponse extends ResponseData {
  data: SysRolePageData
}

export interface AddOrUpdateRoleRequest {
  id?: number
  roleCode: string
  roleName: string
  remark: string
}
