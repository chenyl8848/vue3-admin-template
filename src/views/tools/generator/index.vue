<template>
  <div>
    <el-card class='mgb-12px'>
      <!-- 此处 form 表单加上：@submit.native.prevent 是因为在当前页面元素只有一个文本框时，点击回车会自动提交表单，就造成了刷新当前页面 -->
      <el-form :model='queryForm' label-width='120px' ref='queryFormRef' @submit.native.prevent>
        <el-row :gutter='20'>
          <el-col :span='21'>
            <el-form-item label='表名：' prop='tableName'>
              <el-input
                v-model='queryForm.tableName'
                clearable
                @keyup.enter.native='onSearch'
              />
            </el-form-item>
          </el-col>
          <el-col :span='3'>
            <el-button type='primary' @click='onSearch' :loading='loading'>搜索</el-button>
            <el-button @click='onReset'>重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-table
      :data='tableData'
      border
      stripe
      highlight-current-row
      ref='multipleTableRef'
      class='mgb-12px'
      v-loading='loading'
    >
      <el-table-column type='selection' width='55' />
      <el-table-column prop='tableName' label='表名' width='250' />
      <el-table-column prop='className' label='类名' width='250' />
      <el-table-column prop='tableComment' label='表注释' />
      <el-table-column fixed='right' label='操作' width='120'>
        <template #='{ row, $index }'>
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
  </div>
</template>

<script lang='ts' setup>
import { getTableInfoPageList } from '@/api/tools/generator'
import { reactive, ref } from 'vue'
import { useTable } from '@/hooks/useTable'

const queryForm = reactive({
  tableName: '',
})
const queryFormRef = ref()

const [loading, tableData, tableTotal, pageNo, pageSize, onSearch, onReset] = useTable(getTableInfoPageList, queryForm, queryFormRef)

</script>

<style lang='scss' scoped>
</style>
