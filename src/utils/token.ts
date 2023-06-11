// 处理 token 工具类
import setting from '@/setting'

export const SET_TOKEN = (token: string) => {
  localStorage.setItem(setting.TOKEN_KEY, token)
}

export const GET_TOKEN = (): string => {
  return <string>localStorage.getItem(setting.TOKEN_KEY)
}

export const REMOVE_TOKEN = () => {
  localStorage.removeItem(setting.TOKEN_KEY)
}
