<template>
  <div id="home">
    <van-nav-bar
        :title="title"
        :left-text="leftText"
        :left-arrow="isArrow"
        :fixed="true"
        :placeholder="true"
        @click-left="back"
    />
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    title: {
      type: String,
      default: ''
    },
    backTo: {
      type: String,
      default: ''
    },
    leftText: {
      type: String,
      default: ''
    },
    isArrow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back() {
      if (this.isArrow) {
        this.$router.push(this.backTo)
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar__left,
.van-nav-bar__right {
  font-size: 1.05rem;
}

.van-nav-bar__title {
  font-size: 1.08rem;
  letter-spacing: 0.1rem;
}

.van-nav-bar__text,
.van-nav-bar .van-icon {
  color: rgb(66, 66, 66);
}

.van-nav-bar--fixed {
  height: 3.2rem;
}
</style>