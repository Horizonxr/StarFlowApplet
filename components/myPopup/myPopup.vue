<template>
	<view>
		<view class="back"> 
			<view class="iconfont icon-fanhui" @click="close"></view>
			<view class="title">我的任务</view>
			<view class="slogan">This is a test case for Todolist</view>
			<view class="projectName">
				<view class="project">项目名称:</view>
				<input class="name" type="text" value="Horizon/TeamCase"></input>
			</view>
			<view class="warehouseName">
				<view class="warehouse">GitHub仓库：</view>
				<input class="address" value="http//">	</input>
				<view class="iconfont icon-chengong"></view>
			</view>
			<view class="personalManagement">
				<view class="title">人员管理：</view>
				<view class="iconfont icon-bi"></view>
				<view class="box">
					<view class="name">horizson</view>
					<view class="root">管理员</view>
				</view>
			</view>
			<view class="bottom">
				<view class="iconfont icon-fenxiang"></view>
				<view class="iconfont icon-yishenpi"></view>
				<view class="iconfont icon-duigou"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"myPopup",
		data() {
			return {
				
			};
		},
		methods:{
			close(){
				this.$emit("closemyPopup")
			}
		}
	}
</script>

<style lang="scss">
 .back{
	 position: relative;
	 height: 1110rpx;
	 width: 670rpx;
	 background-color: #FFFFFF;
	 .iconfont{
	 				font-size: 86rpx;
	 				position: absolute;
	 				top: 25rpx;
	 				left: 40rpx;
	 				}
	.title{
			font-size: 100rpx;
			color: #000;
			position: absolute;
			top:130rpx;
			left:40rpx;
				}
	.slogan{
		position: absolute;
		top: 250rpx;
		left:40rpx;
		font-size: 35rpx;
		color: #000000;
	}
	.projectName{
		position: absolute;
		top: 292rpx;
		height: 75rpx;
		width: 670rpx;
		.project{
			position: absolute;
			top: 15rpx;
			left: 40rpx;
			font-size: 48rpx;
			color: #000000;
		}
		.name{
			position: absolute;
			height: 77rpx;
			width: 350rpx;
			top: 0;
			left: 270rpx;
			font-size: 33rpx;
			color: #000000;
			border: 0.5rpx solid #817d7e;
			border-radius: 10rpx;
			text-align: center;
		}
		
	}
	.warehouseName{
		position: absolute;
		top: 375rpx;
		height: 155rpx;
		width: 670rpx;
		.warehouse{
			position: absolute;
			left: 40rpx;
			font-size: 48rpx;
			color: #000000;
		}
		.address{
			position: absolute;
			top: 60rpx;
			left: 40rpx;
			height: 75rpx;
			width: 577rpx;
			border: 0.5rpx solid #817d7e;
			border-radius: 10rpx;
			padding-left: 20rpx;
		}
	}
	.personalManagement{
		position: absolute;
		top: 530rpx;
		height: 270rpx;
		width: 670rpx;
		.title{
			position: absolute;
			top: 0;
			left: 40rpx;
			color: #000000;
			font-size: 48rpx;
		}
		.iconfont{
			position: absolute;
			left: 545rpx;
			font-size: 48rpx;
		}
		.box{
			position: absolute;
			top: 74rpx;
			left: 100rpx;
			.name{
				position: absolute;
				top: 0;
				left: 0;
				color: #000000;
				font-size: 33rpx;
			}
			.root{
				position: absolute;
				color: #000000;
				font-size: 28rpx;
				left: 190rpx;
				border: 0.5rpx solid #000000;
				width: 209rpx;
				height: 40rpx;
				text-align: center;
				line-height: 40rpx;
			}
			
		}
	}
	 .bottom{
		 .icon-fenxiang{
			 position: absolute;
			 font-size: 81rpx;
			 left: 78rpx;
			 top: 1000rpx;
		 }
		 .icon-yishenpi{
		 			position: absolute;
		 			font-size: 82rpx;
		 			left: 294rpx;
		 			top: 1000rpx;
		 }
		 .icon-duigou{
			 position: absolute;
			 font-size: 82rpx;
			 left: 492rpx;
			 top: 1008rpx;
		 }
	 }

		 
	 }
	 
 
</style>
