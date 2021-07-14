<template>
  <div>
    <van-search
        v-model="query.name"
        shape="round"
        background="#fff"
        @search="onSearch"
        placeholder="请输入搜索关键词"
    />
    <van-row type="flex">
      <van-col span="4.5">
        <van-sidebar v-model="activeKey" class="sidebar" >
          <van-sidebar-item title="标签名1" to="/productList"></van-sidebar-item>
          <van-sidebar-item title="标签名2"/>
          <van-sidebar-item title="标签名3"/>
        </van-sidebar>
      </van-col>
      <van-col span="19">
        <van-tabs v-model="active" style="margin-bottom: 5px">
          <van-tab title="综合"></van-tab>
          <van-tab title="销量"></van-tab>
          <van-tab title="新品"></van-tab>
        </van-tabs>
        <div>
          <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" />
          </van-swipe-item>
        </van-swipe>
        </div>
        <router-view></router-view>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: "Classify",
  data() {
    return {
      activeKey: 0,
      active: 0,
      query: {
        pageNo: 0,
        pageSize: 8,
        name: '',
      },
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg',
      ],
    }
  },
  methods: {
    onSearch() {
    },
  }
}
</script>

<style scoped lang="less">

</style>