<template name="finish">
	<view class="finished-body">
		<view class="finished-top-button">
			<view class="iconfont icon-fanhui" @click="back"></view>
		</view>
		<view class="finished-title">已完成</view>
		<view class="finished-detail">
			<progress duration=7 class="finished-deadline-bar" stroke-width="45rpx" border-radius="300" active="true"
				color="#5091f2" :percent="DDLProgress(taskInfo.deadline)"></progress>
			<view class="finished-deadline-time">Deadline:{{DDLcompute(taskInfo.deadline)}}</view>
			<view class="finished-mission">任务：{{taskInfo.task_name}}</view>
			<view class="finished-mission">开发者：{{taskInfo.member_name}}</view>
			<view class="mission-content">任务详情:{{taskInfo.task_info}}</view>
			<view class="finished-push">
				<view>{{taskInfo.title ==''? "空" : taskInfo.title}}</view>
				<view class="iconfont icon-git-merge"></view>
			</view>
		</view>
		<view class="finished-bottom-button">
			<view class="iconfont icon-shizhong" @click=""></view>
			<view class="iconfont icon-lajitong" @click="taskDelete" v-if="role<=1"></view>
		</view>
	</view>
</template>
<script>
	import {baseUrl} from '../../utils/config.js';
	export default {
		name: 'myinput',
		props: {
			taskInfo:{
				required: true
			},
			role:{
				required:true
			},
			member_id:{
				required:true
			}
		},
		data() {
			return {
				repositories_list: []
			}
		},
		methods: {
			taskDelete(){
				console.log("删除任务")
				uni.showLoading({
					title:'正在删除'
				})
				uni.request({
				    url: baseUrl + '/task/delete', //仅为示例，并非真实接口地址。
					method:'POST',
					timeout:8000,
				    data: {
				        repo_id: this.taskInfo.repo_id,
						task_id: this.taskInfo.task_id
				    },
				    header: {
				        "content-type": "application/x-www-form-urlencoded" //自定义请求头信息
				    },
				    success: (res) => {
						console.log(res)
						uni.showToast({
							title: '删除成功',
							icon:'success'
						});
						uni.hideLoading()
						this.$emit("closePopup")
				    },
					fail() {
						uni.hideLoading()
						uni.showToast({
							title: '删除失败',
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
	.finished-body {
		height: 100vh;
		position: relative;
		width: 660rpx;
		height: 1050rpx;
		top: 30rpx;
		margin: 0 auto;
		background-color: white;
		border-radius: 30rpx;
		box-shadow: 0 4rpx 12rpx #888888;

		.finished-top-button {
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

		.finished-title {
			position: relative;
			top: 140rpx;
			left: -130rpx;
			height: 75rpx;
			font-size: 95rpx;
			text-align: center;
			line-height: 75rpx;
			letter-spacing: 10rpx;
		}

		.finished-detail {
			position: relative;
			top: 210rpx;
			left: 35rpx;

			.finished-deadline-time {
				position: relative;
				top: -50rpx;
				left: 27rpx;
				font-size: 30rpx;
			}

			.finished-deadline-bar {
				position: relative;
				top: -10rpx;
				width: 560rpx;
				left: 15rpx;
			}

			.finished-mission {
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
			.finished-push {
				position: relative;
				top: 100rpx;
				width: 550rpx;
				height: 70rpx;
				left: 26rpx;
				font-size: 35rpx;
				border-radius: 5rpx;
				background-color: $pending-mission;
				text-align: center;
				line-height: 70rpx;
				border: 1px solid #d2d2d2;
				.iconfont {
					position: relative;
					height: 55rpx;
					width: 55rpx;
					left: 40rpx;
					top: -97rpx;
					font-size: 55rpx;
				}
			}
		}

		.finished-bottom-button {
			position: absolute;
			display: flex;
			text-align: center;
			width: 100%;
			height: 90rpx;
			bottom: 44rpx;
			view:nth-child(1) {
				width: 50%;
				font-size: 80rpx;
			}

			view:nth-child(2) {
				width: 50%;
				font-size: 85rpx;
			}
		}

	}
</style>
