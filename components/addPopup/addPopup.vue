<template>
	<view class="back">
		<view class="top">
			<view class="cancle" @click="back">
				<view class="iconfont icon-fanhui" @click="back">
					
				</view>
			</view>
			<view class="title"> 添加任务:</view>
			<view class="popupName">
				<view class="inputText">任务名称</view>
				<input class="input" type="text" value="请输入任务名称">
			</view>
			<view class="deadline">
				<view class="deadlineText">Deadline</view>
				  <view >
				        <uni-datetime-picker class="example-body" type="datetime" v-model="datetimesingle" :start="start" :end="end" @change="changeLog" />
				    </view>
				        
			</view>
			<textarea value="请输入任务详情" class="details" />
			<view class="release">
				任务发放：
			</view>
			
			
		</view>
		<view class="bottom">
			<scroll-view scroll-y="true" >
				<view class="youke">
						<view class="name">horizon</view>
						<view class="jurisdiction">游客</view>
						<view class="circle"></view>
					</view>
					<view class="guanliyuan">
						<view class="name">	horizon</view>
						<view class="jurisdiction">管理员</view>
						<view class="circle"></view>
					</view>
			</scroll-view>
			
		
			
			
		</view>
		<view class="icon">
			<view class="iconfont icon-duigou"></view>
		</view>
		
		
	</view>
	
</template>

<script>
	export default {
		name:"test",
		data() {
			return {
				datetimesingle: '',
				datetimerange: [],
				start: Date.now() ,
				end: Date.now() + 1000000000
				
			};
		},
		methods: {
		          changeLog(e) {
					  console.log('----change事件:', e);
				  },
				  back(){
					this.$emit("closeaddPopup")
				  }		        
		}
	}
</script>

<style lang="scss">
	
	.back{
		position:relative;
		background-color: #FFFFFF;
		width: 664rpx;
		height: 1112rpx;
		.top{
			position: absolute;
			top: 0rpx;
			left: 0rpx;
			height:714rpx;
			width: 100%;
			.iconfont{
				font-size: 86rpx;
				position: absolute;
				top: 28rpx;
				left: 40rpx;
			}
			.title{
				font-size: 100rpx;
				color: #000;
				font-family: Adobe 黑体 Std;
				position: absolute;
				top:140rpx;
				left:40rpx;
			}
			
			.popupName{
				position: absolute;
				top: 258rpx;
				height: 78rpx;
				width: 750rpx;
				.inputText{
					position: absolute;
					left: 40rpx;
					font-size: 48rpx;
					color: #000;
					font-family: Adobe 黑体 Std;
				}
				.input{
					position: absolute;
					height: 74rpx;
					left:310rpx;
					border:0.5rpx solid #5c5c5c;
					border-radius: 20rpx;
					font-size: 33rpx;
					color: #5c5c5c;
					text-align: center;
					
				}
			}
			.deadline{
				position: absolute;
				top: 352rpx;
				height: 74rpx;
				width: 750rpx;
				.deadlineText{
					position: absolute;
					left:40rpx;
					font-size: 47rpx;
					color: #5c5c5c;
					font-family: Adobe 黑体 Std;
							}
				.example-body{
					position: absolute;
					height: 74rpx;
					width: 352rpx;
					left:310rpx;
					border-radius: 37rpx;
					font-size: 33rpx;
					color: #5c5c5c;
					text-align: center;
					}
				}
			.details{
				position:absolute;
				top:442rpx;
				left: 40rpx;
				height: 162rpx;
				border:0.5rpx solid #5c5c5c;
				border-radius: 37rpx;
				font-size: 33rpx;
				color: #5c5c5c;
				text-align: center;
				}
			.release{
				position:absolute;
				top:632rpx;
				left: 40rpx;
				font-size: 48rpx;
				color: #000;
				font-family: Adobe 黑体 Std;
			}
		
			
		}
		.bottom{
			position: absolute;
			bottom: 148rpx;
			left: 40rpx;
			height: 246rpx;
			width: 572rpx;
			border-radius: 50rpx;
			border:0.5rpx solid #666;
			font-size: 33rpx;
			color: #5c5c5c;
			text-align: center;
			.name{
				position: absolute;
				top: 21rpx;
				left: 39rpx;
				font-size: 30rpx;
				font-family: Adobe 黑体 Std;
				color: #6e6d6d;
			}
				.jurisdiction{
					position: absolute;
					top: 12rpx;
					left: 186rpx;
					height: 42rpx;
					width: 206rpx;
					border:0.5rpx solid #666 ;
			}
			.circle{
				position: absolute;
				top: 14rpx;
				right: 64rpx;
				height: 30rpx;
				width: 30rpx;
				border-radius: 50%;
				border:0.5rpx solid #666 ;
			}
			.youke{
				position: relative;
				top: 0;
				height: 69rpx;
				width: 100%;
				top: 0;
				border-bottom:0.5rpx solid #5c5c5c; ;
			}
			.guanliyuan{
				position: relative;
				height: 69rpx;
				border-bottom:0.5rpx solid #5c5c5c; ;
			}
			
		}
		.icon{
				height: 180rpx;
				width: 100%;
				position: absolute;
				bottom: 0;
				.iconfont{
					position: absolute;
					font-size: 86rpx;
					top: 100rpx;
					left: 292rpx;
				}
				
			}
		
		
	}
</style>
