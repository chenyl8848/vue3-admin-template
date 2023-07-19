import { RouteRecordRaw } from 'vue-router'

export interface UserState {
  token: string | ''
  username: string | null
  avatar: string | ''
  menus: RouteRecordRaw[] | []
  btnPermissions?: Array<string>
}

export interface TagsView {
  title: string
  name: string
  path: string
  close: boolean
}
