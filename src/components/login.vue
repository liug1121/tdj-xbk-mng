<template>
  <div class="login_container">
    <div class="login_box">
      <!-- left区域 -->
      <div class="login_left">
        <div class="avatar_box">
          <img src="../assets/images/logo.png" />
        </div>
        <div class="title">卡管理平台</div>
      </div>
      <!-- 登录区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="userName">
          <el-input v-model="loginForm.userName" prefix-icon="el-icon-user" placeholder="请您输入用户名"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="pwd">
          <el-input v-model="loginForm.pwd" prefix-icon="el-icon-lock" type="password" placeholder="请您输入密码"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="adminLogin" class="NewButton">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import API from 'api/login'
export default {
  data () {
    return {
      loginForm: {
        userName: '',
        pwd: ''
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        pwd: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    /* 点击重置按钮，重置登录表单 */
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    adminLogin () {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return
        let data = {
          userName: this.loginForm.userName,
          pwd: this.loginForm.pwd
        };
        API.apiLogin(data).then(res => {
          if (res.resultCode === 0) {
            console.log(res.data);
            this.$message.success('登录成功')
            window.sessionStorage.setItem('userName', res.data.userName)
            window.sessionStorage.setItem('token', res.data.token)
            window.sessionStorage.setItem('userType', res.data.type)
            window.sessionStorage.setItem('usingInDevice', res.data.usingInDevice)
            window.sessionStorage.setItem('managerType', res.data.managerType)
            this.$router.push('/main');
          } else {
            this.$message.error(res.resultInfo)
          }
        })
      })
    }
  }
};
</script>

<style scoped>
.login_container {
  background-color: #fff;
  height: 100%;
}
.login_box {
  width: 700px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  box-shadow: 0 0 10px #ddd;
  justify-content: center;
  align-items: center;
}
.login_left {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #ed7020;
  box-sizing: border-box;
  padding: 61px 0;
}
.avatar_box {
  width: 120px;
  height: 120px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 0 10px #ddd;
  background: #fff;
}
.avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.title {
  font-size: 20px;
  box-sizing: border-box;
  padding-top: 20px;
  color: #fff;
  font-weight: 500;
}
.login_form {
  padding: 70px 20px 0;
  box-sizing: border-box;
  width: 400px;
}
.btns {
  float: right;
}
.NewButton {
  background-color: #ed7020;
  border: 1px solid #ed7020;
}
.NewButton:hover {
  background-color: #f37a2f;
  border: 1px solid #f37a2f;
}
.btns {
  padding-top: 40px;
}
</style>
