<template>
	<div>
		<van-goods-action>
			<van-goods-action-icon icon="cart-o" text="购物车" badge="5" @click="onClickIcon" />
			<van-goods-action-button type="warning" text="加入购物车" v-bind:to="'/sku'" />
			<van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
		</van-goods-action>
		
	</div>
	
</template>

<script>
	import {
		Toast
	} from 'vant';
	
	export default {
		name: 'Goods',
		data() {
			return {
				
			}
		},
		methods: {
			onClickIcon() {
				Toast('点击图标');
			},
			onClickButton() {
				 
			},
		},
	};
</script>

<style>
</style>
