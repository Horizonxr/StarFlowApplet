<template>
	<view class="body">
		<uni-popup class="morePopup" ref="morePopup" type="center" :mask-click="false">
			<view class="wrapper">
				<view class="botton-wrapper">
					<view class="top-popup" @click="createPopup">
						<view class="top-popup-text">创建项目</view>
						<view>
							<view class="iconfont icon-zengjia" ></view>
						</view>
					</view>	
					<view class="middle-popup"  @click="joininPopup">
					   <view class="middle-popup-text">加入项目</view>
					   <view>
						   <view class="iconfont icon-jiarubanji"></view>
					   </view>
					</view>
					<view class="close-popup" @click="closePopup">
						<view class="close-popup-text">取消</view>
						<view>
							<view class="iconfont icon-quxiao"@click=""></view>
						</view>
					</view>	
				</view>
			</view>
		</uni-popup>
		<!-- 第二层弹窗 -->
		</uni-popup>
		<uni-popup class="createPopup" ref="createPopup" type="center" :mask-click="false">
			<createProject @closeCreatepopup="closeCreatepopup"></createProject>
		</uni-popup>
		<uni-popup class="joininPopup"  ref="joininPopup" type="center" :mask-click="false">
			<joininProject  @closeJoininpopup="closeJoininpopup"></joininProject>
		</uni-popup>
		<view class="top-wrapper">
			<!-- 顶部 -->
			<view class="top">
				<view class="title">项目选择</view>
				<view class="account">当前账号：{{userInfo.nickName}}</view>
				<navigator class="top-button" url="/pages/accountSettings/accountSettings" hover-class="navigator-hover">
				  <view class="iconfont icon-shezhi "></view>
				</navigator>
			</view>
		</view>
		<!-- 按钮 -->
		<view class="more" @click="openPopup">
			<view class="iconfont icon-zengjia"></view>
		</view>
		<!-- 仓库列表 -->
		<view class="list-wrapper">
			<view class="list-item-wrapper" v-for="(item, key) in project_list" :key=item.key>
				<view class="list-item" @click="toProject(key)">
					<view class="list-item-repositories">{{item.repo[0].fields.repo_name}}</view>
					<view class="list-item-more">
						<view class="member-number">
							<view class="iconfont icon-ren111"></view>
							<view class="number">15</view>
						</view>
						<view class="list-item-description">{{item.repo[0].fields.url}}</view>
						<progress class="list-item-bar" duration=7 stroke-width="20rpx" border-radius="300" active="true" color= "#5091f2" :percent="item.repo[0].fields.finished * 100 / (item.repo[0].fields.checking+item.repo[0].fields.finished+item.repo[0].fields.incomplete)"></progress>
					</view>
				</view>
			</view>
		</view>
		<!-- 背景 -->
		<view class="bg-circle">
			<view class='orange'></view>
			<view class='blue'></view>
			<view class='green'></view>
		</view>
		
	</view>
