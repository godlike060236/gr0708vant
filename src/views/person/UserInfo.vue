<template>
  <!--this is edit user page-->
  <div id="home">
    <nav-bar :title="'编辑资料'" :back-to="'/person'" :left-text="'返回'" :is-arrow="true"/>
    <van-form validate-first @failed="onFailed" @submit="onSubmit">
      <div class="form">
        <!-- 头像-->
        <van-uploader
            v-model="fileList"
            :max-count="1"/>

        <!-- 账户-->
        <van-field
            v-model="form.loginName"
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
            v-model="form.nickyName"
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
            v-model="form.phone"
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
            v-model="form.email"
            label="邮箱"
            name="validator"
            placeholder="请输入电子邮箱"
            :rules="[{ required: true, message: '电子邮箱不可为空' }]"
        >
          <template #left-icon>
            <van-icon name="envelop-o"></van-icon>
          </template>
        </van-field>

        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">确认修改</van-button>
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue'

export default {
  name: "UserInfo",
  components: {
    NavBar
  },
  data() {
    const module = '/ums-user'
    return {
      url: {
        save: module + '/update',
        getone: module + '/getone'
      },
      form: {
        loginName: null,
        nickyName: null,
        phone: null,
        email: null,
        file: null
      },
      fileList: [],
      token: [],
      newToken: []
    }
  },
  created() {
    if (this.$store.getters.GET_TOKEN !== '') {
      this.token = this.$store.getters.GET_TOKEN
      // console.log(this.token)
      this.get(this.url.getone, {id: this.token}, response => {
        //console.log(response)
        //this is very important,update user will need the user`s id
        this.form.id = response.id
        this.form.loginName = response.loginName
        this.form.nickyName = response.nickyName
        this.form.phone = response.phone
        this.form.email = response.email
        this.fileList = [{url: this.img(response.icon)}]
      })
    } else {
      // console.log('token为空')
    }
  },
  methods: {
    onSubmit() {
      if (this.fileList.length !== 0) {
        this.form.file = this.fileList[0].file
        //console.log(this.form)
        this.post(this.url.save, this.form, () => {
          //console.log(response)
        })
      } else {
        this.$notify({type: 'warning', message: '头像不能为空'})
      }
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

<style scoped lang="less">
#home {
  margin-bottom: 5rem;
}

.van-cell {
  height: 3.5rem;
  font-size: 1rem;
}

.van-cell__value {
  text-align: left;
}

.item {
  margin: 1rem 0;
}

.bri {
  position: relative;

  .van-popup--bottom {
    height: 18rem;
  }

  .van-action-sheet__item {
    position: absolute;
    top: 80%;
    border: 1px solid #eee;
  }
}

</style>