import { RouteRecordRaw } from 'vue-router'

export interface UserState {
  token: string | null
  menuList: RouteRecordRaw[]
  username: string | null
  avatar: string | null
  btnPermissions?: Array<string>
}

export interface TagsView {
  title: string
  name: string
  path: string
}

export interface TagsViewState {
  visitedViews: Array<TagsView>
}
