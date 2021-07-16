<template>
  <div class="HotSearch">
    <van-divider content-position="left">全网热搜</van-divider>
    <div class="hot" style="padding: 0 30px">
      <van-tag
               round
               color="#eeeeee" text-color="#999999"
               v-for="(item,index) in SearchHotList"
               :key="index"
               size="large"
               style="margin: 5px 8px;"
               @click="click(item,index)">
        {{item}}
      </van-tag>
    </div>
  </div>
</template>

<script>
export default {
  name:'HotSearch',
  props:['SearchHotList'],
  methods: {
    click(item,index){
      this.$emit('hotClick',item)
    }
  },
}
</script>

<style scoped lang="less">
.HotSearch {
  .hot {
    width: 85%;
    margin: 0 auto;
  }

  .HotSearch .hot .van-tag {
    margin: 3px 7px;
  }
}
</style>