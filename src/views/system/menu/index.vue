<template>
  <div class='menu'>
    <div class='menu-left'>
      <el-card class='box-card'>
        <template #header>
          <el-button type='primary' :icon='Plus' @click='btnAdd'>新增</el-button>
          <el-button type='danger' :icon='DeleteFilled' @click='btnBatchDelete(checkedNodeKeyData)'>
            批量删除
          </el-button>
        </template>
        <el-input
          v-model='filterText'
          placeholder='请输入菜单名称'
          style='margin-bottom: 12px'
          clearable
        />
        <el-scrollbar height='600px'>
          <el-tree
            :data='data'
            :props='defaultProps'
            @node-click='handleNodeClick'
            @node-expand='handleNodeExpand'
            ref='treeRef'
            class='filter-tree'
            :filter-node-method='filterNode'
            :expand-on-click-node='false'
            node-key='id'
            :default-expanded-keys='expandNodeKeyData'
            @check-change='checkNodeChange'
            check-strictly
            show-checkbox
          />
        </el-scrollbar>
      </el-card>
    </div>
    <div class='menu-right'>
      <el-card class='box-card'>
        <el-form
          :model='form'
          label-width='120px'
          ref='formRef'
          :rules='rules'
        >
          <el-form-item label='菜单名称：' prop='menuName'>
            <el-input
              v-model='form.menuName'
              clearable
              placeholder='请输入菜单名称'
            />
          </el-form-item>
          <el-form-item label='菜单编码：' prop='menuCode'>
            <el-input
              v-model='form.menuCode'
              clearable
              placeholder='请输入菜单编码'
            />
          </el-form-item>
          <el-form-item label='父级菜单：' prop='pid'>
            <el-tree-select
              v-model='form.pid'
              :data='data'
              :render-after-expand='false'
              :props='defaultProps'
              check-strictly
              style='width: 100%'
              clearable
            />
          </el-form-item>
          <el-form-item label='菜单类型：' prop='type'>
            <el-radio-group v-model='form.type'>
              <el-radio :label='SysMenuTypeEnum.MENU'>菜单</el-radio>
              <el-radio :label='SysMenuTypeEnum.BUTTON'>按钮</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label='路由组件：' prop='component'>
            <el-input
              v-model='form.component'
              clearable
              placeholder='请输入路由组件'
            />
          </el-form-item>
          <el-form-item label='菜单路径：' prop='path'>
            <el-input
              v-model='form.path'
              clearable
              placeholder='请输入菜单路径'
            />
          </el-form-item>
          <el-form-item label='菜单图标：' prop='menuIcon'>
            <!--            <el-input-->
            <!--              v-model="form.menuIcon"-->
            <!--              clearable-->
            <!--              placeholder="请输入菜单图标"-->
            <!--            />-->
            <el-popover
              placement='bottom'
              :width='420'
              trigger='click'
              v-model:visible='popoverVisible'
              style='height: 200px'
            >
              <template #reference>
                <el-input
                  v-model='form.menuIcon'
                  placeholder='请选择图标'
                  clearable
                >
                  <template
                    #prefix
                    v-if="form.menuIcon && form.menuIcon !== ''"
                  >
                    <SvgIcon :name='form.menuIcon'></SvgIcon>
                  </template>
                </el-input>
              </template>
              <IconSelect @getIconName='setIconName'></IconSelect>
            </el-popover>
          </el-form-item>
          <el-form-item label='菜单顺序：' prop='sort'>
            <el-input-number
              v-model='form.sort'
              :min='0'
              :max='10'
              style='width: 100%'
            />
          </el-form-item>
          <el-form-item label='菜单状态：' prop='status'>
            <el-switch
              v-model='form.status'
              :active-value='StatusEnum.ENABLE'
              :inactive-value='StatusEnum.DISABLE'
            />
          </el-form-item>
          <el-form-item label='显示状态：' prop='isHidden'>
            <el-switch
              v-model='form.isHidden'
              :active-value='SysMenuHiddenEnum.NO'
              :inactive-value='SysMenuHiddenEnum.YES'
            />
          </el-form-item>
          <el-form-item label='是否外链：' prop='isExternal'>
            <el-switch
              v-model='form.isExternal'
              :active-value='SysMenuExternalEnum.YES'
              :inactive-value='SysMenuExternalEnum.NO'
            />
          </el-form-item>
          <el-form-item>
            <el-button type='primary' @click='submit' :loading='loading'>
              保存
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { ElMessage, ElTree, FormInstance, FormRules } from 'element-plus'
import {
  MenuTreeResponse,
  SysMenuExternalEnum,
  SysMenuHiddenEnum,
  SysMenuModel,
  SysMenuTypeEnum,
} from '@/api/system/menu/type'
import menuApi from '@/api/system/menu'
import {  Plus, DeleteFilled } from '@element-plus/icons-vue'
import IconSelect from '@/components/IconSelect/index.vue'
import { RESPONSE_SUCCESS_CODE, StatusEnum } from '@/type'
import useForm from '@/hooks/useForm'

const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()
const data = ref<Array<SysMenuModel>>([])
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

const filterNode = (value: string, data: SysMenuModel) => {
  if (!value) return true
  return data.menuName.includes(value)
}

const handleNodeClick = (data: SysMenuModel) => {
  Object.assign(form, data)
}

const handleNodeExpand = (param) => {
  expandNodeKeyData.value.push(param.id)
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

const menuTree = async () => {
  const result: MenuTreeResponse = await menuApi.getMenuTree()
  if (result.code === RESPONSE_SUCCESS_CODE) {
    data.value = result.data
  } else {
    ElMessage.error(result.message)
  }
}

onMounted(() => {
  menuTree()
})

const formRef = ref<FormInstance>()
const form = reactive<SysMenuModel>({
  id: 0,
  pid: 0,
  menuName: '',
  menuCode: '',
  menuIcon: '',
  component: '',
  path: '',
  type: SysMenuTypeEnum.MENU,
  status: StatusEnum.ENABLE,
  level: 0,
  isHidden: SysMenuHiddenEnum.NO,
  sort: 0,
  isExternal: SysMenuExternalEnum.NO,
})
// const validatePath = (rule: any, value: string, callback: any) => {
//   if (value && !value.startsWith("/")) {
//     callback(new Error('菜单路径必须以/开始'))
//   } else {
//     callback()
//   }
// }
const rules = reactive<FormRules>({
  menuName: { required: true, message: '菜单名称不能为空', trigger: 'blur' },
  menuCode: { required: true, message: '菜单编码不能为空', trigger: 'blur' },
  // pid: { required: true, message: '父级菜单不能为空', trigger: 'blur' },
  // path: [{ validator: validatePath, trigger: 'blur' }],
})
const popoverVisible = ref<boolean>(false)

const [btnAdd, btnUpdate, btnDelete, btnBatchDelete, dialogVisible, loading, submit] = useForm(menuApi, form, formRef, menuTree)

const setIconName = (iconName: string) => {
  form.menuIcon = iconName
  popoverVisible.value = false
}
</script>

<style lang='scss' scoped>
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
