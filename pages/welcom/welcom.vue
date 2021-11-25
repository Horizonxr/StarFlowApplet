<template>
	<view>
		<view class="tips-wrapper">
			<view>欢迎使用星流小程序</view>
			<view>这是一款辅助GitHub进行任务管理的TodoList小程序</view>
			<view>在开始使用前，先让我们进行一些简单的设置</view>
		</view>
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
			if (uni.getStorageSync('is_first')==0){
				uni.redirectTo({
					url:'../projectSelect/projectSelect'
				})
			}
			uni.setStorage({
				key:'is_first',
				data:0
			})
		}
	}
</script>

<style lang="scss">

</style>
