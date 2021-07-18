<template>
  <div class="cart-main">
    <!-- vant导航 -->
    <van-nav-bar title="购物车">
      <template #left>
        <van-icon @click="back" name="arrow-left" color="#6F717A" size="20px"/>
      </template>
      <template #right>
        <van-icon name="ellipsis" size="20px" color="#6F717A"/>
      </template>
    </van-nav-bar>

    <van-empty v-show="isShow" description="购物车目前还没有商品" image="https://img.yzcdn.cn/vant/custom-empty-image.png">
      <van-button round type="danger" class="bottom-button" @click="gotoGoods">去购物</van-button>
    </van-empty>
    <div v-for="item in carts" style="margin: 0 10px">
      <van-checkbox-group v-model="result" @change="onChecked">
        <van-row style="background-color: white;">
          <van-col span="2" style="margin-top: 40px;">
            <van-checkbox :name="item" style="margin-left: 8px"></van-checkbox>
          </van-col>
          <van-col span="22">
            <van-swipe-cell>
              <van-card :price="item.price" :title="item.name" :thumb="img(item.icon)" class="goods-card">
                <template #num>
                  <van-stepper theme="round" v-model="item.number" disable-input @change="onNum"/>
                </template>
              </van-card>
              <template #right>
                <van-button @click="del(item.id)" square text="删除" type="danger" class="delete-button"/>
              </template>
            </van-swipe-cell>
          </van-col>
        </van-row>
      </van-checkbox-group>
    </div>
    <div style="height: 55px"></div>

    <!-- vant提交订单栏 -->
    <van-submit-bar :price="total" button-text="提交订单">
      <van-checkbox v-model="checkedAll" @click="onAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  name: 'CartList',
  data() {
    const module = '/cart-stock'
    number: null
    return {
      carts: [], //添加到购物车的商品
      result: [], //所有复选框选中的商品
      checkedAll: false, //全选的状态
      isShow: false,
      url: {
        list: module + '/list',

        getone: module + '/getone',

        del: module + '/del',

        update: module + '/update',
      },

    }
  },

  created() {
    this.getCarts()
  },

  computed: {
    total() { //计算总价
      let total = 0
      this.result.map(item => {
        total += item.price * 100 * item.number
      })
      return total
    }
  },

  methods: {
    getCarts() {
      this.get(this.url.list, this.query, response => {
        this.carts = response
        this.isShow = this.carts.length <= 0;
      })
    },
    onNum() {
      for (let index in this.carts) {
        this.get(this.url.getone, {id: this.carts[index].id}, response => {
          this.post(this.url.update, this.carts[index], response => {
          })
        })
      }
    },
    onChecked() { //点击复选框，判断是否全选
      this.checkedAll = this.result.length === this.carts.length;
    },
    onAll() { //点击全选按钮
      if (this.checkedAll) { //如果为false的话全部选中，否则全不选
        this.result = this.carts
      } else {
        this.result = []
      }
    },

    del(id) {
      this.$dialog.confirm({
        title: '提示',
        message: '确定真的要删除该数据吗?',
      }).then(() => {
        this.post(this.url.del, {
          id: id
        }, () => {
          /* console.log(this.carts) */
          this.getCarts()
          this.$forceUpdate();
          //更改本地储存
          /* localStorage.carts = JSON.stringify(this.carts) */
        })
      }).catch(() => {
      });
      //删除后全选框还是全选状态
      if (this.carts.length > 0) { //显示或隐藏空状态
        this.isShow = false
      } else {
        this.isShow = true
        this.checkedAll = false
      }
    },
    gotoGoods() { //跳转到分类页
      this.$router.push({
        path: '/product'
      })
    },
    back() {
      this.$router.push({
        path: '/product'
      })
    }
  }
}
</script>

<style scoped="scoped" lang="less">
.cart-main {
  height: 300px;

  .goods-card {
    background-color: white;
  }

  .delete-button {
    height: 100%;
  }

  .bottom-button {
    width: 180px;
    height: 40px;
  }

}
</style>