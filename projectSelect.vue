<template>
	<view class="body">
		
		<view class="top-wrapper">
			<view class="top">
				<view class="title">项目选择</view>
				<view class="account">当前账号：Horizon</view>
				<navigator class="top-button" url="" hover-class="navigator-hover">
				  <view class="iconfont icon-shezhi "></view>
				</navigator>
			</view>
		</view>
		
		<view class="list-wrapper">
			<view class="list-item-wrapper">
				<view class="list-item" v-for="(item, key) in mission_list" :key=item.key>
					<view class="list-item-repositories">Horizon/TeamCase</view>
					<view class="list-item-more">
						<view class ="member-number">{{}}</view>
						<view class="iconfont icon-ren111"></view>
						<view class="list-item-description">This is a test case for TodoList</view>
						<progress class="list-item-bar" stroke-width="20rpx" border-radius="300" active="true" percent="60"></progress>
					</view>
					</view>
			</view>
		</view>
		<view class="bg-circle">
			<view class='orange'></view>
			<view class='blue'></view>
			<view class='green'></view>
		</view>
		
		<view class="more-add">
			<view class="iconfont icon-zengjia"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mission_list:[1,2,3,4,5,6,7,9,10,11,22]
			};
		}
	}
</script>

<style lang="scss">
	.body{
		height: 100vh;
		// background-color: $bg-color;
		z-index: -999;
	}
	.bg-circle{
		.orange{
			width: 90px;
			height: 90px;
			border-radius: 50%;
			position: fixed;
			z-index: 0;
			left: 80rpx;
			top: 450rpx;
			background: rgba($color: $uni-color-warning, $alpha: 0.9);			
		}
		.blue{
			width: 180px;
			height: 180px;
			left: 230rpx;
			top: 400rpx;
			position: fixed;
			border-radius: 50%;
			background: rgba($color: $pending-mission, $alpha: 0.9);
		}
		.green{
			width: 120px;
			height: 120px;
			left: 190rpx;
			top: 700rpx;
			position: fixed;
			border-radius: 50%;
			background: rgba($color: $uni-color-success, $alpha: 0.9);
		}
	}
	.more-add{
		position: fixed;		
	 	.iconfont{z-index: 100;
	 	position: fixed;
	 	font-size: 120rpx;
	 	left: 560rpx;
	 	top: 1000rpx;
	 	border-radius: 50%;
	 	background: rgba($color:#fff, $alpha: 1);	
	 	box-shadow: 15rpx 17rpx 15rpx 2rpx #888888;	
	}
}
	
	.top-wrapper{
		top:0rpx;
		position: sticky;
		width: 100%;
		height: 200rpx;
		z-index: 10;
		
		.top{
			position: relative;
			width: 666rpx;
			height: 200rpx;
			margin: 0 auto;
			background-color: white;
			border-radius: 30rpx;
			box-shadow: 0 4rpx 12rpx #888888;
			
			.title{
				position: absolute;
				top: 34rpx;
				left: 23rpx;
				height: 75rpx;
				font-size: 75rpx;
				text-align: center;
				line-height: 75rpx;
			}
			.account{
				position: absolute;
				bottom: 30rpx;
				left: 23rpx;
				font-size: 34rpx;
			}
			.top-button{
				position: relative;
				left:555rpx;
				top:58rpx;
				width: 86rpx;
				height: 86rpx;
				.iconfont{

					font-size: 86rpx;
				}
			}
		}
	}
	
	.list-wrapper{
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 1;
		// background-color: $bg-color;
		.list-item-wrapper{
			margin-top: 30rpx;
			width: 100%;
			// background-color: $bg-color;
			.list-item{
				margin: 22rpx auto;
				height: 120rpx;
				width: 615rpx;
				border-radius: 10rpx;
				box-shadow: 0 4rpx 12rpx #888888;
				background-color:rgba($color: #ffff, $alpha: 0.5);
				.list-item-repositories{
					position: relative;
					left: 21rpx;
					top:20rpx;
					height: 28rpx;
					line-height: 28rpx;
					font-size: 28rpx;
					
				}
				.list-item-more{
					width: 750rpx;
					height: 64rpx;	
				}
				.member-number{
					position: relative;
					left:50rpx;
					top:-10rpx;
				}
				.iconfont{
					position: relative;
					left:500rpx;
					top:-20rpx;
					font-size: 50rpx;
				}
				
				.list-item-description{
					position: relative;
					left: 21rpx;
					top:-30rpx;
					height: 25rpx;
					font-size: 25rpx;
					line-height: 25rpx;
					color: $less-important-font;
				}
				.list-item-bar{
					position: relative;
					left: 21rpx;
					top:-10rpx;
					stroke-width:6rpx ;
					font-size: 20rpx;
				}
			}
		}
	}
	
</style>
