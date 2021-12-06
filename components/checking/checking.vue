<template name="checking">
	<view class="non-checked-body">
		<uni-popup class="pop" ref="popup" type="message">
			<uni-popup-message type="success" message="成功消息" :duration="3000">{{msg}}</uni-popup-message>
		</uni-popup>
		<view class="non-checked-top-button">
			<view class="iconfont icon-fanhui" @click="back"></view>
		</view>
		<view class="non-checked-title">待审核</view>
		<view class="non-checked-detail">
			<progress duration=7 class="non-checked-deadline-bar" stroke-width="45rpx" border-radius="300" active="true"
				color="#5091f2" :percent="DDLProgress(taskInfo.deadline)"></progress>
			<view class="non-checked-deadline-time">Deadline:{{DDLcompute(taskInfo.deadline)}}</view>
			<view class="non-checked-mission">任务：{{taskInfo.task_name}}</view>
			<view class="non-checked-mission">开发者：{{taskInfo.member_name}}</view>
			<view class="mission-content">任务详情:{{taskInfo.task_info}}</view>
			<view class="non-checked-push" @click="toRequestUrl()">
				<view class="iconfont icon-git-merge"></view>
				<view>{{taskInfo.title ==''? "空" : taskInfo.title}}</view>
			</view>
		</view>
		<view class="non-checked-bottom-button">
			<!-- <view class="iconfont icon-shizhong" @click=""></view> -->
			<view class="iconfont icon-tijiao" @click="taskSubmit" v-if="role<=1"></view>
			<view class="iconfont icon-withdraw" @click="taskRevoke" v-if="role<=1"></view>
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
				msg:'',
				repositories_list: []
			}
		},
		methods: {
			toRequestUrl(){
				uni.setClipboardData({
					data: this.taskInfo.request_url
				})
				this.msg = "Pull Request链接已复制到剪切板，请在外部浏览器粘贴查看"
				this.$refs.popup.open('top')
			},
			taskSubmit(){
				console.log("任务提交")
				if (this.pull_request_id===-1){
					uni.showToast({
						icon:'error',
						title:'请选择Request'
					})
					return
				}
				uni.request({
				    url: baseUrl + '/task/check', //仅为示例，并非真实接口地址。
					method:'POST',
					timeout:8000,
				    data: {
				        checkMember_id: this.member_id,
				        repo_id: this.taskInfo.repo_id,
				        task_id: this.taskInfo.task_id,
				        comment:'通过任务'
				    },
				    header: {
				        "content-type": "application/x-www-form-urlencoded" //自定义请求头信息
				    },
				    success: (res) => {
						console.log(res)
						uni.showToast({
							title: '通过成功',
							icon:'success'
						});
						this.$emit("closePopup")
				    },
					fail(err) {
						console.log(err)
						uni.showToast({
							title: '通过失败',
							icon:'error'
						});
					}
				})
			},
			taskRevoke(){
				console.log("回撤任务")
				uni.showLoading({
					title:'正在回撤'
				})
				uni.request({
				    url: baseUrl + '/task/revoke', //仅为示例，并非真实接口地址。
					method:'POST',
					timeout:8000,
				    data: {
						checkMember_id: this.member_id,
				        repo_id: this.taskInfo.repo_id,
						task_id: this.taskInfo.task_id,
						comment:'回撤任务'
				    },
				    header: {
				        "content-type": "application/x-www-form-urlencoded" //自定义请求头信息
				    },
				    success: (res) => {
						console.log(res)
						uni.showToast({
							title: '回撤成功',
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
		},
		mounted() {
			console.log(this.taskInfo)
		}
	}
</script>

<style lang="scss">
	.non-checked-body {
		height: 100vh;
		position: relative;
		width: 660rpx;
		height: 1050rpx;
		top: 30rpx;
		margin: 0 auto;
		background-color: white;
		border-radius: 30rpx;
		box-shadow: 0 4rpx 12rpx #888888;

		.non-checked-top-button {
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

		.non-checked-title {
			position: relative;
			top: 140rpx;
			left: -130rpx;
			height: 75rpx;
			font-size: 95rpx;
			text-align: center;
			line-height: 75rpx;
			letter-spacing: 10rpx;
		}

		.non-checked-detail {
			position: relative;
			top: 210rpx;
			left: 35rpx;

			.non-checked-deadline-time {
				position: relative;
				top: -50rpx;
				left: 27rpx;
				font-size: 30rpx;
			}

			.non-checked-deadline-bar {
				position: relative;
				top: -10rpx;
				width: 560rpx;
				left: 15rpx;
			}

			.non-checked-mission {
				position: relative;
				top: -20rpx;
				width: 600rpx;
				left: 15rpx;
				font-size: 37rpx;
			}
			
			.mission-content{
				position: relative;
				top: 0rpx;
				width: 600rpx;
				left: 20rpx;
				font-size: 30rpx;
			}

			.non-checked-push {
				position: relative;
				top: 100rpx;
				width: 550rpx;
				height: 70rpx;
				left: 26rpx;
				border-radius: 5rpx;
				background-color: $pending-mission;
				border: 1px solid #d2d2d2;
				display: flex;
				justify-content: space-around;
				view:nth-child(1) {
					height: 70rpx;
					width: 20%;
					font-size: 55rpx;
					text-align: center;
					line-height: 76rpx;
				}
				view:nth-child(2) {
					height: 70rpx;
					width: 80%;
					left: 40rpx;
					font-size: 40rpx;
					text-align: left;
					line-height: 70rpx;
					overflow: hidden;
				}
			}
		}

		.non-checked-bottom-button {
			position: absolute;
			text-align: center;
			width: 100%;
			height: 90rpx;
			bottom: 44rpx;
			display: flex;
			justify-content: space-around;
			// view:nth-child(1) {
			// 	width: 25%;
			// 	font-size: 75rpx;
			// 	line-height: 80rpx;
			// 	color: #C0C0C0;
			// }

			view:nth-child(1) {
				width: 25%;
				font-size: 65rpx;
				line-height: 80rpx;
			}

			view:nth-child(2) {
				width: 25%;
				font-size: 75rpx;
				line-height: 80rpx;
			}
			view:nth-child(3) {
				width: 25%;
				font-size: 92rpx;
				line-height: 80rpx;
			}
		}

	}
</style>
