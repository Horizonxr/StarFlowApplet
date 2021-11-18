<template>
	<view>
		<view class="back">
			<view class="iconfont icon-fanhui" @click="close"></view>
			<view class="title">我的任务</view>
			<view class="slogan">This is a test case for Todolist</view>
			<view class="projectName">
				<view class="project">项目名称:</view>
				<view class="name"  >{{repo_name}}</view>
			</view>
			<view class="warehouseName">
				<view class="warehouse">GitHub仓库：</view>
				<view class="address" > {{repo_address}}</view>
				<view class="iconfont icon-chengong"></view>
			</view>
			<view class="personalManagement">
				<view class="title">人员管理：<view class="iconfont icon-bi"></view></view>
				
				<view>
					<scroll-view scroll-y="true" class="huadon">
						<view class="list-item" v-for="(item, key) in member_list" :key=item.key>	
								<view class="name">{{item.fields.username}}</view>
								<view class="root">{{member_root[item.fields.identity+1]}}</view>			
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="bottom">
				<view class="iconfont icon-fenxiang"></view>
				<view class="iconfont icon-yishenpi" @click="audit"></view>
				<view class="iconfont icon-duigou"></view>
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
		props: ["repo_name","repo_address","repo_id"],
		data() {
			return {
				member_list: [],
				member_root: ['待审核','超级管理员','管理员','开发者','游客']
			};
		},
		methods: {
			close() {
				this.$emit("closemyPopup")
			},
			audit(){
				this.$emit("openmemberAudit")
			}
		},
		mounted() {
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
	.back {
		position: relative;
		height: 1110rpx;
		width: 670rpx;
		background-color: #FFFFFF;

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
			top: 292rpx;
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
				left: 40rpx;
				font-size: 48rpx;
				color: #000000;
			}

			.address {
				position: absolute;
				top: 60rpx;
				left: 40rpx;
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
				    top: 0;
				    left: 40rpx;
				    color: #000000;
				    font-size: 48rpx;
				    height: 60rpx;
			}
			.iconfont {
				    position: relative;
				    left: 545rpx;
				    top: -55rpx;
				    line-height: 24px;
				    font-size: 48rpx;
				    height: 48rpx;
				    width: 48rpx;
			}

			.huadon {
				position: relative;
				top: 20rpx;
				height: 400rpx;
				width: 670rpx;
				.list-item{
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
						    left: 290rpx;
						    top: -50rpx;
						    border: 0.5rpx solid #000000;
						    width: 209rpx;
						    height: 40rpx;
						    text-align: center;
						    line-height: 40rpx;
					}
				}
				
			}

		}

		.bottom {
			.icon-fenxiang {
				position: absolute;
				font-size: 81rpx;
				left: 78rpx;
				top: 1000rpx;
			}

			.icon-yishenpi {
				position: absolute;
				font-size: 82rpx;
				left: 294rpx;
				top: 1000rpx;
			}

			.icon-duigou {
				position: absolute;
				font-size: 82rpx;
				left: 492rpx;
				top: 1008rpx;
			}
		}


	}
</style>
