<template name="incomplete">
	<view class="unfinished-body">
		<!-- 删除项目提示 -->
		<uni-popup class="test" ref="err_msg_popup" type="message">
		    <uni-popup-message type="success" message="失败消息" :duration="3000">{{err_msg}}</uni-popup-message>
		</uni-popup>
		<view class="unfinished-top-button" @click="back">
			<view class="iconfont icon-fanhui"></view>
		</view>
		<view class="unfinished-title">待完成</view>
		<view class="unfinished-detail">
			<progress duration=7 class="unfinished-deadline-bar" stroke-width="45rpx" border-radius="300" active="true"
				color="#5091f2" :percent="DDLProgress(taskInfo.deadline)"></progress>
			<view class="unfinished-deadline-time">Deadline:{{DDLcompute(taskInfo.deadline)}}</view>
			<view class="unfinished-mission">任务：{{taskInfo.task_name}}</view>
			<view class="unfinished-mission">开发者：{{taskInfo.member_name}}</view>
			<view class="mission-content">任务详情:{{taskInfo.task_info}}</view>
			<view class="unfinished-pull-repositories" @click="getPullRequest">点击拉取</view>
			<scroll-view class="scroll-area" scroll-y="true">
				<view class="finished-push" 
				@click="this.pull_request_selected = key; this.pull_request_id = this.pullRequestList[key].request_id; this.pull_request_selected_title=this.pullRequestList[key].title" 
				:style="{'background-color':pull_request_selected !== key ? 'white' : '#5091f2'}" 
				v-for="(item, key) in pullRequestList" :key=item.key>
					<view class="iconfont icon-git-merge"></view>
					<view class="content">
						{{item.title}}
					</view>
				</view>
			</scroll-view>
			
		</view>
		
		<view class="unfinished-bottom-button">
			<!-- <view class="iconfont icon-shizhong" @click="taskHistory"></view> -->
			<view class="iconfont icon-tijiao" @click="taskSubmit"></view>
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
			},
			repo_name:{
				required:true
			}
		},
		data() {
			return {
				repositories_list: [],
				pullRequestList:[],
				pull_request_selected:-1,
				pull_request_id:-1,
				pull_request_selected_title:'',
				err_msg:'',
			}
		},
		methods: {
			//拉取PullRequest列表
			getPullRequest(){
				console.log("这是taskInfo")
				console.log(this.taskInfo)
				uni.showLoading({
					title:'正在拉取请求'
				})
				uni.request({
				    url: baseUrl + '/task/pull', //仅为示例，并非真实接口地址。
					method:'POST',
					timeout:8000,
				    data: {
				        owner_repo: this.repo_name,
						user_id: uni.getStorageSync('u_id')
				    },
				    header: {
				        "content-type": "application/x-www-form-urlencoded" //自定义请求头信息
				    },
				    success: (res) => {
						console.log(112111212111)
						console.log(res.data.message)
						this.pullRequestList = res.data.data
						console.log(this.pullRequestList)
						this.err_msg = res.data.message
						this.$refs.err_msg_popup.open('top')
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
			//任务提交
			taskSubmit(){
				console.log("任务提交")
				console.log(this.pull_request_selected_title)
				console.log(this.pull_request_id)
				if (this.pull_request_id===-1){
					uni.showToast({
						icon:'error',
						title:'请选择Request'
					})
					return
				}
				uni.request({
				    url: baseUrl + '/task/submit', //仅为示例，并非真实接口地址。
					method:'POST',
					timeout:8000,
				    data: {
						title:this.pull_request_selected_title,
				        submit_info:this.taskInfo.task_info,
						submit_id:this.taskInfo.member_id,
						request_id:this.pull_request_id,
						task_id:this.taskInfo.task_id,
						repo_id:this.taskInfo.repo_id
				    },
				    header: {
				        "content-type": "application/x-www-form-urlencoded" //自定义请求头信息
				    },
				    success: (res) => {
						console.log(res)
						uni.showToast({
							title: '修改成功',
							icon:'success'
						});
						this.$emit("closePopup")
				    },
					fail(err) {
						console.log(err)
						uni.showToast({
							title: '请求失败',
							icon:'error'
						});
					}
				})
			},
			//任务历史
			taskHistory(){

				
			},
			//任务删除
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

<style lang="scss" scoped>
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
				line-height: 50rpx;
				left: 25rpx;
				font-size: 30rpx;
				border-radius: 10rpx;
				text-align: center;
				border: 1px solid #d2d2d2;
			}
			.scroll-area{
				position: relative;
				top:72rpx;
				left: 22rpx;
				width: 554rpx;
				height: 310rpx;
				border-radius: 10rpx;
				.finished-push {
					position: relative;
					width: 550rpx;
					height: 70rpx;
					font-size: 25rpx;
					border-radius: 10rpx;
					background-color: white;
					text-align: center;
					line-height: 70rpx;
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
		}
		.unfinished-bottom-button {
			position: absolute;
			text-align: center;
			width: 100%;
			height: 90rpx;
			bottom: 44rpx;
			display: flex;
			justify-content: space-around;
			// view:nth-child(1) {
			// 	// position: absolute;
			// 	// left: 70rpx;
			// 	width: 33%;
			// 	font-size: 80rpx;
			// 	color: #C0C0C0;
			// 	line-height: 80rpx;
			// }

			view:nth-child(1) {
				// position: absolute;
				// left: 310rpx;
				width: 33%;
				font-size: 65rpx;
				line-height: 80rpx;
			}

			view:nth-child(2) {
				// position: absolute;
				// left: 520rpx;
				width: 33%;
				font-size: 90rpx;
				line-height: 80rpx;
			}
		}

	}
</style>
