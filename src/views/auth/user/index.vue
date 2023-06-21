<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form :model="queryForm" label-width="120px">
            <el-form-item label="用户名：" prop="username">
              <el-input
                v-model="queryForm.username"
                clearable
                @keyup.enter="search"
              />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form :model="queryForm" label-width="120px">
            <el-form-item label="用户昵称：">
              <el-input
                v-model="queryForm.name"
                clearable
                @keyup.enter="search"
              />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="9"></el-col>
        <el-col :span="3">
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="resetBtn">重置</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="1">
          <el-button @click="addOrUpdateUser('1')">新增</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" @click="addOrUpdateUser('2')">
            编辑
          </el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="danger" @click="btnBatchDeleteUser">
            批量删除
          </el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          stripe
          highlight-current-row
          ref="multipleTableRef"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="username" label="用户名" width="180" />
          <el-table-column prop="name" label="用户昵称" width="180" />
          <el-table-column prop="phone" label="手机号" />
          <el-table-column prop="createTime" label="创建时间" sortable />
          <el-table-column prop="updateTime" label="更新时间" sortable />
          <el-table-column fixed="right" label="操作" width="120">
            <template #="{ row, $index }">
              <el-popover placement="left" :width="240" trigger="click">
                <template #reference>
                  <el-button
                      link
                      size="small"
                      type="primary"
                      @click="btnAssignRole(row)"
                  >
                    分配角色
                  </el-button>
                </template>
                <el-select v-model="roleIds" placeholder="请选择角色" filterable clearable multiple style="width: 100%;" placement="bottom" @change="changeSelectRole">
                  <el-option
                      v-for="item in options"
                      :key="item.roleCode"
                      :label="item.roleName"
                      :value="item.id"
                  />
                </el-select>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100, 500]"
          :background="true"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="tableTotal"
          @current-change="search"
          @size-change="search"
        />
      </el-row>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%">
      <el-form
        :model="form"
        label-width="120px"
        ref="ruleFormRef"
        :rules="rules"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            clearable
          />
        </el-form-item>
        <el-form-item label="用户昵称：">
          <el-input
            v-model="form.name"
            placeholder="请输入用户昵称"
            clearable
          />
        </el-form-item>
        <el-form-item label="密码：">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
            clearable
          />
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input
            v-model="form.phone"
            placeholder="请输入用户手机号"
            clearable
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogConfirm" :loading="loading">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import {
  ElMessage,
  ElMessageBox,
  ElTable,
  FormInstance,
  FormRules,
} from 'element-plus'
import {
  addUser, assignedUserRole,
  batchDeleteUser,
  deleteUser, getAssignedUserRole,
  getUserById,
  getUserPageList,
  updateUser,
} from '@/api/auth/user'
import {
  AddOrUpdateUserRequest,
  DeleteUserRequest,
  GetUserByIdResponse,
  GetUserListRequest,
  GetUserListResponse,
  SysUserResponse,
} from '@/api/auth/user/type'
import { ResponseData } from '@/api/type'
import {SysRoleData, SysRoleQueryRequest, SysRoleResponse} from "@/api/auth/role/type";
import {getRoleList} from "@/api/auth/role";

const queryForm = reactive({
  username: '',
  name: '',
})
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<Array<SysUserResponse>>([])

const tableData = ref<Array<SysUserResponse>>()
const tableTotal = ref<number>(0)
const pageNo = ref<number>(1)
const pageSize = ref<number>(10)

const search = async () => {
  const requestData: GetUserListRequest = {
    pageNo: pageNo.value,
    pageSize: pageSize.value,
    queryParams: queryForm,
  }
  const result: GetUserListResponse = await getUserPageList(requestData)
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
}

onMounted(() => {
  search()
})

const handleSelectionChange = (val: Array<SysUserResponse>) => {
  multipleSelection.value = val
}

const dialogVisible = ref<boolean>(false)
const dialogTitle = ref<string>('')
const form = reactive({
  username: '',
  name: '',
  password: '',
  phone: '',
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
  } else if (type === '2') {
    // 修改
    dialogTitle.value = '修改用户'
    if (!multipleSelection.value || multipleSelection.value?.length !== 1) {
      ElMessage.warning('请选择要修改的一条数据')
      return
    }
    const result: GetUserByIdResponse = await getUserById(
      multipleSelection.value[0].id,
    )
    form.id = result.data.id
    form.username = result.data.username
    form.name = result.data.name
    form.password = result.data.password
    form.phone = result.data.phone
  }
  dialogVisible.value = true
}

const dialogConfirm = async () => {
  // 表单校验
  await ruleFormRef.value.validate()
  loading.value = true
  let { id } = form
  let addOrUpdateUserRequest: AddOrUpdateUserRequest = {
    username: form.username,
    name: form.name,
    password: form.password,
    phone: form.phone,
  }
  if (id === 0) {
    // 新增
    let reuslt: ResponseData = await addUser(addOrUpdateUserRequest)
    if (reuslt.code === 200) {
      ElMessage.success('新增用户成功')
      dialogVisible.value = false
      search()
      resetForm()
    } else {
      ElMessage.error(reuslt.message)
    }
  } else {
    // 修改
    addOrUpdateUserRequest.id = form.id
    let result: ResponseData = await updateUser(addOrUpdateUserRequest)
    if (result.code === 200) {
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
  form.name = ''
  form.password = ''
  form.phone = ''
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
      const result = await batchDeleteUser(ids)
      if (result.code === 200) {
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
const options = ref<Array<SysRoleResponse>>([])

const btnAssignRole = async (row: SysUserResponse) => {
  userId = row.id
  const result:SysRoleData = await getAssignedUserRole(row.id);
  if (result.code === 200) {
    roleIds.value = result.data.map(item => item.id)
  }

  let requestData:SysRoleQueryRequest = {
    roleCode: '',
    roleName: ''
  }
  const sysRoleData:SysRoleData = await getRoleList(requestData);
  if (sysRoleData.code === 200) {
    options.value = sysRoleData.data
  }
}

const changeSelectRole = async (val:any) => {
  const result = await assignedUserRole(userId, roleIds.value);
  if (result.code === 200) {
    ElMessage.success("分配角色成功")
  } else {
    ElMessage.error(result.message)
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 12px;
}

.el-row {
  margin-bottom: 12px;
}
</style>
