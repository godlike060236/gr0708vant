<template>
  <div id="home">
    <nav-bar :title="'找回密码'" :back-to="'/login'" :left-text="'返回'" :is-arrow="true"/>
    <van-form validate-first @failed="onFailed" @submit="onSubmit">
      <div class="form">
        <van-field
            v-model="resetForm.loginName"
            label="用户名"
            name="pattern"
            placeholder="请输入用户名"
            :rules="[{ required: true, message: '用户名不能为空' }]"
        >
          <template #left-icon>
            <van-icon name="user-o"></van-icon>
          </template>
        </van-field>

        <van-field
            v-model="resetForm.email"
            label="邮箱"
            name="pattern"
            placeholder="请输入邮箱"
            :rules="[{ required: true, message: '邮箱不能为空' }]"
        >
          <template #left-icon>
            <van-icon name="envelop-o"></van-icon>
          </template>
        </van-field>

        <van-field
            v-model="resetForm.verificationCode"
            label="验证码"
            name="pattern"
            placeholder="请输入验证码"
            type="number"
            :rules="[{ required: true, message: '验证码不能为空' }]"
        >
          <template #left-icon>
            <van-icon name="flag-o"></van-icon>
          </template>
          <template #button>
            <van-button
                class="btn-code"
                size="small"
                type="info"
                :disabled="verificationCodeDisplay"
                @click="getVerificationCode()"
            >
              {{ codeBtnMsg }}
            </van-button>
          </template>
        </van-field>

        <div style="margin: 8rem 3rem;">
          <van-button block type="info" :disabled="showSubmitButton">提交</van-button>
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue'

export default {
  name: "ForgotPassword",
  components: {
    NavBar
  },
  data() {
    const module = '/ums-user'
    return {
      url: {
        getCode: module + '/getCode'
      },
      resetForm: {
        loginName: null,
        email: null,
        verificationCode: null,
      },
      verificationCodeDisplay: false,
      showSubmitButton: true,
      codeBtnMsg: '获取验证码'
    }
  },
  methods: {
    onSubmit() {
      this.$router.push({
        path: '/changePassword',
        query: {
          username: this.resetForm.loginName
        }
      })
    },
    onFailed() {
      this.$notify({type: 'warning', message: '请正确输入内容!'})
    },
    // 获取验证码
    getVerificationCode() {
      this.verificationCodeDisplay = true
      let count = 60
      const _time = setInterval(() => {
        this.codeBtnMsg = `${count--}s 后再试`
        if (count === 0) {
          clearInterval(_time)
          this.codeBtnMsg = '获取验证码'
          this.verificationCodeDisplay = false
        }
        this.showSubmitButton = false
      }, 1000)
      // 调用给邮箱发验证码的方法
      console.log("send code!")
      this.post(this.url.getCode, this.resetForm, response => {
        console.log("已完成发送验证码" + response)
      })
    }
  }
}
</script>

<style scoped lang="less">
#home {
  margin-bottom: 5rem;
}

.btn-code {
  height: 1.9rem;
  letter-spacing: 0.1rem;
}
</style>