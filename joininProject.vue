<template name="joininProject">
	<view class="body2">
		<view class="top-button2">
			<view class="iconfont icon-fanhui" @click="back"></view>
		</view>
		<view class="title2">项目搜索</view>
		<view class="search2">
			<input class="input-name2" type="text" placeholder=" 输入项目名称进行查找" />
			<view class="rectangle2"></view>
			<view class="iconfont icon-sousuo" @click="search"></view>
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
        flag:true 
    }
  },
  methods: {
    back(){
		this.$emit("closeJoininpopup")
	}, 
	search(){
		console.log("okkk")
	}
  }
}
</script>

<style lang="scss">
.body2{
	height: 100vh;
	position: relative;
	width: 660rpx;
	height: 1050rpx;
	top:30rpx;
	margin: 0 auto;
	background-color: white;
	border-radius: 30rpx;
	box-shadow: 0 4rpx 12rpx #888888;
	.top-button2{
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
	.title2{
		position: relative;
		top: 140rpx;
		left: -65rpx;
		height: 75rpx;
		font-size: 95rpx;
		text-align: center;
		line-height: 75rpx;
		letter-spacing: 20rpx;
	}
	.search2{
		position: relative;
		top: 210rpx;
		left: 50rpx;
		font-size: 34rpx;
		.rectangle2{
			position: absolute;
			width: 570rpx;
			left: -25rpx;
			height: 80rpx;
			border-radius: 15rpx;
			border:1px solid #d2d2d2;
		}
		.iconfont{
			position: absolute;
			left: 450rpx;
			font-size: 100rpx;
		}
		.input-name2{
			position: absolute;
			font-size: 35rpx;
			width: 450rpx;
			letter-spacing: 10rpx;
			height: 100rpx;
			border:none;
		}
		
		
	}
}
</style>