// 定义全局接口返回参数
export interface Response<T> {
  code: number
  message: string
  data?: T
}

export interface PageRequest<T> {
  pageNo: number
  pageSize: number
  queryParams?: T
}

export interface PageDataResponse<T> {
  total: number
  size: number
  count: number
  records: Array<T>
}

export interface PageResponse<T> extends Response<PageDataResponse<T>> {
  data: PageDataResponse<T>
}
