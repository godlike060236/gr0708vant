<template>
  <div>
    <van-search
        v-model="query.name"
        shape="round"
        background="#fff"
        @search="onSearch"
        placeholder="请输入搜索关键词"
    />
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image,index) in images" :key="index">
        <img v-lazy="image" height="10%" width="100%"/>
      </van-swipe-item>
    </van-swipe>
    <div class="product-main">
      <van-list
          style="height:484px;width:100%;overflow-y:auto;"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          class="van-clearfix"
      >
        <div class="product">
          <Item
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
import Item from "./item"

export default {
  name: "Product",
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
        name:'',
      },
    };
  },
  components: {
    Item
  },
  created() {
    this.init()
  },
  methods: {
    // 初始化判定数据
    init(){
      this.get(this.url.list, this.query, (response) => {
        this.pages = response.pages
        this.totalProducts = response.total
      })
    },
    getTableData() {
      this.get(this.url.list, this.query, (response) => {
        for (let i = 0; i < response.records.length; i++) {
          this.list.push(response.records[i])
        }
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
    onSearch() {
      this.query.pageNo = 0
      this.list = undefined
      this.list = []
      this.init()
      this.finished = false
      this.onLoad()
    },
  }
}
</script>

<style scoped lang="less">
.product-main {
  margin: 15px;
  .product {
    display: flex;
    flex-flow: wrap;
    padding: 3px;
    justify-content: space-around;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    background-color: #fafafa;
  }

  .van-card {
    margin-bottom: 20px;
  }
}

</style>