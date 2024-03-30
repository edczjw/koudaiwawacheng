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
						<view class="gui-list-items">
							<view class="gui-list-image ucenter-face gui-relative">
								<image class="gui-list-image ucenter-face-image" 
								:src="$utils.formatImg(item.icon)" mode="widthFix"></image>
							</view>
							<view class="gui-list-body">
								<view class="gui-list-title">
									<text class="gui-list-title-text gui-primary-color" style="font-size: 32rpx;">{{item.nick}}</text>
								</view>
								<text class="gui-list-body-desc gui-color-gray gui-block-text" style="font-size: 26rpx;">{{item.id}}</text>
							</view>
							<text class="gui-list-arrow-right  gui-color-gray gui-text-small-ml" style="width: 350rpx;">{{item.createTime}}</text>
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
		}
	},
	onLoad: function() {
		// 页码加载时第一次加载数据
		page = 1;
		this.listData = [];
		this.loadData();
	},
	methods: {
		loadData(){
			this.apiLoadingStatus = true;
		    uni.http.get('/user/extendUserList' + "?page=" + page, {token:true}).then(res=>{
				console.log(res);
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