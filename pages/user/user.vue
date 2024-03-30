<template>
	<view>
		<view class="gui-list gui-margin gui-margin-top gui-padding" style="border-radius: 35rpx; box-shadow: 4upx 4upx 20upx rgba(144, 144, 144, 0.3);">
			<view class="gui-list-items" @tap="navTo('/pages/set/set')">
				<view class="gui-list-image ucenter-face gui-relative">
					<image class="gui-list-image ucenter-face-image" 
					:src="$store.state.user ? $utils.formatImg($store.state.user.icon) : '../../static/imgs/missing-face.png'" mode="widthFix"></image>
				</view>
				<view class="gui-list-body">
					<view class="gui-list-title">
						<text class="gui-list-title-text gui-primary-color" style="font-size: 32rpx;">{{$store.state.user ? $store.state.user.nick : '点击登录注册'}}</text>
					</view>
					<text class="gui-list-body-desc gui-color-gray gui-block-text" style="font-size: 26rpx;">{{$store.state.user ? ('ID:' + $store.state.user.id) : '登录之后，体验更多功能'}}</text>
				</view>
				<text class="gui-list-arrow-right gui-icons gui-color-gray">&#xe601;</text>
			</view>
			
			<view>
				<gui-box-banner :items="items" @taped="taped"></gui-box-banner>
			</view>
		</view>
		
		<!-- <view class="ucenter-line"></view> -->
        <view class="distribution gui-margin gui-margin-top" style="border-radius: 35rpx; box-shadow: 4upx 4upx 20upx rgba(144, 144, 144, 0.3);" v-if="$store.state.user && $store.state.user.proxyPerm == 1">
            <view class="gui-list-items gui-padding" @tap="navTo('/pages/user/distribution')">
            	<view class="gui-list-body">
            		<view class="gui-list-title">
            			<text class="distribution-title">推广中心</text>
            		</view>
            	</view>
            	<text class="gui-list-arrow-right gui-icons">&#xe601;</text>
            </view>
            <view class="gui-padding distribution-content">
                <u-grid :border="false" col="3" @click="navTo('/pages/user/distribution')">
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
            <!-- <view class="ucenter-line"></view> -->
        </view>
		<view class="distribution gui-margin gui-margin-top" style="border-radius: 35rpx; box-shadow: 4upx 4upx 20upx rgba(144, 144, 144, 0.3);">
		    <view class="gui-list-items gui-padding">
		    	<view class="gui-list-body">
		    		<view class="gui-list-title">
		    			<text class="distribution-title">我的服务</text>
		    		</view>
		    	</view>
		    </view>
		    <u-grid :border="true" col="3" >
				<u-grid-item v-for="(listItem,listIndex) in list" :key="listIndex" @click="navTo(listItem.url)">
					<u-icon
						:customStyle="{paddingTop:20+'rpx'}"
						:name="listItem.name"
						:size="26"
						color="#FF7900"
					></u-icon>
					<text class="grid-text">{{listItem.title}}</text>
				</u-grid-item>
				<u-grid-item v-if="onlineCustomer && $store.state.user"  @click="navTo('/pages/public/webview?url=' + encodeURIComponent(onlineCustomer))">
					<u-icon
						:customStyle="{paddingTop:20+'rpx'}"
						name="kefu-ermai"
						:size="26"
						color="#FF7900"
					></u-icon>
					<text class="grid-text">在线客服</text>
				</u-grid-item>
			</u-grid>
		</view>
		<!-- <view class="gui-list gui-margin-top gui-padding">
			<view class="gui-list-items" @tap="navTo('/pages/order/order')">
				<text class="gui-list-icon gui-icons gui-color-orange">&#xe62f;</text>
				<view class="gui-list-body gui-border-b">
					<view class="gui-list-title">
						<text class="gui-list-title-text">我的订单</text>
					</view>
				</view>
				<text class="gui-list-arrow-right gui-icons">&#xe601;</text>
			</view>
			<view class="gui-list-items" @tap="navTo('/pages/user/myDoll')">
				<text class="gui-list-icon gui-icons gui-color-orange">&#xe6cf;</text>
				<view class="gui-list-body gui-border-b">
					<view class="gui-list-title">
						<text class="gui-list-title-text">我的娃娃</text>
					</view>
				</view>
				<text class="gui-list-arrow-right gui-icons">&#xe601;</text>
			</view>
			<view class="gui-list-items" @tap="navTo('/pages/user/myCollect')">
				<text class="gui-list-icon gui-icons gui-color-orange">&#xe605;</text>
				<view class="gui-list-body gui-border-b">
					<view class="gui-list-title">
						<text class="gui-list-title-text">我的收藏</text>
					</view>
				</view>
				<text class="gui-list-arrow-right gui-icons">&#xe601;</text>
			</view>
			<view class="gui-list-items" @tap="navTo('/pages/address/address')">
				<text class="gui-list-icon gui-icons gui-color-orange">&#xe63f;</text>
				<view class="gui-list-body gui-border-b">
					<view class="gui-list-title">
						<text class="gui-list-title-text">地址管理</text>
					</view>
				</view>
				<text class="gui-list-arrow-right gui-icons">&#xe601;</text>
			</view>
			<view class="gui-list-items" @tap="navTo('/pages/user/record?type=1')">
				<text class="gui-list-icon gui-icons gui-color-orange">&#xe685;</text>
				<view class="gui-list-body gui-border-b">
					<view class="gui-list-title">
						<text class="gui-list-title-text">金币流水</text>
					</view>
				</view>
				<text class="gui-list-arrow-right gui-icons">&#xe601;</text>
			</view>
			<view class="gui-list-items" @tap="navTo('/pages/user/invite')">
				<text class="gui-list-icon gui-icons gui-color-orange">&#xe622;</text>
				<view class="gui-list-body">
					<view class="gui-list-title">
						<text class="gui-list-title-text">推荐有礼</text>
					</view>
				</view>
				<text class="gui-list-arrow-right gui-icons">&#xe601;</text>
			</view>
		</view> -->
		<!-- <view class="ucenter-line"></view>
		<view class="gui-list gui-margin-top gui-padding">
			<view class="gui-list-items">
				<text class="gui-list-icon gui-icons gui-color-yellow">&#xe613;</text>
				<view class="gui-list-body" @tap="navTo('/pages/set/set')">
					<view class="gui-list-title">
						<text class="gui-list-title-text">账户设置</text>
					</view>
				</view>
				<text class="gui-list-arrow-right gui-icons">&#xe601;</text>
			</view>
		</view> -->
		<!-- <view class="ucenter-line"></view>
		<view hover-class="gui-tap">
			<text class="gui-text-center gui-block-text gui-icons logoff gui-color-gray">&#xe62e; 退出登录</text>
		</view> -->
	</view>
