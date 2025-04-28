import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSettingStore = defineStore('setting', () => {
  // 菜单是否折叠 默认 否
  let isFold = ref(false)

  return {
    isFold
  }
})

export default useSettingStore