<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form :model="queryForm" label-width="120px">
            <el-form-item label="角色名称：">
              <el-input
                v-model="queryForm.roleName"
                clearable
                @keyup.enter="search"
              />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form :model="queryForm" label-width="120px">
            <el-form-item label="角色编码：">
              <el-input
                v-model="queryForm.roleCode"
                clearable
                @keyup.enter="search"
              />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="9"></el-col>
        <el-col :span="3">
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="btnReset">重置</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-button type="primary" @click="btnAddRole">新增</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table :data="tableData" style="width: 100%" border stripe>
          <el-table-column fixed prop="roleName" label="角色名称" />
          <el-table-column prop="roleCode" label="角色编码" />
          <el-table-column prop="remark" label="备注" />
          <el-table-column prop="createTime" label="创建日期" sortable />
          <el-table-column prop="updateTime" label="更新日期" sortable />
          <el-table-column fixed="right" label="操作" width="120">
            <template #="{ row, $index }">
              <el-button
                link
                type="primary"
                size="small"
                @click="btnUpdateRole(row)"
              >
                编辑
              </el-button>
              <el-button
                link
                type="danger"
                size="small"
                @click="btnDeleteRole(row)"
              >
                删除
              </el-button>
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

      <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%">
        <el-form
          ref="ruleFormRef"
          :model="form"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="角色名称：" prop="roleName">
            <el-input
              v-model="form.roleName"
              placeholder="请输入角色名称"
              clearable
            />
          </el-form-item>
          <el-form-item label="角色编码" prop="roleCode">
            <el-input
              v-model="form.roleCode"
              placeholder="请输入角色编码"
              clearable
            />
          </el-form-item>
          <el-form-item label="备注：" prop="remark">
            <el-input
              v-model="form.remark"
              placeholder="请输入备注"
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
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import {
  addRole,
  deleteRole,
  getRoleById,
  getRoleList,
  updateRole,
} from '@/api/auth/role'
import {
  AddOrUpdateRoleRequest,
  GetRoleListRequest,
  GetRoleListResponse,
  SysRoleQueryRequest,
  SysRoleResponse,
} from '@/api/auth/role/type'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { deleteUser } from '@/api/auth/user'

const queryForm = reactive<SysRoleQueryRequest>({
  roleName: '',
  roleCode: '',
})
const tableData = ref<Array<SysRoleResponse>>()
const tableTotal = ref<number>(0)
const pageNo = ref<number>(1)
const pageSize = ref<number>(10)
const clickRow = reactive<SysRoleResponse>({})

const btnReset = () => {
  queryForm.roleCode = ''
  queryForm.roleName = ''
}

const search = async () => {
  let requestData: GetRoleListRequest = {
    pageNo: pageNo.value,
    pageSize: pageSize.value,
    queryParams: queryForm,
  }
  const result: GetRoleListResponse = await getRoleList(requestData)
  if (result.code === 200) {
    tableData.value = result.data.records
    tableTotal.value = result.data.total
  } else {
    ElMessage.error(result.message)
  }
}

onMounted(() => {
  search()
})

const btnAddRole = () => {
  resetForm()
  dialogVisible.value = true
  dialogTitle.value = '新增角色'
}

const btnUpdateRole = async (row: SysRoleResponse) => {
  const result = await getRoleById(row.id)
  if (result.code === 200) {
    form.roleName = result.data.roleName
    form.roleCode = result.data.roleCode
    form.remark = result.data.remark
    form.id = result.data.id
    dialogVisible.value = true
    dialogTitle.value = '修改角色'
  } else {
    ElMessage.error(result.message)
  }
}

const btnDeleteRole = async (row: SysRoleResponse) => {
  ElMessageBox.confirm(`确认要删除角色【${row.roleName}】吗?`, 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const result = await deleteRole(row.id)
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

const dialogVisible = ref<boolean>(false)
const dialogTitle = ref<string>('')
const ruleFormRef = ref<FormInstance>()
const form = reactive<AddOrUpdateRoleRequest>({
  id: 0,
  roleCode: '',
  roleName: '',
  remark: '',
})
const rules = reactive<FormRules>({
  roleName: { required: true, message: '角色名称不能为空', trigger: 'blur' },
  roleCode: { required: true, message: '角色编码不能为空', trigger: 'blur' },
})
const loading = ref<boolean>(false)

const dialogConfirm = async () => {
  await ruleFormRef.value.validate
  loading.value = true
  const { id } = form
  const requestData: AddOrUpdateRoleRequest = {
    roleCode: form.roleCode,
    roleName: form.roleName,
    remark: form.remark,
  }
  if (id === 0) {
    // 新增
    const result = await addRole(requestData)
    if (result.code === 200) {
      ElMessage.success('新增成功')
      loading.value = false
      dialogVisible.value = false
      resetForm()
      search()
    } else {
      ElMessage.error(result.message)
      loading.value = false
    }
  } else {
    // 修改
    requestData.id = form.id
    const result = await updateRole(requestData)
    if (result.code === 200) {
      ElMessage.success('修改成功')
      loading.value = false
      dialogVisible.value = false
      resetForm()
      search()
    } else {
      ElMessage.error(result.message)
      loading.value = false
    }
  }
}

const resetForm = () => {
  form.id = 0
  form.roleName = ''
  form.roleCode = ''
  form.remark = ''
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
