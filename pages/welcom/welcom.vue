<template>
	<view>
		<view class="tips-wrapper">
			<view>欢迎使用星流小程序</view>
			<view v-if="tips_show" :animation='tips_ani_data'>{{tips_text}}</view>
			
		</view>
		<view @click="toAccountSettings()">转到设置</view>
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
				tips_show:0
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
				console.log("调用动画")
				let i = 0
				this.tips_show = 1
				this.tips_timer = setInterval(()=>{
					this.tips_show = 1
					this.tips_ani = uni.createAnimation({
						duration:1400,
						timingFunction:'ease'
					})
					this.tips_text = tips_arr[i]
					console.log(this.tips_text)
					this.tips_ani.opacity(1).step({duration:100})
					this.tips_ani.opacity(0.5).step({delay:1000,duration:100})
					this.tips_ani_data = this.tips_ani.export()
					i = i + 1
					setTimeout(()=>{
						this.tips_show = 0
					},1000)
					console.log(i)
					if (i==tips_arr.length){
						clearInterval(this.tips_timer)
					}
				},3000)
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
			width: 100%;
			height: 70rpx;
			font-size: 70rpx;
			text-align: center;
		}
		view:nth-child(2){
			width: 100%;
			text-align: center;
			font-size:50rpx;
			height: 100rpx;
			line-height: 100rpx;
			opacity: 0;
		}
	}
</style>
