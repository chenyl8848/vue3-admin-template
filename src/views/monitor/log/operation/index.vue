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
        <el-col :span="3">
          <el-button type="primary">新增</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table :data="tableData" style="width: 100%" border stripe>
          <el-table-column fixed prop="date" label="Date" />
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="state" label="State" />
          <el-table-column prop="city" label="City" />
          <el-table-column prop="address" label="Address" />
          <el-table-column prop="zip" label="Zip" />
          <el-table-column fixed="right" label="Operations" width="120">
            <template #default>
              <el-button link type="primary" size="small" @click="handleClick">
                Detail
              </el-button>
              <el-button link type="primary" size="small">Edit</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <el-pagination background layout="prev, pager, next" :total="1000" />
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const queryForm = reactive({
  username: '',
})

const handleClick = () => {
  console.log('click')
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
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
