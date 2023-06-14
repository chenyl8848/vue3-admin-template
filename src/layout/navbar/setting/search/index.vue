<template>
  <div class="search">
    <el-button icon="Search" circle @click="globalSearch" />
    <el-dialog
      v-model="centerDialogVisible"
      destroy-on-close
      :show-close="false"
      width="30%"
      append-to-body
    >
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearch"
        clearable
        class="inline-input w-50"
        placeholder="菜单搜索"
        @select="handleSelect"
        style="width: 100%"
      >
        <template #prefix>
          <el-icon>
            <Search />
          </el-icon>
        </template>
      </el-autocomplete>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import useUserStore from '@/store/module/user'
import { getAllLeafMenuRoutes } from '@/utils/common'
import { useRouter } from 'vue-router'

let userStore = useUserStore()

interface MenuItem {
  value: string
  link: string
}

let centerDialogVisible = ref(false)
const state = ref('')
const menus = ref<MenuItem[]>([])
let $router = useRouter()

const globalSearch = () => {
  centerDialogVisible.value = true
  const menuList = userStore.menuList
  let filterMenus = getAllLeafMenuRoutes(userStore.menuList)

  menus.value = filterMenus.map((item) => {
    return {
      value: item.meta.title as string,
      link: item.path,
    }
  })
}

const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? menus.value.filter(createFilter(queryString))
    : menus.value
  // call callback function to return suggestions
  cb(results)
}
const createFilter = (queryString: string) => {
  return (menu: MenuItem) => {
    return menu.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}

const handleSelect = (item: MenuItem) => {
  $router.push({ path: item.link })
  centerDialogVisible.value = false
}
</script>

<style scoped lang="scss">
.search {
  margin-left: 12px;
}

.el-autocomplete {
  width: 100%;
}
</style>
