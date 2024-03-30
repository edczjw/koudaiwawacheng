<template>
	<view class="content">
		<!-- #ifdef H5 -->
		<view class="navigateBack-btn" @click="$utils.navigateBack()">
			<image class="navigateBack-img" src="../../static/imgs/goback.png"></image>
		</view>
		<!-- #endif -->
		<view class="navbar" :style="{position:headerPosition,top:headerTop}">
			<view class="nav-item" :class="{current: filterIndex === 1}" @tap="tabClick(1)">
				已完成
			</view>
			<view class="nav-item" :class="{current: filterIndex === 0}" @tap="tabClick(0)">
				审核中
			</view>
			<view class="nav-item" :class="{current: filterIndex === 2}" @tap="tabClick(2)">
				已拒绝
			</view>
		</view>
		<view class="dolls-list">
            <view class="gui-shoppingcard-goods gui-flex gui-rows gui-nowrap gui-align-items-center
            gui-space-between gui-border-b"
            v-for="(item, index) in withdrawList" :key="index">
                <view class="gui-shoppingcard-goods-body">
                    <view class="gui-space-between">
						<view class="gui-flex gui-rows gui-space-between">
							<view class="gui-text-small gui-color-gray">
								<text class="gui-shoppingcard-goods-status gui-block-text">提现金额:￥{{item.value}}</text>  
							</view>
							<view class="gui-text-small gui-color-gray">
								<gui-tags v-if="item.status == 0" text="审核中" bgClass="gui-bg-gray" color="#232526" :size="26"></gui-tags>
								<gui-tags v-else-if="item.status == 1" text="已完成" bgClass="gui-bg-green" :size="26"></gui-tags>
								<gui-tags v-else-if="item.status == 2" text="已拒绝" bgClass="gui-bg-red" :size="26"></gui-tags>
								<!-- <text class="gui-shoppingcard-goods-status gui-block-text">:￥{{item.value}}</text>  -->
							</view>
						</view>
                        <view class="gui-shoppingcard-goods-number">
							<text class="gui-color-gray">申请时间:{{item.createTime}}</text>
                        </view>
                    </view>
                </view>
            </view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	var graceJS = require('@/GraceUI5/js/grace.js');
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore	
		},
		data() {
			return {
				headerPosition:"fixed",
				headerTop:"0px",
				loadingType: 'more', //加载更多状态
				filterIndex: 1, 
				currentPage: 1,
				withdrawList: []
			};
		},
		
		onLoad(options){
			// #ifdef H5
			// this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
			// #endif
			// this.loadData();
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
			this.loadData('refresh', 1);
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
					this.withdrawList = [];
					this.currentPage = 1;
                    this.totalJifen = 0;
				}
				
				// uni.showLoading();
				uni.http.get(
					'/user/withdrawList?page=' + this.currentPage + "&status=" +  this.filterIndex, {token:true}
				).then(res=>{
					let withdrawList = res.data;
					this.withdrawList = this.withdrawList.concat(withdrawList);
					// uni.hideLoading();
					
					//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
					this.loadingType  = withdrawList.length > 0 ? 'more' : 'nomore';
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
			//筛选点击
			tabClick(index){
				if(this.filterIndex === index){
					return;
				}
				this.filterIndex = index;
				
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.loadData('refresh', 1);
				uni.showLoading({
					title: '正在加载'
				})
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
		padding-top: 96upx;
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
		padding: 0 30upx;
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
	
    .gui-shoppingcard{border-radius:8rpx; padding:20rpx 30rpx;}
    .gui-shopp-name{width:200rpx; flex:1;}
    .gui-shopp-go{width:120rpx; text-align:right;}
    .gui-shoppingcard-goods{padding:20rpx 0; height: 180rpx; width: 700rpx;}
    .gui-shoppingcard-goods-body{flex:1; overflow:hidden;}
    .gui-shoppingcard-goods-status{color:#008AFF; font-size:28rpx;}
    .gui-shoppingcard-goods-number{padding:2px 0; font-size:28rpx;}

</style>
