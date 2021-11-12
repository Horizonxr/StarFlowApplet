<template>
	<view>
		<view class="top">
			<view class="cancle">
				<view class="iconfont icon-fanhui">
					
				</view>
			</view>
			<view class="title"> 添加任务:</view>
			<view class="popupName">
				<view class="inputText">任务名称</view>
				<input class="input" type="text" value="请输入任务名称">
			</view>
			<view class="deadline">
				<view class="deadlineText">Deadline</view>
				<input class="input" type="text" value="时间">
			</view>
			<textarea value="请输入任务详情" class="details" />
			<view class="release">
				任务发放：
			</view>
			
			
		</view>
		<view class="bottom">
			<view class="">
				
			</view>
			
		</view>
	</view>
	
</template>

<script>
	export default {
		name:"test",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.top{
	position: fixed;
	top: 0rpx;
	left: 0rpx;
	height:714rpx;
	width: 100%;
	.title{
		font-size: 100rpx;
		color: #000;
		font-family: Adobe 黑体 Std;
		position: absolute;
		top:140rpx;
		left:40rpx;
	}
	.iconfont{
		font-size: 86rpx;
		position: absolute;
		top: 35rpx;
		left: 40rpx;
		background-color: pink;
	}
	.popupName{
		position: absolute;
		top: 262rpx;
		height: 74rpx;
		width: 750rpx;
		.inputText{
			position: absolute;
			left: 40rpx;
			font-size: 48rpx;
			color: #000;
			font-family: Adobe 黑体 Std;
		}
		.input{
			position: absolute;
			height: 74rpx;
			left:310rpx;
			border:0.5rpx solid #5c5c5c;
			border-radius: 37rpx;
			font-size: 33rpx;
			color: #5c5c5c;
			text-align: center;
			
		}
	}
	    .deadline{
			position: absolute;
			top: 362rpx;
			height: 74rpx;
			width: 750rpx;
			.deadlineText{
				position: absolute;
				left: 40rpx;
				font-size: 47rpx;
				color: #5c5c5c;
				font-family: Adobe 黑体 Std;
			}
			.input{
				position: absolute;
				height: 74rpx;
				left:310rpx;
				border:0.5rpx solid #5c5c5c;
				border-radius: 37rpx;
				font-size: 33rpx;
				color: #5c5c5c;
				text-align: center;
			
			}
		}
		.details{
			position: absolute;
			top: 444rpx;
			left: 40rpx;
			height: 162rpx;
			border:0.5rpx solid #5c5c5c;
			border-radius: 37rpx;
			font-size: 33rpx;
			color: #5c5c5c;
			text-align: center;
			}
		.release{
			position: absolute;
			top: 634rpx;
			left: 40rpx;
			font-size: 48rpx;
			color: #000;
			font-family: Adobe 黑体 Std;
			
		}
}
	.test1{
		height: 200rpx;
		width: 200rpx;
		background-color: pink;
	}
</style>
