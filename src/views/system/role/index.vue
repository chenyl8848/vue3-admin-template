<template>
  <div>
    <el-card class='mgb-12px'>
      <el-form :model='queryForm' label-width='120px' ref='queryFormRef'>
        <el-row :gutter='20'>
          <el-col :span='10'>
            <el-form-item label='角色名称：' prop='roleName'>
              <el-input
                v-model='queryForm.roleName'
                clearable
                @keyup.enter='onSearch'
              />
            </el-form-item>
          </el-col>
          <el-col :span='10'>
            <el-form-item label='角色编码：' prop='roleCode'>
              <el-input
                v-model='queryForm.roleCode'
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
        <el-button type='danger' :icon='DeleteFilled' @click='btnBatchDelete(multipleSelection.map((item) => item.id))'>
          批量删除
        </el-button>
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
        <el-table-column fixed prop='roleName' label='角色名称' />
        <el-table-column prop='roleCode' label='角色编码' />
        <el-table-column prop='remark' label='备注' />
        <el-table-column prop='createTime' label='创建日期' sortable />
        <el-table-column prop='updateTime' label='更新日期' sortable />
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
            <el-button
              link
              size='small'
              type='primary'
              @click='btnAssignMenu(row)'
            >
              分配菜单权限
            </el-button>
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
        ref='formRef'
        :rules='rules'
        label-width='120px'
      >
        <el-form-item label='角色名称：' prop='roleName'>
          <el-input
            v-model='form.roleName'
            placeholder='请输入角色名称'
            clearable
          />
        </el-form-item>
        <el-form-item label='角色编码' prop='roleCode'>
          <el-input
            v-model='form.roleCode'
            placeholder='请输入角色编码'
            clearable
          />
        </el-form-item>
        <el-form-item label='备注：' prop='remark'>
          <el-input
            v-model='form.remark'
            placeholder='请输入备注'
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

    <el-drawer v-model='drawer' title='分配菜单权限' direction='rtl'>
      <el-input
        v-model='filterText'
        placeholder='请输入菜单名称'
        style='margin-bottom: 12px'
        clearable
      />
      <el-tree
        :data='menuTreeData'
        :props='defaultProps'
        ref='treeRef'
        class='filter-tree'
        :filter-node-method='filterNode'
        :expand-on-click-node='false'
        :default-checked-keys='defaultCheckedKeys'
        @check-change='checkNodeChange'
        node-key='id'
        show-checkbox
        default-expand-all
        check-strictly
      />
      <template #footer>
        <el-button @click='drawer = false'>取消</el-button>
        <el-button type='primary' @click='drawerConfirm' :loading='loading'>
          确定
        </el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script lang='ts' setup>
import { reactive, ref, watch } from 'vue'
import roleApi from '@/api/system/role'
import { SysRoleModel, SysRoleQueryRequest } from '@/api/system/role/type'
import { ElMessage, ElTable, ElTree, FormInstance, FormRules } from 'element-plus'
import { MenuTreeResponse, SysMenuModel } from '@/api/system/menu/type'
import menuApi from '@/api/system/menu'
import useTable from '@/hooks/useTable'
import useForm from '@/hooks/useForm'
import { Search, Plus, RefreshLeft, DeleteFilled, Edit, Delete } from '@element-plus/icons-vue'
import { SysUserModel } from '@/api/system/user/type'
import { RESPONSE_SUCCESS_CODE } from '@/type'

const queryForm = reactive<SysRoleQueryRequest>({
  roleName: '',
  roleCode: '',
})
const queryFormRef = ref()
const [loading, tableData, tableTotal, pageNo, pageSize, onSearch, onReset] = useTable(roleApi.getPageList, queryForm, queryFormRef)

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<Array<SysUserModel>>([])
const handleSelectionChange = (val: Array<SysUserModel>) => {
  multipleSelection.value = val
}

const formRef = ref<FormInstance>()
const form = reactive<SysRoleModel>({
  id: 0,
  roleCode: '',
  roleName: '',
  remark: '',
})
const rules = reactive<FormRules>({
  roleName: { required: true, message: '角色名称不能为空', trigger: 'change' },
  roleCode: { required: true, message: '角色编码不能为空', trigger: 'change' },
})
const [btnAdd, btnUpdate, btnDelete, btnBatchDelete, visible, formLoading, submit] = useForm(roleApi, form, formRef, onSearch)

const drawer = ref<boolean>(false)
let roleId = -1
const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()
const menuTreeData = ref<Array<SysMenuModel>>([])
const defaultProps = {
  children: 'children',
  label: 'menuName',
  value: 'id',
}
const defaultCheckedKeys = ref<Array<number>>([])
let checkedNodeKeyData = defaultCheckedKeys.value

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

const filterNode = (value: string, data: SysMenuModel) => {
  if (!value) return true
  return data.menuName.includes(value)
}

const btnAssignMenu = async (row: SysRoleModel) => {
  drawer.value = true
  roleId = row.id
  const result: MenuTreeResponse = await menuApi.getMenuTree()
  if (result.code === RESPONSE_SUCCESS_CODE) {
    menuTreeData.value = result.data
    const resultData: MenuTreeResponse = await roleApi.getAssignedMenu(row.id)
    if (resultData.code === RESPONSE_SUCCESS_CODE) {
      defaultCheckedKeys.value = resultData.data.map(
        (item) => item.id,
      ) as Array<number>
    } else {
      ElMessage.error(resultData.message)
    }
  } else {
    ElMessage.error(result.message)
  }
}

const checkNodeChange = (checkedNode, isChecked, isChildrenNodeChecked) => {
  if (isChecked) {
    checkedNodeKeyData.push(checkedNode.id)
  } else {
    checkedNodeKeyData = checkedNodeKeyData.filter(
      (item) => item !== checkedNode.id,
    )
  }
}

const drawerConfirm = async () => {
  loading.value = true
  const result = await roleApi.assignMenu(roleId, checkedNodeKeyData)
  if (result.code === RESPONSE_SUCCESS_CODE) {
    ElMessage.success('分配菜单成功')
    drawer.value = false
  } else {
    ElMessage.error(result.message)
  }
  loading.value = false
}
</script>

<style lang='scss' scoped>
</style>