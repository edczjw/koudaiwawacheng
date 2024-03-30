<template>
	<view class="content">
		<!-- #ifdef H5 -->
		<view class="navigateBack-btn" @click="$utils.navigateBack()">
			<image class="navigateBack-img" src="../../static/imgs/goback.png"></image>
		</view>
		<!-- #endif -->
		<gui-column 
		:customClasses="['gui-margin-top']" 
		crossAxisAlignment="center">
			<image class="gui-list-image ucenter-face-image" style="width: 150rpx;"
			:src="$utils.formatImg(userIcon)" mode="widthFix"></image>
			<text class="gui-bg-gray gui-color-gray">{{userNick}}</text>
			<text class="gui-text-small gui-bg-gray gui-color-gray">共夹中{{catchCount}}次</text>
		</gui-column>
		<view class="dolls-list">
			<view v-for="(item, index) in dollsList" :key="index"
				class="dolls-item"
				@tap="navToDetailPage(item)">
				
				<view class="demo-face gui-relative gui-img-in">
					<view class="image-wrapper" style=" border-radius: 35rpx;">
						<image :src="$utils.formatImg(item.thumbnail)" mode="aspectFill"></image>
					</view>
				</view>
				
				<text class="title clamp">{{item.dollName}}</text>
				<view class="price-box">
					<!-- <text class="price">可兑{{item.exchangeJifen}}积分</text> -->
					<text>{{item.createTime}}</text>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
		
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore	
		},
		data() {
			return {
				userId: '',
				userIcon: '',
				userNick: '',
				catchCount: 0,
				headerPosition:"fixed",
				headerTop:"0px",
				loadingType: 'more', //加载更多状态
				filterIndex: 1, 
				currentPage: 1,
				dollsList: []
			};
		},
		
		onLoad(options){
			const user = JSON.parse(options.user);
			this.userId = user.userId;
			this.userIcon = user.userIcon;
			this.userNick = user.userNick;
			this.loadData();
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom(){
			this.loadData();
		},
		onShow() {
			// this.loadData('refresh');
		},
		methods: {
			//加载商品 ，带下拉刷新和上滑加载
			async loadData(type='add', loading) {
				//没有更多直接返回
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
				
				if(type === 'refresh'){
					this.dollsList = [];
					this.currentPage = 1;
				}
				
				// uni.showLoading();
				uni.http.get(
					'/user/catchSuccessRecentByUser?userId=' + this.userId + '&page=' + this.currentPage,{token:true}
				).then(res=>{
					console.info(res);
					this.catchCount = res.count;
					let dollsList = res.data;
					this.dollsList = this.dollsList.concat(dollsList);
					// uni.hideLoading();
					
					//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
					this.loadingType  = dollsList.length > 0 ? 'more' : 'nomore';
					if(this.loadingType === 'more'){
						this.currentPage ++ ;
					}
					if(type === 'refresh'){
						if(loading == 1){
							uni.hideLoading()
						}else{
							uni.stopPullDownRefresh();
						}
					}
				}).catch(err=>{
					
				});
			},
			//详情
			navToDetailPage(item){
				// let id = item.id;
				/* uni.navigateTo({
					url: `/pages/user/dollDetail?doll=${JSON.stringify(item)}`
				}) */
			},
			stopPrevent(){}
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
	}
	.content{
		padding-top: 10upx;
	}

	.navbar{
		position: fixed;
		left: 0;
		top: var(--window-top);
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0,0,0,.06);
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			color: $font-color-dark;
			position: relative;
			&.current{
				color: $base-color;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid $base-color;
				}
			}
		}
		.p-box{
			display: flex;
			flex-direction: column;
			.yticon{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;
				&.active{
					color: $base-color;
				}
			}
			.xia{
				transform: scaleY(-1);
			}
		}
		.cate-item{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;
			&:after{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}

	.dolls-list{
		display:flex;
		flex-wrap:wrap;
		padding: 30upx 30upx;
		background: #fff;
		.dolls-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}
		.price-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
			color: $font-color-light;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		}
	}
	

</style>
