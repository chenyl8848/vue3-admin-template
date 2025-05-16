import { BaseModel, Response } from '@/api/type'
import { StatusEnum } from '@/type'

export enum SysMenuTypeEnum {
  MENU = 1,
  BUTTON = 2,
}

export enum SysMenuHiddenEnum {
  NO = 0,
  YES = 1,
}

export enum SysMenuExternalEnum {
  NO = 0,
  YES = 1,
}


export interface SysMenuModel extends BaseModel{
  pid: number
  menuName: string
  menuCode: string
  menuIcon: string
  component: string
  path: string
  type: SysMenuTypeEnum
  status: StatusEnum
  level: number
  isHidden: SysMenuHiddenEnum
  sort: number
  isExternal: number
  children?: Array<SysMenuModel>
  select?: boolean
}

export interface MenuTreeResponse extends Response<Array<SysMenuModel>> {
  data: Array<SysMenuModel>
}
