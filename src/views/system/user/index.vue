<template>
  <div>
    <el-card class='mgb-12px'>
      <el-row :gutter='20'>
        <el-col :span='6'>
          <el-form :model='queryForm' label-width='120px'>
            <el-form-item label='用户名：' prop='username'>
              <el-input
                v-model='queryForm.username'
                clearable
                @keyup.enter='search'
              />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span='6'>
          <el-form :model='queryForm' label-width='120px'>
            <el-form-item label='用户昵称：'>
              <el-input
                v-model='queryForm.name'
                clearable
                @keyup.enter='search'
              />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span='9'></el-col>
        <el-col :span='3'>
          <el-button type='primary' @click='search'>搜索</el-button>
          <el-button @click='resetBtn'>重置</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-row :gutter='20' class='mgb-12px'>
        <el-col :span='1'>
          <el-button @click="addOrUpdateUser('1')">新增</el-button>
        </el-col>
        <el-col :span='1'>
          <el-button type='primary' @click="addOrUpdateUser('2')">
            编辑
          </el-button>
        </el-col>
        <el-col :span='1'>
          <el-button type='danger' @click='btnBatchDeleteUser'>
            批量删除
          </el-button>
        </el-col>
      </el-row>
<!--      <el-row>-->
        <el-table
          :data='tableData'
          border
          stripe
          highlight-current-row
          ref='multipleTableRef'
          @selection-change='handleSelectionChange'
          class='mgb-12px'
        >
          <el-table-column type='selection' width='55' />
          <el-table-column prop='username' label='用户名' width='180' />
          <el-table-column prop='nickName' label='用户昵称' width='180' />
          <el-table-column prop='phone' label='手机号' />
          <el-table-column prop='email' label='邮箱' />
          <el-table-column prop='createTime' label='创建时间' sortable />
          <el-table-column prop='updateTime' label='更新时间' sortable />
          <el-table-column fixed='right' label='操作' width='120'>
            <template #='{ row, $index }'>
              <el-popover placement='left' :width='240' trigger='click'>
                <template #reference>
                  <el-button
                    link
                    size='small'
                    type='primary'
                    @click='btnAssignRole(row)'
                  >
                    分配角色
                  </el-button>
                </template>
                <el-select
                  v-model='roleIds'
                  placeholder='请选择角色'
                  filterable
                  clearable
                  multiple
                  style='width: 100%'
                  placement='bottom'
                  @change='changeSelectRole'
                >
                  <el-option
                    v-for='item in options'
                    :key='item.roleCode'
                    :label='item.roleName'
                    :value='item.id'
                  />
                </el-select>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
<!--      </el-row>-->
      <el-pagination
        v-model:current-page='pageNo'
        v-model:page-size='pageSize'
        :page-sizes='[10, 20, 50, 100, 500]'
        :background='true'
        layout='prev, pager, next, jumper,->,sizes,total'
        :total='tableTotal'
        @current-change='search'
        @size-change='search'
        class='float-right mgb-12px'
      />
    </el-card>

    <el-dialog v-model='dialogVisible' :title='dialogTitle' width='30%'>
      <el-form
        :model='form'
        label-width='120px'
        ref='ruleFormRef'
        :rules='rules'
      >
        <el-form-item label='用户名：' prop='username'>
          <el-input
            v-model='form.username'
            placeholder='请输入用户名'
            clearable
          />
        </el-form-item>
        <el-form-item label='用户昵称：'>
          <el-input
            v-model='form.nickName'
            placeholder='请输入用户昵称'
            clearable
          />
        </el-form-item>
        <el-form-item label='密码：'>
          <el-input
            v-model='form.password'
            type='password'
            placeholder='请输入密码'
            show-password
            clearable
          />
        </el-form-item>
        <el-form-item label='手机号：'>
          <el-input
            v-model='form.phone'
            placeholder='请输入用户手机号'
            clearable
          />
        </el-form-item>
        <el-form-item label='邮箱：'>
          <el-input
            v-model='form.email'
            placeholder='请输入用户邮箱'
            clearable
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class='dialog-footer'>
          <el-button @click='dialogVisible = false'>取消</el-button>
          <el-button type='primary' @click='dialogConfirm' :loading='loading'>
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts' setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox, ElTable, FormInstance, FormRules } from 'element-plus'
import {
  addUser,
  assignedUserRole,
  batchDeleteUser,
  getAssignedUserRole,
  getUserById,
  getUserPageList,
  updateUser,
} from '@/api/auth/user'
import {
  AddOrUpdateUserRequest,
  SysUser,
  SysUserPageRequest,
  SysUserPageResponse,
  SysUserResponse,
} from '@/api/auth/user/type'
import { Response } from '@/api/type'
import { SysRole, SysRoleListResponse, SysRoleQueryRequest } from '@/api/auth/role/type'
import { getRoleList } from '@/api/auth/role'
import { RESPONSE_SUCCESS_CODE } from '@/api'

