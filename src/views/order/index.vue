<template>
  <div class="order-main">
    <van-nav-bar title="确认订单">
      <template #left>
        <van-icon @click="back" name="arrow-left" color="#6F717A" size="20px"/>
      </template>
    </van-nav-bar>
    <div class="address-warp">
      <div class="address addnull" v-if=" !temporaryAddress || !temporaryAddress.id" @click="goAddress">
        点击添加收货地址
      </div>
      <div class="address" v-else @click="editAddress">
        <div class="icon">
          <van-icon name="location" class="location"/>
        </div>
        <div class="address-cont">
          <p class="name">收货人: {{ temporaryAddress.name }} <span>{{ temporaryAddress.tel }}</span></p>
          <p class="address-e">收货地址: {{ detailAddress }}</p>
          <p class="no">(收货不便时,可选择免费待收货服务)</p>
        </div>
        <div class="icon2">
          <van-icon name="arrow" class="location"/>
        </div>
      </div>
      <img :src="caitiao" width="100%" height="3px" alt="" class="caitiao">
    </div>
    <div class="product">
      <div v-for="item in orders" style="margin: 0 10px">
        <van-card :price="item.price" :title="item.name"
                  :num="item.number" :thumb="img(item.icon)" class="goods-card">
          <template #tags>
            <van-tag plain type="danger" style="margin-right: 10px;margin-top: 10px">{{ JSON.parse(item.sku)[0].value }}</van-tag>
            <van-tag plain type="danger">{{ JSON.parse(item.sku)[1].value }}</van-tag>
          </template>
        </van-card>
      </div>
    </div>
    <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit"/>
  </div>
</template>

<script>
import Item from "../../components/product/Item"

export default {
  name: "Order",
  data() {
    return {
      caitiao: require('../../assets/caitiao.jpg'),
      temporaryAddress: '',
      orders: [],
    }
  },
  components: {
    Item
  },
  computed: {
    total() { //计算总价
      let total = 0
      this.orders.map(item => {
        total += item.price * 100 * item.number
      })
      return total
    }
  },
  created() {
    this.init()
    this.orders = this.$store.getters.GET_ORDER
  },
  methods: {
    init() {
      this.get("/ums-address/list", {userId: this.$store.getters.GET_TOKEN}, response => {
        // console.log(response)
        for (let i = 0; i < response.length; i++) {
          if (response[i].isDefault === 1) {
            this.$store.commit('SET_ADDRESS', response[i])
            this.temporaryAddress = this.$store.getters.GET_ADDRESS
            this.detailAddress = this.temporaryAddress.province
                + this.temporaryAddress.city
                + this.temporaryAddress.county
                + this.temporaryAddress.addressDetail
          }
        }
      })
    },
    onSubmit() {

    },
    back() {
      this.$router.push({
        path: '/cart'
      })
    },
    editAddress() {
      this.$router.push({
        path: '/orderAddress',
      })
    },
    goAddress() {

    }
  },
}
</script>

<style scoped lang="less">

.address-warp {
  .caitiao {
    margin-top: -10px
  }

  .addnull {
    align-items: center;
    padding: 0 !important;
    justify-content: center;
    font-size: 14px
  }

  .address {
    display: flex;
    height: 90px;
    padding: 10px 10px 0;
    background: #fff;

    .icon {
      flex: 0 0 30px;
      width: 30px;
      align-self: center;

      .location {
        font-size: 30px
      }
    }

    .address-cont {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-right: 60px;


      .name {
        font-size: 18px;
        margin-bottom: 10px;

        span {
          font-size: 12px;
          margin-bottom: 10px;
        }
      }

      .address-e {
        font-size: 12px;
        margin-right: 5px;
        line-height: 1.4;
      }

      .no {
        color: #F9CC9D;
        font-size: 12px;
        letter-spacing: 1px;
        margin-top: -5px;
      }
    }

    .icon2 {
      flex: 0 0 10px;
      align-self: center;
    }
  }
}

</style>