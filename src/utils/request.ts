// 对 axios 进行二次封装，使用 请求/响应拦截器
// 引入 axios
import axios, { AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'

// 1、创建 axios 实例
let request: AxiosInstance = axios.create({
  // 基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 请求超时时间设置 5秒
  timeout: 5000,
})

// 2、设置请求拦截器
request.interceptors.request.use((config) => {
  // 给 config 配置请求头

  // 返回配置对象
  return config
})

// 3、设置响应拦截器
request.interceptors.response.use(
  (response) => {
    // 成功回调
    // 简化响应对象
    return response.data
  },
  (error) => {
    // 失败回调
    // 响应信息
    let message = ''
    // 响应状态码
    let status = error.response.status

    switch (status) {
      case 401:
        message = 'token 过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器异常'
        break
      default:
        message = '未知错误'
        break
    }

    ElMessage.error(message)
    return Promise.reject(error)
  },
)

export default request
