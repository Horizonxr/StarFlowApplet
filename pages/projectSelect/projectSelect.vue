<template>
	<view class="body">
		<uni-popup class="morePopup" ref="morePopup" type="center" :mask-click="false">
			<view class="wrapper">
				<view class="botton-wrapper">
					<view class="top-popup" @click="createPopup">
						<view class="top-popup-text">创建项目</view>
						<view>
							<view class="iconfont icon-zengjia"></view>
						</view>
					</view>
					<view class="middle-popup" @click="joininPopup">
						<view class="middle-popup-text">加入项目</view>
						<view>
							<view class="iconfont icon-jiarubanji"></view>
						</view>
					</view>
					<view class="close-popup" @click="closePopup">
						<view class="close-popup-text">取消</view>
						<view>
							<view class="iconfont icon-chahao" @click=""></view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 第二层弹窗 -->
		<uni-popup class="createPopup" ref="createPopup" type="center" :mask-click="false">
			<createProject :receivelist="project_list" @closeCreatepopup="closeCreatepopup" @refresh='refreshList()'>
			</createProject>
		</uni-popup>
		<uni-popup class="joininPopup" ref="joininPopup" type="center" :mask-click="false">
			<joininProject @closeJoininpopup="closeJoininpopup"></joininProject>
		</uni-popup>
		<!-- 删除项目确认 -->
		<uni-popup ref="exitpopup" type="dialog">
			<uni-popup-dialog type='info' title="提示" mode="base" content="确认删除该项目？" message="成功消息"
				:before-close="true" @close="closeExitpopup" @confirm="request_exit"></uni-popup-dialog>
		</uni-popup>
		<!-- 管理员删除项目确认 -->
		<uni-popup ref="sp_exitpopup" type="dialog">
			<uni-popup-dialog type='info' title="提示" mode="base" content="您是项目超级管理员,退出项目将彻底删除项目,是否继续？" message="成功消息"
				:before-close="true" @close="$refs.sp_exitpopup.close()" @confirm="sp_request_exit"></uni-popup-dialog>
		</uni-popup>
		<!-- 删除项目提示 -->
		<uni-popup class="test" ref="exit_message_popup" type="message">
		    <uni-popup-message type="error" message="失败消息" :duration="3000">{{err_msg}}</uni-popup-message>
		</uni-popup>
		<view class="top-wrapper">
			<!-- 顶部 -->
			<view class="top">
				<view class="title" @click="refreshList()">项目选择</view>
				<view class="account" @click="circleAnimation()">GitHub账号：{{GitHubAccount}}</view>
				<navigator class="top-button" url="/pages/accountSettings/accountSettings"
					hover-class="navigator-hover">
					<view class="iconfont icon-shezhi "></view>
				</navigator>
			</view>
		</view>
		<!-- 按钮 -->
		<view class="more" @click="openPopup">
			<view class="iconfont icon-zengjia"></view>
		</view>
		<!-- 仓库列表 -->
		<view class="list-wrapper" ref='projectSelect'>
			<view class="list-item-wrapper" v-for="(item, key) in project_list" :key=item.key>
				<view class="list-item" @click="toProject(key)" @longpress='exitproject(key)'>
					<view class="list-item-repositories">{{item.repo[0].fields.repo_name}}</view>
					<view class="list-item-more">
						<view class="member-number">
							<view class="iconfont icon-ren111"></view>
							<view class="number">{{item.repo[0].fields.repo_member}}</view>
						</view>
						<view class="list-item-description">{{item.repo[0].fields.url}}</view>
						<progress class="list-item-bar" duration=7 stroke-width="20rpx" border-radius="300"
							active="true" color="#5091f2"
							:percent="item.repo[0].fields.finished * 100 / (item.repo[0].fields.checking+item.repo[0].fields.finished+item.repo[0].fields.incomplete)"></progress>
					</view>
				</view>
			</view>
		</view>
		<!-- 背景 -->
		<view class="bg-circle">
			<view class='orange' :animation='orange_ani'></view>
			<view class='blue' :animation='blue_ani'></view>
			<view class='green' :animation='green_ani'></view>
		</view>
	</view>
