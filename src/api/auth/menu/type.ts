import { ResponseData } from '@/api/type'

export interface SysMenuResponse {
  id?: number
  pid?: number
  menuName: string
  menuCode: string
  menuIcon: string
  path: string
  type: number
  status: number
  level: number
  isHidden: number
  sort: number
  isExternal: number
  children?: Array<SysMenuResponse>
  select?: boolean
}

export interface GetMenuTreeResponse extends ResponseData {
  data: Array<SysMenuResponse>
}

export interface AddOrUpdateMenuRequest {
  id?: number
  pid?: number
  menuName: string
  menuCode: string
  menuIcon: string
  path: string
  type: number
  status: number
  isHidden: number
  sort: number
  isExternal: number
}
