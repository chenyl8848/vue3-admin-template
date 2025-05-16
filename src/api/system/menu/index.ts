// 菜单接口Api
import request from '@/utils/request'
import { MenuTreeResponse, SysMenuModel } from '@/api/system/menu/type'
import { Response } from '@/api/type'
import { SysUserResponse } from '@/api/system/user/type'

enum API {
  GET_MENU_TREE_URL = '/sysmenu/',
  GET_MENU_URL = '/sysmenu/',
  ADD_MENU_URL = '/sysmenu/',
  UPDATE_MENU_URL = '/sysmenu/',
  DELETE_MENU_URL = '/sysmenu/',
  BATCH_DELETE_MENU_URL = '/sysmenu/batchDelete',
}

export default {
  getMenuTree() {
    return request.get<any, MenuTreeResponse>(API.GET_MENU_TREE_URL)
  },

  getById(id: number) {
    return request.get<any, SysUserResponse>(`${API.GET_MENU_URL}/${id}`)
  },

  add(requestData: SysMenuModel) {
    return request.post<SysMenuModel, Response<null>>(
      API.ADD_MENU_URL,
      requestData,
    )
  },

  update(id: number, requestData: SysMenuModel) {
    return request.put<SysMenuModel, Response<null>>(
      `${API.UPDATE_MENU_URL}/${id}`,
      requestData,
    )
  },

  delete(id: number) {
    return request.delete<number, Response<null>>(`${API.DELETE_MENU_URL}/${id}`)
  },

  batchDelete(ids: Array<Number>) {
    return request.post<number, Response<null>>(`${API.BATCH_DELETE_MENU_URL}`, ids)
  },
}

// export const getMenuTree = () =>
//   request.get<MenuTreeResponse>(API.GET_MENU_TREE_URL)
//
// export const addMenu = (requestData: SysMenuModel) =>
//   request.post<SysMenuModel, Response<null>>(
//     API.ADD_MENU_URL,
//     requestData,
//   )
//
// export const updateMenu = (id: number, requestData: SysMenuModel) =>
//   request.put<SysMenuModel, Response<null>>(
//     `${API.UPDATE_MENU_URL}/${id}`,
//     requestData,
//   )
//
// export const deleteMenu = (id: number) =>
//   request.delete<number, Response<null>>(`${API.DELETE_MENU_URL}/${id}`)
//
// export const batchDeleteMenu = (requestData: Array<number>) =>
//   request.delete<number, Response<null>>(API.BATCH_DELETE_MENU_URL, requestData)
