<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login-form">
          <h1>Hello</h1>
          <h2>欢迎来到管理后台</h2>
          <el-form-item>
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              :prefix-icon="User"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              v-model="loginForm.password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              clearable
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive } from 'vue'

let loginForm = reactive({ username: 'admin', password: '111111' })
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login-form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0px;
    }

    .login-btn {
      width: 100%;
    }
  }
}
</style>
