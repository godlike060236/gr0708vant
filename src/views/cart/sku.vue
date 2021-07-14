<template>
	<van-sku 
		v-model="show" 
		:sku="sku" 
		:goods="goods" 
		:goods-id="goodsId" 
		:quota="quota" 
		:quota-used="quotaUsed"
		:hide-stock="sku.hide_stock" 
		:custom-stepper-config="customStepperConfig" 
		@buy-clicked="onBuyClicked"
		@add-cart="onAddCartClicked" />
</template>

<script>
	export default {
		name: 'Sku',
		data() {
			return {
				show: true,
				sku: {
					 tree: [
					    {
					      k: '颜色', // skuKeyName：规格类目名称
					      k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
					      v: [
					        {
					          id: '1', // skuValueId：规格值 id
					          name: '红色', // skuValueName：规格值名称   		         
					        },
					        {
					          id: '1',
					          name: '蓝色',         
					        }
					      ],
					    },
					  ],
				},
				goods: {
					// 数据结构见下方文档
				},
				messageConfig: {
					// 数据结构见下方文档
				},
			};
		},
	};
</script>

<style>
</style>
