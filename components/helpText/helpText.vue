<template name="helpText">
	<view class="body" >
		<view class="fanhui" @click="back">
			<view class="iconfont icon-fanhui"></view>
		</view>
		<view class="title">帮助说明</view>
		<view class="content-wrapper">
			<scroll-view class="content">
				<text class="content">
					这里是一些使用小技巧\n
					您可以点击项目列表标题进行刷新\n
					点击右上角设置按钮可以进行项目设置\n
					单击项目条目可以查看详细信息\n
					人员共有四种身份：超级管理员（项目创建者），管理员，开发者和游客\n
				</text>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "helpText",
		data() {
			return {

			};
		},
		methods: {
			back() {
				console.log("点击返回 ")
				this.$emit("closeHelpPopup")
			}
		}
	}
</script>

<style lang="scss">
	.body {
		height: 100vh;
		position: relative;
		width: 660rpx;
		height: 1050rpx;
		top: 30rpx;
		margin: 0 auto;
		background-color: white;
		border-radius: 30rpx;
		box-shadow: 0 4rpx 12rpx #888888;
		z-index: 10;
		.fanhui {
			position: absolute;
			left: 40rpx;
			top: 25rpx;
			width: 86rpx;
			height: 86rpx;

			.iconfont {
				font-size: 70rpx;
			}
		}
		.title {
			position: relative;
			top: 140rpx;
			left: -66rpx;
			height: 75rpx;
			font-size: 95rpx;
			text-align: center;
			line-height: 75rpx;
			letter-spacing: 10rpx;
		}
		.content-wrapper{
			position: absolute;
			width: 100%;
			top:250rpx;
			height: 700rpx;
			.content{
				display: block;
				width: 550rpx;
				height: 700rpx;
				margin: 0 auto;
				font-size: 37rpx;
			}
		}

	}
</style>
