<template name="checking">
	<view class="non-checked-body">
		<view class="non-checked-top-button">
			<view class="iconfont icon-fanhui" @click="back"></view>
		</view>
		<view class="non-checked-title">待审核</view>
		<view class="non-checked-detail">
			<progress class="non-checked-deadline-bar" stroke-width="45rpx" border-radius="300" active="true" color= "#5091f2" percent="60"></progress>
			<view class="non-checked-deadline-time">Deadline:2021.11.6</view>
			<view class="non-checked-mission">任务：完成xx特性</view>
			<view class="non-checked-info">A merged commit xxx into B:dev 1hour ago</view>
			<view class="non-checked-push">Feature:完成xx特性</view>
			<view class="iconfont icon-git-merge"></view>
		</view>
		<view class="non-checked-bottom-button">
			<view class="iconfont icon-shizhong" @click=""></view>
			<view class="iconfont icon-tijiao" @click=""></view>
			<view class="iconfont icon-withdraw" @click=""></view>
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
		this.$emit("closePopup")
	}, 
	
  }
}
</script>

<style lang="scss">
.non-checked-body{
	height: 100vh;
	position: relative;
	width: 660rpx;
	height: 1050rpx;
	top:30rpx;
	margin: 0 auto;
	background-color: white;
	border-radius: 30rpx;
	box-shadow: 0 4rpx 12rpx #888888;
	.non-checked-top-button{
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
	.non-checked-title{
		position: relative;
		top: 140rpx;
		left: -150rpx;
		height: 75rpx;
		font-size: 95rpx;
		text-align: center;
		line-height: 75rpx;
		letter-spacing: 10rpx;
	}
	.non-checked-detail{
		position: relative;
		top: 210rpx;
		left: 27rpx;
		font-size: 34rpx;
		.non-checked-deadline-time{
			position: relative;
			top: -50rpx;
			left: 27rpx;
			font-size: 30rpx;
		}
		.non-checked-deadline-bar{
			position: relative;
			top:-10rpx;
			width: 600rpx;
			left: 0rpx;
		}
		.non-checked-mission{
			position: relative;
			top:-20rpx;
			width: 600rpx;
			left: 10rpx;
			font-size: 37rpx;
		}
		.non-checked-info{
			position: relative;
			top:-1rpx;
			width: 600rpx;
			left: 10rpx;
			font-size: 30rpx;
		}
		.non-checked-push{
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
	.non-checked-bottom-button{
		view:nth-child(1){
			position: absolute;
			left: 70rpx;
			top:900rpx;
			font-size: 80rpx;
		}
		view:nth-child(2){
			position: absolute;
			left: 310rpx;
			top:910rpx;
			font-size: 65rpx;
		}
		view:nth-child(3){
			position: absolute;
			left: 520rpx;
			top:897rpx;
			font-size: 80rpx;
		}
	}

}
</style>