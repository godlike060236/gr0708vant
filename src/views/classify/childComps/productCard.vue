<template>
  <div class="product-item">
    <van-card
        @click="itemClick(item.id)"
        num="3"
        :price="item.price"
        desc="商品介绍"
        :title="item.title"
        :thumb="img(item.img)"
        :origin-price="item.price"
        style="background-color: white"
    >
      <template #tags>
        <van-tag v-for="(tag,index) in item.keywords.substr(0,item.keywords.length).split(' ')"
                 plain type="danger"
                 :key="index" style="margin: 0 5px"
        >
          {{ tag }}
        </van-tag>
      </template>
    </van-card>
    <div class="space"></div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  methods: {
    itemClick(productId) {
      this.$router.push({
        path: '/detail',
        query: {
          productId: productId,
        },
      })
    }
  },
}
</script>

<style scoped lang="less">
.product-item {
  .space {
    background-color: #eeeeee;
    height: 5px;
  }
}
</style>