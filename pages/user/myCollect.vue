<template>
	<view class="content">
		<!-- #ifdef H5 -->
		<view class="navigateBack-btn" @click="$utils.navigateBack()">
			<image class="navigateBack-img" src="../../static/imgs/goback.png"></image>
		</view>
		<!-- #endif -->
		<view class="dolls-list">
			<view v-for="(item, index) in dollsList" :key="index" class="dolls-item" @tap="navGamePage(item)">
				
				<view class="demo-face gui-relative gui-img-in">
					<view class="image-wrapper" style=" border-radius: 35rpx;">
						<image :src="$utils.formatImg(item.thumbnail)" mode="aspectFill"></image>
					</view>
				</view>
				
				<text class="title clamp">{{item.dollName}}</text>
				<view class="price-box">
					<text class="price">{{item.coin}}币</text>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
		
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
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
				dollsList: []
			};
		},
		
		onLoad(options){
			// #ifdef H5
			// this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
			// #endif
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
			...mapMutations(['setCurrentMachine']),
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
					'/user/collectList?page=' + this.currentPage,
                    {token:true}
				).then(res=>{
					console.log(res);
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
				})
			},
			navGamePage(item) {
			    if(!this.$store.state.user){
			        uni.navigateTo({
			        	url: '/pages/public/login'
			        })
			        return
			    }
				let data = {machineId: item.machineId,video:item.video}
				this.setCurrentMachine(data)
				
				uni.navigateTo({
					url: `/pages/machine/game`
				})
			}
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
	}
	.content{
		padding-top: 16upx;
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
	

</style>
