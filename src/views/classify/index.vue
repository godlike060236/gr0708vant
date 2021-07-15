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
        <ProductList :query="query" ref="productList" :key="timer"></ProductList>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import ProductList from "./productList";

export default {
  name: "Classify",
  data() {
    const baseUrl = '/pms-category'
    return {
      url: {
        list: baseUrl + '/getListById',
      },
      timer: '',
      topTags: [],
      sideTags: [],
      activeKey: 0,
      activeTop: 0,
      topId: 0,
      query: {
        id: 0,
        pageNo: 0,
        pageSize: 8,
        name: '',
        categoryId: '3'
      },
    }
  },
  components: {
    ProductList
  },
  created() {
    this.get(this.url.list, {id: this.query.id}, (response) => {
      this.topTags = response
      console.log(this.topTags[0].id)
      this.onClickTopTag(0)
    })
  },
  methods: {
    onSearch() {
    },
    onClickSideTag(index) {
      this.query.categoryId = this.sideTags[index].id
      console.log(this.query.categoryId)
      this.timer = new Date().getTime()
    },
    onClickTopTag(index) {
      this.get(this.url.list, {id: this.topTags[index].id}, (response) => {
        this.sideTags = response
      })
      this.activeKey = 0
      this.query.categoryId = this.sideTags[0].id
      console.log("侧边栏id"+this.query.categoryId)
      this.timer = new Date().getTime()
    },
  }
}
</script>

<style scoped lang="less">
.classify {

}
</style>