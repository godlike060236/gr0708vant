<template>
  <div>
    <div>
      <router-view></router-view>
      <van-tabbar route v-model="active" border>
        <van-tabbar-item name="product" replace to="/product" icon="home-o">商品主页</van-tabbar-item>
        <van-tabbar-item name="classify" replace to="/classify" icon="apps-o">商品分类</van-tabbar-item>
        <van-tabbar-item name="cart" replace to="/cart" icon="cart-o">购物车</van-tabbar-item>
        <van-tabbar-item name="person" replace to="/person" icon="friends-o">个人中心</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      active: 0,
    };
  },
}
</script>

<style scoped>

</style>