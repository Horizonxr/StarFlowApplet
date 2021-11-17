<template>
	<view class="body">
		<!-- 任务详情弹窗 -->
		<uni-popup class="taskPopup" ref="taskPopup" type="center" :mask-click="false">
			<incomplete v-show="popup_task === 1" @closePopup = "closePopup"></incomplete>
			<checking v-show="popup_task === 2" @closePopup = "closePopup"></checking>
			<finish v-show="popup_task === 3" @closePopup = "closePopup"></finish>
		</uni-popup>
		<!-- 按钮弹窗 -->
		<uni-popup class="moremorePopup" ref="moremorePopup" type="center" :mask-click="false">
			<view class="botton-wrapper">
				<view class="more-text">添加新任务</view>
				<view class="help-text">帮助说明</view>
				<view class="quxiao-text">取消</view>
				<view class="button-more" @click="addPopup">
					<view class="iconfont icon-zengjia">
					</view>
				</view>
				<view class="button-jiaru" @click="poupeQuestion">
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
			<addPopup @closeaddPopup="closeaddPopup"></addPopup>
		</uni-popup>
		<uni-popup class="addaddPopup" ref="myproject" type="center" :mask-click="false">
			<myPopup @closemyPopup="closemyPopup"></myPopup>
		</uni-popup>
		<view class="top-wrapper">
			<view class="top">
				<view class="title">项目名称</view>
				<view class="account">仓库：{{repo_name}}</view>
				<view class="top-button">
					<view class="iconfont icon-shezhi" @click="myPopup"></view>
				</view>
			</view>
		</view>
		<view class="list-wrapper">
			<view class="list-item-wrapper">
				<view class="list-item" @click="taskPopup(1)" style="background-color: #8feb9b;" v-for="(item, key) in mission_list.incomplete" :key=item.key>
					<view class="list-item-mission">任务：{{item.task_name}}</view>
					<view class="list-item-DDL">DeadLine: {{DDLcompute(item.deadline)}}</view>
					<view class="list-item-more">
						<view class="iconfont icon-gengduo"></view>
					</view>
				</view>
				<view class="list-item" @click="taskPopup(2)" style="background-color: #7fa9f2;" v-for="(item, key) in mission_list.checking" :key=item.key>
					<view class="list-item-mission">任务：{{item.task_name}}</view>
					<view class="list-item-DDL">DeadLine: {{DDLcompute(item.deadline)}}</view>
					<view class="list-item-more">
						<view class="iconfont icon-gengduo"></view>
					</view>
				</view>
				<view class="list-item" @click="taskPopup(3)" style="background-color: #a6a5a5;" v-for="(item, key) in mission_list.finish" :key=item.key>
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
				<progress show-info percent="60" stroke-width="23rpx" backgroundColor="#999" activeColor="#007AFF"
					font-size="20rpx" border-radius="20rpx" />
			</view>
			<view class="button-add" @click="morePopup">
				<view class="iconfont icon-zengjia">
				</view>
			</view>
		</view>

		<!-- 消息提示 -->



	</view>
</template>

<script>
	import {baseUrl} from '../../utils/config.js';
	import createProject from '../../components/createProject';
	export default {
		data() {
			return {
				popup_task:-1,
				repo_name:'',
				repo_id:-1,
				mission_list: {
					incomplete:[],
					checking:[],
					finish:[]
				}
			};
		},
		components:{createProject},
		methods: {
			// 弹出层相关函数
			closePopup(){
				this.$refs.taskPopup.close()
			},
			taskPopup(kind){
				this.popup_task = kind
				this.$refs.taskPopup.open("center")
			},
			morePopup() {
				this.$refs.moremorePopup.open("center")
			},
			addPopup() {
				this.$refs.addaddPopup.open("center")
			},
			closeaddPopup() {
				this.$refs.addaddPopup.close("center")
			},
			canclePopup() {
				this.$refs.moremorePopup.close("center")
			},
			myPopup() {
				this.$refs.myproject.open("center")
			},
			closemyPopup() {
				this.$refs.myproject.close("center")
			},
			// DDL计算连接字符串函数
			DDLcompute(DDL){
				let DDLjoin = DDL[0].toString()
				for (let i = 1;i<3;i++){
					DDLjoin = DDLjoin + '.' +DDL[i].toString()
				}
				return DDLjoin
			}

		},
		onLoad(option) { //option为object类型，会序列化上个页面传递的参数
		    console.log(option);
			uni.showLoading({
				title:'加载中'
			})
			this.repo_name = option.repo_name
			this.repo_id = option.repo_id
			uni.request({
			    url: baseUrl + '/repo/showTask', //仅为示例，并非真实接口地址。
				method:'POST',
				timeout:2000,
			    data: {
			        repo_id: option.repo_id
			    },
			    header: {
			        "content-type": "application/x-www-form-urlencoded" //自定义请求头信息
			    },
			    success: (res) => {
					console.log(res.data)
					this.mission_list.incomplete = res.data.incomplete
					this.mission_list.checking = res.data.checking
					this.mission_list.finish = res.data.finish
					uni.hideLoading()
			    },
				fail() {
					uni.hideLoading()
					uni.showToast({
						title: '请求失败',
						icon:'error'
					});
				}
			})
		}


	}
</script>

<style lang="scss">
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
			top: 0rpx;
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
			background-color: $bg-color;

			.list-item-wrapper {
				margin-top: 30rpx;
				width: 100%;
				background-color: $bg-color;

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
			width: 100%;
			bottom: 0;
			z-index: 9;

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
