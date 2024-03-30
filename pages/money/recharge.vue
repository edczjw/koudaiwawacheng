<template>
	<gui-page>
		<!-- 页面主体 -->
		<view slot="gBody" class="gui-margin">
			<view class="gui-banner">
				<image src="../../static/imgs/rechargeBg.png" class="gui-banner-img"></image>
				<view class="gui-banner-in gui-flex gui-columns gui-justify-content-center">
					<text class="gui-block-text gui-h3 gui-color-white gui-bold gui-text-center">剩余金币 {{player?player.coin:0}}</text>
					<text class="gui-block-text gui-text-small gui-color-white gui-text-center" style="margin-top:8rpx;">充值所得金币仅适用于抓娃娃消耗</text>
				</view>
			</view>
			<!-- <gui-demo-desc desc="基于原生导航的页面布局, 演示全屏 loading 及右下角挂件实现."></gui-demo-desc> -->
			
			<view style="margin-top: 10rpx;">
				<gui-scroll-message>
					<text class="tip-msg">如对充值有疑问请联系1056811484@qq.com，未成年用户必须在征得监护人同意的前提下消费，请未成年人用户监护人切实履行监护义务。</text>
				</gui-scroll-message>
			</view>
			
			<view class="gui-flex gui-rows gui-wrap gui-margin-top">
				<view class="ic-item gui-border-box"
				:style="{backgroundColor:item.color}" 
				v-for="(item, index) in optionCardItems" :key="index" @tap="toPay(item)">
					<view class="recharge-card-title">
					    <text :style="{color:item.color}" >{{item.tag}}</text>
					</view>
					<view class="coin-content">
						<text class="gui-color-white coin-content-text">{{item.coin}}币{{(item.giveDay && item.dailyCoinGive) ? ('+' + item.giveDay + '*' + item.dailyCoinGive + '币') : ""}}</text>
					</view>
					<view class="desc-content">
						<text class="gui-color-white desc-content-text">{{item.desc}}</text>
					</view>
					
					<view class="recharge-card-price" style="position:absolute; right:20rpx; top:30rpx;">
					    <text>￥{{item.price}}</text>
					</view>
				</view>
			</view>
			
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
			                    <text v-if="!inappPurchase" class="recharge-give gui-block-text">
			                        {{item.desc}}</text>
			                </view>
			            </view>
			            <view class="recharge-price">
			                <text>￥{{item.price}}</text>
			            </view>
			        </view>
			    </view>
			</view>
			<view style="height: 30rpx;"></view>
		</view>
	</gui-page>
</template>

