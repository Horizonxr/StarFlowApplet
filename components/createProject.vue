<template name="createProject">
	<view class="body1">
		<!-- 返回按钮 -->
		<view class="top-button1"><view class="iconfont icon-fanhui" @click="back"></view></view>
		<view class="title1">创建项目</view>
		<view class="account1">当前帐号 Horizon</view>
		<!-- 搜索 -->
		<view class="search1">
			<view class="repositories-list1">仓库列表</view>
			<input class="input-name1" type="text"@input="input":value=keyword placeholder=" 输入仓库名称进行检索" />
			<view class="rectangle1"></view>
			<view class="iconfont icon-sousuo" @click="search"></view>
			<view class="list-item1" v-for="(item, key) in repositories_list" :key=item.key>
			<view class="list-item-repositories1" @click="openPopup">{{item.repo_name}}</view>
			<!-- 加入项目提示信息 -->
			<uni-popup ref="popup" type="dialog">
			    <uni-popup-dialog type='info' title="提示"mode="base" content="确认创建该项目？"message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="request_joinin(key)"></uni-popup-dialog>
			</uni-popup>
		</view>
		</view>
		<!-- 确认按钮 -->
		<view class="bottom-button1">
			<view class="iconfont icon-duigoux"@click="finish"></view>
		</view>		
	</view>
</template>

<script>
	import {baseUrl} from '../utils/config.js';
export default {
    name: 'myinput',
	props: {},
	data() {
		return {
            u_id:1,
            repositories_list:[],
            keyword:''     
		}
	},
    methods: {
        close(){
			this.$refs.popup[0].close()
        },  
        request_joinin(key){
         	this.$refs.popup[0].close()
         	console.log("ke")
         	uni.reLaunch({
         		url: '/pages/projectList/projectList'
         	})
        },
        openPopup(){
           // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
        	this.$refs.popup[0].open('center')
        },
        back(){
        	this.keyword=''
        	// this.repositories_list=[]
           	this.$emit("closeCreatepopup");
        }, 
        input(e){
        	this.keyword=e.target.value
        },
		search(){
			console.log(this.keyword)
			uni.showLoading({
				title:"加载中",
				mask:true
			})	
			uni.request({
			    url: baseUrl + '/repo/getReposByKeyword', //仅为示例，并非真实接口地址。
				method:'POST',
				timeout:8000,
			    data: {
			        u_id:this.u_id,
					keyword:this.keyword
			    },
			    header: {
			        "content-type": "application/x-www-form-urlencoded" //自定义请求头信息
			    },
			    success: (res) => {
					this.repositories_list = res.data.data
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
		},
	},
		mounted:function() {
			this.$nextTick(function () {
			// 仅在整个视图都被渲染之后才会运行的代码
				uni.showLoading({
					title:"加载中",
					mask:true
				})
				// this.u_id = uni.getStorageSync("u_id")
				console.log(this.u_id)
				uni.request({
					url: baseUrl + '/repo/getRepos', //仅为示例，并非真实接口地址。
					method:'POST',
					timeout:8000,
						data: {
							u_id: this.u_id
						},
					header: {
						"content-type": "application/x-www-form-urlencoded" //自定义请求头信息
					},
					success: (res) => {
						this.repositories_list = res.data.data
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
			})
  }
}
</script>
<style lang="scss">
.body1{
	height: 100vh;
	position: relative;
	width: 660rpx;
	height: 1050rpx;
	top:30rpx;
	margin: 0 auto;
	background-color: white;
	border-radius: 30rpx;
	box-shadow: 0 4rpx 12rpx #888888;
	.top-button1{
		position: absolute;
		left:40rpx;
		top:25rpx;
		width: 86rpx;
		height: 86rpx;
		.iconfont{
			font-size: 70rpx;
			}
	}
	.title1{
		position: relative;
		top: 140rpx;
		left: -65rpx;
		height: 75rpx;
		font-size: 95rpx;
		text-align: center;
		line-height: 75rpx;
		letter-spacing: 20rpx;
	}
	.account1{
		position: relative;
		top: 180rpx;
		left: 50rpx;
		font-size: 40rpx;
	}	
	.search1{
		position: relative;
		top: 210rpx;
		left: 50rpx;
		font-size: 34rpx;
		.repositories-list1{
			position: relative;
			font-size: 40rpx;
		}
		.rectangle1{
			position: absolute;
			top: 0rpx;
			left: 170rpx;
			font-size: 35rpx;
			width: 410rpx;
			height: 60rpx;
			border-radius: 15rpx;
			border:1px solid #d2d2d2;
		}
		.input-name1{
			position: absolute;
			top: 0rpx;
			left: 185rpx;
			font-size: 35rpx;
			width: 340rpx;
			height: 60rpx;
			border:none;
		}
		
		.iconfont{
			position: absolute;
			top: 1rpx;
			left: 525rpx;
			font-size: 64rpx;
		}
		.list-item1{
			margin: 25rpx 20rpx auto;
			position: relative;
			top:40rpx;
			left:-10rpx;
			height: 60rpx;
			width: 500rpx;
			border-radius: 10rpx;
			box-shadow: 0 4rpx 12rpx #888888;
			background-color:rgba($color: #ffff, $alpha: 0.5);
			.list-item-repositories1{
				text-align: center;
			}
		}
	}
	.bottom-button1{
		position: relative;
		top: 700rpx;
		left: 270rpx;
		font-size: 340rpx;
		.iconfont{
			font-size: 40px;
		}
	}
}
</style>