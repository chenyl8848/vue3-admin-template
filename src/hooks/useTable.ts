import { ref, reactive, toRaw } from 'vue'
import { RESPONSE_SUCCESS_CODE } from '@/type'
import { PageResponse } from '@/api/type'
import { ElMessage } from 'element-plus'

const useTable = (api: (...params: any[]) => Promise<any>, params: reactive<any>, formRef: any) => {

  const loading = ref(false)
  const tableData = ref([])
  const tableTotal = ref(0)
  const pageNo = ref(1)
  const pageSize = ref(10)

  const search = () => {
    loading.value = true
    api(pageNo.value, pageSize.value, toRaw(params)).then((res: PageResponse<any>) => {
      loading.value = false
      if (res.code === RESPONSE_SUCCESS_CODE) {
        tableData.value = res.data.records
        tableTotal.value = res.data.total
      } else {
        ElMessage.error(res.message)
      }
    }).catch((error) => {
      loading.value = false
      console.log(error.message)
      ElMessage.error(error.message)
    })
  }
  search()

  const reset = () => {
    formRef.value.resetFields()
    search()
  }

  return [loading, tableData, tableTotal, pageNo, pageSize, search, reset]
}

export default useTable