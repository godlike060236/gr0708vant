<template>
  <div class="detail-main">
    <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <DetailBassInfo :item="product"></DetailBassInfo>
    <div style="background-color: #f2f5f8;padding-bottom: 5px;">———— &nbsp;商品详情&nbsp; ————</div>
    <DetailFullInfo :detailHtml="product.detailHtml"></DetailFullInfo>
    <div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon"/>
        <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon"/>
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
import DetailBassInfo from './childComps/detailBassInfo'
import DetailFullInfo from './childComps/detailFullInfo'
import {Toast} from "vant";

export default {
  name: "Detail",
  data() {
    const baseUrl = '/pms-product'
    return {
      productId: null,
      url: {
        getProduct: baseUrl + '/getone',
      },
      product: {},
    }
  },
  components: {
    DetailBassInfo,
    DetailFullInfo
  },
  created() {
    this.productId = this.$route.query.productId
    this.getProduct()
  },
  methods: {
    getProduct() {
      this.get(this.url.getProduct, {id: this.productId}, (response) => {
        this.product = response
        console.log(response)
      })
    },
    onClickLeft() {
      this.$router.push({
        path: '/product',
      })
    },
    onClickIcon() {
      Toast('点击图标');
    },
    onClickButton() {
      Toast('点击按钮');
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