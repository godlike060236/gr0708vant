<template>
  <div id="home">
    <nav-bar :title="'修改新密码'" :back-to="'/forgotPassword'" :left-text="'返回'" :is-arrow="true"/>
    <van-form validate-first @failed="onFailed" @submit="onSubmit">
      <div class="form">
        <!--        修改的账号ID显示-->
        <van-field
            v-model="resetForm.username"
            label="用户名"
            name="pattern"
            readonly
        >
          <template #left-icon>
            <van-icon name="user-o"></van-icon>
          </template>
        </van-field>

        <!--        新密码-->
        <van-field
            v-model="resetForm.rawPassword"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '密码不能为空' }]"
            :type="passwordType?'password':'number'"
        >
          <template #left-icon>
            <van-icon name="eye-o"></van-icon>
          </template>
          <template #right-icon>
            <van-icon name="closed-eye" @click="passwordType=!passwordType"></van-icon>
          </template>
        </van-field>

        <!--        确认密码-->
        <van-field
            v-model="confirmPassword"
            label="确认密码"
            placeholder="请输入确认密码"
            :rules="[{ required: true, message: '请与设置的密码一致' }]"
            :type="nextPasswordType?'password':'number'"
        >
          <template #left-icon>
            <van-icon name="eye-o"></van-icon>
          </template>
          <template #right-icon>
            <van-icon name="closed-eye" @click="nextPasswordType=!nextPasswordType"></van-icon>
          </template>
        </van-field>

        <!--        提交-->
        <div style="margin: 8rem 3rem;">
          <van-button block type="info" native-type="submit">提交</van-button>
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue'

export default {
  name: "ChangePassword",
  components: {
    NavBar
  },
  data() {
    const module = '/ums-user'
    return {
      url: {
        changePassword: module + '/changePassword'
      },
      resetForm: {
        username: null,
        rawPassword: null,
      },
      confirmPassword: null,
      passwordType: true,
      nextPasswordType: true,
    }
  },
  created() {
    this.resetForm.username = this.$route.query.username
  },
  methods: {
    onSubmit() {
      if (this.resetForm.rawPassword !== this.confirmPassword) {
        this.$notify({type: 'danger', message: '两次密码不一致!'})
      } else {
        this.post(this.url.changePassword, this.resetForm, response => {
          // console.log(response)
          this.$router.push('/login')
        })
      }
    },
    onFailed() {
      this.$notify({type: 'warning', message: '请正确输入内容!'})
    }
  }
}
</script>

<style scoped>
#home {
  margin-bottom: 5rem;
}
</style>