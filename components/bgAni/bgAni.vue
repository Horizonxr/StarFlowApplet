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
		name: "bgAni",
		data() {
			return {
				orange_ani: {},
				blue_ani: {},
				green_ani: {},
				or: {},
				bl: {},
				gr: {},
			};
		},
		methods: {
			circleAnimation() {
				//橙色圆圈动画
				{
					this.or = setInterval(() => {
						this.or_ani = uni.createAnimation({
							duration: 12000
						});
						var pi = Math.PI
						let angle = 0
						let r1 = 100
						let x_zuo = r1 * Math.cos(angle)
						let y_zuo = r1 * Math.sin(angle)
						let op = 0
						for (let i = 0; i < 50; i++) {
							this.or_ani.translate(x_zuo, y_zuo).opacity(op + 0.00001 * Math.random()).step({
								duration: 200
							})
							angle = (angle + 0.1 + 0.01 * Math.random()) % (2 * pi)
							x_zuo = r1 * Math.cos(angle)
							y_zuo = r1 * Math.sin(angle)
							if (op < 1) {
								op = op + 0.2
							}
						}
						op = 1
						for (let i = 0; i < 12; i++) {
							this.or_ani.translate(x_zuo, y_zuo).opacity(op + 0.00001 * Math.random()).step({
								duration: 250
							})
							angle = (angle + 0.1 + 0.01 * Math.random()) % (2 * pi)
							x_zuo = r1 * Math.cos(angle)
							y_zuo = r1 * Math.sin(angle)
							if (op>0){
								op =op-0.2
							}
						}
						this.or_ani.translate(r1,0).step({
							duration: 200
						})
						this.orange_ani = this.or_ani.export();
					}, 12200)
					this.or_ani = uni.createAnimation({
						duration: 12000
					});
					var pi = Math.PI
					let angle = 0
					let r1 = 100
					let op = 0
					let x_zuo = r1 * Math.cos(angle)
					let y_zuo = r1 * Math.sin(angle)
					for (let i = 0; i < 63; i++) {
						this.or_ani.translate(x_zuo, y_zuo).opacity(op + 0.00001 * Math.random()).step({
							duration: 200
						})
						angle = (angle + 0.1 + 0.0001 * Math.random()) % (2 * pi)
						x_zuo = r1 * Math.cos(angle)
						y_zuo = r1 * Math.sin(angle)
						if (op < 1) {
							op = op + 0.2
						}
					}
					this.or_ani.translate(r1,0).step({
						duration: 200
					})
					this.orange_ani = this.or_ani.export();
				}
				//蓝色圆圈动画
				{
					this.bl = setInterval(() => {
						this.bl_ani = uni.createAnimation({
							duration: 62800
						});
						var pi = Math.PI
						let angle = 2 * pi
						let r1 = 100
						let x_zuo = r1 * Math.cos(angle)
						let y_zuo = r1 * Math.sin(angle)
						let op = 0
						for (let i = 0; i < 314; i++) {
							this.bl_ani.translate(x_zuo, y_zuo).step({
								duration: 200
							})
							angle = (angle - 0.02 + 0.001 * Math.random()) % (2 * pi)
							x_zuo = r1 * Math.cos(angle)
							y_zuo = r1 * Math.sin(angle)

						}
						this.blue_ani = this.bl_ani.export();
					}, 62800)
					this.bl_ani = uni.createAnimation({
						duration: 62800
					});
					var pi = Math.PI
					let angle = 2 * pi
					let r1 = 100
					let x_zuo = r1 * Math.cos(angle)
					let y_zuo = r1 * Math.sin(angle)
					let op = 0
					for (let i = 0; i < 314; i++) {
						this.bl_ani.translate(x_zuo, y_zuo).opacity(op + 0.00001 * Math.random()).step({
							duration: 200
						})
						angle = (angle - 0.02 + 0.001 * Math.random()) % (2 * pi)
						x_zuo = r1 * Math.cos(angle)
						y_zuo = r1 * Math.sin(angle)
						if (op < 1) {
							op = op + 0.2
						}
					}
					this.blue_ani = this.bl_ani.export();
				}
				//绿色圆圈动画
				{
					this.gr = setInterval(() => {
						this.gr_ani = uni.createAnimation({
							duration: 20800
						});
						var pi = Math.PI
						let angle = 0
						let r1 = 100
						let x_zuo = r1 * Math.cos(angle)
						let y_zuo = r1 * Math.sin(angle)
						let op = 0
						for (let i = 0; i < 104; i++) {
							this.gr_ani.translate(x_zuo, y_zuo).step({
								duration: 200
							})
							angle = (angle + 0.06 + 0.000001 * Math.random()) % (2 * pi)
							x_zuo = r1 * Math.cos(angle)
							y_zuo = r1 * Math.sin(angle)
						}
						this.green_ani = this.gr_ani.export();
					}, 21300)
					this.gr_ani = uni.createAnimation({
						duration: 20800
					});
					var pi = Math.PI
					let angle = 0
					let r1 = 100
					let x_zuo = r1 * Math.cos(angle)
					let y_zuo = r1 * Math.sin(angle)
					let op = 0
					for (let i = 0; i < 104; i++) {
						this.gr_ani.translate(x_zuo, y_zuo).opacity(op + 0.00001 * Math.random()).step({
							duration: 200
						})
						angle = (angle + 0.06 + 0.000001 * Math.random()) % (2 * pi)
						x_zuo = r1 * Math.cos(angle)
						y_zuo = r1 * Math.sin(angle)
						if (op < 1) {
							op = op + 0.2
						}
					}
					this.green_ani = this.gr_ani.export();
				}
			}
		},
		mounted() {
			this.$options.methods.circleAnimation.bind(this)()
		},
		beforeDestroy() {
			clearInterval(this.or)
			clearInterval(this.bl)
			clearInterval(this.gr)
		}
	}
</script>

<style lang="scss" scoped>
	.bg-circle {
		z-index: 0;

		.orange {
			width: 90px;
			height: 90px;
			border-radius: 50%;
			position: fixed;
			left: 80rpx;
			top: 450rpx;
			background: rgba($color: $uni-color-warning, $alpha: 0.9);
			opacity: 0;
		}

		.blue {
			width: 180px;
			height: 180px;
			left: 230rpx;
			top: 400rpx;
			position: fixed;
			border-radius: 50%;
			background: rgba($color: $pending-mission, $alpha: 0.9);
			opacity: 0;
		}

		.green {
			width: 120px;
			height: 120px;
			left: 250rpx;
			top: 700rpx;
			position: fixed;
			border-radius: 50%;
			background: rgba($color: $uni-color-success, $alpha: 0.9);
			opacity: 0;
		}
	}
</style>
