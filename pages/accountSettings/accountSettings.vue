<template>
	<view>
		<!-- 背景动画 -->
		<bgAni></bgAni>
		<uni-popup ref="err_msg_popup" type="message">
			<uni-popup-message type="error" message="失败消息" :duration="1000">{{err_msg}}</uni-popup-message>
		</uni-popup>
		<uni-popup ref="GitHubPopup" type="dialog">
			<uni-popup-dialog mode="input" message="成功消息" :value="GitHubToken" :placeholder="account_placeholder"
				:duration="2000" :before-close="true" @close="this.$refs.GitHubPopup.close()" @confirm="GitHubLogin">
			</uni-popup-dialog>
		</uni-popup>
		<view class="top-wrapper">
			<view class="top">
				<view class="title">个人设置</view>
				<view class="account">账户名称：{{userInfo.nickName ? userInfo.nickName : "尚未获取"}}
					ID：{{u_id ? u_id : "尚未获取"}}</view>
				<view class="top-button">
					<image :src="userInfo.avatarUrl" mode=""></image>
				</view>
			</view>
		</view>
		<view class="login-wrapper">
			<view class="login" @click="weixinLogin()">
				<view class="login-content">{{userInfo.length == 0 ? "第一步：绑定微信" : "微信名称: "+userInfo.nickName}}</view>
			</view>
			<view class="login" @click="GitHubPopup()">
				<view class="login-content">{{GitHubAccount == '' ? "第二步：绑定GitHub" : "GitHub: " + GitHubAccount}}</view>
			</view>
			<view class="login" @click="toProjectSelect()">
				<view class="login-content">转到项目</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		baseUrl
	} from '../../utils/config.js';
	export default {
		data() {
			return {
				u_id: -1,
				GitHubAccount: '',
				GitHubToken: '',
				userInfo: [],
				account_placeholder: '请在外部浏览器打开链接，并将获取的Token粘贴回此处',
				err_msg: '',
			};
		},
		methods: {
			weixinLogin() {
				console.log("测试微信登录")
				var _this = this;
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									if (loginRes.errMsg == 'login:ok') {
										uni.request({
											url: baseUrl +
											'/user/wxlogin', //仅为示例，并非真实接口地址。
											method: 'POST',
											data: {
												code: loginRes.code
											},
											header: {
												"content-type": "application/x-www-form-urlencoded" //自定义请求头信息
											},
											success: (res) => {
												console.log(res.data);
												uni.setStorage({
													key: 'u_id',
													data: res.data.id,
													success: function() {
														console.log(
															"成功保存用户id" +
															res.data.id
															)
														_this.u_id = res
															.data.id
													}
												})
											}
										})
									} else {
										console.log(loginRes.errMsg)
									}
								}
							});
						}
				 }
				});
				uni.getUserProfile({
					desc: "用于显示个人信息设置",
					success: (res) => {
						this.userInfo = res.userInfo
						uni.setStorage({
							key: 'userInfo',
							data: this.userInfo,
							success: function() {
								console.log('success');
							}
						})

					},
					fail: (err) => {
						console.log(err)
					}
				})
			},

			GitHubLogin(token) {
				var _this = this
				console.log(token)
				this.GitHubAccount = token
				uni.request({
					url: baseUrl + '/user/githublogin', //仅为示例，并非真实接口地址。
					method: 'POST',
					data: {
						id: this.u_id,
						token: token
					},
					header: {
						"content-type": "application/x-www-form-urlencoded" //自定义请求头信息
					},
					success: (res) => {
						console.log(res)
						this.GitHubAccount = res.data.username
						this.err_msg = res.data.message
						this.$refs.err_msg_popup.open('top')
						uni.setStorage({
							key: 'GitHubAccount',
							data: this.GitHubAccount
						})
					}
				})
				this.$refs.GitHubPopup.close()
			},
			GitHubPopup() {
				uni.setClipboardData({
					data: 'https://github.com/settings/tokens'
				})
				this.$refs.GitHubPopup.open("center")
			},
			toProjectSelect() {
				uni.redirectTo({
					url: '../projectSelect/projectSelect'
				})
			},
			tokenStatus() {
				return '已失效'
			},


		},
		onLoad() {
			// uni.showLoading({
			//     title: '加载中'
			// });
			this.u_id = uni.getStorageSync("u_id")
			if (!uni.getStorageSync("userInfo")) {
				uni.showToast({
					icon: 'error',
					title: "缺少用户信息"
				})
			} else {
				uni.showToast({
					icon: 'success',
					title: "已获取用户信息"
				})
				this.userInfo = uni.getStorageSync("userInfo")
			}
			if (uni.getStorageSync("GitHubAccount")) {
				this.GitHubAccount = uni.getStorageSync("GitHubAccount")
			}
		},
		onHide() {

		},
		onShow() {
		}
	}
</script>

<style lang="scss">
	.body {
		height: 100vh;
		background-color: $bg-color;
		z-index: -999;
	}

	.bg-circle {
		z-index: -1;

		.orange {
			width: 90px;
			height: 90px;
			border-radius: 50%;
			position: fixed;
			left: 80rpx;
			top: 450rpx;
			background: rgba($color: $uni-color-warning, $alpha: 0.9);
		}

		.blue {
			width: 180px;
			height: 180px;
			left: 230rpx;
			top: 400rpx;
			position: fixed;
			border-radius: 50%;
			background: rgba($color: $pending-mission, $alpha: 0.9);
		}

		.green {
			width: 120px;
			height: 120px;
			left: 250rpx;
			top: 700rpx;
			position: fixed;
			border-radius: 50%;
			background: rgba($color: $uni-color-success, $alpha: 0.9);
		}
	}

	.top-wrapper {
		top: 4rpx;
		position: sticky;
		width: 100%;
		height: 200rpx;
		z-index: 10;

		.top {
			position: relative;
			width: 666rpx;
			height: 200rpx;
			margin: 0 auto;
			background-color: white;
			border-radius: 30rpx;
			box-shadow: 0 4rpx 12rpx #888888;

			.title {
				position: absolute;
				top: 34rpx;
				left: 23rpx;
				height: 75rpx;
				font-size: 75rpx;
				text-align: center;
				line-height: 75rpx;
			}

			.account {
				position: absolute;
				bottom: 30rpx;
				left: 23rpx;
				font-size: 34rpx;
			}

			.top-button {
				position: relative;
				left: 555rpx;
				top: 55rpx;
				width: 86rpx;
				height: 86rpx;
				border-radius: 50%;

				image {
					width: 86rpx;
					height: 86rpx;
				}
			}
		}
	}

	.login-wrapper {
		top: 30rpx;

		.login {
			position: relative;
			width: 615rpx;
			height: 120rpx;
			margin: 20rpx auto;
			background-color: rgba(255, 255, 255, 0.7);
			border-radius: 10rpx;
			box-shadow: 0 4rpx 12rpx #888888;

			.login-content {
				position: absolute;
				width: 615rpx;
				text-align: center;
				line-height: 120rpx;
				font-size: 40rpx;
				height: 120rpx;
			}
		}
	}
</style>
