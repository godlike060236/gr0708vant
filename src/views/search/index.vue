<template>
  <div>
    <van-nav-bar
        title="商品搜索"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <van-search
        v-model="inputData"
        shape="round"
        background="#fff"
        @search="onSearch"
        placeholder="请输入搜索关键词"
    />
    <HotSearch v-show="isSearch" :SearchHotList="HotSearchList" @hotClick="hotClick"/>
    <div class="product-main">
      <van-list
          style="height:590px;width:100%;overflow-y:auto;"
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
import HotSearch from "./childComps/hotSearch";
import Item from "../../components/product/Item";

export default {
  name: "index",
  data() {
    const baseUrl = '/pms-product'
    return {
      url: {
        getHotWords: baseUrl + '/getHotWords',
        list: baseUrl + '/list',
      },
      inputData: '',
      isSearch: true,
      HotSearchList: [],
      query: {
        pageNo: 0,
        pageSize: 8,
        name: '',
        categoryId:'',
        keyWord: '',
      },
      list: [],
      loading: false,
      finished: true,
      products: [],
      pages: null,
      totalProducts: null,
    }
  },
  components: {
    HotSearch,
    Item
  },
  created() {
    this.getSearchHot()
  },
  methods: {
    async getSearchHot() {
      await this.get(this.url.getHotWords, null, response => {
        this.HotSearchList = response
      })
    },
    init() {
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
          if(this.query.keyWord!=null){
            this.getTableData()
          }else {
            this.get
          }
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
    onClickLeft() {
      this.$router.push({
        path: '/classify',
      })
    },
    onSearch() {
      this.query.name = this.inputData
      this.query.pageNo = 0
      this.list = []
      this.isSearch = false
      this.loading = true
      this.finished = false
      this.init()
      this.onLoad()
    },
    hotClick(item) {
      this.query.keyWord = item
      this.query.pageNo = 0
      this.list = []
      this.inputData = item
      this.isSearch = false
      this.loading = true
      this.finished = false
      this.init()
      this.onLoad()
    },
  },
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