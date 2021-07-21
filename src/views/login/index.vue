<template>
<!--  this is login page-->
  <div class="home">
    <nav-bar :title="'登录'"
             :isArrow="true"
             :leftText="'返回'"
             :backTo="'/person'"
    />
    <!-- 登陆表单 -->
    <van-form validate-first @failed="onFailed" @submit="handlerLogin">
      <div class="logo">
        <div class="logo1">
          <img :src="head">
        </div>
      </div>
      <div class="form">
        <van-field
            v-model="loginForm.username"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        >
          <template #left-icon>
            <van-icon name="user-o"></van-icon>
          </template>
        </van-field>
        <van-field
            v-model="loginForm.password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
            autocomplete="true"
        >
          <template #left-icon>
            <van-icon name="edit"></van-icon>
          </template>
          <template #right-icon>
            <van-icon name="closed-eye"></van-icon>
          </template>
        </van-field>
        <div style="margin: 8rem 3rem 5rem 3rem;">
          <van-button block type="info" native-type="submit">登录</van-button>
        </div>
      </div>
    </van-form>

    <!-- 下引导 -->
    <div class="info">
      <div class="left" @click="redirectedForgotPassword()">忘记密码</div>
      <i>|</i>
      <div class="right" @click="redirectedRegistration()">用户注册</div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue'

export default {
  name: "Login",
  components: {
    NavBar
  },
  data() {
    return {
      url: {
        login: '/ums-user/customerLogin'
      },
      loginForm: {
        username: '',
        password: ''
      },
      head: require('@/assets/unlogin.png')
    }
  },
  methods: {
    handlerLogin() {
      this.post(this.url.login, this.loginForm, response => {
        // console.log(response)
        this.$store.commit("resetState")
        this.$store.commit('SET_TOKEN', response.token)
        this.get("/ums-address/list", {userId: this.$store.getters.GET_TOKEN}, response => {
          // console.log(response)
          for(let i = 0;i<response.length;i++){
            if(response[i].isDefault === 1){
              this.$store.commit('SET_ADDRESS', response[i])
            }
          }
        })
        this.$router.push('/person')
      })
    },
    onFailed() {
      this.$notify({type: 'warning', message: '请正确输入内容!'})
    },
    redirectedForgotPassword() {
      this.$router.push('/forgotPassword')
    },
    redirectedRegistration() {
      this.$router.push('/registration')
    }
  }
}
</script>

<style scoped lang="less">
.logo {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  margin: 5rem 0;
}

.logo1 {
  height: 6rem;
  width: 6rem;
  border: 0.1rem solid #eee;
  border-radius: 50%;
  padding: 0.2rem;
  box-shadow: 0 0 0.25rem #ddd;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.info {
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 1.1rem;

  i {
    margin: 0 0.5rem;
  }
}
</style>