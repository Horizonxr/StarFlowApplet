<template name="createProject">
<view class="body">
		<!-- <view class="top-wrapper"> -->
			<view class="top">
				<view class="top-button"><view class="iconfont icon-fanhui"></view></view>
				<view class="title">创建项目</view>
				<view class="account">当前帐号 Horizon</view>
				<view class="search">
					<view class="repositories-list">仓库列表</view>
					<input class="input-name" type="text" placeholder=" 输入仓库名称进行检索" />
					<view class="iconfont icon-sousuo"></view>
				</view>
				<view class="bottom-button">
					<view class="iconfont icon-duigoux"></view>
				</view>
				
			</view>
	<!-- 	</view> -->
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
	.account{
		position: relative;
		top: 180rpx;
		left: 50rpx;
		font-size: 40rpx;
	}	
	.search{
		position: relative;
		top: 210rpx;
		left: 50rpx;
		font-size: 34rpx;
		.repositories-list{
			position: relative;
			// top: 120rpx;
			// left: -2rpx;
			font-size: 40rpx;
		}
		.input-name{
			position: absolute;
			top: 0rpx;
			left: 180rpx;
			font-size: 35rpx;
			width: 410rpx;
			height: 60rpx;
			border-radius: 15rpx;
			border:1px solid #d2d2d2;
			// background-color:transparent;
		}
		.iconfont{
			position: absolute;
			top: 3rpx;
			left: 525rpx;
			font-size: 64rpx;
		}
	}
	.bottom-button{
		position: relative;
		top: 700rpx;
		left: 270rpx;
		font-size: 340rpx;
		.iconfont{
			font-size: 40px;
		}
	}
}
</style>