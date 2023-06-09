// 登录接口请求参数类型
export interface loginRequest {
  username: string
  password: string
}

interface dataType {
  token: string
}

// 登录接口响应参数类型
export interface loginResponse {
  code: number
  data: dataType
}

interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: []
  buttons: []
  routes: []
  token: string
}

// 获取用户信息接口响应参数类型
export interface userInfoResponse {
  code: number
  data: userInfo
}
