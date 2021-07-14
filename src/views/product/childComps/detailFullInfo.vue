<template>
  <div v-html="detailHtml" class="goods-info">{{detailHtml}}</div>
</template>

<script>
export default {
  name: "DetailFullInfo",
  props: ["detailHtml"]
};
</script>

<style>
.goods-info {
  border-bottom: 5px solid #f2f5f8;
}
img{
  width: 100%;
}
.graphic-pic img{
  width: 100%;
}
</style>