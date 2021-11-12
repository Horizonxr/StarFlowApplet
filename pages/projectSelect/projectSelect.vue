<template>
	<view class="body">
		
		<view class="top-wrapper">
			<!-- 顶部 -->
			<view class="top">
				<view class="title">项目选择</view>
				<view class="account">当前账号：Horizon</view>
				<navigator class="top-button" url="" hover-class="navigator-hover">
				  <view class="iconfont icon-shezhi "></view>
				</navigator>
			</view>
		</view>
		<!-- 仓库列表 -->
		<view class="list-wrapper">
			<view class="list-item-wrapper">
				<view class="list-item" v-for="(item, key) in mission_list" :key=item.key>
					<view class="list-item-repositories">Horizon/TeamCase</view>
					<view class="list-item-more">
						<view class ="member-number">{{}}</view>
						<view class="iconfont icon-ren111"></view>
						<view class="list-item-description">This is a test case for TodoList</view>
						<progress class="list-item-bar" stroke-width="20rpx" border-radius="300" active="true" color= "#5091f2" percent="60"></progress>
					</view>
				</view>
			</view>
		</view>
		<!-- 背景 -->
		<view class="bg-circle">
			<view class='orange'></view>
			<view class='blue'></view>
			<view class='green'></view>
		</view>
	<!-- 弹出层 -->
	<view class="more-add">
		<button class="iconfont icon-zengjia" @click="open" ></button>
			<uni-popup ref="popup" type="center" >
				<view class="top-popup" >
					<view class="top-popup-text">创建项目</view>
					<view class="iconfont icon-zengjia" @click=""></view>	
				</view>	
				<view class="middle-popup">
				   <view class="middle-popup-text">加入项目</view>
					<view class="iconfont icon-jiarubanji" @click=""></view>
				</view>
				<view class="close-popup">
					<view class="close-popup-text">取消</view>
					<view class="iconfont icon-quxiao"@click=""></view>
				</view>	
			</uni-popup>
	</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				mission_list:[1,2,3,4,5,6,7,9,10,11,22]
			};
		},
		methods:{
			open(){
			  // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
			  this.$refs.popup.open('right')
							console.log("ok")
			}
		}
	}
</script>

<style lang="scss">
	.body{
		height: 100vh;
		z-index: -999;
	}
	.more-add{
		position: absolute;
		top:500rpx;
		.iconfont{
			width: 50px;
			height: 50px;
			font-size: 50rpx;
			border-radius: 50%;
			position: fixed;
			z-index: 10;
			left: 570rpx;
			top: 950rpx;
			background: rgba($color: #ffff, $alpha: 1);
			box-shadow: 15rpx 17rpx 15rpx 2rpx #888888;							
		}
		.top-popup{
			margin-top: 725rpx;
			position:relative;
			width: 400rpx;
			z-index: 100;
			.top-popup-text{
				position: absolute;
				color:#ffff;
				font-size:50rpx;
				left:-200rpx;
			}
			.iconfont{
				position: absolute;
				color:#ffff;
				font-size:50rpx;
				left:-200rpx;
				width: 50px;
				height: 50px;
				font-size: 50rpx;
				border-radius: 50%;
				position: fixed;
				z-index: 10;
				left: 570rpx;
				top: 950rpx;
				background: rgba($color: #ffff, $alpha: 1);
				box-shadow: 15rpx 17rpx 15rpx 2rpx #888888;				
							
			}
			
		}
		.middle-popup{
			position:relative;
			.middle-popup-text{
				top:100rpx;
				position: absolute;
				color:#ffff;
				font-size:50rpx;
				left:-200rpx;
			}
		}
		.close-popup{
			position:relative;
			.close-popup-text{
				top:200rpx;
				right:100rpx;
				position: absolute;
				color:#ffff;
				font-size:50rpx;
				left:-200rpx;
			}
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
		.list-item-wrapper{
			margin-top: 30rpx;
			width: 100%;
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
				
			}
		}
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
</style>
