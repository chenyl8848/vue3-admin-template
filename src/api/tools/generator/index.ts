import request from '@/utils/request'
import { TableInfoPageResponse } from '@/api/tools/generator/type'

enum API {
  TABLE_INFO_LIST = '/generator/tableInfoList',
  TABLE_INFO_PAGE_LIST_URL = '/generator/tableInfoPageList',
}

// 数据库表信息分页接口
export const getTableInfoPageList = (pageNo: number, pageSize: number, params: any) => {
  return request.post<any, TableInfoPageResponse>(`${API.TABLE_INFO_PAGE_LIST_URL}/${pageNo}/${pageSize}`, params)
}
