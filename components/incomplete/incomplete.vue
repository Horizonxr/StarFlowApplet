<template name="incomplete">
	<view class="unfinished-body">
		<view class="unfinished-top-button">
			<view class="iconfont icon-fanhui" @click="back"></view>
		</view>
		<view class="unfinished-title">待完成</view>
		<view class="unfinished-detail">
			<progress class="unfinished-deadline-bar" stroke-width="45rpx" border-radius="300" active="true"
				color="#5091f2" percent="60"></progress>
			<view class="unfinished-deadline-time">Deadline:2021.11.6</view>
			<view class="unfinished-mission">任务：完成xx特性</view>
			<view class="unfinished-pull-repositories" @click="">点击拉取</view>
		</view>
		<view class="unfinished-bottom-button">
			<view class="iconfont icon-shizhong" @click=""></view>
			<view class="iconfont icon-tijiao" @click=""></view>
			<view class="iconfont icon-lajitong" @click=""></view>
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
				repositories_list: []
			}
		},
		methods: {
			back() {
				this.$emit("")
			},

		}
	}
</script>

<style lang="scss">
	.unfinished-body {
		height: 100vh;
		position: relative;
		width: 660rpx;
		height: 1050rpx;
		top: 30rpx;
		margin: 0 auto;
		background-color: white;
		border-radius: 30rpx;
		box-shadow: 0 4rpx 12rpx #888888;

		.unfinished-top-button {
			position: absolute;
			z-index: 100;
			left: 40rpx;
			top: 25rpx;
			width: 86rpx;
			height: 86rpx;

			.iconfont {
				font-size: 70rpx;
			}
		}

		.unfinished-title {
			position: relative;
			top: 140rpx;
			left: -150rpx;
			height: 75rpx;
			font-size: 95rpx;
			text-align: center;
			line-height: 75rpx;
			letter-spacing: 10rpx;
		}

		.unfinished-detail {
			position: relative;
			top: 210rpx;
			left: 27rpx;
			font-size: 34rpx;

			.unfinished-deadline-time {
				position: relative;
				top: -50rpx;
				left: 27rpx;
				font-size: 30rpx;
			}

			.unfinished-deadline-bar {
				position: relative;
				top: -10rpx;
				width: 600rpx;
				left: 0rpx;
			}

			.unfinished-mission {
				position: relative;
				top: -20rpx;
				width: 600rpx;
				left: 10rpx;
				font-size: 37rpx;
			}

			.unfinished-pull-repositories {
				position: relative;
				top: 60rpx;
				width: 150rpx;
				height: 50rpx;
				left: 0rpx;
				font-size: 30rpx;
				border-radius: 5rpx;
				text-align: center;
				border: 1px solid #d2d2d2;
			}
		}

		.unfinished-bottom-button {
			view:nth-child(1) {
				position: absolute;
				left: 70rpx;
				top: 900rpx;
				font-size: 80rpx;
			}

			view:nth-child(2) {
				position: absolute;
				left: 310rpx;
				top: 910rpx;
				font-size: 65rpx;
			}

			view:nth-child(3) {
				position: absolute;
				left: 520rpx;
				top: 897rpx;
				font-size: 90rpx;
			}
		}

	}
</style>
