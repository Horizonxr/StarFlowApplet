<template>
	<view>
		<uni-popup ref="pemissionSetting" type="center"  :mask-click="false">
			<view class="prompt">
				<view class="title">权限修改为</view>
				<view class="root-name" @click="this.pull_identity = 1;"
					:style="{'background-color':pull_identity !== 1 ? 'white' : '#5091f2'}">管理员</view>
				<view class="root-name" @click="this.pull_identity = 2;"
					:style="{'background-color':pull_identity !== 2 ? 'white' : '#5091f2'}">开发者</view>
				<view class="root-name" @click="this.pull_identity = 3;"
					:style="{'background-color':pull_identity !== 3 ? 'white' : '#5091f2'}">游客</view>
				<view class="iconfont icon-duigou" @click="pemissionSetting_request"></view>
				<view class="iconfont icon-chahao" @click="cancle"></view>
			</view>
		</uni-popup>
		<uni-popup ref="memberDelete" type="dialog">
			<uni-popup-dialog type='info' title="提示"mode="base" content="确认删除该成员？"message="成功消息" :duration="2000" :before-close="true" @close="memberConfirmClose()" @confirm="memberDelete()"></uni-popup-dialog>
		</uni-popup>
		<view class="back">
			<uni-popup ref="memberAudit" type="center" :mask-click="false">
				<memberAudit v-if="show_member_audit" @closememberAudit="closememberAudit" @refreshMemberList="refreshMemberList"
					:repo_id="repo_id"></memberAudit>
			</uni-popup>
			<view class="iconfont icon-fanhui" @click="close"></view>
			<view class="title">项目设置</view>
			<view class="slogan"></view>
			<view class="projectName">
				<view class="project">项目名称:</view>
				<view class="name">{{repo_name}}</view>
			</view>
			<view class="warehouseName">
				<view class="warehouse">GitHub仓库：</view>
				<view class="address"> {{repo_address}}</view>
				<view class="iconfont icon-chengong"></view>
			</view>
			<view class="personalManagement">
				<view class="title">人员管理：<view v-if="role==0" class="iconfont icon-bi" @click="personAni()"></view>
				</view>
				<view :animation="person_ani">
					<scroll-view scroll-y="true" class="huadon">
						<view class="list-item" v-for="(item, key) in member_list" :key=item.key>
							<view class="name">{{item.fields.username}}</view>
							<view class="root" @click="openpemissionSetting(member_list[key].pk)">
								{{member_root[item.fields.identity+1]}}
							</view>
							<view class="iconfont icon-chahao" v-show="person_change_delete" @click="memberDeleteConfirm(key)"></view>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="bottom">
				<view class="iconfont icon-fenxiang"></view>
				<view class="iconfont icon-yishenpi" @click="openmemberAudit"></view>
				<view class="iconfont icon-duigou" @click="close"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		baseUrl
	} from '../../utils/config.js';
	export default {
		name: "myPopup",
		props: ["repo_name", "repo_address", "repo_id"],
		data() {
			return {
				role:-1,
				member_list: [],
				member_root: ['待审核', '超级管理员', '管理员', '开发者', '游客'],
				pull_member_id: -1,
				pull_identity: -1,
				identity_change: [{
					member_id:-1,
					identity: -1,
				}],
				person_ani: {},
				person_change_delete:false,
				delete_key:-1,
				show_member_audit:false
			};
		},
		methods: {
			close() {
				this.$emit("closemyPopup")
			},
			memberConfirmClose(){
				this.$refs.memberDelete.close()
			},
			openpemissionSetting(member_id) {
				this.pull_member_id = member_id
				console.log(member_id)
				this.$refs.pemissionSetting.open("center")
			},
			cancle() {
				this.$refs.pemissionSetting.close("center")
			},
			openmemberAudit() {
				this.show_member_audit = true
				this.$refs.memberAudit.open("center")
			},
			closememberAudit() {
				this.$refs.memberAudit.close()
				this.show_member_audit = false
				// this.$forceUpdate()
				this.$options.methods.refreshMemberList.bind(this)()
			},
			memberDeleteConfirm(key){
				this.$refs.memberDelete.open("cener")
				this.delete_key = key
			},
			//权限修改函数
			pemissionSetting_request() {
				let _this = this
				this.identity_change[0].member_id=this.pull_member_id
				this.identity_change[0].identity=this.pull_identity
				let i = JSON.stringify(this.identity_change)
				uni.request({
					url: baseUrl + '/repo/changeIdentity', //仅为示例，并非真实接口地址。
					method: 'POST',
					timeout: 8000,
					data:i,
					header: {
						"content-type": "application/j" //自定义请求头信息
					},
					success: (res) => {
						_this.$options.methods.refreshMemberList.bind(this)()
						uni.showToast({
							title: '修改成功',
							icon: 'success'
						});
					},
					fail(err) {
						console.log(err)
						uni.showToast({
							title: '修改失败',
							icon: 'error'
						});
					}
				})
				this.$options.methods.cancle.bind(this)()
			},
			personAni(){
				this.ani = uni.createAnimation({
					duration:200,
					timingFunction: "ease",
				})
				this.ani.translateX(-25).step({duration:200})
				this.person_ani = this.ani.export();
				this.person_change_delete = true
			},
			refreshMemberList() {
				uni.showLoading({
					title: '加载中'
				})
				uni.request({
					url: baseUrl + '/repo/getAllMember', //仅为示例，并非真实接口地址。
					method: 'POST',
					timeout: 2000,
					data: {
						repo_id: this.repo_id
					},
					header: {
						"content-type": "application/x-www-form-urlencoded" //自定义请求头信息
					},
					success: (res) => {
						console.log("获得人员数据")
						console.log(res.data.data)
						this.member_list = res.data.data
						console.log("更新后人员数据")
						console.log(this.member_list)
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
				this.$forceUpdate()
			},
			memberDelete(key){
				console.log(this.member_list[this.delete_key].fields.user_id)
				uni.request({
					url: baseUrl + '/repo/exitRepo', //仅为示例，并非真实接口地址。
					method: 'POST',
					timeout: 8000,
					data: {
						repo_id: this.repo_id,
						u_id:this.member_list[this.delete_key].fields.user_id
					},
					header: {
						"content-type": "application/x-www-form-urlencoded" //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data.message)
						this.member_list = res.data.data
						uni.hideLoading()
						this.$options.methods.refreshMemberList.bind(this)()
					},
					fail() {
						uni.hideLoading()
						uni.showToast({
							title: '请求失败',
							icon: 'error'
						});
					}
				})
				this.$refs.memberDelete.close()
			}
		},
			
		mounted() {
			uni.showLoading({
				title: '加载中'
			})
			this.role = uni.getStorageSync('temp_role')
			uni.request({
				url: baseUrl + '/repo/getAllMember', //仅为示例，并非真实接口地址。
				method: 'POST',
				timeout: 8000,
				data: {
					repo_id: this.repo_id
				},
				header: {
					"content-type": "application/x-www-form-urlencoded" //自定义请求头信息
				},
				success: (res) => {
					console.log("这是项目成员列表")
					console.log(res.data.data)
					this.member_list = res.data.data
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
	.prompt {
		position: relative;
		height: 400rpx;
		width: 590rpx;
		background-color: #fff;
		border-radius: 30rpx;
		.title {
			position: relative;
			width: 590rpx;
			height: 60rpx;
			font-size: 60rpx;
			text-align: center;
			top: 40rpx;
		}
	
		.root-name {
			border-radius: 6rpx;
			position: relative;
			width: 120rpx;
			top: 65rpx;
			left: 230rpx;
			font-size: 40rpx;
		}
	
		.icon-duigou {
			position: relative;
			width: 100rpx;
			top: 60rpx;
			left: 140rpx;
		}
	
		.icon-chahao {
			position: relative;
			width: 100rpx;
			top: -70rpx;
			left: 320rpx;
	
		}
	}
	
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
		
		.iconfont {
			font-size: 86rpx;
			position: absolute;
			top: 25rpx;
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

		.slogan {
			position: absolute;
			top: 250rpx;
			left: 40rpx;
			font-size: 35rpx;
			color: #000000;
		}

		.projectName {
			position: absolute;
			top: 278rpx;
			height: 75rpx;
			width: 670rpx;
			line-height: 75rpx;

			.project {
				position: absolute;
				left: 40rpx;
				font-size: 48rpx;
				color: #000000;
			}

			.name {
				position: absolute;
				height: 75rpx;
				width: 350rpx;
				top: 0;
				left: 270rpx;
				font-size: 33rpx;
				color: #000000;

				text-align: center;
			}

		}

		.warehouseName {
			position: absolute;
			top: 375rpx;
			height: 155rpx;
			width: 670rpx;

			.warehouse {
				position: absolute;
				left: 39rpx;
				font-size: 48rpx;
				color: #000000;
			}

			.address {
				position: absolute;
				top: 60rpx;
				left: 25rpx;
				height: 75rpx;
				width: 577rpx;
				line-height: 75rpx;
				border-radius: 10rpx;
				padding-left: 20rpx;
			}
		}

		.personalManagement {
			position: absolute;
			top: 530rpx;
			height: 480rpx;
			width: 670rpx;

			.title {
				position: relative;
				top: -16rpx;
				left: 42rpx;
				color: #000000;
				font-size: 48rpx;
				height: 60rpx;
			}

			.iconfont {
				position: relative;
				margin-left:-22rpx;
				left: 545rpx;
				top: -55rpx;
				line-height: 24px;
				font-size: 48rpx;
				height: 48rpx;
				width: 48rpx;
			}

			.huadon {
				position: relative;
				top: 8rpx;
				height: 300rpx;
				width: 660rpx;

				.list-item {
					position: relative;
					height: 56rpx;
					line-height: 56rpx;

					.name {
						position: relative;
						left: 100rpx;
						color: #000000;
						font-size: 33rpx;
					}

					.root {
						position: relative;
						color: #000000;
						font-size: 28rpx;
						left: 320rpx;
						top: -50rpx;
						border: 0.5rpx solid #000000;
						width: 209rpx;
						height: 40rpx;
						text-align: center;
						line-height: 40rpx;
					}
					.iconfont{
						top:-100rpx;
						margin-left: 65rpx;
					}
				}

			}

		}

		.bottom {
			.icon-fenxiang {
				position: absolute;
				font-size: 81rpx;
				left: 78rpx;
				top: 910rpx;
			}

			.icon-yishenpi {
				position: absolute;
				font-size: 82rpx;
				left: 294rpx;
				top: 910rpx;
			}

			.icon-duigou {
				position: absolute;
				font-size: 92rpx;
				left: 492rpx;
				top: 904rpx;
			}
		}


	}
</style>
