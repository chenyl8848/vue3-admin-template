<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login-form"
          ref="loginFormRef"
          status-icon
          :model="loginForm"
          :rules="loginFormRules"
        >
          <h1>Hello</h1>
          <h2>欢迎来到管理后台</h2>
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              :prefix-icon="User"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
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
            <el-button
              class="login-btn"
              type="primary"
              :loading="loading"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/module/user'
import { useRouter } from 'vue-router'
import { ElNotification, FormInstance, FormRules } from 'element-plus'
import validate = WebAssembly.validate

// 获取用户信息相关仓库
let userStore = useUserStore()
// 获取路由管理器
let $router = useRouter()
// 定义变量控制登录按钮加载效果
let loading = ref(false)
// 定义登录表单
let loginForm = reactive({ username: 'admin', password: '111111' })
// 获取 el-form 组件
const loginFormRef = ref<FormInstance>()

// 自定义表单校验规则
const validateUsername = (rule: any, value: any, callback: any) => {
  // rule:即为校验规则对象
  // value:即为表单元素文本内容
  // 函数:如果符合条件callBack放行通过即为
  // 如果不符合条件callBack方法,注入错误提示信息
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if (value.length < 3 || value.length > 12) {
    callback(new Error('用户名长度至少为3位且不能超过12位'))
  } else {
    callback()
  }
}

// el-form 表单校验对象
const loginFormRules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur',
    },
    // {
    //   min: 6,
    //   max: 12,
    //   message: '用户名至少超过6位且不能超过12位',
    //   trigger: "change"
    // },
    // 使用自定义校验规则
    // {
    //   validator: validateUsername,
    //   trigger: 'change'
    // }
  ],
  password: {
    required: true,
    message: '密码不能为空',
    trigger: 'blur',
  },
})

// 登录按钮回调
const login = async () => {
  try {
    // 表单校验
    await loginFormRef.value.validate()

    loading.value = true
    await userStore.userLogin(loginForm)
    $router.push('/')
    ElNotification({
      title: 'Success',
      message: '登录成功',
      type: 'success',
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
    ElNotification({
      title: 'Error',
      message: error.message,
      type: 'error',
    })
  }
}
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
