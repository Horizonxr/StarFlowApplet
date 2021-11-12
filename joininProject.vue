<template name="joininProject">
<view class="body">
		
			<view class="top">
				<!-- 返回按钮 -->
				<view class="top-button"><view class="iconfont icon-fanhui"></view></view>
				<!-- 标题 -->
				<view class="title">项目搜索</view>
				<!-- 搜索栏 -->
					<view class="search">
						<input class="input-name" type="text" placeholder=" 输入项目名称进行查找" />
						<view class="iconfont icon-sousuo"></view>
				</view>
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
                
    }
  },
  methods: {
            
  }
}
</script>

<style lang="scss">
.body{
		height: 100vh;
		background-color: $bg-color;
		z-index: -999;
	}
.top{
	position: relative;
	width: 660rpx;
	height: 1050rpx;
	top:50rpx;
	margin: 0 auto;
	background-color: white;
	border-radius: 30rpx;
	box-shadow: 0 4rpx 12rpx #888888;
	.top-button{
		position: absolute;
		left:40rpx;
		top:25rpx;
		width: 86rpx;
		height: 86rpx;
		.iconfont{
			font-size: 70rpx;
			}
	}
	.title{
		position: relative;
		top: 140rpx;
		left: -65rpx;
		height: 75rpx;
		font-size: 95rpx;
		text-align: center;
		line-height: 75rpx;
		letter-spacing: 20rpx;
	}
	.search{
		position: relative;
		top: 210rpx;
		left: 50rpx;
		font-size: 34rpx;
		.input-name{
			position: absolute;
			top: 0rpx;
			left: 0rpx;
			font-size: 35rpx;
			width: 550rpx;
			letter-spacing: 10rpx;
			height: 100rpx;
			border-radius: 15rpx;
			border:1px solid #d2d2d2;
			// background-color:transparent;
		}
		.iconfont{
			position: absolute;
			top:10rpx;
			left: 450rpx;
			font-size: 100rpx;
		}
	}
}
</style>