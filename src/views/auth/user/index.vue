<template>
  <div>
    <el-button icon="Search" circle @click="globalSearch" />
    <el-dialog
      v-model="centerDialogVisible"
      destroy-on-close
      :show-close="false"
      width="30%"
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
import { onMounted, ref } from 'vue'
import useUserStore from '@/store/module/user'

let userStore = useUserStore()

interface RestaurantItem {
  value: string
  link: string
}

let centerDialogVisible = ref(false)
const state = ref('')

const restaurants = ref<RestaurantItem[]>([])
const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  // call callback function to return suggestions
  cb(results)
}
const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}
const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' },
  ]
}

const handleSelect = (item: RestaurantItem) => {
  console.log(item, item.link, item.value)
}

onMounted(() => {
  // const menuList = userStore.menuList
  // const menus = menuList.filter((item) => !item.meta.isHidden)
  // console.log(menus)
  restaurants.value = loadAll()
})

const globalSearch = () => {
  centerDialogVisible.value = true
}
</script>

<style lang="scss" scoped></style>
