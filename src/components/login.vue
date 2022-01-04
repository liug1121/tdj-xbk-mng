<template>
  <div class="login_container">
    <div class="login_header">
      <img class="login_hearder_left" src="../assets/images/logo-chinauni.png" width="100%" height="100%" alt="" />
      <img class="login_hearder_right" src="../assets/images/logo-yanfei.png" width="100%" height="100%" alt="" />
    </div>
    <img src="../assets/images/content-big.jpg" width="100%" height="100%" alt="" />
    <div class="login_footer">Copyright ©2019 南京天地杰实业有限公司 All Rights Reserved</div>
    <div class="login_box">
      <div class="login_title">雁飞·流量运营平台</div>
      <!-- <div class="login_left">
        <div class="avatar_box">
          <img src="../assets/images/logo.png" />
        </div>
        <div class="title"></div>
      </div> -->
      
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0" class="login_form">

        <el-form-item prop="userName">
          <el-input v-model="loginForm.userName" prefix-icon="el-icon-user" placeholder="请您输入用户名"></el-input>
        </el-form-item>
  
        <el-form-item prop="pwd">
          <el-input v-model="loginForm.pwd" prefix-icon="el-icon-lock" type="password" placeholder="请您输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          
          <div class="vercode">
            <div class="vercode-input">
              <el-input  v-model="loginForm.verCode"  placeholder="请您输入验证码"></el-input>
            </div>
            <div class="vercode-img" @click="refreshImg">
              <img :src="verCode"/>
            </div>
          </div>
          
          
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="adminLogin" class="NewButton">登录</el-button>
          <el-button type="primary" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div class="company">Copyright ©2019 南京天地杰实业有限公司 All Rights Reserved</div> -->
    <div class="slide" v-if="slideShow == true">
      <div class="slide-close" @click="closeSlide">X</div>
      <slide-verify :l="42" 
            :r="10"
            :w="310"
            :h="155"
            slider-text="向右滑动"
            @success="onSuccess"
            @fail="onFail"
            @refresh="onRefresh"
            ></slide-verify>
    </div>
    
<!-- <div>{{msg}}</div> -->
  </div>
</template>

