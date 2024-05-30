import { Response } from '@/api/type'

export enum SysMenuEnum {
  NO_HIDDEN = 0,
  HIDDEN = 1,
  NO_EXTERNAL = 0,
  EXTERNAL = 1,
  MENU = 1,
  BUTTON = 2,
  ENABLE = 0,
  DISABLE = 1,
}

export interface SysMenu {
  id?: number
  pid?: number
  menuName: string
  menuCode: string
  menuIcon: string
  component: string
  path: string
  type: number
  status: number
  level: number
  isHidden: number
  sort: number
  isExternal: number
  children?: Array<SysMenu>
  select?: boolean
}

export interface AddOrUpdateMenuRequest {
  pid?: number
  menuName: string
  menuCode: string
  menuIcon: string
  component: string
  path: string
  type: number
  status: number
  isHidden: number
  sort: number
  isExternal: number
}

export interface MenuTreeResponse extends Response<Array<SysMenu>> {
  data: Array<SysMenu>
}
