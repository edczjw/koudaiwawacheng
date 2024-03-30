<template>
    <view class="content">
        <view class="recharge-line"></view>
        <view class="gui-flex gui-nowrap gui-rows gui-align-items-center">
        	<!-- 导航文本此处也可以是其他自定义内容 -->
        	<view class="coin_info">
        	    <text>账号余额:</text>
        	    <text class="coin_num">{{player?player.coin:0}}</text>
        	    <text class="coin_str">币</text>
        	</view>
        	<!-- 如果右侧有其他内容可以利用条件编译和定位来实现-->
        	<view style="position: absolute;right: 30rpx;">
                <button size="mini" type="default" plain="true" 
                @click="navTo('/pages/user/record?type=1')">金币明细</button>
        	</view>
        </view>
        <view class="recharge-line"></view>
        <view class="list">
            <view v-for="(item, index) in itemList" :key="item.id">
                <view class="recharge gui-flex gui-rows gui-nowrap gui-align-items-center
                gui-space-between" @tap="toPay(item)">
                    <image :src="getImg(index)" mode="widthFix"
                    class="recharge-image"></image>
                    <view class="recharge-body">
                        <text class="recharge-title gui-text gui-primary-color 
                        gui-block-text">{{item.coin}}币</text>
                        <view v-show="item.coinGive>0" class="gui-space-between">
                            <text class="recharge-give gui-block-text">
                                特惠赠送{{item.coinGive}}金币</text>
                        </view>
                    </view>
                    <view class="recharge-price">
                        <text>￥{{item.price}}</text>
                    </view>
                </view>
            </view>
        </view>
        <view class="recharge-tips">
            <text>*如有疑问请联系1056811484@qq.com</text>
        </view>
    </view>
</template>

<script>
    import {
        mapState 
    } from 'vuex';
    export default {
    		data() {
    			return {
    				itemList: [],
					inappPurchase: false,
					iapChannel : null,
					productIds : [],
    			}
    		},
            onLoad(option){
            	this.loadData();
            },
			onHide(){
				uni.hideLoading();
			},
			onUnload(){
				uni.hideLoading();
			},
            computed: {
            	...mapState({player:state=>state.user})
            },
    		methods: {
    			loadData(){
                    uni.http.get('payment/rechargeOptions', {token:true}).then(res=>{
						if(uni.getSystemInfoSync().platform == 'ios' && res.inappPurchase){
							this.inappPurchase = true;
							this.itemList = [];
							this.productIds = [];
							res.data.forEach((item) => {
								if(item.iosProductid){
									this.itemList.push(item);
									this.productIds.push(item.iosProductid);
								}
							})
							this.getChannels();
						}else {
							this.itemList = res.data;
						}
                    }).catch(err=>{
                        console.log(err);
                    })
                },
                toPay(item){
                	if(this.inappPurchase) {
						this.requestPayment(item.iosProductid,item.id);
					}else {
						let url = '/pages/money/pay?id='+item.id+'&price='+item.price
						uni.navigateTo({  
							url
						})  
					}
                },
				getChannels() {
					plus.payment.getChannels((channels) => {
					    for (var i in channels) {
					        var channel = channels[i];
					        if (channel.id === 'appleiap') {
					            this.iapChannel = channel;
					            this.requestOrder();
					        }
					    }
					    if(!this.iapChannel){
					        this.errorMsg()
					    }
					}, (error) => {
					    this.errorMsg()
					});
				},
				requestOrder() {
					console.log("--------------------------------requestOrder-------------------------------------");
				    uni.showLoading({
				        title:'检测支付环境...'
				    })
				    this.iapChannel.requestOrder(this.productIds, (orderList) => { //必须调用此方法才能进行 iap 支付
				        uni.hideLoading();
				    }, (e) => {
				        uni.hideLoading();
				        this.errorMsg()
				    });
				},
				requestPayment(iosProductid,rechargeOptionId) {
					uni.showLoading({
						title:'正在支付...'
					})
					let self = this;
					let url = `payment/pay?paymethodId=3&rechargeOptionId=` + rechargeOptionId;
					uni.http.get(url,{token:true}).then(res=>{
					    if(res.code==200){
							uni.requestPayment({
							    provider: 'appleiap',
							    orderInfo: {
							        productid: iosProductid,
									optimize: true 
							    },
							    success: (result) => {
									uni.http.post('payment/iosInappRechargeNotify', {
											rechargeId:res.data.rechargeId,
											receipt:result.transactionReceipt
										}).then(res=>{
										if(res.code==200){
											self.$store.dispatch('getUserInfo');
											uni.showModal({
											    content: "充值已到账",
											    showCancel: false
											})
										}
									})
							    },
							    fail: () => {
							        uni.showModal({
							            content: "支付失败",
							            showCancel: false
							        })
							    },
							    complete: () => {
							        console.log("payment结束")
									uni.hideLoading();
							    }
							})
					    }
					}).catch(err=>{
					    console.log(err);
					})
				},
				errorMsg(){
				    uni.showModal({
				        content: "暂不支持苹果 iap 支付",
				        showCancel: false
				    })
				},
                navTo(url){
                	uni.navigateTo({  
                		url
                	})  
                },
                getImg(index){
                    if(index>4) index = 4;
                    return '../../static/imgs/cz'+index+'.png'
                },
    		},
    	}
</script>

<style lang="scss">
    .container{
    	padding-bottom: 134upx;
    	/* 空白页 */
    	.empty{
    		position:fixed;
    		left: 0;
    		top:0;
    		width: 100%;
    		height: 100vh;
    		padding-bottom:100upx;
    		display:flex;
    		justify-content: center;
    		flex-direction: column;
    		align-items:center;
    		background: #fff;
    		image{
    			width: 240upx;
    			height: 160upx;
    			margin-bottom:30upx;
    		}
    		.empty-tips{
    			display:flex;
    			font-size: $font-sm+2upx;
    			color: $font-color-disabled;
    			.navigator{
    				color: $uni-color-primary;
    				margin-left: 16upx;
    			}
    		}
    	}
    }
    .coin_info{
        padding: 30rpx 30rpx; margin: 15rpx 0;
        .coin_num{
            font-size: $font-base + 10upx;
        }
        .coin_str{
            font-size: $font-base - 3upx;
        }
    }
    
    .list{
        padding: 0 30rpx;
    }
	
	.jinbi-img{height: 70rpx;width: 70rpx;}
	.jinbi-text{font-size: 40rpx;position: absolute;left: 140rpx;}
    
    
    .recharge{padding:20rpx 30rpx;margin: 30rpx 0; border-radius: 50rpx;border: 2rpx solid #f1f2f3;}
    .recharge-checkbtn{width:60rpx;}
    .recharge-image{width:130rpx; margin-right:20rpx;}
    .recharge-body{width:400rpx; flex:1; overflow:hidden;}
    .recharge-title{font-size:36rpx; font-weight: bold;}
    .recharge-price{color:#FF6144; font-size:34rpx; font-weight: bold; background-color: #fff6f4;border-radius: 20rpx;width: 150rpx;height: 60rpx; text-align: center;line-height: 60rpx;}
    .recharge-give{color:#FF6144;font-size:28rpx;}
    .recharge-line{height:20rpx; background-color:#F6F7F8;}
    .recharge-tips{position:fixed; z-index:99; bottom:10rpx; width:700rpx; text-align: center; font-size: 20rpx;}
</style>