const queryForm = reactive({
  username: '',
  name: '',
})
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<Array<SysUser>>([])

const tableData = ref<Array<SysUser>>()
const tableTotal = ref<number>(0)
const pageNo = ref<number>(1)
const pageSize = ref<number>(10)

const search = async () => {
  const requestData: SysUserPageRequest = {
    pageNo: pageNo.value,
    pageSize: pageSize.value,
    queryParams: queryForm,
  }
  const result: SysUserPageResponse = await getUserPageList(requestData)
  if (result.code == 200) {
    tableData.value = result.data.records
    tableTotal.value = result.data.total
  } else {
    ElMessage.error('获取用户列表失败')
  }
}

// 重置按钮
const resetBtn = () => {
  queryForm.username = ''
  queryForm.name = ''
  search()
}

onMounted(() => {
  search()
})

const handleSelectionChange = (val: Array<SysUser>) => {
  multipleSelection.value = val
}

const dialogVisible = ref<boolean>(false)
const dialogTitle = ref<string>('')
const form = reactive({
  username: '',
  nickName: '',
  password: '',
  phone: '',
  email: '',
  id: 0,
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  username: { required: true, message: '请输入用户名', trigger: 'blur' },
})
const loading = ref<boolean>(false)

const addOrUpdateUser = async (type: string) => {
  if (type === '1') {
    // 新增
    resetForm()
    dialogTitle.value = '新增用户'
    dialogVisible.value = true
  } else if (type === '2') {
    // 修改
    dialogTitle.value = '修改用户'
    if (!multipleSelection.value || multipleSelection.value?.length !== 1) {
      ElMessage.warning('请选择要修改的一条数据')
      return
    }
    const result: SysUserResponse = await getUserById(
      multipleSelection.value[0].id,
    )
    if (result.code === RESPONSE_SUCCESS_CODE) {
      dialogVisible.value = true
      form.id = result.data.id
      form.username = result.data.username
      form.nickName = result.data.nickName
      form.password = result.data.password
      form.phone = result.data.phone
    } else {
      ElMessage.error(result.message)
    }
  }
}

const dialogConfirm = async () => {
  // 表单校验
  await ruleFormRef.value.validate()
  loading.value = true
  let { id } = form
  let addOrUpdateUserRequest: AddOrUpdateUserRequest = {
    username: form.username,
    nickName: form.nickName,
    password: form.password,
    phone: form.phone,
    email: form.email,
  }
  if (id === 0) {
    // 新增
    let result: Response<null> = await addUser(addOrUpdateUserRequest)
    if (result.code === RESPONSE_SUCCESS_CODE) {
      ElMessage.success('新增用户成功')
      dialogVisible.value = false
      search()
      resetForm()
    } else {
      ElMessage.error(result.message)
    }
  } else {
    // 修改
    let result: Response<null> = await updateUser(id, addOrUpdateUserRequest)
    if (result.code === RESPONSE_SUCCESS_CODE) {
      ElMessage.success('修改用户成功')
      dialogVisible.value = false
      search()
      resetForm()
    } else {
      ElMessage.error(result.message)
    }
  }
  loading.value = false
}

const resetForm = () => {
  form.username = ''
  form.nickName = ''
  form.password = ''
  form.phone = ''
  form.email = ''
  form.id = 0
}

const btnBatchDeleteUser = async () => {
  if (!multipleSelection.value || multipleSelection.value.length === 0) {
    ElMessage.warning('请选择要删除的数据')
    return
  }
  ElMessageBox.confirm('确认要删除数据吗?', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      let ids: number[] = multipleSelection.value?.map(
        (item) => item.id,
      ) as number[]

      console.log(ids, 'idsssssssssss')
      const result = await batchDeleteUser(ids)
      if (result.code === RESPONSE_SUCCESS_CODE) {
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        search()
      } else {
        ElMessage({
          type: 'error',
          message: result.message,
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消成功',
      })
    })
}

const roleIds = ref<Array<number>>([])
let userId = -1
const options = ref<Array<SysRole>>([])

const btnAssignRole = async (row: SysUser) => {
  userId = row.id
  const result: SysRoleListResponse = await getAssignedUserRole(row.id)
  if (result.code === 200) {
    roleIds.value = result.data.map((item) => item.id)
  }

  let requestData: SysRoleQueryRequest = {
    roleCode: '',
    roleName: '',
  }
  const sysRoleData: SysRoleListResponse = await getRoleList(requestData)
  if (sysRoleData.code === 200) {
    options.value = sysRoleData.data
  }
}

const changeSelectRole = async (val: any) => {
  const result = await assignedUserRole(userId, roleIds.value)
  if (result.code === 200) {
    ElMessage.success('分配角色成功')
  } else {
    ElMessage.error(result.message)
  }
}
</script>

<style lang='scss' scoped>
</style>
