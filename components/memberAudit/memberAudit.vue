<template>
	<view>
		<view class="back">
			<uni-popup ref="popup" type="dialog">
				<view class="prompt">
					<view class="title">是否同意加入</view>
					<view class="root-name" @click="this.pull_identity = 1;"
						:style="{'background-color':pull_identity !== 1 ? 'white' : '#5091f2'}">管理员</view>
					<view class="root-name" @click="this.pull_identity = 2;"
						:style="{'background-color':pull_identity !== 2 ? 'white' : '#5091f2'}">开发者</view>
					<view class="root-name" @click="this.pull_identity = 3;"
						:style="{'background-color':pull_identity !== 3 ? 'white' : '#5091f2'}">游客</view>
					<view class="prompt-button">
						<view class="iconfont icon-duigou" @click="apply_request()"></view>
						<view class="iconfont icon-chahao" @click="disagree()"></view>
					</view>
				</view>
			</uni-popup>
			<view class="back-close iconfont icon-fanhui" @click="close"></view>
			<view class="title">人员审核</view>
			<view class="personalManagement">
				<view class="list"></view>
				<scroll-view scroll-y="true" class="scroll">
					<view class="list-item" v-for="(item, key) in apply_list" :key=item.key
						@click="Audit(apply_list[key].pk)">
						<view class="name">{{item.user_name}}</view>
						<view class="time">近期</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		baseUrl
	} from '../../utils/config.js';
	export default {
		name: "memberAudit",
		props: ["repo_id"],
		data() {
			return {
				apply_list: [],
				pull_request_id: 0,
				pull_identity: 0,
				u_id: -1,
			};

		},
		methods: {
			close() {
				this.$emit("closememberAudit")
			},
			Audit(pk) {
				this.pull_request_id = pk
				console.log(pk)
				this.$refs.popup.open("center")
			},
			rfreshMemberList() {
				this.$emit("refreshMemberList")
			},
			refreshApplyList() {
				uni.showLoading({
					title: '加载中'
				})
				console.log('这是刷新后')
				this.u_id = uni.getStorageSync("u_id")
				console.log(111111)
				console.log(this.u_id)
				uni.request({
					url: baseUrl + '/user/request_info', //仅为示例，并非真实接口地址。
					method: 'POST',
					timeout: 8000,
					data: {
						user: this.u_id,
						repo: this.repo_id,
					},
					header: {
						"content-type": "application/x-www-form-urlencoded" //自定义请求头信息
					},
					success: (res) => {
						console.log("这是刷新后申请人")
						console.log(res.data)
						this.apply_list = res.data.data
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
			apply_request() {
				uni.showLoading({
					title: "加载中"
				})
				console.log(this.pull_request_id),
					console.log(this.pull_identity)
				uni.request({
					url: baseUrl + '/user/reply_request', //仅为示例，并非真实接口地址。
					method: 'POST',
					timeout: 2000,
					data: {
						request_id: this.pull_request_id,
						identity: this.pull_identity
					},
					header: {
						"content-type": "application/x-www-form-urlencoded" //自定义请求头信息
					},
					success: (res) => {
						console.log("xiugai")
						console.log(res)
						uni.showToast({
							title: '修改成功',
							icon: 'success'
						});
						this.$options.methods.refreshApplyList.bind(this)()
						this.$options.methods.rfreshMemberList.bind(this)()
						uni.hideLoading()
					},
					fail(err) {
						console.log(err)
						uni.hideLoading()
						uni.showToast({
							title: '请求失败',
							icon: 'error'
						});
					}
				})
				this.$refs.popup.close()

			},
			disagree() {
				console.log("disagree")
				this.pull_identity = -1
				this.$options.methods.apply_request.bind(this)()
			}
		},
		mounted() {
			uni.showLoading({
				title: '加载中'
			})
			this.u_id = uni.getStorageSync("u_id")
			console.log(111111)
			console.log(this.u_id)
			uni.request({
				url: baseUrl + '/user/request_info', //仅为示例，并非真实接口地址。
				method: 'POST',
				timeout: 8000,
				data: {
					user: this.u_id,
					repo: this.repo_id,
				},
				header: {
					"content-type": "application/x-www-form-urlencoded" //自定义请求头信息
				},
				success: (res) => {
					console.log("这是申请人")
					console.log(res.data)
					this.apply_list = res.data.data
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

<style lang="scss" scoped>
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

		.prompt {
			position: relative;
			height: 400rpx;
			width: 590rpx;
			background-color: #fff;
			border-radius: 30rpx;
			box-shadow: 0 4rpx 12rpx #888888;

			.title {
				position: relative;
				width: 590rpx;
				height: 60rpx;
				text-align: center;
				line-height: 60rpx;
				font-size: 60rpx;
				top: 40rpx;
				left: 0rpx;
				letter-spacing: 0;
			}

			.root-name {
				position: relative;
				width: 120rpx;
				top: 65rpx;
				left: 230rpx;
				font-size: 40rpx;
			}

			.prompt-button {
				position: relative;
				top: 80rpx;
				width: 100%;
				height: 70rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;

				view {
					width: 50%;
					height: 70rpx;
					font-size: 65rpx;
					text-align: center;
					line-height: 70rpx;
				}
			}
		}
		.back-close {
			font-size: 66rpx;
			position: absolute;
			top: 40rpx;
			left: 40rpx;
		}

		.title {
			font-size: 100rpx;
			color: #000;
			position: absolute;
			top: 130rpx;
			left: 40rpx;
			letter-spacing: 20rpx;
		}

		.personalManagement {
			position: absolute;
			top: 245rpx;
			height: 865rpx;
			width: 670rpx;

			.list {
				position: relative;
				top: 30rpx;
				left: 40rpx;
				font-size: 35rpx;
			}

			.scroll {
				position: relative;
				top: 45rpx;
				height: 800rpx;
				width: 670rpx;

				.list-item {
					position: relative;
					left: 40rpx;
					height: 80rpx;
					width: 590rpx;
					border: 0.5rpx solid #7c787a;
					border-radius: 10rpx;
					margin-top: 20rpx;
					line-height: 80rpx;

					.name {
						position: relative;
						left: 20rpx;
					}

					.time {
						position: relative;
						left: 400rpx;
						top: -50rpx;
						font-size: 30rpx;
						line-height: 25rpx;
						color: #7c787a;
					}
				}
			}
		}
	}
</style>
