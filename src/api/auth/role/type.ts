import {
  PageRequest,
  PageDataResponse,
  Response,
  PageResponse,
} from '@/api/type'

export interface SysRoleQueryRequest {
  roleCode: string
  roleName: string
}

export interface SysRole {
  id: number
  roleCode: string
  roleName: string
  remark: string
}

export interface AddOrUpdateRoleRequest {
  id?: number
  roleCode: string
  roleName: string
  remark: string
}

export interface SysRolePageRequest extends PageRequest<SysRoleQueryRequest> {
  queryParams: SysRoleQueryRequest
}

export interface SysRolePageResponse extends PageResponse<SysRole> {
  data: PageDataResponse<SysRole>
}

export interface SysRoleResponse extends Response<SysRole> {
  data: SysRole
}

// export interface GetRoleListResponse extends Response<SysRolePageResponse> {
//   data: SysRolePageResponse
// }

export interface SysRoleListResponse extends Response<Array<SysRole>> {
  data: Array<SysRole>
}
