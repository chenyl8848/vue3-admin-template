<template>
  <div>
    <el-card>
      <div class="box">
        <el-avatar :src="userStore.avatar" size="large" />
        <div class="box-bottom">
          <h3 class="title">{{ getTime() }}好 {{ userStore.username }}</h3>
          <p class="subtitle">{{ setting.DOCUMENT_TITLE }}</p>
        </div>
      </div>
    </el-card>
    <div class="bottom">
      <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useUserStore from '@/store/module/user'
import setting from '@/setting'
import { getTime } from '@/utils/time'

let userStore = useUserStore()
</script>

<style scoped lang="scss">
.box {
  display: flex;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .box-bottom {
    margin-left: 20px;

    .title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 30px;
    }

    .subtitle {
      font-style: italic;
      color: skyblue;
    }
  }
}

.bottom {
  margin-top: 200px;
  display: flex;
  justify-content: center;
}
</style>
