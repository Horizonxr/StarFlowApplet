<template>
	<view>
		<view>欢迎使用星流小程序</view>
		<view>小程序是一款辅助GitHub进行任务管理的TodoList</view>
		<view>在开始使用前，先让我们进行一些简单的设置</view>
		<view @click="toAccountSettings()">转到设置</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_first:1
			};
		},
		methods:{
			toAccountSettings(){
				uni.redirectTo({
					url:'../accountSettings/accountSettings'
				})
			}
		},
		onLoad() {
			this.is_first = uni.getStorageSync('is_first')
			if (!this.is_first){
				uni.redirectTo({
					url:'../projectSelect/projectSelect'
				})
			}
			else {
				uni.setStorage({
					key:'is_first',
					data:1
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
