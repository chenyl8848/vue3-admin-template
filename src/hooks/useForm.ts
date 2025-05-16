import { nextTick, reactive, ref, toRaw } from 'vue'
import { Response } from '@/api/type'
import { RESPONSE_SUCCESS_CODE } from '@/type'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'

const useForm = (
  // getApi: (...params: any[]) => Promise<any>,
  // addApi: (...params: any[]) => Promise<any>,
  // updateApi: (...params: any[]) => Promise<any>,
  // deleteApi: (...params: any[]) => Promise<any>,
  api: any,
  form: reactive<any>,
  formRef: ref<FormInstance>,
  callback: () => {}) => {

  const dialogVisible = ref(false)
  const loading = ref(false)

  const btnAdd = () => {
    // 使用 nextTick 避免弹窗还没渲染无法获取到表单的 Ref
    nextTick(() => {
      dialogVisible.value = true
      if (formRef.value) {
        formRef.value.resetFields()
      }
    })
  }

  const btnUpdate = (id: number) => {
    console.log(id, 'iddddddd')
    // getApi(id).then((res: Response<any>) => {
    api.getById(id).then((res: Response<any>) => {
      if (res.code === RESPONSE_SUCCESS_CODE) {
        dialogVisible.value = true
        Object.assign(form, res.data)
      } else {
        ElMessage.error(res.message)
      }
    })
  }

  const btnDelete = (id: number) => {
    ElMessageBox.confirm(`确认要删除吗?`, 'Warning', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        // deleteApi(id).then((result) => {
        api.delete(id).then((result) => {
          if (result.code === RESPONSE_SUCCESS_CODE) {
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
            callback()
          } else {
            ElMessage({
              type: 'error',
              message: result.message,
            })
          }
        }).catch((error) => {
          console.log(error.message)
          ElMessage.error(error.message)
        })
      })
      .catch(() => {
        ElMessage.info('取消成功')
      })
  }

  const btnBatchDelete = (ids: Array<number>) => {
    console.log(ids, 'idsssssssssss')
    if (!ids || ids.length === 0) {
      ElMessage.warning('请选择要删除的数据')
      return
    }
    ElMessageBox.confirm('确认要删除数据吗?', 'Warning', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        // let ids: number[] = multipleSelection.value?.map((item) => item.id) as number[]

        api.batchDelete(ids).then((res) => {
          if (res.code === RESPONSE_SUCCESS_CODE) {
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
            callback()
          } else {
            ElMessage({
              type: 'error',
              message: res.message,
            })
          }
        }).catch((error) => {
          console.log(error.message)
          ElMessage.error(error.message)
        })
      })
      .catch(() => {
        ElMessage.info('取消成功')
      })
  }

  const submit = () => {
    const formValue = toRaw(form)
    console.log(form, formValue, formRef, formRef.value)

    formRef.value.validate().then((valid) => {
      if (valid) {
        loading.value = true
        if (!formValue.id) {
          // 新增
          // addApi(formValue).then((res: Response<any>) => {
          api.add(formValue).then((res: Response<any>) => {
            loading.value = false
            if (res.code === RESPONSE_SUCCESS_CODE) {
              loading.value = false
              dialogVisible.value = false
              formRef.value.resetFields()
              callback()
            } else {
              ElMessage.error(res.message)
            }
          }).catch((error) => {
            loading.value = false
            console.log(error.message)
            ElMessage.error(error.message)
          })
        } else {
          // 修改
          // updateApi(formValue.id, formValue).then((res: Response<any>) => {
          api.update(formValue.id, formValue).then((res: Response<any>) => {
            loading.value = false
            if (res.code === RESPONSE_SUCCESS_CODE) {
              loading.value = false
              dialogVisible.value = false
              formRef.value.resetFields()
              callback()
            } else {
              ElMessage.error(res.message)
            }
          }).catch((error) => {
            loading.value = false
            console.log(error.message)
            ElMessage.error(error.message)
          })
        }
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  return [btnAdd, btnUpdate, btnDelete, btnBatchDelete, dialogVisible, loading, submit]
}

export default useForm