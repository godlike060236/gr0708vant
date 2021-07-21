<template>
  <div class="detail-main">
    <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <DetailBaseInfo :item="product"></DetailBaseInfo>
    <div style="background-color: #f2f5f8;padding-bottom: 5px;">———— &nbsp;商品详情&nbsp; ————</div>
    <DetailFullInfo :detailHtml="product.detailHtml"></DetailFullInfo>
    <div>
      <van-sku
          v-model="show"
          ref="getSkuData"
          :sku="sku"
          :goods="productImg"
          :hide-stock="sku.hide_stock"
          disable-stepper-input
          @buy-clicked="onBuyClicked"
          @add-cart="onAddCartClicked"
      >
      </van-sku>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" @click=""/>
        <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon"/>
        <van-goods-action-button type="warning" text="加入购物车" @click="showSku"/>
        <van-goods-action-button
            type="danger"
            text="立即购买"
            @click="onClickButton"
        />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import DetailBaseInfo from './childComps/detailBaseInfo'
import DetailFullInfo from './childComps/detailFullInfo'
import {Toast} from "vant";

export default {
  name: "Detail",
  data() {
    const baseUrl = '/pms-product'
    return {
      show: false,
      productId: null,
      url: {
        getProduct: baseUrl + '/getone',
      },
      product: {},
      productImg: {},
      cartList: {
        skuId: '',
        productId: '',
        name: '',
        number: '',
        price: '',
        icon: '',
      },
      sku: {
        tree: [
          // {
          //   k: '',
          //   k_s: '',
          //   v: []
          // }
        ],
        list: [
          // {
          //   s1: '', // 规格类目 k_s 为 s1 的对应规格值 id
          //   s2: '', // 规格类目 k_s 为 s2 的对应规格值 id
          //   id: '',
          //   price: 100, // 价格（单位分）
          //   stock_num: 110,// 当前 sku 组合对应的库存 */
          // }
        ],
        price: null,
        stock_num: 227, // 商品总库存
        none_sku: false,
      },
    }
  },
  components: {
    DetailBaseInfo,
    DetailFullInfo
  },
  created() {
    this.productId = this.$route.query.productId
    this.getProduct()
    this.getSkuValue()
  },
  methods: {
    getProduct() {
      this.get(this.url.getProduct, {id: this.productId}, (response) => {
        this.product = response
        this.$store.commit("addHistory",this.product.id)
        this.cartList.name = this.product.name
        this.cartList.icon = this.product.img
        this.productImg = {
          picture: 'http://192.168.119.22:9000/images/' + this.product.img,
        }
        this.sku.price = this.product.price
      })
    },
    showSku() {
      this.getStock()
      this.show = true
    },
    getSkuValue() {
      this.get('/pms-sku-value/list', {
        productId: this.productId
      }, (response) => {
        for (let i = 0; i < response.length; i++) {
          let treeItem = {}
          treeItem.k = response[i].name
          treeItem.k_s = 's' + (i + 1)
          treeItem.v = []
          for (let j = 0; j < JSON.parse(response[i].value).length; j++) {
            let temp = {}
            temp.id = JSON.stringify(j + 1)
            temp.name = JSON.parse(response[i].value)[j]
            treeItem.v.push(temp)
          }
          this.sku.tree.push(treeItem)
        }
      })
    },
    getStock() {
      this.get('/pms-stock/list', {
        productId: this.productId
      }, (response) => {
        let i = 0
        for (let j = 0; j < this.sku.tree[0].v.length; j++) {
          for (let k = 0; k < this.sku.tree[1].v.length; k++) {
            let listItem = {}
            listItem.id = response[i].id
            listItem.s1 = this.sku.tree[0].v[j].id
            listItem.s2 = this.sku.tree[1].v[k].id
            listItem.price = response[i].price * 100
            listItem.stock_num = response[i].stock
            listItem.skuList = response[i].skuList
            this.sku.list.push(listItem)
            i++
          }
        }
      })
    },
    onAddCartClicked() {
      this.cartList.productId = this.productId
      for (let i = 0; i < this.sku.list.length; i++) {
        if (this.$refs.getSkuData.selectedSkuComb.id === this.sku.list[i].id) {
          this.cartList.skuId = this.sku.list[i].id
          this.cartList.price = this.sku.list[i].price / 100
          this.cartList.sku = this.sku.list[i].skuList
          /* console.log(this.$refs.getSkuData.getSkuData().selectedSkuComb.id) */
        }
      }
      this.cartList.number = this.$refs.getSkuData.selectedNum
      this.post('/cart-stock/add', this.cartList, (response) => {
      })
      this.show = false
    },
    onClickButton() {
      // this.cartList.productId = this.productId
      // for (let i = 0; i < this.sku.list.length; i++) {
      //   if (this.$refs.getSkuData.selectedSkuComb.id === this.sku.list[i].id) {
      //     this.cartList.skuId = this.sku.list[i].id
      //     this.cartList.price = this.sku.list[i].price / 100
      //     this.cartList.sku = this.sku.list[i].skuList
      //     /* console.log(this.$refs.getSkuData.getSkuData().selectedSkuComb.id) */
      //   }
      // }
      // this.cartList.number = this.$refs.getSkuData.selectedNum
      // this.post('/cart-stock/add', this.cartList, (response) => {
      //   this.$store.commit("SET_SINGLEORDER",this.cartList)
      // })
      // this.$router.push({
      //   path: '/order',
      // })
      // this.show = false
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickIcon() {
      this.$router.push({
        path: '/cart'
      })
    },
    onBuyClicked() {
    },
  },
}
</script>

<style scoped lang="less">
.detail-main {
  background-color: #fff;

  .top-image {
    height: 314px;
    overflow: hidden;
  }

  .top-image img {
    width: 100%;
    height: 100%;
  }
}
</style>