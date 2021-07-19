<template>
  <!--  this is person page-->
  <div id="home">
    <!-- 上背景 -->
    <div class="avtor">
      <div class="user_img_warp">
        <div class="backdrop"/>
        <img class="image_big" :src="user.avatar"/>
        <div class="avtor_logo">
          <img class="image_icon" :src="user.avatar" @click="toLogin"/>
          <div class="user_name">
            {{ user.name }}
            <div class="edit_user" @click="editUserInfo">编辑资料</div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid">
      <van-grid :border="false" :column-num="4">
        <van-grid-item>
          <div class="num">0</div>
          <div class="text">收藏的商品</div>
        </van-grid-item>
        <van-grid-item>
          <div class="num">0</div>
          <div class="text">收藏的店铺</div>
        </van-grid-item>
        <van-grid-item>
          <div class="num">0</div>
          <div class="text">关注的商品</div>
        </van-grid-item>
        <van-grid-item>
          <div class="num">0</div>
          <div class="text">我的足迹</div>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="order">
      <van-cell title="我的订单" is-link/>
      <van-grid :border="false" :column-num="4">
        <van-grid-item>
          <van-icon name="like-o"></van-icon>
          <div class="text">全部订单</div>
        </van-grid-item>
        <van-grid-item>
          <van-icon name="like-o"></van-icon>
          <div class="text">待付款</div>
        </van-grid-item>
        <van-grid-item>
          <van-icon name="like-o"></van-icon>
          <div class="text">待收货</div>
        </van-grid-item>
        <van-grid-item>
          <van-icon name="like-o"></van-icon>
          <div class="text">退款/退货</div>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="other">
      <van-cell @click="toAddress" title="收货地址管理" is-link class="text"/>
      <van-cell @click="showPopup" title="退出登录" is-link class="text"/>
      <van-popup v-model="show" round position="bottom">
        <van-button @click="exit" type="danger" size="large">确认退出</van-button>
      </van-popup>
    </div>

  </div>
</template>

<script>
export default {
  name: "Person",
  data() {
    const module = '/ums-user'
    return {
      url: {
        getone: module + '/getone'
      },
      user: {
        name: '请登录',
        avatar: require('@/assets/unlogin.png'),
        token: []
      },
      show: false
    }
  },
  created() {
    // console.log('check out')
    if (this.$store.getters.GET_TOKEN !== '') {
      //console.log('token不为空')
      this.token = this.$store.getters.GET_TOKEN
      //console.log(this.token)
      this.get(this.url.getone, {id: this.token}, response => {
        // console.log(response)
        this.user.name = response.nickyName
        this.user.avatar = this.img(response.icon)
      })
    } else {
      // console.log('token为空')
    }
  },
  methods: {
    toAddress(){
      if (this.$store.getters.GET_TOKEN === '') {
        this.$notify({type: 'warning', message: '还未登录'})
      } else {
        this.$router.push({
          path: '/address',
        })
      }
    },
    editUserInfo() {
      if (this.$store.getters.GET_TOKEN === '') {
        this.$notify({type: 'warning', message: '还未登录'})
      } else {
        this.$router.push('/userInfo')
      }
    },
    toLogin() {
      if (this.$store.getters.GET_TOKEN === '') {
        this.$router.push('/login')
      } else {
        this.$notify({type: 'warning', message: '已经登录！无需再登录'})
      }
    },
    showPopup() {
      this.show = true;
    },
    sleep(d) {
      return new Promise((resolve) => setTimeout(resolve, d))
    },
    async exit() {
      if (this.$store.getters.GET_TOKEN === '') {
        this.$notify({type: 'warning', message: '还未登录'})
      } else {
        console.log("exit")
        this.$store.commit('SET_TOKEN', '')
        this.$notify({type: 'success', message: '已经成功退出登录'})
        await this.sleep(1000)
        this.$router.go(0)
      }

    }
  }
}
</script>

<style scoped lang="less">
#home {
  padding-bottom: 4.5rem;
}

.grid {
  position: absolute;
  width: 96%;
  left: 50%;
  top: 38%;
  transform: translate(-50%);
  z-index: 500;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.4);

  .num {
    color: blue;
    margin-bottom: 0.1rem;
  }

  .text {
    color: #808080;
    font-size: 0.76rem;
    padding: 0.2rem 0;
  }
}

.order {
  margin: 3.2rem 1rem 0 1rem;

  .text {
    color: #808080;
    font-size: 0.73rem;
    padding: 0.28rem 0 0.1rem 0;
  }
}

.van-cell {
  height: 3rem;
  border-bottom: 0.08rem solid #ccc;
}

.other {
  margin: 1rem 1rem 0 1rem;
}

.footer {
  margin: 1rem 1rem 0 1rem;
}

.user_img_warp {
  position: relative;
  background: #000;
}

.avtor {
  height: 42vh;
  overflow: hidden;
  background-color: #999;
  position: relative;
}

.image_big {
  height: 45vh;
  width: 100%;
  opacity: 0.6;
}

/* 用户头像 */
.avtor_logo {
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translate(-50%);
  text-align: center;
  z-index: 1000;
}

.image_icon {
  height: 6.5rem;
  width: 6.5rem;
  border-radius: 50%;
  border: #808080 solid 1px;
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.6);
}

/* 用户名 */
.user_name {
  color: #fff;
  font-size: 1.2rem;
  margin-top: 0.2rem;

  span {
    font-size: 0.8rem;
    color: #eee;
  }
}

.edit_user {
  color: #fff;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}
</style>