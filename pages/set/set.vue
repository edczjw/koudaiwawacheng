<template>
	<view class="container">
		<!-- #ifdef H5 -->
		<view class="navigateBack-btn" @click="$utils.navigateBack()">
			<image class="navigateBack-img" src="../../static/imgs/goback.png"></image>
		</view>
		<!-- #endif -->
		<!-- <view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">个人资料</text>
			<text class="cell-more yticon icon-you"></text>
		</view> -->
		<view class="list-cell b-b" @tap="navTo('/pages/address/address')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">收货地址</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="toBind" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">绑定手机号</text>
            <text class="cell-tip">{{(player && player.phone) ? player.phone : '去绑定手机号'}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<!-- <view class="list-cell m-t">
			<text class="cell-tit">消息推送</text>
			<switch checked color="#fa436a" @change="switchChange" />
		</view> -->
		<!-- <view class="list-cell m-t b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">清除缓存</text>
			<text class="cell-more yticon icon-you"></text>
		</view> -->
		<view class="list-cell b-b" @tap="navTo('/pages/public/article?id=2')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">关于我们</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @tap="navTo('/pages/public/article?id=1')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">隐私政策</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @tap="logOff" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">注销账号</text>
			<text class="cell-tip">注销后无法恢复，请谨慎操作</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
        <!-- #ifdef APP-PLUS -->
		<view v-if="platform==='iOS'" class="list-cell">
			<text class="cell-tit">当前版本</text>
			<text class="cell-tip">{{version}}</text>
		</view>
        <view v-else class="list-cell">
            <text class="cell-tit">检查更新</text>
            <text class="cell-tip" @click="checkUpdate">当前版本 {{version}}</text>
            <text class="cell-more yticon icon-you"></text>
        </view>
        <!-- #endif -->
		<view v-if="logoutShow" class="list-cell log-out-btn" @click="toLogout">
			<text class="cell-tit">退出登录</text>
		</view>
		
		<gui-modal ref="logOffPopup" title="您确定要注销账号吗?">
			<view slot="content" class="gui-padding gui-bg-gray">
				<text class="gui-block-text gui-text-left gui-text"
				style="line-height:45rpx; padding:10rpx;font-size: 30rpx">提交注销申请后账号有45天冷静期(账号锁定期)。除法律法规规定和注销协议约定情形外,我们将在冷静期满后完成注销。</text>
				<text class="gui-block-text gui-text-left gui-text"
				style="line-height:45rpx; padding:10rpx;font-size: 30rpx;">注销完成后将删除该账号的所有数据(包括用户信息,金币,积分,娃娃,订单,游戏记录,消费记录,充值记录等),注销完成后数据无法恢复,请谨慎操作!</text>
				
				<text class="gui-block-text gui-text-left gui-text gui-color-red"
				style="line-height:45rpx; padding:10rpx;font-size: 30rpx;">冷静期内请您不要登录和使用该账号,以确保注销的顺利完成,否则视为您撤销注销申请!</text>
			</view>
			<view slot="btns" class="gui-flex gui-rows gui-space-between">
				<view class="modal-btns gui-flex1" style="margin-right:80rpx;">
					<text class="modal-btns gui-color-gray" @tap="closeLogOff">取消</text>
				</view>
				<view class="modal-btns gui-flex1" style="margin-left:80rpx;">
					<text class="modal-btns gui-color-blue" @tap="confirmLogOff">确认注销</text>
				</view>
			</view>
		</gui-modal>
	</view>
</template>

<script>
	import {  
	    mapState
	} from 'vuex';
    import $updateVersion from '@/common/updateVersion.js';
    
	export default {
		data() {
			return {
				// player: {},
                version: '',
                platform: '',
				logoutShow: true,
				appleInfo: ''
			};
		},
        onLoad(option){
            let self = this;
            // #ifdef APP-PLUS
            self.platform = plus.os.name;
            plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
                console.log('==============version='+widgetInfo.version);
                self.version = widgetInfo.version;
            });
            // #endif
			
			// #ifdef H5
			if(this.$utils.isWeiXinBrowser()){
				this.logoutShow = false;
			}
			// #endif
        },
        computed: {
        	...mapState({player:state=>state.user})
        },
		methods:{
			navTo(url){
				// this.$api.msg(`跳转到${url}`);
                uni.navigateTo({
                    url
                })
			},
			//退出登录
			toLogout(){
				uni.showModal({
				    content: '确定要退出登录么',
				    success: (e)=>{
				    	if(e.confirm){
				    		// this.logout();
                            this.$store.dispatch('logout');
				    		setTimeout(()=>{
				    			uni.navigateBack();
				    		}, 200)
				    	}
				    }
				});
			},
			//switch
			switchChange(e){
				let statusTip = e.detail.value ? '打开': '关闭';
				// this.$api.msg(`${statusTip}消息推送`);
			},
            toBind(){
                if(!this.player.phone){
                    uni.navigateTo({
                        url: '/pages/public/phonelogin?codeType=2'
                    })
                }
            },
            //检测更新
            checkUpdate(){
                // #ifdef APP-PLUS
                plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
                	let param = {
                		version: widgetInfo.version,
                		appid: widgetInfo.appid
                	}
                    // console.log('==============version='+widgetInfo.version);
                	uni.http.post("client/update", param).then(data => {
                		console.log(data);
                        if(!data.updateCmd || data.updateCmd == 0){
                            uni.showToast({
                                title: '当前已是最新版本',
                                icon: "none"
                            })
                        }else{
                            $updateVersion.checkUpdate(data);
                        }
                	})
                });
                // #endif
            },
			logOff() {
				if(!this.$utils.isEmpty(this.player.appleid)){
					uni.getUserInfo({
						provider: 'apple',
						success: userInfoRes => {
							console.log(userInfoRes);
							this.appleInfo = userInfoRes.userInfo;
						}
					})
				}
				this.$refs.logOffPopup.open();
			},
			confirmLogOff(){
				this.appleRevoke();
				
				uni.http.get('/user/logOff',{token:true}).then(res=>{
					if(res.code == 200){
						uni.showToast({
						    title: '注销申请已提交',
						    icon: "success",
							duration: 5000
						})
						setTimeout(()=>{
							this.$store.dispatch('logout');
							uni.navigateTo({
								url:"../public/login"
							})
						},500);
					}else {
						uni.showToast({
						    title: res.msg,
						    icon: "none",
						})
					}
				}).catch(err=>{
					uni.showToast({
					    title: "申请失败,请稍后重试",
					    icon: "none",
					})
				})
			},
			closeLogOff : function () {
				this.$refs.logOffPopup.close();
			},
			appleRevoke(){
				if(!this.$utils.isEmpty(this.player.appleid)){
					console.log(this.appleInfo);
					uni.http.post('https://appleid.apple.com/auth/revoke',{
						client_id: "com.jskj.kdwwj",
						client_secret: this.appleInfo.identityToken,
						token: this.appleInfo.identityToken,
						token_type_hint: "access_token"
					}).then(res=>{
						console.log(res);
					}).catch(error=>{
						console.error(error);
					})
				}
			}
		}
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
		}
		&.m-t{
			margin-top: 16upx; 
		}
		.cell-more{
			align-self: baseline;
			font-size:$font-lg;
			color:$font-color-light;
			margin-left:10upx;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
	}
	
	.modal-btns{line-height:88rpx; font-size:32rpx; text-align:center; width:200rpx;}
</style>
