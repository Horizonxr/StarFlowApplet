<template name="joininProject">
	<view class="body2">
		<!-- 返回 -->
		<view class="top-button2">
			<view class="iconfont icon-fanhui" @click="back"></view>
		</view>
		<!-- 搜索 -->
		<view class="title2">项目搜索</view>
		<view class="search2">
			<input class="input-name2" @input='input':value=keyword type="text" placeholder=" 输入项目名称进行查找" />
			<view class="rectangle2"></view>
			<view class="iconfont icon-sousuo" @input="input" @click="search"></view>
			<scroll-view class="joinin-scroll-area" show-scrollbar='true' scroll-y="true">
			<view class="list-item2" v-for="(item, key) in repositories_list" :key=item.key>
				<view class="list-item-repositories2" @click="openPopup">{{item.fields.repo_name}}</view>
				<!-- 加入项目提示信息 -->
				<uni-popup ref="popup" type="dialog">
				    <uni-popup-dialog type='info' title="提示"mode="base" content="请求加入该项目？"message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="request_joinin(key)"></uni-popup-dialog>
				</uni-popup>
			</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	import {baseUrl} from '../utils/config.js';
export default {
  name: 'myinput',
  props: {
            
  },
  data() {
    return {
        userInfo:[],
        u_id:-1,
        repositories_list:[],
		keyword:''
    }
	
  },
  methods: {
	openPopup(){
	  // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
		this.$refs.popup[0].open('center')
	},
	close(){
		this.$refs.popup[0].close()
	},  
    back(){
		this.keyword=''
		this.repositories_list=[]
		this.$emit("closeJoininpopup")
	}, 
	input(e){
		this.keyword=e.target.value
		//console.log(this.keyword)
	},
	search(){
		uni.showLoading({
			title:"加载中",
			mask:true
		})
		this.repositories_list=[]
		uni.request({
		    url: baseUrl + '/user/repo_search', //仅为示例，并非真实接口地址。
			method:'POST',
			timeout:8000,
		    data: {
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
	request_joinin(key){
		uni.showLoading({
			title:"加载中",
			mask:true
		})	
		uni.request({
		    url: baseUrl + '/user/repo_request', //仅为示例，并非真实接口地址。
			method:'POST',
			timeout:8000,
		    data: {
				user:this.u_id,
				repo:this.repositories_list[key].pk
		    },
		    header: {
		        "content-type": "application/x-www-form-urlencoded" //自定义请求头信息
		    },
			success: (res) => {
				uni.showToast({
					title: '请求加入成功',
					icon:'success',
					duration:2000
				});
				uni.hideLoading()
				this.close();
			},
			fail() {
				uni.hideLoading()
				uni.showToast({
					title: '请求失败',
					icon:'error'
				});
			}
		}) 
		//console.log(this.repositories_list[key].pk)
	}
  }
}
</script>

<style lang="scss">
.body2{
	height: 100vh;
	position: relative;
	width: 660rpx;
	height: 1050rpx;
	top:30rpx;
	margin: 0 auto;
	background-color: white;
	border-radius: 30rpx;
	box-shadow: 0 4rpx 12rpx #888888;
	.top-button2{
		position: absolute;
		z-index: 100;
		left:40rpx;
		top:25rpx;
		width: 86rpx;
		height: 86rpx;
		.iconfont{
			font-size: 70rpx;
			}
	}
	.title2{
		position: relative;
		top: 140rpx;
		left: -65rpx;
		height: 75rpx;
		font-size: 95rpx;
		text-align: center;
		line-height: 75rpx;
		letter-spacing: 20rpx;
	}
	.search2{
		position: relative;
		top: 210rpx;
		left: 50rpx;
		font-size: 34rpx;
		.rectangle2{
			position: absolute;
			width: 570rpx;
			left: -25rpx;
			height: 80rpx;
			border-radius: 15rpx;
			border:1px solid #d2d2d2;
		}
		.iconfont{
			position: absolute;
			z-index: 99;
			left: 450rpx;
			font-size: 100rpx;
		}
		.input-name2{
			position: absolute;
			font-size: 35rpx;
			width: 450rpx;
			letter-spacing: 10rpx;
			height: 100rpx;
			border:none;
		}
		.list-item2{
			margin: 25rpx 20rpx auto;
			position: relative;
			top:130rpx;
			left:-10rpx;
			height: 60rpx;
			width: 500rpx;
			border-radius: 10rpx;
			box-shadow: 0 4rpx 12rpx #888888;
			background-color:rgba($color: #ffff, $alpha: 0.5);
			.list-item-repositories2{
				text-align: center;
			}
		}	
		.joinin-scroll-area{
			position: relative;
			top:5rpx;
			height: 660rpx;
		}
	}
}
</style>