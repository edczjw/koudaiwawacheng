<template>
	<gui-page>
		<!-- 页面主体 -->
		<view slot="gBody">
			<view class="gui-list gui-margin-top gui-padding">
				<view class="gui-list-items">
					<view class="gui-margin">
						<gui-image
							:src="$utils.formatImg(doll.thumbnail)"
							:height="180" :width="180" borderRadius="35rpx"></gui-image>
					</view>
					<view class="gui-list-body">
						<view class="gui-list-title">
							<text class="gui-list-title-text gui-primary-color" style="font-size: 35upx;">{{doll.name}}</text>
						</view>
						<text class="gui-list-body-desc gui-color-gray gui-block-text" style="font-size: 28upx;">{{doll.coin}}金币</text>
					</view>
				</view>
			</view>
			<view class="guess-section gui-margin-top">
				<view v-for="(item, index) in machineList" :key="index" class="guess-item" @click="navToMachinePage(item)">
					<view class="image-wrapper" style="border-radius: 25rpx;">
						<image :src="$utils.formatImg('video_jt.png')" mode="aspectFill"></image>
					</view>

					<view class="price-box">
						<text class="title clamp">房间号:{{item.name}}</text>
						<gui-tags class="price" text="空闲" bgClass="gui-bg-green" :size="22" :borderRadius="50">
						</gui-tags>
					</view>
					<button type="default" size="mini" class="gui-button gui-noborder" :style="{'background-color':(item.status == 0 ? '#07C160' : '#ED6A0C'),'border-radius' : '20rpx'}">
						<text class="my-icons gui-button-text-mini gui-color-white"
							style="padding-right:10rpx;font-size: 28rpx;">&#xe60b; {{item.status == 0 ? '开始游戏' : '预约游戏'}}</text>
					</button>
				</view>
			</view>
		</view>
	</gui-page>
</template>
<script>
	export default {
		data() {
			return {
				swiperCurrent: 0,
				machineList: [],
				doll: {
					thumbnail : '',
					name: '',
					coin: ''
				}
			};
		},

		onLoad(option) {
			const doll = JSON.parse(option.doll);
			this.doll.thumbnail = doll.thumbnail;
			this.doll.name = doll.name;
			this.doll.coin = doll.coin;
			this.loadData(doll.id);
		},
		methods: {
			/**
			 * 请求静态数据只是为了代码不那么乱
			 * 分次请求未作整合
			 */
			async loadData(dollId) {
				// uni.showLoading();
				uni.http.get(
					'machine/list/' + dollId,
				).then(res=>{
					this.machineList = res.data.machineList || [];
				}).catch(err=>{
					
				});
			},
			//进入游戏
			navToMachinePage(item) {
				uni.setStorageSync('machineId', item.id);
				uni.navigateTo({
					url: `/pages/machine/game`
				})
			}
		}
	}
</script>
<style lang="scss">
	.demo {
		width: 210rpx;
		margin: 10rpx;
	}

	.button {
		width: 90rpx;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 8rpx;
		margin: 10rpx;
	}

	.button-text {
		font-size: 38rpx;
		text-align: center;
	}

	/* 列表 */
	.guess-section {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		background: #fff;

		.guess-item {
			display: flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;

			&:nth-child(2n+1) {
				margin-right: 4%;
			}
		}

		.image-wrapper {
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.title {
			font-size: $font-sm;
			color: $font-color-base;
			line-height: 80upx;
		}

		.price {
			font-size: $font-sm;
			color: $uni-color-primary;
			line-height: 1;
		}

		.price-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 22upx;
			color: $font-color-light;
		}

		.price {
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		}
	}
</style>
