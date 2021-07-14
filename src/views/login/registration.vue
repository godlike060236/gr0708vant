<template>
  <!--  this is registration page-->
  <div id="home">
    <!--    导航-->
    <nav-bar :title="'注册'" :back-to="'/login'" :left-text="'返回'" :is-arrow="true"/>
    <!--    表单-->
    <van-form validate-first @failed="onFailed" @submit="onSubmit">
      <div class="form">
        <!-- 头像-->
        <van-uploader
            v-model="fileList"
            :max-count="1"/>

        <!-- 账户-->
        <van-field
            v-model="resetForm.loginName"
            label="用户名"
            name="pattern"
            placeholder="请输入用户名"
            :rules="[{ required: true, message: '用户名不可为空'}]"
        >
          <template #left-icon>
            <van-icon name="user-o"></van-icon>
          </template>
        </van-field>

        <!-- 昵称-->
        <van-field
            v-model="resetForm.nickyName"
            label="昵称"
            name="pattern"
            placeholder="请输入昵称"
            :rules="[{ required: true, message: '昵称不可为空'}]"
        >
          <template #left-icon>
            <van-icon name="smile-o"></van-icon>
          </template>
        </van-field>

        <!-- 电话-->
        <van-field
            v-model="resetForm.phone"
            label="电话"
            name="validator"
            placeholder="请输入手机号"
            :rules="[{ validator, message: '请输入正确的手机号' }]"
            type="number"
        >
          <template #left-icon>
            <van-icon name="phone-o"></van-icon>
          </template>
        </van-field>

        <!-- 邮箱-->
        <van-field
            v-model="resetForm.email"
            label="邮箱"
            name="validator"
            placeholder="请输入电子邮箱"
            :rules="[{ required: true, message: '电子邮箱不可为空' }]"
        >
          <template #left-icon>
            <van-icon name="envelop-o"></van-icon>
          </template>
        </van-field>

        <!-- 密码-->
        <van-field
            v-model="resetForm.rawPassword"
            label="密码"
            name="pattern"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '密码不能为空' }]"
            type="password"
        >
          <template #left-icon>
            <van-icon name="edit"></van-icon>
          </template>
          <template #right-icon>
            <van-icon name="closed-eye"></van-icon>
          </template>
        </van-field>

        <!-- 提交-->
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
  name: "Registration",
  components: {
    NavBar
  },
  data() {
    const module = '/ums-user'
    return {
      url: {
        save: module + '/add',
      },
      resetForm: {
        loginName: null,
        nickyName: null,
        phone: null,
        email: null,
        rawPassword: null,
        file: null
      },
      fileList: []
    }
  },
  methods: {
    onSubmit() {
      this.resetForm.file = this.fileList[0].file
      // console.log(this.resetForm)
      this.post(this.url.save, this.resetForm, response => {
        console.log(response)
        this.$notify({type: 'success', message: '注册成功'})
        this.$router.push('/login')
      })

    },
    onFailed() {
      this.$notify({type: 'warning', message: '请正确输入内容!'})
    },
    // 手机号码验证
    validator(val) {
      return /^1([38][0-9]|4[5-9]|5[0-3,5-9]|66|7[0-8]|9[89])[0-9]{8}$/.test(val)
    }
  }
}
</script>

<style scoped>
#home {
  margin-bottom: 5rem;
}

</style>