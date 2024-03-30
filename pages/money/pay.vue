<template>
	<view class="app">
        <view class="title">
            <view class="status-bar"></view>
            <u-icon class="back-icon" name="arrow-left" size="22" :bold="true" @click="onBack"></u-icon>
        </view>
		<!-- #ifdef H5 -->
		<view class="navigateBack-btn" @click="$utils.navigateBack()">
			<image class="navigateBack-img" src="../../static/imgs/goback.png"></image>
		</view>
		<!-- #endif -->
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{itemPrice}}</text>
		</view>

		<view class="pay-type-list">
			<view v-for="(item, index) in methodList" :key="index" class="type-item b-b" @click="changePayType(index)">
				<image :src="$utils.formatImg(item.icon)" style="width: 50rpx;height:50rpx;margin-right: 20rpx;"></image>
				<view class="con">
					<text class="tit">{{item.name}}</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == index' />
					</radio>
				</label>
			</view>
		</view>
		
		<text class="mix-btn" @click="confirm">确认支付</text>
        <u-loading-page class="loading-page" :loading="showLoading" bgColor='#000' loadingText="支付中..." 
        loadingMode='spinner'></u-loading-page>
        <u-modal :show="showResult" content='支付成功' @confirm="close"></u-modal>
	</view>
</template>

<script>
    var webView;//计划创建的webview
    var orderNo; //订单号
	export default {
		data() {
			return {
				payType: 0,
				orderInfo: {},
                itemId: 0,
                itemPrice: 0,
				methodList: [],
                showResult: false,
                showLoading: false
			};
		},
		computed: {
		
		},
		onLoad(options) {
            this.itemId = options.id;
            this.itemPrice = options.price;
			this.loadPaymethod();
		},
        onShow(){
            if(orderNo){
                uni.http.get('/payment/checkOrder/'+orderNo, {token:true}).then(res=>{
                    // console.log(res);
                    if(res.code == 200){
                        this.paySuccess();
                    }
                }).catch(err=>{
                    console.log(err);
                })
                orderNo = null;
            }
            // #ifdef APP-PLUS
            if(webView){
                plus.webview.close(webView);
                webView = null;
            }
            // #endif
        },
        onNavigationBarButtonTap(e){
            // console.log("=============================================onNavigationBarButtonTap");
            // console.log(e);
        },
        onBackPress(options) {
            // console.log("===========================================onBackPress");
            // console.log(options);
            // if(options.from === "navigateBack"){
            //     return false;
            // }
            // return true;
        },
        
		methods: {
			loadPaymethod() {
				uni.http.get(
					'payment/methodList'
				).then(res => {
					this.methodList = res.data;
				})
			},
			changePayType(index) {
				this.payType = index;
			},
            close() {
                setTimeout(()=>{
                	uni.navigateBack()
                }, 200)
            },
            confirm(){
                if (this.showLoading) return;
                
                this.showLoading = true;
                let paymethodId = this.methodList[this.payType].id;
				
                // #ifdef APP-PLUS
				if(uni.getSystemInfoSync().platform == 'ios'){
					let url = uni.http.common.baseUrl + `payment/webpayForm?paymethodId=${paymethodId}&rechargeOptionId=${this.itemId}&token=${this.$store.state.token}`
                    // this.webPay(url);
                    uni.http.get(url).then(res=>{
                        // console.log(res);
                        if(res.code==200){
                            orderNo = res.data.rechargeId;
                            this.webPay(res.data.form);
                        }else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
                        this.showLoading = false;
                    }).catch(err=>{
                        console.log(err);
                        this.showLoading = false;
                    })
                    
					// uni.navigateTo({
					// 	url : "/pages/public/webview?url=" + encodeURIComponent(url),
					// })
					// plus.runtime.openURL(url, function(res) {}); 
				}else {
					let url = `payment/pay?paymethodId=${paymethodId}&rechargeOptionId=${this.itemId}`
					uni.http.get(url,{token:true}).then(res=>{
					    if(res.code==200){
                            console.log(res);
                            orderNo = res.data.rechargeId;
					        this.pay(res.data.payPath);
					    }else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
                            this.showLoading = false;
						}
					}).catch(err=>{
					    console.log(err);
                        this.showLoading = false;
					})
				}
                // #endif
                
                // #ifdef H5
				let url = uni.http.common.baseUrl + `payment/webpay?paymethodId=${paymethodId}&rechargeOptionId=${this.itemId}&token=${this.$store.state.token}`
				// window.open(url);
				// location.assign(url);
				// window.location.replace(url);
				window.location.assign(url);
                this.showLoading = false;
                // #endif
            },
            pay(orderInfo){
				let provider = this.methodList[this.payType].remark;
                uni.requestPayment({
                    provider: provider,
                    orderInfo: orderInfo,
                    success: (res) => {
						// this.paySuccess();
                    },
					fail: (res) => {
                        // console.log(res);
					},
					complete: (res) => {
                        // console.log(res);
                        this.showLoading = false;
					}
                });
            },
            webPay(url){
                // #ifdef APP-PLUS
                webView = plus.webview.create("","custom-webview",{
                    plusrequire:"none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
                    'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
                    // 'kernel': 'UIWebview',
                    top:uni.getSystemInfoSync().statusBarHeight+44 ,//放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
                    additionalHttpHeaders:{Referer:'www.fszhuazhuale.com://'}
                })
                // webView.loadURL(url, {Referer:'www.fszhuazhuale.com://'});
                webView.loadData(url, {baseURL:"http://api.fszhuazhuale.com"});
                var currentWebview = this.$scope.$getAppWebview(); //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
                currentWebview.append(webView);//一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
                // #endif
            },
            paySuccess() {
                this.$store.dispatch('getUserInfo');
                this.showResult = true;
                // uni.showModal({
                //     content: '支付成功',
                //     showCancel: false,
                //     success: function (res) {
                //         if (res.confirm) {
                //             console.log('用户点击确定');
                //             // setTimeout(()=>{
                //             // 	uni.navigateBack();
                //             // }, 200)
                //         } else if (res.cancel) {
                //         }
                //     }
                // });
            },
            onBack(){
                uni.navigateBack();
            }
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price{
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;
			&:before{
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;
		
		.type-item{
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position:relative;
		}
		
		.icon{
			width: 100upx;
			font-size: 52upx;
		}
		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}
		.icon-weixinzhifu {
			color: #36cb59;
		}
		.tit{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}
		.con{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
    .loading-page{
        opacity: 0.3;
    }
    .status-bar{
        height: var(--status-bar-height);
        width: 100%;
    }
    .back-icon{
        margin-left: 25rpx;
        margin-top: 25rpx;
    }

</style>
