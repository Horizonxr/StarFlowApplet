<template>
	<view>
		<uni-popup ref="GitHubPopup" type="dialog">
			<uni-popup-dialog mode="input" message="成功消息" placeholder="请输入GitHub账号名称" :duration="2000" :before-close="true" @close="this.$refs.GitHubPopup.close()" @confirm="GitHubLogin"></uni-popup-dialog>
		</uni-popup>
		<view class="top-wrapper">
			<view class="top">
				<view class="title">个人设置</view>
				<view class="account">账户名称：{{userInfo.nickName ? userInfo.nickName : "尚未获取"}}</view>
				<view class="top-button">
					<image :src="userInfo.avatarUrl" mode=""></image>
				</view>
			</view>
		</view>
		<view class="login-wrapper">
			<view class="login" @click="weixinLogin()">
				<view class="login-content">{{userInfo.length == 0 ? "第一步：绑定微信" : "微信名称: " + userInfo.nickName}}</view>
			</view>
			<view class="login" @click="GitHubPopup()">
				<view class="login-content">{{GitHubAccount == '' ? "第二步：绑定GitHub" : "GitHub: " + GitHubAccount}}</view>
			</view>
			<view class="login" v-if="0" @click="updateGitHubToken()">
				<view class="login-content">{{GitHubToken == false ? "第三步：绑定GitHub Token" : "GitHub Token: " + tokenStatus()}}</view>
			</view>
			<view class="login" @click="toProjectSelect()">
				<view class="login-content">转到项目</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {baseUrl} from '../../utils/config.js';
	export default {
		data() {
			return {
				u_id: -1,
				GitHubAccount: '',
				GitHubToken: false,
				userInfo:[]
			};
		},
		methods:{
			weixinLogin(){
				console.log("测试微信登录")
				var _this = this;
				uni.getProvider({
				    service: 'oauth',
				    success: function (res) {
				        if (~res.provider.indexOf('weixin')) {
				            uni.login({
				                provider: 'weixin',
				                success: function (loginRes) {
									if (loginRes.errMsg == 'login:ok'){
										uni.request({
										    url: baseUrl + '/user/wxlogin', //仅为示例，并非真实接口地址。
											method:'POST',
										    data: {
										        code: loginRes.code
										    },
										    header: {
										        "content-type": "application/x-www-form-urlencoded" //自定义请求头信息
										    },
										    success: (res) => {
										        console.log(res.data);
												uni.setStorage({
													key:'u_id',
													data:res.data.id,
													success:function(){
														console.log("成功保存用户id"+res.data.id)
														_this.u_id = res.data.id
													}
												})
										    }
										})
									}
									else{
										console.log(loginRes.errMsg)
									}
				                }
				            });
				        }
				    }
				});
				uni.getUserProfile({
					desc:"用于显示个人信息设置",
					success: (res) => {
						this.userInfo = res.userInfo
						uni.setStorage({
							key: 'userInfo',
							data: this.userInfo,
							success: function () {
							    console.log('success');
							}
						})
						
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
				
			GitHubLogin(account){
				console.log(account)
				uni.setStorage({
					key:"GitHubAccount",
					data:account
				})
				this.GitHubAccount = account
				uni.request({
				    url: baseUrl + '/user/githublogin', //仅为示例，并非真实接口地址。
					method:'POST',
				    data: {
				        id: this.u_id,
						username:this.GitHubAccount
				    },
				    header: {
				        "content-type": "application/x-www-form-urlencoded" //自定义请求头信息
				    },
				    success: (res) => {
				        console.log(res)
				    }
				})
				this.$refs.GitHubPopup.close()
			},
			GitHubPopup(){
				this.$refs.GitHubPopup.open("center")
			},
			toProjectSelect(){
				uni.redirectTo({
					url:'../projectSelect/projectSelect'
				})
			},
			tokenStatus(){
				return '已失效'
			}
		},
		onLoad() {
			// uni.showLoading({
			//     title: '加载中'
			// });
			this.u_id = uni.getStorageSync("u_id")
			if(!uni.getStorageSync("userInfo")){
				uni.showToast({
					icon: 'error',
					title:"缺少用户信息"
				})
			}
			else{
				uni.showToast({
					icon:'success',
					title:"已获取用户信息"
				})
				this.userInfo = uni.getStorageSync("userInfo")
			}
			if(uni.getStorageSync("GitHubAccount")){
				this.GitHubAccount = uni.getStorageSync("GitHubAccount")
			}
		}
	}
</script>

<style lang="scss">
	.body{
		height: 100vh;
		background-color: $bg-color;
		z-index: -999;
	}
	.top-wrapper{
		top:0rpx;
		position: sticky;
		width: 100%;
		height: 200rpx;
		z-index: 10;
		.top{
			position: relative;
			width: 666rpx;
			height: 200rpx;
			margin: 0 auto;
			background-color: white;
			border-radius: 30rpx;
			box-shadow: 0 4rpx 12rpx #888888;
			.title{
				position: absolute;
				top: 34rpx;
				left: 23rpx;
				height: 75rpx;
				font-size: 75rpx;
				text-align: center;
				line-height: 75rpx;
			}
			.account{
				position: absolute;
				bottom: 30rpx;
				left: 23rpx;
				font-size: 34rpx;
			}
			.top-button{
				position: relative;
				left:555rpx;
				top:55rpx;
				width: 86rpx;
				height: 86rpx;
				border-radius: 50%;
				image{
					width: 86rpx;
					height: 86rpx;
				}
			}
		}
	}
	.login-wrapper{
		top: 30rpx;
		.login{
			position: relative;
			width: 615rpx;
			height: 120rpx;
			margin: 20rpx auto;
			background-color: white;
			border-radius: 10rpx;
			box-shadow: 0 4rpx 12rpx #888888;
			.login-content{
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
