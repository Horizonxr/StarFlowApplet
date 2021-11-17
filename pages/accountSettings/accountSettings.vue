<template>
	<view>
		<view class="top-wrapper">
			<view class="top">
				<view class="title">个人设置</view>
				<view class="account">账户名称：{{userInfo.nickName}}</view>
				<view class="top-button">
					<image :src="userInfo.avatarUrl" mode=""></image>
				</view>
			</view>
		</view>
		<view class="login" @click="weixinLogin()">
			测试登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
										    url: 'http://37446r369t.zicp.vip/user/wxlogin', //仅为示例，并非真实接口地址。
											method:'POST',
										    data: {
										        code: loginRes.code
										    },
										    header: {
										        "content-type": "application/x-www-form-urlencoded" //自定义请求头信息
										    },
										    success: (res) => {
										        console.log(res.data);
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
			}
		},
		onLoad() {
			// uni.showLoading({
			//     title: '加载中'
			// });
			if(!uni.getStorageSync("userInfo")){
				uni.showToast({
					icon: 'error',
					title:"还未获取用户信息"
				})
			}
			else{
				uni.showToast({
					icon:'success',
					title:"已获取用户信息"
				})
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
	.login{
		position: relative;
		width: 300rpx;
		height: 200rpx;
		margin: 0 auto;
		background-color: pink;
	}
</style>
