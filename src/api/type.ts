// 定义全局接口返回参数
export interface ResponseData {
  code: number
  message: string
  data?: any
}

export interface PageRequestData {
  pageNo: number
  pageSize: number
  queryParams?: any
}

export interface PageResponseData {
  total: number
  size: number
  count: number
  records: Array<any>
}
