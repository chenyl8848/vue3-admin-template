import { PageDataResponse, PageResponse, Response } from '@/api/type'

export interface TableInfo {
  // 表名
  tableName: string,
  // 表注释
  tableComment: string,
  // 类名
  className: string
}

// 数据库表信息响应实体
export interface TableInfoPageResponse extends PageResponse<TableInfo>{
  data: PageDataResponse<TableInfo>
}