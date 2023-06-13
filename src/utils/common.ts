// 通用工具类
import { RouteRecordRaw } from 'vue-router'

export const getAllMenuRoutes = (
  menuList: [],
  menus: [],
): Array<RouteRecordRaw> => {
  menuList.forEach((item) => {
    if (!item.children) {
      menus.push(item)
    } else {
      getAllMenuRoutes(item.children, menus)
    }
  })
  return menus
}

export const getAllLeaveMenuRoutes = (menuList: []): Array<RouteRecordRaw> => {
  let emptyMenuRoutes: [] = []
  let allMenuRoutes = getAllMenuRoutes(menuList, emptyMenuRoutes)
  return allMenuRoutes.filter(
    (item) => item.meta && item.meta.isHidden === false,
  )
}