</template>
<script>
	import {
		baseUrl
	} from '../../utils/config.js';
	import createProject from '../../components/createProject';
	import joininProject from '../../components/joininProject';
	export default {
		data() {
			return {
				userInfo: [],
				project_list: [],
				u_id: -1,
				middle: -1,
				message: '',
				GitHubAccount: '',
				orange_ani: {},
				blue_ani:{},
				green_ani:{},
				or:{},
				bl:{},
				gr:{},
				err_msg:''
			};
		},
		components: {
			createProject,
			joininProject
		},
		methods: {
			//弹窗相关方法
			openPopup() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.morePopup.open('center')
			},
			closePopup() {
				this.$refs.morePopup.close()
			},
			createPopup() {
				this.$refs.createPopup.open('center')
			},
			closeCreatepopup() {
				this.$refs.createPopup.close()
			},
			joininPopup() {
				this.$refs.joininPopup.open('center')
			},
			closeJoininpopup() {
				this.$refs.joininPopup.close()
			},
			exitproject(key) {
				this.middle = key;
				this.$refs.exitpopup.open()

			},
			closeExitpopup() {
				this.$refs.exitpopup.close()
			},
			toProject(key) {
				console.log(this.project_list[key])
				let repo = this.project_list[key].repo[0].pk
				let repo_name = this.project_list[key].repo[0].fields.repo_name
				let url = this.project_list[key].repo[0].fields.url
				let role = this.project_list[key].role
				let member_id = this.project_list[key].member_id
				// item.repo[0].fields.finished * 100 / (item.repo[0].fields.checking+item.repo[0].fields.finished+item.repo[0].fields.incomplete)
				let f = this.project_list[key].repo[0].fields
				let progress = f.incomplete * 100 / (f.incomplete + f.checking + f.finished)
				progress = parseInt(progress)
				uni.navigateTo({
					url: '../projectList/projectList?repo_id=' + repo + '&repo_name=' + repo_name + '&url=' + url +
						'&role=' + role + '&member_id=' + member_id + '&progress=' + progress,
					animationDuration: 300
				})
			},
			request_exit() {
				let role = this.project_list[this.middle].role
				if (role == 0){
					this.$refs.exitpopup.close()
					this.$refs.sp_exitpopup.open('center')
				}
				else{
					uni.request({
						url: baseUrl + '/repo/exitRepo', //仅为示例，并非真实接口地址。
						method: 'POST',
						timeout: 8000,
						data: {
							repo_id: this.project_list[this.middle].repo[0].pk,
							u_id: this.u_id,
						},
						header: {
							"content-type": "application/x-www-form-urlencoded" //自定义请求头信息
						},
						success: (res) => {
							this.err_msg = res.data.message
							console.log(this.err_msg)
							uni.showToast({
								title: '请求退出成功',
								icon: 'success',
								duration: 2000
							});
							this.$options.methods.refreshList.bind(this)()
							this.$refs.exitpopup.close()
							uni.hideLoading()
						},
						fail() {
							uni.hideLoading()
							uni.showToast({
								title: this.message,
								icon: 'error'
							});
						}
					})
					this.$refs.exit_message_popup.open('top')
				}
			},
			sp_request_exit(){
				console.log("超管退出")
				uni.request({
					url: baseUrl + '/repo/delRepo', //仅为示例，并非真实接口地址。
					method: 'POST',
					timeout: 8000,
					data: {
						u_id: this.u_id,
						repo_id: this.project_list[this.middle].repo[0].pk,
					},
					header: {
						"content-type": "application/x-www-form-urlencoded" //自定义请求头信息
					},
					success: (res) => {
						this.err_msg = res.data.message
						this.err_msg = '删除项目成功'
						this.$refs.exit_message_popup.open('top')
						this.$options.methods.refreshList.bind(this)()
					},
					fail() {
						uni.showToast({
							title: this.message,
							icon: 'error'
						});
					}
				})
				this.$refs.sp_exitpopup.close()
			},
			refreshList() {
				console.log('refresh')
				uni.showLoading({
					title: '加载中'
				})
				uni.request({
					url: baseUrl + '/repo/showRepo', //仅为示例，并非真实接口地址。
					method: 'POST',
					timeout: 8000,
					data: {
						u_id: this.u_id
					},
					header: {
						"content-type": "application/x-www-form-urlencoded" //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data.data)
						this.project_list = res.data.data
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
			circleAnimation() {
				{
					var pi = Math.PI
					let angle = 0
					let r1 = 100
					let x_zuo = r1 * Math.cos(angle)
					let y_zuo = r1 * Math.sin(angle)
					this.or = setInterval(()=>{
						this.or_ani = uni.createAnimation({duration: 200});
						this.or_ani.translate(x_zuo,y_zuo).scale(0.3*Math.sin(0.5*angle+pi)+1.2).step({duration:200})
						this.orange_ani = this.or_ani.export();
						angle = (angle+0.1)%(2*pi)
						x_zuo = r1*Math.cos(angle)
						y_zuo = r1*Math.sin(angle)
					},200)
				}
				{
					var pi = Math.PI
					let angle = 5
					let r1 = 60
					let x_zuo = r1 * Math.cos(angle)
					let y_zuo = r1 * Math.sin(angle)
					this.bl = setInterval(()=>{
						this.bl_ani = uni.createAnimation({duration: 200});
						this.bl_ani.translate(x_zuo,y_zuo).step({duration:200})
						this.blue_ani = this.bl_ani.export();
						angle = (angle-0.02+2*pi)%(2*pi)
						x_zuo = r1*Math.cos(angle)
						y_zuo = r1*Math.sin(angle)
					},200)
				}
				{
					var pi = Math.PI
					let angle = pi
					let r1 = 120
					let x_zuo = r1 * Math.cos(angle)
					let y_zuo = r1 * Math.sin(angle)
					this.gr = setInterval(()=>{
						this.gr_ani = uni.createAnimation({duration: 200});
						this.gr_ani.translate(x_zuo,y_zuo).step({duration:200})
						this.green_ani = this.gr_ani.export();
						angle = (angle+0.06)%(2*pi)
						x_zuo = r1*Math.cos(angle)
						y_zuo = r1*Math.sin(angle)
					},200)
				}
			}
		},
		onLoad() {
			if (!uni.getStorageSync("userInfo") || !uni.getStorageSync("GitHubAccount") || !uni.getStorageSync(
					"GitHubAccount")) {
				uni.redirectTo({
					url: '../accountSettings/accountSettings'
				})
			}
			uni.showLoading({
				title: "加载中",
				mask: true
			})
			this.u_id = uni.getStorageSync("u_id")
			this.userInfo = uni.getStorageSync("userInfo")
			this.GitHubAccount = uni.getStorageSync("GitHubAccount")
			uni.request({
				url: baseUrl + '/repo/showRepo', //仅为示例，并非真实接口地址。
				method: 'POST',
				timeout: 8000,
				data: {
					u_id: this.u_id
				},
				header: {
					"content-type": "application/x-www-form-urlencoded" //自定义请求头信息
				},
				success: (res) => {
					// console.log(res.data.data)
					this.project_list = res.data.data
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
		onShow() {
			this.$options.methods.circleAnimation.bind(this)()
			this.$options.methods.refreshList.bind(this)()
		},
		onHide(){
			clearInterval(this.or)
			clearInterval(this.bl)
			clearInterval(this.gr)
		}
	}
</script>

<style lang="scss">
	.body {}

	.morePopup {
		z-index: 15;
		margin: 0 auto;

		.wrapper {
			width: 100%;
			height: 100vh;

			.botton-wrapper {
				position: absolute;
				height: 600rpx;
				width: 364rpx;
				bottom: 59rpx;
				left: -23rpx;
				display: flex;
				flex-direction: column;

				view {
					width: 364rpx;
					height: 200rpx;
					display: flex;
					justify-content: center;

					view:nth-child(1) {
						width: 210rpx;
						height: 200rpx;
						font-size: 40rpx;
						line-height: 200rpx;
						color: white;
					}

					view:nth-child(2) {
						width: 130rpx;
						height: 130rpx;
						margin-top: 41rpx;
						background-color: white;
						border-radius: 50%;
						display: flex;
						box-shadow: 0 4rpx 12rpx #888888;

						.iconfont {
							line-height: 130rpx;
							text-align: center;
							font-size: 100rpx;
							color: black;
						}
					}
				}
			}
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
				top: 58rpx;
				width: 86rpx;
				height: 86rpx;

				.iconfont {

					font-size: 86rpx;
				}
			}
		}
	}

	.list-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 1;

		.list-item-wrapper {
			margin-top: 30rpx;
			width: 100%;

			.list-item {
				margin: 22rpx auto;
				height: 120rpx;
				width: 615rpx;
				border-radius: 10rpx;
				box-shadow: 0 4rpx 12rpx #888888;
				background-color: rgba($color: #ffff, $alpha: 0.5);

				.list-item-repositories {
					position: relative;
					left: 21rpx;
					top: 20rpx;
					height: 28rpx;
					line-height: 28rpx;
					font-size: 28rpx;

				}

				.list-item-more {
					width: 750rpx;
					height: 64rpx;
				}

				.member-number {
					position: relative;
					left: 500rpx;
					top: -20rpx;
					width: 200rpx;
					height: 50rpx;

					.iconfont {
						font-size: 50rpx;
					}

					.number {
						position: relative;
						font-size: 30rpx;
						top: -45rpx;
						right: -57rpx;
					}
				}


				.list-item-description {
					position: relative;
					left: 21rpx;
					top: -24rpx;
					height: 25rpx;
					font-size: 25rpx;
					line-height: 25rpx;
					color: $less-important-font;
				}

				.list-item-bar {
					position: relative;
					top: -10rpx;
					width: 570rpx;
					left: 22rpx;
				}
			}
		}
	}

	.bg-circle {
		z-index: 0;

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

	.more {
		position: fixed;
		width: 130rpx;
		height: 130rpx;
		right: 46rpx;
		bottom: 90rpx;
		border-radius: 50%;
		background-color: white;
		z-index: 10;
		text-align: center;
		line-height: 130rpx;
		box-shadow: 0 4rpx 12rpx #888888;

		.iconfont {
			font-size: 130rpx;
		}
	}
</style>
