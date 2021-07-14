<template>
  <div class="goods-item" @click="itemClick(item.id)">
    <img :src="img(item.img)"/>
    <!--    <div class="goods-num">已售{{ goodsItem.goodsBuyNum | sellCountFilter }}件</div>-->
    <div id="goods-info">
      <p>{{ item.name }}</p>
      <span class="price">
        <span style="font-size: 10px">￥</span>{{ item.price }}
      </span>
      <van-icon name="star-o" style="margin-right: 6px"/>
      <span class="collect">{{ 125 }}</span>
      <div class="goods">
        <div class="old-price">{{ item.price }}</div>
        <!-- <div class="goodsAre">{{goodsItem.goodsAre}}</div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  //进行数据的处理
  filters: {
    sellCountFilter(value) {
      let rselt = value;
      if (value > 10000) {
        rselt = (rselt / 10000).toFixed(1) + '万'
      }
      return rselt
    }
  },
  methods: {
    itemClick(productId) {
      this.$router.push({
        path: '/detail',
        query: {
          productId: productId,
        },
      })
    },
  }
};
</script>

<style scoped>
.goods-item {
  position: relative;
  padding-bottom: 52px;
  width: 48%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
  margin-bottom: 5px;
  min-height: 100px
}

#goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

#goods-info .sc-img {
  position: relative;
  left: -4px;
  top: 2px;
  width: 14px;
  height: 14px;
}

#goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 1px;
}

#goods-info .price {
  color: red;
  font-size: 20px;
  margin-right: 20px;
}

#goods-info .collect {
  position: relative;
}

.old-price {
  color: gainsboro;
  margin-right: 10px;
  text-decoration: line-through;
  font-size: 10px;
  margin-left: 5px;
  float: left;
}

.goodsAre {
  font-size: 10px;
  margin-right: 5px;
  float: right;
}

.goods {
  height: 10px;
}

.goods-num {
  position: absolute;
  top: -85px;
  left: 0;
  right: 0;
  min-width: 30%;
  max-width: 40%;
  height: 1rem;
  line-height: 1rem;
  z-index: 3;
  color: white;
  text-align: left;
  background-size: 100%;
  font-size: .3rem;
  text-overflow: ellipsis;
  /*background: url('~assets/img/category/index.png') 0 no-repeat;*/
  padding-left: 5px;
}
</style>