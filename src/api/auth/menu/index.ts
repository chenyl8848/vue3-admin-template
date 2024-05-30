// 菜单接口Api

import request from '@/utils/request'
import { AddOrUpdateMenuRequest, MenuTreeResponse } from '@/api/auth/menu/type'
import { Response } from '@/api/type'

enum API {
  GET_MENU_TREE_URL = '/sysmenu/',
  ADD_MENU_URL = '/sysmenu/',
  UPDATE_MENU_URL = '/sysmenu/',
  DELETE_MENU_URL = '/sysmenu/',
  BATCH_DELETE_MENU_URL = '/sysmenu/',
}

export const getMenuTree = () =>
  request.get<MenuTreeResponse>(API.GET_MENU_TREE_URL)

export const addMenu = (requestData: AddOrUpdateMenuRequest) =>
  request.post<AddOrUpdateMenuRequest, Response<null>>(
    API.ADD_MENU_URL,
    requestData,
  )

export const updateMenu = (id: number, requestData: AddOrUpdateMenuRequest) =>
  request.put<AddOrUpdateMenuRequest, Response<null>>(
    `${API.UPDATE_MENU_URL}/${id}`,
    requestData,
  )

export const deleteMenu = (id: number) =>
  request.delete<number, Response<null>>(`${API.DELETE_MENU_URL}/${id}`)

export const batchDeleteMenu = (requestData: Array<number>) =>
  request.delete<number, Response<null>>(API.BATCH_DELETE_MENU_URL, requestData)
