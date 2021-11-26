<template>
	<view>
		<view class="tips-wrapper">
			<view>欢迎使用星流小程序</view>
			<view v-if="tips_show" :animation='tips_ani_data'>{{tips_text}}</view>
			
		</view>
		<view class="to_setting" @click="toAccountSettings()">转到设置</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_first:1,
				tips_text:'',
				tips_ani_data:{},
				tips_timer:{},
				tips_show:0,
			};
		},
		methods:{
			toAccountSettings(){
				uni.redirectTo({
					url:'../accountSettings/accountSettings'
				})
			},
			showTips(){
				let tips_arr=[
					"您好",
					"这是一款辅助GitHub",
					"进行任务管理的小程序",
					"初次见面",
					"请跟随步骤完成三个简单的设置"
				]
				let i = 0
				let timer = setInterval(()=>{
					this.tips_show = 1
					this.tips_text = tips_arr[i]
					setTimeout(()=>{
						this.tips_show = 0
					},1500)
					i = i+1
					if (i==tips_arr.length){
						clearInterval(timer)
					}
				},2000)
				console.log("调用动画")
			}
		},
		onLoad() {
			// if (uni.getStorageSync('is_first')==0){
			// 	uni.redirectTo({
			// 		url:'../projectSelect/projectSelect'
			// 	})
			// }
			setTimeout(()=>{
				this.$options.methods.showTips.bind(this)()
			},1000)
			uni.setStorage({
				key:'is_first',
				data:0
			})
		}
	}
</script>

<style lang="scss">
	.tips-wrapper{
		width: 100%;
		height: 400rpx;
		background-color: pink;
		view{
		}
		view:nth-child(1){
			margin-top: 100rpx;
			width: 100%;
			height: 70rpx;
			font-size: 70rpx;
			text-align: center;
		}
		view:nth-child(2){
			margin-top: 100rpx;
			width: 100%;
			text-align: center;
			font-size:50rpx;
			height: 100rpx;
			line-height: 100rpx;
		}
	}
	.to_setting{
		width: 100%;
		width: 500rpx;
		height: 100rpx;
		text-align: center;
		margin: 0 auto;
		font-size: 50rpx;
		line-height: 100rpx;
		border-radius: 20rpx;
		box-shadow: 0 4rpx 12rpx #888888;
	}
	
</style>
