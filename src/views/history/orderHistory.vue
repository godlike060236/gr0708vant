<template>
  <div>
    <div>
      <van-nav-bar left-text="返回" title="我的订单" left-arrow @click-left="onClickLeft"/>
    </div>
    <van-tabs v-model="active" title-active-color="red" @click="onClick">
      <van-empty v-show="isShow" description="您还没有相关的订单" image="https://img.yzcdn.cn/vant/custom-empty-image.png">
      </van-empty>
      <van-tab title="全部" :name="this.url.getAll">
        <div class="wap">
          <div v-for="item in orders" style="margin: 0 10px">
            <van-card :price="item.price" :title="item.name"
                      :num="item.number" :thumb="img(item.icon)" class="goods-card">
              <template #tags>
                <van-tag plain type="danger" style="margin-right: 10px;margin-top: 10px">{{
                    JSON.parse(item.sku)[0].value
                  }}
                </van-tag>
                <van-tag plain type="danger">{{ JSON.parse(item.sku)[1].value }}</van-tag>
              </template>
            </van-card>
          </div>
        </div>
      </van-tab>
      <van-tab title="未发货" :name="this.url.getIsCreate">
        <div v-for="item in orders" style="margin: 0 10px">
          <van-card :price="item.price" :title="item.name"
                    :num="item.number" :thumb="img(item.icon)" class="goods-card">
            <template #tags>
              <van-tag plain type="danger" style="margin-right: 10px;margin-top: 10px">{{
                  JSON.parse(item.sku)[0].value
                }}
              </van-tag>
              <van-tag plain type="danger">{{ JSON.parse(item.sku)[1].value }}</van-tag>
            </template>
          </van-card>
        </div>
      </van-tab>
      <van-tab title="已发货" :name="this.url.getIsDeliver">
        <div v-for="item in orders" style="margin: 0 10px">
          <van-card :price="item.price" :title="item.name"
                    :num="item.number" :thumb="img(item.icon)" class="goods-card">
            <template #tags>
              <van-tag plain type="danger" style="margin-right: 10px;margin-top: 10px">{{
                  JSON.parse(item.sku)[0].value
                }}
              </van-tag>
              <van-tag plain type="danger">{{ JSON.parse(item.sku)[1].value }}</van-tag>
            </template>
          </van-card>
        </div>
      </van-tab>
      <van-tab title="已完成" :name="this.url.getIsFinishWithoutDeliver">
        <div v-for="item in orders" style="margin: 0 10px">
          <van-card :price="item.price" :title="item.name"
                    :num="item.number" :thumb="img(item.icon)" class="goods-card">
            <template #tags>
              <van-tag plain type="danger" style="margin-right: 10px;margin-top: 10px">{{
                  JSON.parse(item.sku)[0].value
                }}
              </van-tag>
              <van-tag plain type="danger">{{ JSON.parse(item.sku)[1].value }}</van-tag>
            </template>
          </van-card>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Item from "../../components/product/Item";

export default {
  name: "OrderHistory",
  data() {
    const baseUrl = '/ums-order'
    return {
      url: {
        getIsCreate: baseUrl + '/getIsCreate',
        getIsDeliver: baseUrl + '/getIsDeliver',
        getIsFinishWithoutDeliver: baseUrl + '/getIsFinishWithoutDeliver',
        getAll: baseUrl + '/getAll'
      },
      orders: [],
      carts: [],
      tableData: [],
      active: 0,
      isShow: false,
    };
  },
  components: {
    Item
  },
  created() {
    this.getTableData(this.url.getIsCreate)
    this.getCarts()
  },
  methods: {
    getTableData(url) {
      this.get(url, {userId: this.$store.getters.GET_TOKEN}, response => {
        this.tableData = response
        for (let i = 0; i < response.length; i++) {
          let cartIds = response[i].productIds.substr(0, response[i].length).split(',')
          for (let j in cartIds) {
            this.get('/cart-stock/getListByCartStockId', {
                  active: 0,
                  cartStockId: cartIds[j]
                },
                response => {
                  this.orders.push(response[0])
                })
          }
        }
        this.isShow = this.tableData.length <= 0;
      })
    },
    getCarts() {
      this.get('/cart-stock/list', this.query, response => {
        //console.log(response)
        this.carts = response
        for (let j = 0; j < this.carts.length; j++) {
          let csku = [];
          csku.push(JSON.parse(this.carts[j].sku)[0].value + '/' + JSON.parse(this.carts[j].sku)[1].value)
          this.carts[j].sku = JSON.stringify(csku)
        }
      })
    },
    onClickLeft() {
      this.$router.push({
        path: '/person',
      })
    },
    onClick(name) {
      this.orders = []
      this.getTableData(name)
    }
  },
}
</script>

<style scoped="scoped">

</style>
