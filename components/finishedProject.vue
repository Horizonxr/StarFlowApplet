<template name="finished-Project">
	<view class="finished-body">
		<view class="finished-top-button">
			<view class="iconfont icon-fanhui" @click="back"></view>
		</view>
		<view class="finished-title">已完成</view>
		<view class="finished-detail">
			<progress class="finished-deadline-bar" stroke-width="45rpx" border-radius="300" active="true" color= "#5091f2" percent="60"></progress>
			<view class="finished-deadline-time">END: 2021.11.6</view>
			<view class="finished-mission">任务：完成xx特性</view>
			<view class="finished-push">Feature:完成xx特性</view>
			<view class="iconfont icon-git-merge"></view>
		</view>
		<view class="finished-bottom-button">
			<view class="iconfont icon-shizhong" @click=""></view>
			<view class="iconfont icon-lajitong" @click=""></view>
		</view>
	</view>
</template>
<script>
export default {
  name: 'myinput',
  props: {
            
  },
  data() {
    return {
        repositories_list:[]
    }
  },
  methods: {
    back(){
		this.$emit("")
	}, 
	
  }
}
</script>

<style lang="scss">
.finished-body{
	height: 100vh;
	position: relative;
	width: 660rpx;
	height: 1050rpx;
	top:30rpx;
	margin: 0 auto;
	background-color: white;
	border-radius: 30rpx;
	box-shadow: 0 4rpx 12rpx #888888;
	.finished-top-button{
		position: absolute;
		z-index: 100;
		left:40rpx;
		top:25rpx;
		width: 86rpx;
		height: 86rpx;
		.iconfont{
			font-size: 70rpx;
			}
	}
	.finished-title{
		position: relative;
		top: 140rpx;
		left: -150rpx;
		height: 75rpx;
		font-size: 95rpx;
		text-align: center;
		line-height: 75rpx;
		letter-spacing: 10rpx;
	}
	.finished-detail{
		position: relative;
		top: 210rpx;
		left: 27rpx;
		font-size: 34rpx;
		.finished-deadline-time{
			position: relative;
			top: -50rpx;
			left: 27rpx;
			font-size: 30rpx;
		}
		.finished-deadline-bar{
			position: relative;
			top:-10rpx;
			width: 600rpx;
			left: 0rpx;
		}
		.finished-mission{
			position: relative;
			top:-20rpx;
			width: 600rpx;
			left: 10rpx;
			font-size: 37rpx;
		}
		.finished-info{
			position: relative;
			top:-1rpx;
			width: 600rpx;
			left: 10rpx;
			font-size: 30rpx;
		}
		.finished-push{
			position: relative;
			top:100rpx;
			width: 550rpx;
			height:70rpx;
			left: 26rpx;
			font-size: 35rpx;
			border-radius: 5rpx;
			background-color:$pending-mission;
			text-align: center;
			line-height:60rpx;
			border:1px solid #d2d2d2;
		}
		.iconfont{
			position: relative;
			left: 45rpx;
			top:37rpx;
			font-size: 55rpx;
		}
	}
	.finished-bottom-button{
		view:nth-child(1){
			position: absolute;
			left: 200rpx;
			top:900rpx;
			font-size: 80rpx;
		}
		view:nth-child(2){
			position: absolute;
			left: 400rpx;
			top:900rpx;
			font-size: 85rpx;
		}
	}

}
</style>