<template>
  <div>
    <nav-bar :title="'编辑地址'" :back-to="'/order'" :left-text="'返回'" :is-arrow="true"/>
    <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        :address-info="addressInfo"
    />
  </div>
</template>

<script>
import {Toast} from 'vant';
import NavBar from '@/components/common/NavBar.vue';
import {areaList} from '@vant/area-data';

export default {
  name: "OrderAddressEdit",
  components: {
    NavBar
  },
  // 将路由中传递的参数order解耦到组件的props属性上
  // props: [
  //   'address'
  // ],
  data() {
    const module = '/ums-address'
    return {
      url: {
        getOne: module + '/getOne',
        save: module + '/save',
        del: module + '/del',
        changeDefault: module + '/changeDefault'
      },
      areaList: areaList,
      addressInfo: {},
      addId: '',
    };
  },
  created() {
    this.addId = this.$route.query.addressId
    if (this.addId !== "-1") {
      // 不等于-1,是修改
      this.showInfo(this.addId)
    }
  },
  methods: {
    // 新增或更改地址后提交表单的方法
    onSave(content) {
      content.userId = this.$store.getters.GET_TOKEN
      if (content.isDefault === true) {
        content.isDefault = 1
        this.changeDefaultAddress(content.userId)
      } else {
        content.isDefault = 0
      }
      // console.log(content)
      this.post(this.url.save, content, response => {
        // console.log("save: " + response)
        this.$router.push('/orderAddress')
      })
    },
    // 删除地址
    onDelete(content) {
      // console.log(content)
      this.post(this.url.del, {id: content.id}, response => {
        // console.log("del: " + response)
        this.$router.push('/address')
      })
    },
    //加载到表单显示数据的方法
    showInfo(id) {
      this.get(this.url.getOne, {addressId: id}, response => {
        //console.log(response)
        this.addressInfo = response
        if (this.addressInfo.isDefault === 1) {
          this.addressInfo.isDefault = true
        } else {
          this.addressInfo.isDefault = false
        }
        //console.log(this.addressInfo)
      })
    },
    // 更改默认地址（只能有一个默认地址）
    changeDefaultAddress(userId) {
      this.post(this.url.changeDefault, {id: userId}, response => {
        console.log("changeDefaultAddress: " + response)
      })
    }
  }
}
</script>

<style scoped>

</style>