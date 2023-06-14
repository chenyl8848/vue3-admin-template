<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="21">
          <el-form :model="queryForm" label-width="120px">
            <el-form-item label="用户名称：">
              <el-input v-model="queryForm.username" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="3">
          <el-button type="primary">搜索</el-button>
          <el-button>重置</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="1">
          <el-button>新增</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="primary">编辑</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="danger">删除</el-button>
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
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </el-row>
      <el-row>
        <el-pagination background layout="prev, pager, next" :total="1000" />
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElTable } from 'element-plus'

const queryForm = reactive({
  username: '',
})

interface User {
  date: string
  name: string
  address: string
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 12px;
}

.el-row {
  margin-bottom: 12px;
}
</style>
