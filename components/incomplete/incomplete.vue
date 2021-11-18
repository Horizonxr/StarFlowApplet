<template name="incomplete">
	<view class="unfinished-body">
		<view class="unfinished-top-button" @click="back">
			<view class="iconfont icon-fanhui"></view>
		</view>
		<view class="unfinished-title">待完成</view>
		<view class="unfinished-detail">
			<progress class="unfinished-deadline-bar" stroke-width="45rpx" border-radius="300" active="true"
				color="#5091f2" :percent="DDLProgress(taskInfo.deadline)"></progress>
			<view class="unfinished-deadline-time">Deadline:{{DDLcompute(taskInfo.deadline)}}</view>
			<view class="unfinished-mission">任务：{{taskInfo.task_name}}</view>
			<view class="mission-content">任务详情:{{taskInfo.task_info}}</view>
			<view class="unfinished-pull-repositories" @click="getPullRequest">点击拉取</view>
		</view>
		<view class="unfinished-bottom-button">
			<view class="iconfont icon-shizhong" @click=""></view>
			<view class="iconfont icon-tijiao" @click=""></view>
			<view class="iconfont icon-lajitong" @click=""></view>
		</view>
	</view>
</template>
<script>
	import {baseUrl} from '../../utils/config.js';
	export default {
		name: 'myinput',
		props: {
			taskInfo:{
				required: true,
			}
		},
		data() {
			return {
				repositories_list: []
			}
		},
		methods: {
			getPullRequest(){
				uni.request({
				    url: baseUrl + 'task/pull', //仅为示例，并非真实接口地址。
					method:'POST',
					timeout:2000,
				    data: {
				        owner_repo: 1
				    },
				    header: {
				        "content-type": "application/x-www-form-urlencoded" //自定义请求头信息
				    },
				    success: (res) => {
						console.log(res)
						
						uni.hideLoading()
				    },
					fail() {
						uni.hideLoading()
						uni.showToast({
							title: '请求失败',
							icon:'error'
						});
					}
				})
			},
			back() {
				this.$emit("closePopup")
			},
			// DDL计算连接字符串函数
			DDLcompute(DDL){
				if (DDL!==undefined){
					let DDLjoin = DDL[0].toString()
					for (let i = 1;i<3;i++){
						DDLjoin = DDLjoin + '.' +DDL[i].toString()
					}
					return DDLjoin
				}
				
			},
			DDLProgress(DDL){
				if (DDL!==undefined){
					let date = new Date()
					let year_now = date.getFullYear()
					let month_now = date.getMonth()+1
					let day_now = date.getDate()
					let timeRemain = 365*(DDL[0]-year_now) + 30*(DDL[1]-month_now) + (DDL[2]-day_now)
					return 100-timeRemain*10
				}
			}

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
			left: -130rpx;
			height: 75rpx;
			font-size: 95rpx;
			text-align: center;
			line-height: 75rpx;
			letter-spacing: 10rpx;
		}
		.unfinished-detail {
			position: relative;
			top: 210rpx;
			left: 35rpx;
			.unfinished-deadline-time {
				position: relative;
				top: -50rpx;
				left: 27rpx;
				font-size: 30rpx;
			}
			.unfinished-deadline-bar {
				position: relative;
				top: -10rpx;
				width: 560rpx;
				left: 15rpx;
			}
			.unfinished-mission {
				position: relative;
				top: -20rpx;
				width: 600rpx;
				left: 20rpx;
				font-size: 37rpx;
			}
			.mission-content{
				position: relative;
				top: 0rpx;
				width: 600rpx;
				left: 20rpx;
				font-size: 30rpx;
			}
			.unfinished-pull-repositories {
				position: relative;
				top: 60rpx;
				width: 150rpx;
				height: 50rpx;
				left: 25rpx;
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
