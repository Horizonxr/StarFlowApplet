<template name="createProject">
	<view class="body1">
		<uni-popup class="test" ref="err_msg_popup" type="message">
		    <uni-popup-message type="success" message="失败消息" :duration="3000">{{err_msg}}</uni-popup-message>
		</uni-popup>
		<!-- 创建项目提示信息 -->
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type='info' title="提示"mode="base" content="确认创建该项目？"message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="request_joinin"></uni-popup-dialog>
		</uni-popup>
		<!-- 返回按钮 -->
		<view class="top-button1"><view class="iconfont icon-fanhui" @click="back"></view></view>
		<view class="title1">创建项目</view>
		<view class="account1">GitHub帐号：{{GitHubAccount}}</view>
		<!-- 搜索 -->
		<view class="search1">
			<input class="input-name1" type="text" v-model="keyword" placeholder=" 输入仓库名称检索" />
			<view class="rectangle1">
				<view class="iconfont icon-sousuo" @click="search"></view>
			</view>
		</view>
		<scroll-view class="scroll-area" scroll-y="true">
			<view class="list-item1" v-for="(item, key) in repositories_list" :key=item.key>
				<view class="list-item-repositories1" @click="openPopup(key)">{{item.repo_name}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {baseUrl} from '../utils/config.js';
export default {
    name: 'myinput',
	props: {
		receivelist:{},
	},
	data() {
		return {
			userInfo:[],
            u_id:-1,
            repositories_list:[],
            keyword:'' ,
			middle:-1,
			GitHubAccount:'',
			err_msg:''
		}
	},
    methods: {
        close(){
			this.$refs.popup.close()
        },  
        request_joinin(){
			this.receivelist.forEach((item,index)=>{    //遍历数组,判断选中项目是否已经添加过
				if(item.repo[0].fields.url==this.middle.url){  
					uni.showToast({
						title: '已添加过',
						icon:'error',
						duration:2000
					});
				}
			})
			console.log(this.middle.url)
			console.log(this.middle.repo_name)
			console.log(this.u_id)
			uni.request({
			    url: baseUrl + '/repo/addRepo', //仅为示例，并非真实接口地址。
				method:'POST',
				timeout:8000,
			    data: {
					url	:this.middle.url,
					repo_name:this.middle.repo_name,
					user_id:this.u_id
			    },
			    header: {
			        "content-type": "application/x-www-form-urlencoded" //自定义请求头信息
			    },
			    success: (res) => {	
					uni.hideLoading()
					if (res.data.message == 'success'){
						uni.showToast({
							title: '请求成功',
							icon:'success',
							duration:2000
						});
					}
					else{
						this.err_msg = res.data.message
						this.$refs.err_msg_popup.open('top')
					}
					this.$emit("refresh");
					this.close()
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
        openPopup(key){
           // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
        	this.middle=this.repositories_list[key]
			console.log('middle'+this.middle)
			this.$refs.popup.open('center')
        },
        back(){
        	this.keyword=''
           	this.$emit("closeCreatepopup");
			this.$emit('refresh')
        }, 
		search(){
			console.log("u_id "+this.u_id)
			console.log(this.keyword)
			uni.showLoading({
				title:"加载中",
				mask:true
			})	
			// this.u_id = uni.getStorageSync("u_id")
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
	mounted() {
		this.u_id = uni.getStorageSync("u_id")
		this.GitHubAccount = uni.getStorageSync("GitHubAccount")
		this.$nextTick(function () {
		// 仅在整个视图都被渲染之后才会运行的代码
			uni.showLoading({
				title:"加载中",
				mask:true
			})
			// this.u_id = uni.getStorageSync("u_id")
			this.userInfo=uni.getStorageSync("userInfo")
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
						title: '加载失败',
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
		width: 660rpx;
		height: 50rpx;
		top: 210rpx;
		left: 45rpx;
		font-size: 34rpx;
		.repositories-list1{
			position: relative;
			font-size: 40rpx;
		}
		.rectangle1{
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
		.input-name1{
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