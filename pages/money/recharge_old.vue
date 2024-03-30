<template>
    <view class="container">
        
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
        <view class="list">
            <block v-for="(item, index) in itemList" :key="item.id">
            	<view class="gui-list-items" @tap="toPay(item)">
                    <view class="gui-list-body gui-border-b">
                        <view class="gui-list-title">
							<image class="jinbi-img" src="../../static/imgs/coin.png"></image>
							<text class="my-icons gui-color-orange jinbi-text">{{item.coin}}币</text>
                        </view>
                        <text v-if="item.coinGive>0" class="gui-text gui-color-red">特惠赠送{{item.coinGive}}金币</text>
                    </view>
                    <view class="gui-color-red gui-text" style="font-size: 50rpx;">￥{{item.price}}</view>
                </view>
            </block>
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
					    console.log("获取到channel" + JSON.stringify(channels))
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
				        console.log('requestOrder success666: ' + JSON.stringify(orderList));
				        uni.hideLoading();
				    }, (e) => {
				        console.log('requestOrder failed: ' + JSON.stringify(e));
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
					    console.log(JSON.stringify(res));
					    if(res.code==200){
							uni.requestPayment({
							    provider: 'appleiap',
							    orderInfo: {
							        productid: iosProductid,
									optimize: true 
							    },
							    success: (result) => {
									console.log(result.transactionReceipt);
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
        padding: 30upx 30upx;
        .coin_num{
            font-size: $font-base + 10upx;
        }
        .coin_str{
            font-size: $font-base - 3upx;
        }
    }
    
    .list{
        padding: 20upx 20upx;
    }
	
	.jinbi-img{height: 70rpx;width: 70rpx;}
	.jinbi-text{font-size: 40rpx;position: absolute;left: 140rpx;}
</style>
