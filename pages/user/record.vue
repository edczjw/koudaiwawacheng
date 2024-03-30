<template>
	<gui-page 
	:isLoading="pageLoading" :apiLoadingStatus="apiLoadingStatus" 
	:loadmore="true" @loadmorefun="loadData" ref="guipage">
		<view slot="gBody">
			<view class="my-list">
				<gui-empty v-if="!listData || listData.length == 0">
					<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
						<image class="gui-empty-img" 
						src="../../static/imgs/nulldata.webp"></image>
					</view>
					<text slot="text" 
					class="gui-text-small gui-block-text gui-text-center gui-margin-top" style="color:#9DABFF;">暂无数据</text>
				</gui-empty>
				
				<view v-for="(item,index) in listData" class="gui-list-items">
					<view class="gui-list-body gui-border-b">
						<text class="gui-list-title-desc gui-color-gray">{{item.createTime}}</text>
						<view class="gui-list-title">
							<text class="gui-list-title-text gui-primary-color gui-list-one-line gui-ellipsis" 
							style="width:320rpx; height:60rpx;">{{item.desc}}</text>
							<text class="gui-list-title-desc" :style="{'font-size':'32rpx',color: (item.type > 0 ? 'green' : 'red')}">{{(item.type > 0 ? '+' : '-') + (dataType == 1 ? item.coin : item.jifen)}}</text>
						</view>
						
					</view>
				</view>
			</view>
		</view>
	</gui-page>
</template>
<script>
var page = 1;
export default {
	data() {
		return {
			listData         : [],
			pageLoading      : true,
			apiLoadingStatus : false,// 用于记录是否有 api 请求正在执行
			dataType : 1//数据类型 1金币记录 2积分记录
		}
	},
	onLoad: function(option) {
		if(option.type){
			this.dataType = option.type;
		}
		let title = this.dataType == 1 ? '金币明细' : '积分明细';
		uni.setNavigationBarTitle({
			title
		})
		// 页码加载时第一次加载数据
		page = 1;
		this.listData = [];
		this.loadData();
	},
	methods: {
		loadData(){
			this.apiLoadingStatus = true;
		    let urlStr = this.dataType == 1 ? '/user/coinRecordList' : '/user/jifenRecordList';
		    uni.http.get(urlStr + "?page=" + page, {token:true}).then(res=>{
				if(page >= 2){
					this.listData = this.listData.concat(res.data);
					this.$refs.guipage.stoploadmore();
					if(!res.data || res.data.length == 0){
						this.$refs.guipage.nomore();
					}
				}else{
					this.listData    = res.data;
					this.pageLoading = false;
				}
				page++;
				this.apiLoadingStatus = false;
				
		    }).catch(err=>{
		        console.log(err);
				this.apiLoadingStatus = false;
		    })
			
		}
	}
}
</script>
<style>
.my-list{margin:30rpx 0; padding:0 30rpx;}
</style>