<template>
	<view class="body">
		<uni-popup class="moremorePopup" ref="moremorePopup" type="center">
			<view class="more-text">添加新任务</view>
			<view class="help-text">帮助说明</view>
			<view class="quxiao-text">取消</view>
			<button class="button-more" @click="morePopup">
				<view class="iconfont icon-zengjia">
				</view>
			</button>
			<button class="button-jiaru" @click="morePopup">
				<view class="iconfont icon-qm">
				</view>
			</button>
			<button class="button-quxiao" @click="morePopup">
				<view class="iconfont icon-chahao size">
				</view>
			</button>
		</uni-popup>
		<view class="top-wrapper">
			<view class="top">
				<view class="title">项目名称</view>
				<view class="account">仓库：{{}}</view>
				<view class="top-button"><view class="iconfont icon-shezhi"></view></view>
			</view>
		</view>
		<view class="list-wrapper">
			<view class="list-item-wrapper">
				<view class="list-item" v-for="(item, key) in mission_list" :key=item.key>
					<view class="list-item-mission">任务：完成XXX特性</view>
					<view class="list-item-DDL">DeadLine: 2021.11.06</view>
					<view class="list-item-more"><view class="iconfont icon-gengduo"></view></view>
				</view>
			</view>
		</view>

		<button class="button-message" @click="morePopup">
			<view class="iconfont icon-zengjia">
			</view>
		</button>
		<!-- 消息提示 -->
	
		 

		<view class="progress-box">
				<progress show-info percent="60" stroke-width="12rpx" backgroundColor="#999" activeColor="#007AFF" font-size="8" border-radius="12rpx"/>		
			</view>
			
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mission_list:[1,2,3,4,5,6,7,9,10,11,22],
				msgType: 'success',
				message: '这是一条成功消息提示',
			};
		},
			methods: {
				morePopup(){
					this.$refs.moremorePopup.open("center")
				}
			}
		
		
	}
</script>

<style lang="scss">
	.body{
		height: 100vh;
		background-color: $bg-color;
		z-index: -999;
	}
	.moremorePopup{
		width: 100%;
		height: 100vh;
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
	.size{
		height:134rpx;
	}
	.more-text{
		z-index: 101;
		position:fixed;
		bottom:475rpx;
		right:200rpx;
		font-size: 55rpx;
		color: #fffefe;
		font-family: Adobe 黑体 Std;
	}
	.help-text{
		z-index: 101;
		position:fixed;
		bottom:305rpx;
		right:200rpx;
		font-size: 55rpx;
		color: #fffefe;
		font-family: Adobe 黑体 Std;
		
	}
	.quxiao-text{
		z-index: 101;
		position:fixed;
		bottom:125rpx;
		right:200rpx;
		font-size: 55rpx;
		color: #fffefe;
		font-family: Adobe 黑体 Std;
	}
	.button-more{
		height: 134rpx;
		width: 134rpx;
		border-radius: 50%;
		z-index: 101;
		position:fixed;
		bottom:425rpx;
		right:45rpx;
			.iconfont{
			
				font-size: 86rpx;
			}
	}
	.button-jiaru{
		height: 134rpx;
		width: 134rpx;
		border-radius: 50%;
		z-index: 101;
		position:fixed;
		bottom:255rpx;
		right:45rpx;
		.iconfont{
			font-size: 80rpx;
		  
		}
		
	}
	.button-quxiao{
		height: 134rpx;
		width: 134rpx;
		border-radius: 50%;
		z-index: 101;
		position:fixed;
		bottom:90rpx;
		right:45rpx;
		.iconfont{
			font-size: 80rpx;
		}
	}
	
	.list-wrapper{
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 1;
		background-color: $bg-color;
		.list-item-wrapper{
			margin-top: 30rpx;
			width: 100%;
			background-color: $bg-color;
			.list-item{
				margin: 22rpx auto;
				height: 120rpx;
				width: 615rpx;
				background-color: $bg-color;
				border-radius: 10rpx;
				box-shadow: 0 4rpx 12rpx #888888;
				background-color: $unfinished-mission;
				.list-item-mission{
					position: relative;
					left: 21rpx;
					top:24rpx;
					height: 28rpx;
					line-height: 28rpx;
					font-size: 28rpx;
					
				}
				.list-item-DDL{
					position: relative;
					left: 21rpx;
					top:57rpx;
					height: 25rpx;
					font-size: 25rpx;
					line-height: 25rpx;
					color: $less-important-font;
				}
				.list-item-more{
					width: 64rpx;
					height: 64rpx;
					.iconfont{
						position: relative;
						left:536rpx;
						top:-25rpx;
						font-size: 64rpx;
					}

				}
			}
		}
	}
.button-message{
	height: 134rpx;
	width: 134rpx;
	border-radius: 50%;
	z-index: 10;
	position:fixed;
	bottom:45rpx;
	right:37rpx;
	.iconfont{
		font-size: 80rpx;
	  
	}
}
.moremorePopup{
	z-index: 15;
}
	.progress-box{
				height: 20rpx;
				width: 90%;
				position: fixed;
				top: 95%;
				left: 5%;
				z-index: 10;
			}
		
		
		
		
		
	

		
		 
		
	
</style>
