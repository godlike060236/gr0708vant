<template>
  <div class="classify">
    <van-search
        v-model="query.name"
        shape="round"
        background="#fff"
        @search="onSearch"
        placeholder="请输入搜索关键词"
    />
    <van-tabs v-model="activeTop" @click="onClickTopTag" style="margin-bottom: 5px">
      <van-tab :title="item.name" :key="index" v-for="(item,index) in topTags"></van-tab>
    </van-tabs>
    <van-row>
      <van-col span="4" style="margin-right: 5px">
        <van-sidebar v-model="activeKey" class="sidebar" @change="onClickSideTag">
          <van-sidebar-item :title="item.name" :key="index" v-for="(item,index) in sideTags"/>
        </van-sidebar>
      </van-col>
      <van-col span="19">
        <div class="product-main">
          <van-list
              style="height:575px;width:100%;"
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              class="van-clearfix"
          >
            <div class="product">
              <van-swipe :autoplay="3000" style="height: 178px;width: 100%;margin-left: 6px">
                <van-swipe-item v-for="(image, index) in image" :key="index">
                  <img v-lazy="image"/>
                </van-swipe-item>
              </van-swipe>
              <ProductCard
                  v-for="(item,index) in list"
                  :item="item"
                  :key="index"
              />
            </div>
          </van-list>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import ProductCard from "./childComps/productCard";

export default {
  name: "Classify",
  data() {
    const baseUrl1 = '/pms-category'
    const baseUrl2 = '/pms-product'
    return {
      url: {
        getListById: baseUrl1 + '/getListById',
        list: baseUrl2 + '/list',
        listByCategory: baseUrl2 + '/listByCategory',
      },
      topTags: [],
      sideTags: [],
      image: [
        require('@/assets/classify-swipe-image1.jpg'),
        require('@/assets/classify-swipe-image2.jpg'),
        require('@/assets/classify-swipe-image3.jpg')
      ],
      images: [
        require('@/assets/3.jpeg'),
        require('@/assets/4.jpeg'),
      ],
      activeKey: 0,
      activeTop: 0,
      topId: 0,
      list: [],
      loading: false,
      finished: false,
      products: [],
      pages: null,
      totalProducts: null,
      query: {
        pageNo: 0,
        pageSize: 8,
        name: '',
        categoryId: '3',
        id: 0,
      },
    }
  },
  components: {
    ProductCard
  },
  created() {
    this.get(this.url.getListById, {id: this.query.id}, (response) => {
      this.topTags = response
      this.onClickTopTag(0)
      this.init()
    })
  },
  methods: {
    // 点击切换商品分类后，刷新数据
    refresh() {
      this.query.pageNo = 0
      this.list = []
      this.init()
    },
    // 初始化页面并加载默认选定的商品分类数据
    init() {
      this.get(this.url.listByCategory, this.query, (response) => {
        this.pages = response.pages
        this.totalProducts = response.total
        this.finished = false
        this.loading = true
        this.onLoad()
      })
    },
    // 异步更新数据
    onLoad() {
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
    // 加载对应分类的商品列表数据
    getTableData() {
      this.get(this.url.listByCategory, this.query, (response) => {
        for (let i = 0; i < response.records.length; i++) {
          this.list.push(response.records[i])
        }
      })
    },
    onSearch() {
    },
    onClickSideTag(index) {
      this.query.categoryId = this.sideTags[index].id
      this.refresh()
    },
    onClickTopTag(index) {
      this.get(this.url.getListById, {id: this.topTags[index].id}, (response) => {
        this.sideTags = response
        this.activeKey = 0
        this.query.categoryId = this.sideTags[0].id
        this.refresh()
      })
    },
  }
}
</script>

<style scoped lang="less">
.classify {
  .product-main {
    .product {
      margin-right: 2px;
      //display: flex;
      //flex-flow: wrap;
      //justify-content: space-around;
    }
  }
}
</style>