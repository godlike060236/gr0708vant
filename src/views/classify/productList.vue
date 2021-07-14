<template>
  <div>
    <div class="product-main">
      <van-list
          style="height:620px;width:100%;overflow-y:auto;"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          class="van-clearfix"
      >
        <div class="product">
          <ProductCard
              v-for="(item,index) in list"
              :item="item"
              :key="index"
          />
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import ProductCard from "./childComps/productCard";

export default {
  name: "ProductList",
  data() {
    const baseUrl = '/pms-product'
    return {
      url: {
        list: baseUrl + '/list',
      },
      list: [],
      loading: false,
      finished: false,
      images: [
        require('@/assets/3.jpeg'),
        require('@/assets/4.jpeg'),
      ],
      products: [],
      pages: null,
      totalProducts: null,
      query: {
        pageNo: 0,
        pageSize: 8,
        name: '',
      },
    };
  },
  components: {
    ProductCard
  },
  created() {
    this.init()
  },
  methods: {
    // 初始化判定数据
    init() {
      this.get(this.url.list, this.query, (response) => {
        this.pages = response.pages
        this.totalProducts = response.total
        console.log(response)
      })
    },
    getTableData() {
      this.get(this.url.list, this.query, (response) => {
        for (let i = 0; i < response.records.length; i++) {
          this.list.push(response.records[i])
        }
        console.log('加载product数据')
      })
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        if (this.query.pageNo < this.pages) {
          this.getTableData()
          this.query.pageNo++
        }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= this.totalProducts) {
          this.finished = true;
        }
      }, 1500);
    },
  }
}
</script>

<style scoped lang="less">
.product-main {
  .product {
    margin-right: 2px;
    //display: flex;
    //flex-flow: wrap;
    //justify-content: space-around;
  }
}
</style>