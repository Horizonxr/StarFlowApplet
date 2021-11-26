<template>
	<view>
		<view class="bg-circle">
			<view class='orange' :animation='orange_ani'></view>
			<view class='blue' :animation='blue_ani'></view>
			<view class='green' :animation='green_ani'></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orange_ani: {},
				blue_ani:{},
				green_ani:{},
			};
		},
		methods:{
			loadingAni(){
				this.or_ani = uni.createAnimation({duration: 200});
				this.bl_ani = uni.createAnimation({duration: 200});
				this.gr_ani = uni.createAnimation({duration: 200});
				this.or_ani.translate(132,225).step({duration:0})
				this.orange_ani = this.or_ani.export()
			}
		},
		onLoad() {
			setTimeout(()=>{
				this.$options.methods.loadingAni.bind(this)()
			},200)
		}
	}
</script>

<style lang="scss">
	.bg-circle {
		position: absolute;
		z-index: -1;

		.orange {
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
			position: fixed;
			left: 10rpx;
			top: 250rpx;
			background: rgba($color: $uni-color-warning, $alpha: 0.9);
		}

		.blue {
			width: 200rpx;
			height: 200rpx;
			right: 10rpx;
			top: 250rpx;
			position: fixed;
			border-radius: 50%;
			background: rgba($color: $pending-mission, $alpha: 0.9);
		}

		.green {
			position: absolute;
			width: 200rpx;
			height: 200rpx;
			top: 70%;
			left:50%;
			margin-top: 100rpx;
			margin-left: 100rpx;
			position: fixed;
			border-radius: 50%;
			background: rgba($color: $uni-color-success, $alpha: 0.9);
		}
	}
</style>
