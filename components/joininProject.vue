<template name="joininProject">
	<view class="body2">
		<!-- 加入项目提示信息 -->
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type='info' title="提示" mode="base" content="请求加入该项目？" message="成功消息" :duration="2000"
				:before-close="true" @close="close" @confirm="request_joinin(key)"></uni-popup-dialog>
		</uni-popup>
		<!-- 返回 -->
		<view class="top-button2">
			<view class="iconfont icon-fanhui" @click="back"></view>
		</view>
		<!-- 搜索 -->
		<view class="title2">项目搜索</view>
		<view class="search2">
			<input class="input-name2" v-model="keyword" type="text" placeholder=" 输入项目名称查找" />
			<view class="rectangle2">
				<view class="iconfont icon-sousuo" @input="input" @click="search"></view>
			</view>
		</view>
		<scroll-view class="scroll-area" show-scrollbar='true' scroll-y="true">
			<view class="list-item1" v-for="(item, key) in repositories_list" :key=item.key>
				<view class="list-item-repositories1" @click="openPopup(key)">{{item.fields.repo_name}}</view>
			</view>
		</scroll-view>
	</view>
</template>
<script>
	import {
		baseUrl
	} from '../utils/config.js';
	export default {
		name: 'myinput',
		props: {

		},
		data() {
			return {
				userInfo: [],
				u_id: 1,
				repositories_list: [],
				keyword: '',
				middle: -1
			}

		},
		methods: {
			openPopup(key) {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open('center')
				this.middle = key
			},
			close() {
				this.$refs.popup.close()
			},
			back() {
				this.keyword = ''
				this.repositories_list = []
				this.$emit("closeJoininpopup")
			},
			search() {
				if (this.keyword == ''){
					uni.showToast({
						icon:'error',
						title: '输入为空'
					});
					return
				}
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				this.repositories_list = []
				uni.request({
					url: baseUrl + '/user/repo_search', //仅为示例，并非真实接口地址。
					method: 'POST',
					timeout: 8000,
					data: {
						keyword: this.keyword
					},
					header: {
						"content-type": "application/x-www-form-urlencoded" //自定义请求头信息
					},
					success: (res) => {
						console.log(res)
						this.repositories_list = res.data.data
						uni.hideLoading()
					},
					fail() {
						uni.hideLoading()
						uni.showToast({
							title: '搜索失败',
							icon: 'error'
						});
					}
				})
			},
			request_joinin() {
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				this.u_id = uni.getStorageSync("u_id")
				// console.log(this.u_id)
				// console.log(this.repositories_list[this.middle].pk)
				uni.request({
					url: baseUrl + '/user/repo_request', //仅为示例，并非真实接口地址。
					method: 'POST',
					timeout: 8000,
					data: {
						user: this.u_id,
						repo: this.repositories_list[this.middle].pk
					},
					header: {
						"content-type": "application/x-www-form-urlencoded" //自定义请求头信息
					},
					success: (res) => {
						let msg = res.data.message
						if (msg == 'success'){
							msg = '请求加入成功'
						}
						
						uni.showToast({
							title: msg,
							icon: 'success',
							duration: 2000
						});
						uni.hideLoading()
						this.close();
					},
					fail() {
						uni.hideLoading()
						uni.showToast({
							title: '请求失败',
							icon: 'error'
						});
					}
				})
				//console.log(this.repositories_list[key].pk)
			}
		}
	}
</script>

<style lang="scss">
	.body2 {
		height: 100vh;
		position: relative;
		width: 660rpx;
		height: 1050rpx;
		top: 30rpx;
		margin: 0 auto;
		background-color: white;
		border-radius: 30rpx;
		box-shadow: 0 4rpx 12rpx #888888;

		.top-button2 {
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

		.title2 {
			position: relative;
			top: 140rpx;
			left: -65rpx;
			height: 75rpx;
			font-size: 95rpx;
			text-align: center;
			line-height: 75rpx;
			letter-spacing: 20rpx;
		}

		.search2 {
			position: relative;
			width: 660rpx;
			height: 50rpx;
			top: 210rpx;
			left: 45rpx;
			font-size: 34rpx;
			.rectangle2 {
				position: absolute;
				top: 0rpx;
				margin: 0 auto;
				font-size: 35rpx;
				width: 511rpx;
				height: 60rpx;
				border-radius: 15rpx;
				border:1px solid #d2d2d2;
				.iconfont{
					position: absolute;
					top: 1rpx;
					left: 525rpx;
					font-size: 64rpx;
				}
			}

			.input-name2 {
				position: absolute;
				top: 3rpx;
				left:20rpx;
				margin: 0 auto;
				font-size: 35rpx;
				width: 340rpx;
				height: 60rpx;
				border:none;
			}
		}
		.scroll-area{
			position: relative;
			top:240rpx;
			height: 600rpx;
			width: 660rpx;
			// background-color: #007AFF;
			.list-item1{
				margin: 25rpx auto;
				position: relative;
				border-radius: 10rpx;
				height: 60rpx;
				width: 560rpx;
				padding-top: 12rpx;
				box-shadow: 0 4rpx 12rpx #888888;
				background-color:rgba($color: #ffff, $alpha: 0.5);
				.list-item-repositories1{
					text-align: center;
					overflow:hidden
				}
			}
		}	
	}
</style>