<script>
import API from 'api/login'
export default {
  data () {
    return {
      verCode:'',
      verCodeKey:'',
      // imgSrc:'../assets/images/content-big.jpg',
      msg:'',
      slideShow:false,
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
  mounted () {
    this.getVerCode()
  },
  methods: {
    refreshImg:function(){
      this.getVerCode()
    },
    getVerCode:function(){
      let data = {};
      API.apiGetVerCode(data).then(res => {
              if (res.resultCode === 0) {
                console.log(JSON.stringify(res.data));
                this.verCode = res.data.data
                this.verCodeKey = res.data.key
                // this.$message.success('登录成功')
                // window.sessionStorage.setItem('userName', res.data.userName)
                // window.sessionStorage.setItem('token', res.data.token)
                // window.sessionStorage.setItem('userType', res.data.type)
                // window.sessionStorage.setItem('usingInDevice', res.data.usingInDevice)
                // window.sessionStorage.setItem('usingInXuebaka', res.data.usingInXuebaka)
                // window.sessionStorage.setItem('managerType', res.data.managerType)
                // window.sessionStorage.setItem('AuthMenus', JSON.stringify(res.data.managerAuthResp))
                // window.sessionStorage.setItem('AuthOpts', JSON.stringify(res.data.managerAuthOpts))

                  
                // this.$router.push('/main');
              } else {
                this.$message.error(res.resultInfo)
              }
            })
    },
    closeSlide:function(){
      this.slideShow = false
    },
    onSuccess(){
            this.msg = 'login success'
            this.slideShow = false
            this.$refs.loginFormRef.validate(valid => {
            if (!valid) return
            let data = {
              userName: this.loginForm.userName,
              pwd: this.loginForm.pwd,
              verCode: this.loginForm.verCode,
              verCodeUid: this.verCodeKey
            };
            API.apiLogin(data).then(res => {
              if (res.resultCode === 0) {
                console.log(res.data);
                this.$message.success('登录成功')
                window.sessionStorage.setItem('userName', res.data.userName)
                window.sessionStorage.setItem('token', res.data.token)
                window.sessionStorage.setItem('userType', res.data.type)
                window.sessionStorage.setItem('usingInDevice', res.data.usingInDevice)
                window.sessionStorage.setItem('usingInXuebaka', res.data.usingInXuebaka)
                window.sessionStorage.setItem('managerType', res.data.managerType)
                window.sessionStorage.setItem('AuthMenus', JSON.stringify(res.data.managerAuthResp))
                window.sessionStorage.setItem('AuthOpts', JSON.stringify(res.data.managerAuthOpts))

                  
                this.$router.push('/main');
              } else {
                this.$message.error(res.resultInfo)
              }
            })
          })
        },
        onFail(){
            this.msg = ''
        },
        onRefresh(){
            this.msg = ''
        },
    /* 点击重置按钮，重置登录表单 */
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    adminLogin () {
      // this.slideShow = true
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return
        let data = {
          userName: this.loginForm.userName,
          pwd: this.loginForm.pwd,
          verCode: this.loginForm.verCode,
          verCodeUid: this.verCodeKey
        };
        API.apiLogin(data).then(res => {
          if (res.resultCode === 0) {
            console.log(res.data);
            this.$message.success('登录成功')
            window.sessionStorage.setItem('userName', res.data.userName)
            window.sessionStorage.setItem('token', res.data.token)
            window.sessionStorage.setItem('userType', res.data.type)
            window.sessionStorage.setItem('usingInDevice', res.data.usingInDevice)
            window.sessionStorage.setItem('usingInXuebaka', res.data.usingInXuebaka)
            window.sessionStorage.setItem('managerType', res.data.managerType)
            window.sessionStorage.setItem('AuthMenus', JSON.stringify(res.data.managerAuthResp))
            window.sessionStorage.setItem('AuthOpts', JSON.stringify(res.data.managerAuthOpts))

              
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
  /* background-color: red; */
  /* background-color: #fff; */
  width:100%;  
  height:100%;  /**宽高100%是为了图片铺满屏幕 */
  /* z-index:-1;
  position: absolute; */
  /* height: 100%; */
  background:url('../assets/images/content-big.jpg')

}
.login_box {
  width: 400px;
  height: 350px;
  background-color: transparent;
  border-radius: 3px;
  position: absolute;
  left: 80%;
  top: 50%;
  transform: translate(-50%, -50%);
  /* display: flex; */
  box-shadow: 0 0 10px #ddd;
  justify-content: center;
  align-items: center;
}
.login_left {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: rgb(37,74,145);
  box-sizing: border-box;
  padding: 61px 0;
  opacity: 0.7;
  
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
  opacity: 0.5;
}
.title {
  font-size: 20px;
  box-sizing: border-box;
  padding-top: 20px;
  color: #fff;
  font-weight: 500;
}
.login_form {
  /* padding: 70px 20px 0; */
  box-sizing: border-box;
  width: 300px;
  margin-left: 14%;
  margin-top: 10%;
}
.btns {
  float: right;
}
.NewButton {
  background-color: #48adf8;
  /* border: 1px solid #ed7020; */
}
.NewButton:hover {
  background-color: #489af8;
  /* border: 1px solid #f37a2f; */
}
.btns {
  padding-top: 5px;
}
.company{
  height: 30px;
  position:absolute;
  bottom:0;
  width: 100%;
  text-align: center;
  font-size: 15px;
}
.slide{
  left: 50%;
  top: 40%;
  position: absolute;
  background: #fff;
}
.slide-close{
  font-size: 13px;
  margin-left: 95%;
  cursor: pointer;
}
.login_header{
  opacity: 0.9;
  /* background-color: rgba(8, 5, 39, 0.9); */
  border-bottom: 2px solid rgb(37,74,145);
  height: 10%;
}
.login_footer{
  width: 100%;
  opacity: 0.9;
  /* border-bottom: 2px solid rgb(37,74,145); */
  height: 10%;
  position:fixed;
  bottom: 0px;
  text-align: center;
  color: #d6eff1;
  font-size: 23px;
}
.login_hearder_left{
  width: 20%;
}
.login_hearder_right{
  margin-left: 75%;
  width: 60px;
  height: 60px;
}
.login_title{
  margin-left: 25%;
  margin-top: 4%;
  color: #d6eff1;
}
.vercode{
  display:flex;
  width: 100%;
}
.vercode-img{
  margin-left: 3px;
  flex: 1;
}
.vercode-img img{
  margin-left: 25px;
  margin-top: 2px;
  height: 35px;
  flex: 1;
  cursor: pointer;
}
.vercode-input{
  flex: 1;
}
</style>
