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
                    <view class="doll-info gui-flex gui-rows gui-nowrap gui-align-items-center
                    gui-space-between gui-border-b" @tap="toComplaintPage(item)" :style="{opacity: (item.status == 0 && item.complaintStatus == 0 ? 1 : 0.5)}">
                        <image :src="$utils.formatImg(item.thumbnail)" mode="widthFix"
                        class="doll-info-image"></image>
                        <view class="doll-info-body">
                            <text class="doll-info-title gui-text gui-color-gray 
                            gui-block-text">{{item.dollName}}</text>
							<text v-if="item.status == -1" class="doll-info-title gui-text gui-color-gray
							gui-block-text">游戏中</text>
							<text v-else-if="item.status == 0" class="doll-info-title gui-text gui-color-red
							gui-block-text">抓取失败</text>
							<text v-else class="doll-info-title gui-text gui-color-green
							gui-block-text">抓取成功</text>
                            <view class="gui-space-between doll-info-text">
                                <text class="gui-color-gray gui-block-text">
                                    {{item.createTime}}</text>
                            </view>
                        </view>
                        <view style="width: 150rpx;">
							<view v-if="item.status == 0 || item.complaintStatus != 0" style="font-size: 28rpx;">
								<text v-if="item.complaintStatus == 0" style="color: gray;">未申诉</text>
								<text v-else-if="item.complaintStatus == 1" style="color: red;">申诉中</text>
								<text v-else-if="item.complaintStatus == 2" style="color: green;">申诉成功</text>
								<text v-else-if="item.complaintStatus == 3" style="color: red;">申诉失败</text>
							</view>
							
							<text v-if="item.complaintStatus > 1" style="color: green;font-size: 24rpx;">{{item.complaintResultText}}</text>
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
	onLoad: function(option) {
        // 页码加载时第一次加载数据
        page = 1;
        this.listData = [];
        this.loadData();
	},
	onShow: function(){
	},
	methods: {
		loadData(){
			this.apiLoadingStatus = true;
		    let urlStr = 'user/gameRecordList';
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
		},
		toComplaintPage(item){
			if(item.status == 0 && item.complaintStatus == 0){
				this.navTo('/pages/complaint/complaint?record=' + encodeURIComponent(JSON.stringify(item)) + '&fromRecord=true');
			}
		},
        refresh(){
            page = 1;
            this.loadData();
        },
        
        navTo(url){
        	uni.navigateTo({  
        		url
        	})  
        },
	}
}
</script>
<style>
/* .my-list{margin:30rpx 0; padding:0 30rpx;} */
.doll-info{padding:20rpx 30rpx;}
.doll-info-checkbtn{width:60rpx;}
.doll-info-image{width:130rpx; margin-right:20rpx;border-radius: 25rpx;}
.doll-info-body{width:400rpx; flex:1; overflow:hidden;}
.doll-info-title{font-size:28rpx;}
.doll-info-price{color:#FF0036; font-size:28rpx;}
.doll-info-text{font-size:28rpx;}
</style>