</template>
<script>
export default {
	data() {
		return {
			sumUnWithdraw: '',
			sumCommission: '',
			countExtend: '',
			onlineCustomer: '',
			items: [
				[this.$store.state.user ? this.$store.state.user.coin : 0, '', '金币'],
				[this.$store.state.user ? this.$store.state.user.jifen : 0, '', '积分']
			],
			list: [{
				name: 'order',
				title: '我的订单',
				url: '/pages/order/order'
				},
				{
					name: 'list-dot',
					title: '我的娃娃',
					url: '/pages/user/myDoll'
				},
				{
					name: 'star',
					title: '我的收藏',
					url: '/pages/user/myCollect'
				},
				{
					name: 'map',
					title: '地址管理',
					url: '/pages/address/address'
				},
				{
					name: 'rmb-circle',
					title: '金币流水',
					url: '/pages/user/record?type=1'
				},
				{
					name: 'share',
					title: '推荐有礼',
					url: '/pages/user/invite'
				},
				{
					name: 'grid',
					title: '游戏记录',
					url: '/pages/complaint/gameRecord'
				},
				{
					name: 'setting',
					title: '账户设置',
					url: '/pages/set/set'
				},
			],
		}
	},
	onShow(){
		this.init();
	},
	onLoad(){
		// #ifdef H5
		this.list = this.list.filter(item=>item.name != 'share') 
		// #endif
		this.init();
	},
	methods: {
		init() {
			if(this.$store.state.user){
				this.$store.dispatch('getUserInfo');
				this.items = [
						[this.$store.state.user.coin, '', '金币'],
						[this.$store.state.user.jifen, '', '积分']
					]
				this.getExtendInfo();
				this.getOnlineCustomer();
			}else {
				this.items = [
						[0, '', '金币'],
						[0, '', '积分']
					]
			}
		},
		taped : function(idx){
			if(idx == 0){
				this.navTo("/pages/money/recharge");
			}else if(idx == 1){
				this.navTo("/pages/user/record?type=2");
			}
		},
		openLogin() {
			uni.navigateTo({
				url:"../public/login"
			})
		},
		navTo(url){
			if(!this.$store.state.user){
				// #ifdef H5
				//微信授权登录
				if(this.$utils.isWeiXinBrowser()){
					this.$utils.wxAuthLogin(true);
					return;
				}
				// #endif
				
				url = '/pages/public/login';
			}
			
			if(url.indexOf("myDoll") != -1){
				uni.switchTab({
					url
				})
			}else {
				uni.navigateTo({
					url
				})
			}
		}, 
		getOnlineCustomer() {
			uni.http.get('/onlineCustomer',{token:true}).then(res=>{
				if(res.code == 200 && res.onlineCustomer){
					this.onlineCustomer = res.onlineCustomer;
				}else {
					this.onlineCustomer = "";
				}
			}).catch(err=>{
			});
		},
		share(){
		    uni.share({
		        provider: "weixin",
		        scene: "WXSceneSession",
		        type: 2,
		        imageUrl: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png",
		        success: function (res) {
		            console.log("success:" + JSON.stringify(res));
		        },
		        fail: function (err) {
		            console.log("fail:" + JSON.stringify(err));
		        } 
		    });
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
<style>
.ucenter-face{width:100rpx; height:100rpx;}
.ucenter-face-image{width:100rpx; height:100rpx;}
.ucenter-line{height:20rpx; background-color:#F6F7F8; margin:16rpx 0;}
.logoff{line-height:88rpx; font-size:28rpx;}
.gui-list-title-text{line-height:60rpx;}
.distribution-title{font-size: 30rpx; font-weight: bold;}
.grid-text{font-size: 26rpx; color: #666;}
.distribution-content{margin: 20rpx 0 30rpx 0;}
.grid-text {
        font-size: 14px;
        /* color: #64666a; */
        padding: 10rpx 0 20rpx 0rpx;
        /* #ifndef APP-PLUS */
        box-sizing: border-box;
        /* #endif */
    }
</style>