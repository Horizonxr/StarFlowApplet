<template>
	<view class="back">
		<uni-popup class="pop" ref="popup" type="message">
			<uni-popup-message type="error" message="成功消息" :duration="3000">{{msg}}</uni-popup-message>
		</uni-popup>
		<view class="top">
			<view class="cancle" @click="back">
				<view class="iconfont icon-fanhui" @click="back">
				</view>
			</view>
			<view class="title">添加任务</view>
			<view class="popupName">
				<view class="inputText">名称</view>
				<input placeholder-style="color: black" placeholder="请输入任务名称" class="input" type="text" v-model:value="name">
			</view>
			<view class="deadline">
				<view class="deadlineText">DDL</view>
				<view>
					<uni-datetime-picker class="example-body" type="datetime" v-model="datetimesingle" :start="start"
						:end="end" @change="changeLog"  />
				</view>
			</view>
			<view class="details-wrapper">
				<textarea placeholder="请输入任务内容" v-model:value="task_info" class="details" placeholder-style="placeholderClass" />
			</view>
			<view class="release">
				任务发放：
			</view>
		</view>
		<view>
			<scroll-view scroll-y="true" class="bottom">
				<view class="list-item" @click="this.pull_user_name=user_list[key].username"
				:style="{'background-color':pull_user_name!==item.username ? 'white' : '#5091f2'}"
				 v-for="(item, key) in user_list" :key=item.key>
					<view class="name">{{item.username}}</view>
					<view class="jurisdiction">开发者</view>
				</view>
			</scroll-view>
		</view>
		<view class="icon">
			<view class="iconfont icon-duigou" @click="pullrequest()"></view>
		</view>
	</view>
</template>

<script>
	import {
		baseUrl
	} from '../../utils/config.js';
	export default {
		name: "test",
		props: ["repo_id"],
		data() {
			return {
				user_list: [],
				datetimesingle: '',
				datetimerange: [],
				start: Date.now(),
				end: Date.now() + 1000000000,
				pull_user_name:"hhh",
				pull_ddl:"2021.11.19",
				name:"",
				task_info:"",
				pull_task_info:"请输入任务详情",
				pull_task_name:"请输入任务名称",
				msg:''

			};
		},
		methods: {
			changeLog(e) {
				console.log('----change事件:', e);
				this.pull_ddl=e;
			},
			back() {
				this.$emit("closeaddPopup")
			},
			pullrequest(){
				this.pull_task_name=this.name,
				this.pull_task_info=this.task_info,
				console.log("这是任务名称"+this.pull_task_name),
				console.log(this.pull_task_info),
				console.log(this.pull_ddl),
				console.log(this.repo_id),
				console.log(this.pull_user_name)
				if (!(this.pull_task_name&&this.pull_task_info&&this.pull_ddl&&this.pull_user_name)){
					this.msg = '任务不完整，请检查输入'
					this.$refs.popup.open('top')
					return
				}
				uni.request({
					url: baseUrl + '/task/addtask', //仅为示例，并非真实接口地址。
					method: 'POST',
					timeout: 2000,
					data: {
						task_name:this.pull_task_name,
						task_info:this.pull_task_info,
						deadline:this.pull_ddl,
						repo_id:this.repo_id,
						username:this.pull_user_name
					},
					header: {
						"content-type": "application/x-www-form-urlencoded" //自定义请求头信息
					},
					success: (res) => {
						console.log(res.message)
						uni.showToast({
							title: '添加成功',
							icon:'success'
						});
						this.$options.methods.back.bind(this)()
					},
					fail(err) {
						console.log(err)
						uni.showToast({
							title: '添加失败',
							icon:'error'
						});
					}
				})
			}
			
		},
		mounted() {
			uni.showLoading({
				title: '加载中'
			})

			uni.request({
				url: baseUrl + '/task/developer', //仅为示例，并非真实接口地址。
				method: 'POST',
				timeout: 2000,
				data: {
					repo_id: this.repo_id
				},
				header: {
					"content-type": "application/x-www-form-urlencoded" //自定义请求头信息
				},
				success: (res) => {
					console.log(res.data)
					this.user_list = res.data.data
					uni.hideLoading()
				},
				fail() {
					uni.hideLoading()
					uni.showToast({
						title: '请求失败',
						icon: 'error'
					});
				}
			})

		},


	}
