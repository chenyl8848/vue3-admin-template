import { defineStore } from 'pinia'
import { TagsView } from '@/store/module/types/type'
import { ref } from 'vue'

let useTagsViewStore = defineStore('tagsView', () => {
  let visitedViews = ref<Array<TagsView>>([
    {
      title: '首页',
      name: '/home',
      path: '/home',
    },
  ])

  let editableTabsValue = ref('/home')

  const addTagsView = (tagsView: TagsView) => {
    let exist = visitedViews.value.find((item) => item.name === tagsView.name)
    if (!exist) {
      visitedViews.value.push(tagsView)
    }
  }

  const removeTagsView = (name: string) => {
    if (visitedViews.value.length > 1) {
      let index = visitedViews.value.findIndex((item) => item.name === name)
      visitedViews.value.splice(index, 1)
    }
  }

  const changeEditTabs = (value: string) => {
    editableTabsValue.value = value
  }

  return {
    visitedViews,
    editableTabsValue,
    addTagsView,
    removeTagsView,
    changeEditTabs,
  }
})

export default useTagsViewStore
