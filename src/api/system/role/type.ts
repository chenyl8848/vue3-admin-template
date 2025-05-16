import { BaseModel, PageDataResponse, PageResponse, Response } from '@/api/type'

export interface SysRoleQueryRequest {
  roleCode: string
  roleName: string
}

export interface SysRoleModel extends BaseModel{
  roleCode: string
  roleName: string
  remark: string
}

export interface SysRolePageResponse extends PageResponse<SysRoleModel> {
  data: PageDataResponse<SysRoleModel>
}

export interface SysRoleResponse extends Response<SysRoleModel> {
  data: SysRoleModel
}

export interface SysRoleListResponse extends Response<Array<SysRoleModel>> {
  data: Array<SysRoleModel>
}