</script>

<style lang="scss">
	.back {
		height: 100vh;
		position: relative;
		width: 660rpx;
		height: 1050rpx;
		top: 30rpx;
		margin: 0 auto;
		background-color: white;
		border-radius: 30rpx;
		box-shadow: 0 4rpx 12rpx #888888;
		.top {
			position: absolute;
			top: 0rpx;
			left: 0rpx;
			height: 714rpx;
			width: 100%;

			.iconfont {
				font-size: 86rpx;
				position: absolute;
				top: 28rpx;
				left: 40rpx;
			}

			.title {
				font-size: 100rpx;
				color: #000;
				font-family: Adobe 黑体 Std;
				position: absolute;
				top: 130rpx;
				left: 40rpx;
			}

			.popupName {
				position: absolute;
				top: 258rpx;
				height: 78rpx;
				width: 660rpx;

				.inputText {
					position: absolute;
					top: 9rpx;
					left: 40rpx;
					width: 150rpx;
					font-size: 48rpx;
					color: #000;
					font-family: Adobe 黑体 Std;
				}

				.input {
					position: absolute;
					top: 7rpx;
					height: 74rpx;
					left: 180rpx;
					width: 445rpx;
					border: 0.5rpx solid #5c5c5c;
					border-radius: 10rpx;
					font-size: 33rpx;
					color: #5c5c5c;
					text-align: center;

				}
			}

			.deadline {
				position: absolute;
				top: 352rpx;
				height: 74rpx;
				width: 660rpx;

				.deadlineText {
					position: absolute;
					left: 40rpx;
					top:10rpx;
					width: 150rpx;
					font-size: 47rpx;
				}
				
				.example-body {
					position: absolute;
					height: 74rpx;
					width: 445rpx;
					left: 180rpx;
					border-radius: 37rpx;
					font-size: 33rpx;
					color: #5c5c5c;
					text-align: center;
				}
			}
			.details-wrapper{
				position: absolute;
				top: 442rpx;
				width: 660rpx;
				height: 162rpx;
				width: 100%;
				.details {
					width: 580rpx;
					margin: 10rpx auto;
					height: 162rpx;
					border: 0.5rpx solid #5c5c5c;
					border-radius: 20rpx;
					font-size: 33rpx;
					color: #5c5c5c;
					text-align: center;
				}
			}

			.release {
				position: absolute;
				top: 620rpx;
				left: 40rpx;
				font-size: 48rpx;
				color: #000;
				font-family: Adobe 黑体 Std;
			}


		}

		.bottom {
			position: absolute;
			bottom: 108rpx;
			left: 40rpx;
			height: 246rpx;
			width: 572rpx;
			border-radius: 10rpx;
			font-size: 33rpx;
			color: #5c5c5c;


			.list-item {
				line-height: 69rpx;
				height: 69rpx;
				width: 100%;
				border-bottom: 0.5rpx solid #5c5c5c;

				.name {
					position: relative;
					left: 40rpx;
					width: 206rpx;
					font-size: 30rpx;
					font-family: Adobe 黑体 Std;
				}

				.jurisdiction {
					position: relative;
					left: 332rpx;
					top: -55rpx;
					height: 42rpx;
					width: 206rpx;
					border: 0.5rpx solid #000;
					line-height: 42rpx;
					text-align: center;
				}
			}


		}

		.icon {
			height: 86rpx;
			width: 100%;
			position: absolute;
			bottom: 40rpx;

			.iconfont {
				position: absolute;
				font-size: 86rpx;
				left: 292rpx;
			}

		}


	}
</style>
