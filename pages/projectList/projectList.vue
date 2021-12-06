<template>
	<view class="body">
		<bgAni> 背景动画</bgAni>
		<!-- 任务详情弹窗 -->
		<uni-popup class="taskPopup" ref="taskPopup" type="center" :mask-click="false">
			<incomplete v-if="show_incomplete" v-show="popup_task === 1" @closePopup="closePopup" @refresh="refreshList"
				:taskInfo="taskInfo" :role="role" :member_id="member_id" :repo_name="repo_name"></incomplete>
			<checking v-show="popup_task === 2" @closePopup="closePopup" @refresh="refreshList" :taskInfo="taskInfo"
				:role="role" :member_id="member_id"></checking>
			<finish v-show="popup_task === 3" @closePopup="closePopup" @refresh="refreshList" :taskInfo="taskInfo"
				:role="role" :member_id="member_id"></finish>
		</uni-popup>
		<!-- 按钮弹窗 -->
		<uni-popup class="moremorePopup" ref="moremorePopup" type="center" :mask-click="false">
			<view class="botton-wrapper">
				<view class="more-text" v-if="role <= 1">添加新任务</view>
				<view class="help-text">帮助说明</view>
				<view class="quxiao-text">取消</view>
				<view class="button-more" @click="addTask" v-if="role <= 1">
					<view class="iconfont icon-zengjia">
					</view>
				</view>
				<view class="button-jiaru" @click="$refs.helpPopup.open('center')">
					<view class="iconfont icon-qm">
					</view>
				</view>
				<view class="button-quxiao" @click="canclePopup">
					<view class="iconfont icon-chahao ">
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup class="addaddPopup" ref="addaddPopup" type="center" :mask-click="false">
			<addTask v-if="show_addTask" @closeaddPopup="closeaddPopup" :repo_id="repo_id"></addTask>
		</uni-popup>
		<uni-popup class="addaddPopup" ref="myproject" type="center" :mask-click="false">
			<projectSettings v-if="show_settings" @openmemberAudit="openmemberAudit" @closemyPopup="closemyPopup"
				:repo_name="repo_name" :repo_address="repo_address" :repo_id="repo_id"></projectSettings>
		</uni-popup>
		<uni-popup ref="helpPopup" type="center">
			<helpText @closeHelpPopup="$refs.helpPopup.close()"></helpText>
		</uni-popup>
		<!-- 页面顶部功能 -->
		<view class="top-wrapper">
			<view class="top">
				<view class="title" @click="refreshList()">任务列表</view>
				<view class="account">仓库：{{repo_name}}</view>
				<view class="top-button">
					<view class="iconfont icon-shezhi" @click="projectSettings"></view>
				</view>
				<view class="seg-all">
					<view class="seg-shader" :animation="seg_ani">
					</view>
					<view class="seg-back">
					</view>
					<view class="seg-wrapper">
						<view @click="allTask()">所有任务</view>
						<view @click="myTask()">我的任务</view>
					</view>
				</view>
			</view>
		</view>
		<view class="list-wrapper">
			<view class="list-item-wrapper">
				<view class="list-item" @click="taskPopup(1, key)" style="background-color: rgba(166,229,174,0.8);"
					v-for="(item, key) in mission_list.incomplete" :key=item.key>
					<view class="list-item-mission">任务：{{item.task_name}}</view>
					<view class="list-item-DDL">DeadLine: {{DDLcompute(item.deadline)}}</view>
					<view class="list-item-more">
						<view class="iconfont icon-gengduo"></view>
					</view>
				</view>
				<view class="list-item" @click="taskPopup(2, key)" style="background-color: rgba(127,169,242,0.8);"
					v-for="(item, key) in mission_list.checking" :key=item.key>
					<view class="list-item-mission">任务：{{item.task_name}}</view>
					<view class="list-item-DDL">DeadLine: {{DDLcompute(item.deadline)}}</view>
					<view class="list-item-more">
						<view class="iconfont icon-gengduo"></view>
					</view>
				</view>
				<view class="list-item" @click="taskPopup(3, key)" style="background-color: rgba(166,165,165,0.8);"
					v-for="(item, key) in mission_list.finish" :key=item.key>
					<view class="list-item-mission">任务：{{item.task_name}}</view>
					<view class="list-item-DDL">DeadLine: {{DDLcompute(item.deadline)}}</view>
					<view class="list-item-more">
						<view class="iconfont icon-gengduo"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="botton-wrapper2">
			<view class="progress-box">
				<progress show-info :percent="progress" stroke-width="23rpx" backgroundColor="#999"
					activeColor="#007AFF" font-size="20rpx" border-radius="20rpx" />
			</view>
			<view class="button-add" @click="morePopup">
				<view class="iconfont icon-zengjia">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		baseUrl
	} from '../../utils/config.js';
	import createProject from '../../components/createProject';
	export default {
		data() {
			return {
				member_id: -1, //成员在项目中的id
				repo_name: '', //仓库名称
				repo_address: '', //GitHub仓库URL
				role: -1, //role中-1代表加入项目待审核、0表示超级管理员、1表示管理员、2表示开发者、3表示游客
				popup_task: -1, //1代表未完成，2代表待审核，3代表已完成
				repo_id: -1,
				mission_list: {
					incomplete: [],
					checking: [],
					finish: []
				},
				taskInfo: [],
				progress: 0,
				show_settings: 0,
				show_addTask: 0,
				show_incomplete: 0,
				seg_ani:[],
				refresh_action:0
			};
		},
		components: {
			createProject
		},
		methods: {
			//顶部分隔栏相关函数
			allTask(){
				this.refresh_action = 0
				this.segment_ani = uni.createAnimation({
					duration:200
				})
				this.segment_ani.translateX(0).step({
					duration:200,
					timingFunction:'ease'
				})
				this.seg_ani = this.segment_ani.export()
				this.$options.methods.refreshList.bind(this)()
			},
			myTask(){
				const { windowWidth, windowHeight } = uni.getSystemInfoSync();
				let tx = windowWidth / 750 * 310
				this.refresh_action = 1
				this.segment_ani = uni.createAnimation({
					duration:200
				})
				console.log(tx)
				this.segment_ani.translateX(tx).step({
					duration:200,
					timingFunction:'ease'
				})
				this.seg_ani = this.segment_ani.export()
				this.$options.methods.refreshList.bind(this)()
			},
			// 弹出层相关函数
			closePopup() {
				this.$refs.taskPopup.close()
				this.$options.methods.refreshList.bind(this)()
				this.show_incomplete = 0
			},
			taskPopup(kind, index) {
				this.show_incomplete = 1
				console.log("任务编号是" + index)
				this.popup_task = kind
				let taskInfo = []
				if (kind == 1) taskInfo = this.mission_list.incomplete[index]
				else if (kind == 2) taskInfo = this.mission_list.checking[index]
				else if (kind == 3) taskInfo = this.mission_list.finish[index]
				console.log(taskInfo)
				this.taskInfo = taskInfo
				this.$refs.taskPopup.open("center")

			},
			morePopup() {
				this.$refs.moremorePopup.open("center")
			},
			addTask() {
				this.show_addTask = 1
				this.$refs.addaddPopup.open("center")
			},
			closeaddPopup() {
				this.$refs.addaddPopup.close("center")
				this.$refs.moremorePopup.close("center")
				this.$options.methods.refreshList.bind(this)()
				this.show_addTask = 0
			},
			canclePopup() {
				this.$refs.moremorePopup.close("center")
			},
			projectSettings() {
				this.show_settings = 1
				this.$refs.myproject.open("center")
			},
			closemyPopup() {
				this.show_settings = 0
				this.$refs.myproject.close("center")
			},
			// DDL计算连接字符串函数
			DDLcompute(DDL) {
				let DDLjoin = DDL[0].toString()
				for (let i = 1; i < 3; i++) {
					DDLjoin = DDLjoin + '.' + DDL[i].toString()
				}
				return DDLjoin
			},
			// 重新获取任务列表
			refreshList() {
				// 调用方法:this.$options.methods.refreshList.bind(this)()
				uni.showLoading({
					title: '加载中'
				})
				uni.request({
					url: baseUrl + '/repo/showTask', //仅为示例，并非真实接口地址。
					method: 'POST',
					timeout: 8000,
					data: {
						repo_id: this.repo_id,
						u_id: uni.getStorageSync('u_id'),
						action: this.refresh_action
					},
					header: {
						"content-type": "application/x-www-form-urlencoded" //自定义请求头信息
					},
					success: (res) => {
						console.log(res)
						this.mission_list.incomplete = res.data.incomplete
						this.mission_list.checking = res.data.checking
						this.mission_list.finish = res.data.finish
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
		},
		onLoad(option) { //option为object类型，会序列化上个页面传递的参数
			uni.showLoading({
				title: '加载中'
			})
			this.repo_name = option.repo_name
			this.repo_id = option.repo_id
			this.role = option.role
			this.member_id = option.member_id
			this.repo_address = option.url
			this.progress = option.progress
			uni.setStorage({
				key: 'temp_role',
				data: this.role
			})
			uni.request({
				url: baseUrl + '/repo/showTask', //仅为示例，并非真实接口地址。
				method: 'POST',
				timeout: 8000,
				data: {
					repo_id: option.repo_id,
					u_id: uni.getStorageSync('u_id'),
					action: 0
				},
				header: {
					"content-type": "application/x-www-form-urlencoded" //自定义请求头信息
				},
				success: (res) => {
					console.log(res)
					this.mission_list.incomplete = res.data.incomplete
					this.mission_list.checking = res.data.checking
					this.mission_list.finish = res.data.finish
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
		onHide() {

		},
		onShow() {}

	}
</script>

<style lang="scss" scoped>
	.body {
		width: 100%;
		height: 100vh;
		background-color: $bg-color;
		z-index: -999;

		.iconfont {
			font-size: 86rpx;
			line-height: 134rpx;
			text-align: center;
		}

		.moremorePopup {
			width: 100%;
			height: 100vh;
			z-index: 15;

			.botton-wrapper {
				width: 100%;
				height: 100vh;

				.more-text {
					z-index: 15;
					position: fixed;
					left: 279rpx;
					bottom: 469rpx;
					font-size: 55rpx;
					color: #fffefe;
					font-family: Adobe 黑体 Std;
				}

				.button-more {
					height: 134rpx;
					width: 134rpx;
					border-radius: 50%;
					z-index: 15;
					position: fixed;
					bottom: 424rpx;
					right: 46rpx;
					background-color: #FFF;
					box-shadow: 0 4rpx 12rpx #888888;
				}

				.help-text {
					z-index: 101;
					position: fixed;
					bottom: 305rpx;
					right: 200rpx;
					font-size: 55rpx;
					color: #fffefe;
					font-family: Adobe 黑体 Std;

				}

				.button-jiaru {
					height: 134rpx;
					width: 134rpx;
					border-radius: 50%;
					z-index: 101;
					position: fixed;
					bottom: 255rpx;
					right: 46rpx;
					background-color: #FFF;
					box-shadow: 0 4rpx 12rpx #888888;

				}

				.quxiao-text {
					z-index: 101;
					position: fixed;
					bottom: 125rpx;
					right: 200rpx;
					font-size: 55rpx;
					color: #fffefe;
					font-family: Adobe 黑体 Std;
				}

				.button-quxiao {
					height: 134rpx;
					width: 134rpx;
					border-radius: 50%;
					z-index: 101;
					position: fixed;
					bottom: 90rpx;
					right: 46rpx;
					background-color: #FFF;
					box-shadow: 0 4rpx 12rpx #888888;
				}

			}

		}

		.addaddPopup {
			width: 100%;
			height: 100vh;
			z-index: 15;
		}

		.top-wrapper {
			top: 4rpx;
			position: sticky;
			width: 100%;
			height: 250rpx;
			z-index: 10;

			.top {
				position: relative;
				width: 666rpx;
				height: 250rpx;
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
					top:125rpx;
					left: 23rpx;
					font-size: 34rpx;
				}
				.seg-all{
					position: absolute;
					top:180rpx;
					height: 50rpx;
					width: 666rpx;
					.seg-back{
						z-index: 1;
						position: absolute;
						height: 50rpx;
						width: 620rpx;
						left: 20rpx;
						background-color: #DDDDDD;
						border-radius: 10rpx;
						border: 4rpx solid #DDDDDD;
					}
					.seg-shader{
						z-index: 2;
						position: absolute;
						top: 4rpx;
						left:24rpx;
						width: 310rpx;
						height: 50rpx;
						line-height: 50rpx;
						text-align: center;
						border-radius: 10rpx;
						background-color: white;
					}
					.seg-wrapper{
						z-index: 3;
						position: absolute;
						height: 50rpx;
						width: 620rpx;
						left: 20rpx;
						top: 5rpx;
						border-radius: 10rpx;
						display: flex;
						justify-content: space-around;
						view{
							width: 50%;
							height: 50rpx;
							line-height: 50rpx;
							text-align: center;
							border-radius: 10rpx;
						}
					}
				}
				.top-button {
					position: relative;
					left: 555rpx;
					top: 38rpx;
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
			background-color: rgba(255, 255, 255, 0);

			.list-item-wrapper {
				margin-top: 30rpx;
				width: 100%;
				background-color: rgba(255, 255, 255, 0);

				.list-item {
					margin: 22rpx auto;
					height: 120rpx;
					width: 615rpx;
					background-color: $bg-color;
					border-radius: 10rpx;
					box-shadow: 0 4rpx 12rpx #888888;
					background-color: $unfinished-mission;

					.list-item-mission {
						position: relative;
						left: 21rpx;
						top: 24rpx;
						height: 28rpx;
						line-height: 28rpx;
						font-size: 28rpx;

					}

					.list-item-DDL {
						position: relative;
						left: 21rpx;
						top: 57rpx;
						height: 25rpx;
						font-size: 25rpx;
						line-height: 25rpx;
						color: $less-important-font;
					}

					.list-item-more {
						width: 64rpx;
						height: 64rpx;

						.iconfont {
							position: relative;
							left: 536rpx;
							top: -25rpx;
							font-size: 64rpx;
						}

					}
				}
			}
		}

		.botton-wrapper2 {
			position: fixed;
			height: 227rpx;
			bottom: 0;
			z-index: 1;

			.button-add {
				height: 133rpx;
				width: 133rpx;
				border-radius: 50%;
				z-index: 10;
				position: absolute;
				left: 567rpx;
				background-color: #FFF;
				box-shadow: 0 4rpx 12rpx #888888;
			}

			.progress-box {
				height: 23rpx;
				width: 682rpx;
				position: absolute;
				bottom: 8rpx;
				left: 40rpx;
				z-index: 10;
			}


		}
	}
</style>