</template>
<script>
	import {baseUrl} from '../../utils/config.js';
	import createProject from '../../components/createProject';
	import joininProject from '../../components/joininProject';
	export default {
		data() {
			return {
				userInfo:[],
				project_list:[],
				u_id:-1
			};
		},
		components:{createProject,joininProject},
		methods:{
			//弹窗相关方法
			openPopup(){
			  // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.morePopup.open('center')
			},
			closePopup(){
				this.$refs.morePopup.close()
			},
			createPopup(){
				this.$refs.createPopup.open('center')
			 },
			closeCreatepopup(){
				this.$refs.createPopup.close()
			},
			joininPopup(){
				this.$refs.joininPopup.open('center')
			},
			closeJoininpopup(){
				this.$refs.joininPopup.close()
			},
			toProject(key){
				console.log(this.project_list[key].repo[0].pk)
				key = this.project_list[key].repo[0].pk
				uni.navigateTo({
					url:'../projectList/projectList?repo_id=' + key,
					animationDuration:300
				})
			}
		},
		onLoad() {
			uni.showLoading({
				title:"加载中",
				mask:true
			})
			this.u_id = uni.getStorageSync("u_id")
			this.userInfo = uni.getStorageSync("userInfo")
			uni.request({
			    url: baseUrl + '/repo/showRepo', //仅为示例，并非真实接口地址。
				method:'POST',
				timeout:2000,
			    data: {
			        u_id: this.u_id
			    },
			    header: {
			        "content-type": "application/x-www-form-urlencoded" //自定义请求头信息
			    },
			    success: (res) => {
					this.project_list = res.data.data
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
	.body{
		
	}
	.morePopup{
		z-index: 15;
		margin: 0 auto;
		.wrapper{
			width: 100%;
			height: 100vh;
			.botton-wrapper{
				position: absolute;
				height: 600rpx;
				width: 364rpx;
				bottom: 59rpx;
				left: -23rpx;
				display: flex;
				flex-direction: column;
				view{
					width: 364rpx;
					height: 200rpx;
					display: flex;
					justify-content: center;
					view:nth-child(1){
						width: 210rpx;
						height: 200rpx;
						font-size: 40rpx;
						line-height: 200rpx;
						color: white;
					}
					view:nth-child(2){
						width: 130rpx;
						height: 130rpx;
						margin-top: 41rpx;
						background-color: white;
						border-radius: 50%;
						display: flex;
						box-shadow: 0 4rpx 12rpx #888888;
						.iconfont{
							line-height: 130rpx;
							text-align: center;
							font-size: 100rpx;
							color:black;
						}
					}
				}
			}
		}
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
				top:58rpx;
				width: 86rpx;
				height: 86rpx;
				.iconfont{

					font-size: 86rpx;
				}
			}
		}
	}
	
	.list-wrapper{
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 1;
		.list-item-wrapper{
			margin-top: 30rpx;
			width: 100%;
			.list-item{
				margin: 22rpx auto;
				height: 120rpx;
				width: 615rpx;
				border-radius: 10rpx;
				box-shadow: 0 4rpx 12rpx #888888;
				background-color:rgba($color: #ffff, $alpha: 0.5);
				.list-item-repositories{
					position: relative;
					left: 21rpx;
					top:20rpx;
					height: 28rpx;
					line-height: 28rpx;
					font-size: 28rpx;
					
				}
				.list-item-more{
					width: 750rpx;
					height: 64rpx;	
				}
				.member-number{
					position: relative;
					left:500rpx;
					top:-20rpx;
					width: 200rpx;
					height: 50rpx;
					.iconfont{
						font-size: 50rpx;
					}
					.number{
						position: relative;
						font-size: 30rpx;
						top:-45rpx;
						right: -57rpx;
					}
				}

				
				.list-item-description{
					position: relative;
					left: 21rpx;
					top:-24rpx;
					height: 25rpx;
					font-size: 25rpx;
					line-height: 25rpx;
					color: $less-important-font;
				}
				.list-item-bar{
					position: relative;
					top:-10rpx;
					width: 570rpx;
					left: 10rpx;
				}
			}
		}
	}
	.bg-circle{
		z-index: 0;
		.orange{
			width: 90px;
			height: 90px;
			border-radius: 50%;
			position: fixed;
			left: 80rpx;
			top: 450rpx;
			background: rgba($color: $uni-color-warning, $alpha: 0.9);			
		}
		.blue{
			width: 180px;
			height: 180px;
			left: 230rpx;
			top: 400rpx;
			position: fixed;
			border-radius: 50%;
			background: rgba($color: $pending-mission, $alpha: 0.9);
		}
		.green{
			width: 120px;
			height: 120px;
			left: 190rpx;
			top: 700rpx;
			position: fixed;
			border-radius: 50%;
			background: rgba($color: $uni-color-success, $alpha: 0.9);
		}
	}
	.more{
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
		.iconfont{
			font-size: 130rpx;
		}
	}
</style>
