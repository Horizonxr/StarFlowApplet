<template name="createProject">
	<view class="body1">
		<!-- 返回按钮 -->
		<view class="top-button1"><view class="iconfont icon-fanhui" @click="back"></view></view>
		<view class="title1">创建项目</view>
		<view class="account1">当前帐号 Horizon</view>
		<!-- 搜索 -->
		<view class="search1">
			<view class="repositories-list1">仓库列表</view>
			<input class="input-name1" type="text" placeholder=" 输入仓库名称进行检索" />
			<view class="rectangle1"></view>
			<view class="iconfont icon-sousuo" @click="search"></view>
		</view>
		<!-- 确认按钮 -->
		<view class="bottom-button1">
			<view class="iconfont icon-duigoux"@click="finish"></view>
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
          back(){
          	this.$emit("closeCreatepopup");
          },  
          search(){
          	
          },
          finish(){
          	
          }  
  }
}
</script>
<style lang="scss">
.body1{
	height: 100vh;
	position: relative;
	width: 660rpx;
	height: 1050rpx;
	top:30rpx;
	margin: 0 auto;
	background-color: white;
	border-radius: 30rpx;
	box-shadow: 0 4rpx 12rpx #888888;
	.top-button1{
		position: absolute;
		left:40rpx;
		top:25rpx;
		width: 86rpx;
		height: 86rpx;
		.iconfont{
			font-size: 70rpx;
			}
	}
	.title1{
		position: relative;
		top: 140rpx;
		left: -65rpx;
		height: 75rpx;
		font-size: 95rpx;
		text-align: center;
		line-height: 75rpx;
		letter-spacing: 20rpx;
	}
	.account1{
		position: relative;
		top: 180rpx;
		left: 50rpx;
		font-size: 40rpx;
	}	
	.search1{
		position: relative;
		top: 210rpx;
		left: 50rpx;
		font-size: 34rpx;
		.repositories-list1{
			position: relative;
			font-size: 40rpx;
		}
		.rectangle1{
			position: absolute;
			top: 0rpx;
			left: 170rpx;
			font-size: 35rpx;
			width: 410rpx;
			height: 60rpx;
			border-radius: 15rpx;
			border:1px solid #d2d2d2;
		}
		.input-name1{
			position: absolute;
			top: 0rpx;
			left: 185rpx;
			font-size: 35rpx;
			width: 340rpx;
			height: 60rpx;
			border:none;
		}
		
		.iconfont{
			position: absolute;
			top: 1rpx;
			left: 525rpx;
			font-size: 64rpx;
		}
	}
	.bottom-button1{
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