<template>
  <div>
    <el-card class='mgb-12px'>
      <el-form :model='queryForm' label-width='120px' ref='queryFormRef'>
        <el-row :gutter='20'>
          <el-col :span='10'>
            <el-form-item label='用户名：' prop='username'>
              <el-input
                v-model='queryForm.username'
                clearable
                @keyup.enter.native='onSearch'
              />
            </el-form-item>
          </el-col>
          <el-col :span='10'>
            <el-form-item label='用户昵称：' prop='nickName'>
              <el-input
                v-model='queryForm.nickName'
                clearable
                @keyup.enter='onSearch'
              />
            </el-form-item>
          </el-col>
          <el-col :span='3'>
            <el-button type='primary' :icon='Search' @click='onSearch' :loading='loading'>搜索</el-button>
            <el-button :icon='RefreshLeft' @click='onReset'>重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card>
      <el-row :gutter='20' class='mgb-12px'>
        <el-button type='primary' :icon='Plus' @click='btnAdd'>新增</el-button>
        <el-button type='danger' :icon='DeleteFilled' @click='btnBatchDelete(multipleSelection.map((item) => item.id))'>批量删除</el-button>
      </el-row>
      <el-table
        :data='tableData'
        border
        stripe
        highlight-current-row
        ref='multipleTableRef'
        @selection-change='handleSelectionChange'
        class='mgb-12px'
        v-loading='loading'
      >
        <el-table-column type='selection' width='40' />
        <el-table-column prop='username' label='用户名' width='180' />
        <el-table-column prop='nickName' label='用户昵称' width='180' />
        <el-table-column prop='phone' label='手机号' />
        <el-table-column prop='email' label='邮箱' />
        <el-table-column prop='createTime' label='创建时间' sortable />
        <el-table-column prop='updateTime' label='更新时间' sortable />
        <el-table-column fixed='right' label='操作' width='240'>
          <template #='{ row, $index }'>
            <el-button
              link
              type='primary'
              size='small'
              :icon='Edit'
              @click='btnUpdate(row.id)'
            >
              编辑
            </el-button>
            <el-button
              link
              type='danger'
              size='small'
              :icon='Delete'
              @click='btnDelete(row.id)'
            >
              删除
            </el-button>
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
      <el-pagination
        v-model:current-page='pageNo'
        v-model:page-size='pageSize'
        :page-sizes='[10, 20, 50, 100, 500]'
        :background='true'
        layout='prev, pager, next, jumper,->,sizes,total'
        :total='tableTotal'
        @current-change='onSearch'
        @size-change='onSearch'
        class='float-right mgb-12px'
      />
    </el-card>

    <el-dialog v-model='visible' width='30%'>
      <el-form
        :model='form'
        label-width='120px'
        ref='formRef'
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
          <el-button @click='visible = false'>取消</el-button>
          <el-button type='primary' @click='submit' :loading='formLoading'>
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue'
import { ElMessage, ElTable, FormInstance, FormRules } from 'element-plus'
import userApi from '@/api/system/user'
import { SysUserModel, SysUserQuery } from '@/api/system/user/type'
import { SysRoleModel, SysRoleListResponse, SysRoleQueryRequest } from '@/api/system/role/type'
import roleApi from '@/api/system/role'
import { RESPONSE_SUCCESS_CODE } from '@/type'
import useTable from '@/hooks/useTable'
import useForm from '@/hooks/useForm'
import { Search, Plus, RefreshLeft, DeleteFilled, Edit, Delete } from '@element-plus/icons-vue'

const queryForm = reactive<SysUserQuery>({
  username: '',
  nickName: '',
})
const queryFormRef = ref()
const [loading, tableData, tableTotal, pageNo, pageSize, onSearch, onReset] = useTable(userApi.getPageList, queryForm, queryFormRef)

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<Array<SysUserModel>>([])

const handleSelectionChange = (val: Array<SysUserModel>) => {
  multipleSelection.value = val
}

const formRef = ref<FormInstance>()
const form = reactive<SysUserModel>({
  username: '',
  nickName: '',
  password: '',
  phone: '',
  email: '',
  id: 0,
})
const rules = reactive<FormRules>({
  username: { required: true, message: '请输入用户名', trigger: 'blur' },
})
const [btnAdd, btnUpdate, btnDelete, btnBatchDelete, visible, formLoading, submit] = useForm(userApi, form, formRef, onSearch)

const roleIds = ref<Array<number>>([])
let userId = -1
const options = ref<Array<SysRoleModel>>([])

const btnAssignRole = async (row: SysUserModel) => {
  userId = row.id
  const result: SysRoleListResponse = await userApi.getAssignedUserRole(row.id)
  if (result.code === RESPONSE_SUCCESS_CODE) {
    roleIds.value = result.data.map((item) => item.id)
  }

  let requestData: SysRoleQueryRequest = {
    roleCode: '',
    roleName: '',
  }
  const sysRoleData: SysRoleListResponse = await roleApi.getList(requestData)
  if (sysRoleData.code === RESPONSE_SUCCESS_CODE) {
    options.value = sysRoleData.data
  }
}

const changeSelectRole = async (val: any) => {
  const result = await userApi.assignedUserRole(userId, roleIds.value)
  if (result.code === RESPONSE_SUCCESS_CODE) {
    ElMessage.success('分配角色成功')
  } else {
    ElMessage.error(result.message)
  }
}
</script>

<style lang='scss' scoped>
</style>