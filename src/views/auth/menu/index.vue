<template>
  <div class="menu">
    <div class="menu-left">
      <el-card class="box-card">
        <template #header>
          <el-button type="primary" @click="btnAddMenu">新增</el-button>
          <el-button type="danger" @click="btnBatchDeleteMenu">
            批量删除
          </el-button>
        </template>
        <el-input
          v-model="filterText"
          placeholder="请输入菜单名称"
          style="margin-bottom: 12px"
          clearable
        />
        <el-scrollbar height="600px">
          <el-tree
            :data="data"
            :props="defaultProps"
            @node-click="handleNodeClick"
            @node-expand="handleNodeExpand"
            ref="treeRef"
            class="filter-tree"
            :filter-node-method="filterNode"
            :expand-on-click-node="false"
            node-key="id"
            :default-expanded-keys="expandNodeKeyData"
            @check-change="checkNodeChange"
            check-strictly
            show-checkbox
          />
        </el-scrollbar>
      </el-card>
    </div>
    <div class="menu-right">
      <el-card class="box-card">
        <el-form
          :model="form"
          label-width="120px"
          ref="ruleFormRef"
          :rules="rules"
        >
          <el-form-item label="菜单名称：" prop="menuName">
            <el-input
              v-model="form.menuName"
              clearable
              placeholder="请输入菜单名称"
            />
          </el-form-item>
          <el-form-item label="菜单编码：" prop="menuCode">
            <el-input
              v-model="form.menuCode"
              clearable
              placeholder="请输入菜单编码"
            />
          </el-form-item>
          <el-form-item label="父级菜单：" prop="pid">
            <el-tree-select
              v-model="form.pid"
              :data="data"
              :render-after-expand="false"
              :props="defaultProps"
              check-strictly
              style="width: 100%"
              clearable
            />
          </el-form-item>
          <el-form-item label="菜单类型：">
            <el-radio-group v-model="form.type">
              <el-radio :label="1">菜单</el-radio>
              <el-radio :label="2">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="路由组件：">
            <el-input
              v-model="form.component"
              clearable
              placeholder="请输入路由组件"
            />
          </el-form-item>
          <el-form-item label="菜单路径：">
            <el-input
              v-model="form.path"
              clearable
              placeholder="请输入菜单路径"
            />
          </el-form-item>
          <el-form-item label="菜单图标：">
            <!--            <el-input-->
            <!--              v-model="form.menuIcon"-->
            <!--              clearable-->
            <!--              placeholder="请输入菜单图标"-->
            <!--            />-->
            <el-popover
              placement="bottom"
              :width="400"
              trigger="click"
              v-model:visible="popoverVisible"
              style="height: 200px"
            >
              <template #reference>
                <el-input
                  v-model="form.menuIcon"
                  placeholder="请选择图标"
                  clearable
                >
                  <template
                    #prefix
                    v-if="form.menuIcon && form.menuIcon !== ''"
                  >
                    <SvgIcon :name="form.menuIcon"></SvgIcon>
                  </template>
                </el-input>
              </template>
              <IconSelect @getIconName="setIconName"></IconSelect>
            </el-popover>
          </el-form-item>
          <el-form-item label="菜单顺序：">
            <el-input-number
              v-model="form.sort"
              :min="0"
              :max="10"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="菜单状态：">
            <el-switch
              v-model="form.status"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item label="显示状态：">
            <el-switch
              v-model="form.isHidden"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item label="是否外链：">
            <el-switch
              v-model="form.isExternal"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="loading">
              保存
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import {
  ElMessage,
  ElMessageBox,
  ElTree,
  FormInstance,
  FormRules,
} from 'element-plus'
import {
  AddOrUpdateMenuRequest,
  GetMenuTreeResponse,
  SysMenuResponse,
} from '@/api/auth/menu/type'
import {
  addMenu,
  batchDeleteMenu,
  getMenuTree,
  updateMenu,
} from '@/api/auth/menu'
import IconSelect from '@/components/IconSelect/index.vue'

const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()
const data = ref<Array<SysMenuResponse>>([])
const expandNodeKeyData = ref<Array<number>>([])
let checkedNodeKeyData = []

const defaultProps = {
  children: 'children',
  label: 'menuName',
  value: 'id',
}

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

const filterNode = (value: string, data: SysMenuResponse) => {
  if (!value) return true
  return data.menuName.includes(value)
}

const handleNodeClick = (data: SysMenuResponse) => {
  form.id = data.id
  form.pid = data.pid
  form.menuName = data.menuName
  form.menuCode = data.menuCode
  form.menuIcon = data.menuIcon
  form.type = data.type
  form.status = data.status
  form.component = data.component
  form.path = data.path
  form.isHidden = data.isHidden
  form.sort = data.sort
  form.isExternal = data.isExternal
}

const handleNodeExpand = (param1) => {
  expandNodeKeyData.value.push(param1.id)
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

const btnAddMenu = () => {
  resetForm()
}

const btnBatchDeleteMenu = () => {
  if (checkedNodeKeyData.length === 0) {
    ElMessage.warning('请选择要删除的数据')
    return
  }

  ElMessageBox.confirm(`确认要删除吗?`, 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const result = await batchDeleteMenu(checkedNodeKeyData)
      if (result.code === 200) {
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        menuTree()
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

const menuTree = async () => {
  const result: GetMenuTreeResponse = await getMenuTree()
  if (result.code === 200) {
    data.value = result.data
  } else {
    ElMessage.error(result.message)
  }
}

onMounted(() => {
  menuTree()
})

const ruleFormRef = ref<FormInstance>()
const form = reactive<AddOrUpdateMenuRequest>({
  id: 0,
  pid: 1,
  menuName: '',
  menuCode: '',
  menuIcon: '',
  component: '',
  path: '',
  type: 1,
  status: 1,
  isHidden: 1,
  sort: 0,
  isExternal: 0,
})
const rules = reactive<FormRules>({
  menuName: { required: true, message: '菜单名称不能为空', trigger: 'blur' },
  menuCode: { required: true, message: '菜单编码不能为空', trigger: 'blur' },
  pid: { required: true, message: '父级菜单不能为空', trigger: 'blur' },
})
const loading = ref<boolean>(false)
const popoverVisible = ref<boolean>(false)

const setIconName = (iconName: string) => {
  form.menuIcon = iconName
  popoverVisible.value = false
}

const onSubmit = async () => {
  console.log('submit!')
  await ruleFormRef.value.validate()
  loading.value = false
  const { id } = form
  if (id === 0) {
    // 新增
    const result = await addMenu(form)
    if (result.code === 200) {
      ElMessage.success('新增成功')
      menuTree()
    } else {
      ElMessage.error(result.message)
    }
  } else {
    // 修改
    const result = await updateMenu(form)
    if (result.code === 200) {
      ElMessage.success('修改成功')
      menuTree()
    } else {
      ElMessage.error(result.message)
    }
  }
  loading.value = false
}

const resetForm = () => {
  form.id = 0
  form.pid = 1
  form.menuName = ''
  form.menuCode = ''
  form.menuIcon = ''
  form.component = ''
  form.path = ''
  form.type = 1
  form.status = 1
  form.isHidden = 1
  form.sort = 0
  form.isExternal = 0
}
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  justify-content: space-between;

  .menu-left {
    width: 18%;
    //display: flex;
    height: 100%;
  }

  .menu-right {
    margin-left: 2%;
    width: 80%;
    //display: flex;
  }

  .box-card {
    width: 100%;
    //height: 100%;
  }
}
</style>