<script>
	var orderNo; //订单号
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
				optionCardItems: []
			}
		},
		onLoad(option){
			
		},
		onShow(){
			if(orderNo){
				setTimeout(()=>{
					uni.http.get('/payment/checkOrder/'+orderNo, {token:true}).then(res=>{
						// console.log(res);
						if(res.code == 200){
							this.$store.dispatch('getUserInfo');
							alert("支付成功");
						}
					}).catch(err=>{
						console.log(err);
					})
					orderNo = null;
				}, 300)
			}
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
						this.productIds = res.optionMap.iosProductids;
						this.getChannels();
					}
					
					this.itemList = res.optionMap.standard;
					this.optionCardItems = res.optionMap.optionCard;
					
				}).catch(err=>{
					console.log(err);
				})
			},
			toPay(item){
				// #ifdef H5
				let isWx = this.$utils.isWeiXinBrowser();
				if(isWx){
					uni.showLoading();
					let url = `payment/jsapipay?paymethodId=2&rechargeOptionId=${item.id}`
					uni.http.get(url,{token:true}).then(res=>{
					    if(res.code==200){
					        orderNo = res.data.rechargeId;
							this.wxBrowserPay(res.data.payPath);
					    }else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
							uni.hideLoading();
						}
					}).catch(err=>{
					    console.log(err);
					    uni.hideLoading();
					})
				    /* let payInfo = {
				        "appId": "wx2421b1c4370ec43b",     //公众号名称，由商户传入     
				        "timeStamp": "1395712654",         //时间戳，自1970年以来的秒数     
				        "nonceStr": "e61463f8efa94090b1f366cccfbbb444", //随机串     
				        "package": "prepay_id=u802345jgfjsdfgsdg888",     
				        "signType": "MD5",         //微信签名方式：     
				        "paySign": "70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名
				    } */
				}else{
				    let url = '/pages/money/pay?id='+item.id+'&price='+item.price
				    uni.navigateTo({  
				    	url
				    })  
				}
				// #endif
				
				// #ifdef APP-PLUS
				if(this.inappPurchase) {
					this.requestPayment(item.iosProductid,item.id);
				}else {
					let url = '/pages/money/pay?id='+item.id+'&price='+item.price
					uni.navigateTo({  
						url
					})  
				}
				// #endif
			},
			wxBrowserPay(payInfo){
			    // #ifdef H5
			    if (typeof WeixinJSBridge == "undefined") {
			       if (document.addEventListener) {
			           document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(payInfo), false);
			       } else if (document.attachEvent) {
			           document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(payInfo)); 
			           document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(payInfo));
			       }
			    } else {
			       this.onBridgeReady(payInfo);
			    }
			    // #endif
			},
			onBridgeReady(res){
			    // #ifdef H5
			    WeixinJSBridge.invoke(
			        'getBrandWCPayRequest', {
			            "appId":res.appId,     //公众号名称，由商户传入
			            "timeStamp":res.timestamp, //时间戳，自1970年以来的秒数
			            "nonceStr":res.nonceStr, //随机串
			            "package":res.packageValue, // prepay_id=xxx
			            "signType":res.signType, //微信签名方式：
			            "paySign":res.paySign //微信签名
			        },
			        function(res){
			            // alert("我是支付返回的信息：\n"+res.err_msg);
			            if(res.err_msg == "get_brand_wcpay_request:ok" ){
			                // 使用以上方式判断前端返回,微信团队郑重提示：
			                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
							// alert("支付成功!");
							// setTimeout(()=>{
							// 	this.$store.dispatch('getUserInfo');
							// }, 1000)
							
			            } else if(res.err_msg == "get_brand_wcpay_request:cancel") {
			                alert("用户取消支付!");
			            } else {
			                alert("支付失败!");
			            }
			        }
			    );
				uni.hideLoading();
			    // #endif
			},
			getChannels() {
                // #ifdef APP-PLUS
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
                // #endif
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
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				uni.navigateTo({
					url: '/pages/user/record?type=1'
				});
			}
		}
	}
</script>

<style lang="scss">
	.gui-banner{height:228rpx; border-radius:10rpx; font-size:0; position:relative; margin-top:15rpx;}
	.gui-banner-img{width:690rpx; height:228rpx; border-radius:10rpx; opacity:0.92;}
	.gui-banner-in{height:228rpx; border-radius:10rpx; position:absolute; z-index:1; left:0; top:0;}
	.gui-h3{font-size:38rpx;}
	.gui-text-center{width:690rpx;}
	
    .list{padding: 0 30rpx;}
    .recharge{padding:15rpx 20rpx;margin: 20rpx 0; border-radius: 50rpx;border: 2rpx solid #f1f2f3;}
    .recharge-image{width:130rpx; margin-right:20rpx;}
    .recharge-body{width:400rpx; flex:1; overflow:hidden;}
    .recharge-title{font-size:36rpx; font-weight: bold;}
    .recharge-price{color:#FF6144; font-size:34rpx; font-weight: bold; background-color: #fff6f4;border-radius: 20rpx;width: 150rpx;height: 60rpx; text-align: center;line-height: 60rpx;}
    .recharge-give{color:#FF6144;font-size:28rpx;}
    .recharge-line{height:20rpx; background-color:#F6F7F8;}
	.tip-msg{white-space:nowrap; line-height:28rpx; font-size:28rpx;color:#FF6144}
	.ic-item{width:630rpx; height:135rpx;margin-left: 30rpx; padding:20rpx; font-size:0; border-radius:15px; margin-bottom:25rpx; position:relative;}
	.coin-content{position:absolute; left:140rpx; top:10rpx;}
	.desc-content{position:absolute; left:140rpx; top:60rpx;width: 320rpx;}
	.recharge-card-price{color:#FF6144; font-size:34rpx; font-weight: bold; background-color: #fff6f4;border-radius: 20rpx;width: 150rpx;height: 60rpx; text-align: center;line-height: 60rpx;}
	.recharge-card-title{position:absolute; left:20rpx; top:10rpx;width: 100rpx;height: 115rpx;color:#FF6144; font-size:36rpx; font-weight: bold; background-color: #fff6f4;border-radius: 20rpx;text-align: center;line-height: 60rpx;}
	.coin-content-text{font-size: 32rpx;line-height: 50rpx; font-weight: bold;}
	.desc-content-text{font-size: 24rpx;line-height: 30rpx;}
</style>
