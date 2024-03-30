<template>
    <view class="content">
		<!-- #ifdef H5 -->
		<view class="navigateBack-btn" @click="$utils.navigateBack()">
			<image class="navigateBack-img" src="../../static/imgs/goback.png"></image>
		</view>
		<!-- #endif -->
        <view class="distribution">
            <view class="gui-list ucenter">
            	<view class="gui-list-items">
            		<view class="gui-list-image ucenter-face gui-relative">
            			<image class="gui-list-image ucenter-face-image" 
            			:src="$store.state.user ? $utils.formatImg($store.state.user.icon) : '../../static/imgs/missing-face.png'" mode="widthFix"></image>
            		</view>
            		<view class="gui-list-body">
            			<view class="gui-list-title">
            				<text class="gui-list-title-text gui-primary-color" style="font-size: 32rpx;">{{$store.state.user.nick}}</text>
            			</view>
            			<text class="gui-list-body-desc gui-color-gray gui-block-text" style="font-size: 26rpx;">{{$store.state.user.id}}</text>
            		</view>
            	</view>
            </view>
            <view class="distribution-content">
                <u-grid :border="false" col="3">
                    <u-grid-item>
                        <text class="grid-text">{{countExtend}}人</text>
                        <text class="grid-text">推广人数</text>
                    </u-grid-item>
                    <u-grid-item>
                        <text class="grid-text">￥{{sumUnWithdraw}}</text>
                        <text class="grid-text">未提现佣金</text>
                    </u-grid-item>
                    <u-grid-item>
                        <text class="grid-text">￥{{sumCommission}}</text>
                        <text class="grid-text">累计佣金</text>
                    </u-grid-item>
                </u-grid>
            </view>
        </view>
        <view class="distribution">
            <view class="title">
                <text>推广</text>
            </view>
            <view>
                <u-grid :border="false" col="2">
					<u-grid-item v-for="(listItem,listIndex) in gridList" :key="listIndex" @click="navTo(listItem.url)">
						<u-icon
							:customStyle="{paddingTop:20+'rpx'}"
							:name="listItem.name"
							:size="26"
							color="#FF7900"
						></u-icon>
						<text class="grid-text">{{listItem.title}}</text>
					</u-grid-item>
                </u-grid>
            </view>
        </view>
        <view class="distribution">
            <view class="title">
                <text>佣金</text>
            </view>
            <view>
                <u-grid :border="false" col="3">
					<u-grid-item v-for="(listItem,listIndex) in commissionList" :key="listIndex" @click="navTo(listItem.url)">
						<u-icon
							:customStyle="{paddingTop:20+'rpx'}"
							:name="listItem.name"
							:size="26"
							color="#FF7900"
						></u-icon>
						<text class="grid-text">{{listItem.title}}</text>
					</u-grid-item>
                </u-grid>
            </view>
        </view>
    </view>
</template>

<script>
export default {
	data() {
		return {
			sumUnWithdraw: '',
			sumCommission: '',
			countExtend: '',
			gridList: [{
				name: 'account',
				title: '我的推广',
				url: '/pages/user/extendList'
				},
				{
					name: 'share',
					title: '推广海报',
					url: '/pages/user/invite'
				},
			],
			commissionList: [{
				name: 'red-packet',
				title: '佣金明细',
				url: '/pages/user/commissionList'
				},
				{
					name: 'file-text',
					title: '我要提现',
					url: '/pages/user/withdraw'
				},
				{
					name: 'list',
					title: '提现记录',
					url: '/pages/user/withdrawRecord'
				},
			],
		}
	},
	onShow(){
		this.init();
	},
	onLoad(){
		this.init();
	},
	methods: {
		init() {
			this.getExtendInfo();
		},
		navTo(url){
			if(!this.$store.state.user){
				url = '/pages/public/login';
			}
			uni.navigateTo({  
				url
			})  
		}, 
		getExtendInfo(){
			// uni.showLoading();
			uni.http.get(
				'/user/extendInfo',{token:true}
			).then(res=>{
				this.sumUnWithdraw = res.data.sumUnWithdraw;
				this.sumCommission = res.data.sumCommission;
				this.countExtend = res.data.countExtend;
			}).catch(err=>{
				
			});
		}
	}
}
</script>

<style lang="scss">
    page, .content{
    	background: $page-color-base;
    }
    .distribution{
        background-color: #fff;
        margin:20rpx 20rpx;
        border-radius: 30rpx;
        padding: 10rpx;
    }
    .title{
        font-size: 32rpx;
        font-weight: bold;
        margin: 10rpx 20rpx;
    }
    .u-grid-item{
        margin: 20rpx 0;
    }
    .grid-icon{
        font-size: 55rpx;
        margin-bottom: 10rpx;
    }
    .grid-text{
        font-size: 28rpx;
    }
    .ucenter-face{width:100rpx; height:100rpx;}
    .ucenter-face-image{width:100rpx; height:100rpx;}
    .ucenter{margin: 15rpx 20rpx;}
	
	.grid-text {
	        font-size: 14px;
	        /* color: #64666a; */
	        padding: 10rpx 0 20rpx 0rpx;
	        /* #ifndef APP-PLUS */
	        box-sizing: border-box;
	        /* #endif */
	    }
</style>
