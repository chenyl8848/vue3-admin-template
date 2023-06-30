// 菜单接口Api

import request from '@/utils/request'
import { AddOrUpdateMenuRequest, MenuTreeResponse } from '@/api/auth/menu/type'
import { Response } from '@/api/type'

enum API {
  GET_MENU_TREE_URL = '/sysmenu/menuTree',
  ADD_MENU_URL = '/sysmenu/add',
  UPDATE_MENU_URL = '/sysmenu/update',
  DELETE_MENU_URL = '/sysmenu/delete',
  BATCH_DELETE_MENU_URL = '/sysmenu/batchDelete',
}

export const getMenuTree = () =>
  request.post<MenuTreeResponse>(API.GET_MENU_TREE_URL)

export const addMenu = (requestData: AddOrUpdateMenuRequest) =>
  request.post<AddOrUpdateMenuRequest, Response<null>>(
    API.ADD_MENU_URL,
    requestData,
  )

export const updateMenu = (requestData: AddOrUpdateMenuRequest) =>
  request.post<AddOrUpdateMenuRequest, Response<null>>(
    API.UPDATE_MENU_URL,
    requestData,
  )

export const deleteMenu = (requestData: number) =>
  request.post<number, Response<null>>(`${API.DELETE_MENU_URL}/${requestData}`)

export const batchDeleteMenu = (requestData: Array<number>) =>
  request.post<number, Response<null>>(API.BATCH_DELETE_MENU_URL, requestData)
