<template>
	<view class="content">
		<!-- #ifdef H5 -->
		<view class="navigateBack-btn" @click="$utils.navigateBack()">
			<image class="navigateBack-img" src="../../static/imgs/goback.png"></image>
		</view>
		<!-- #endif -->
		<view class="navbar" :style="{position:headerPosition,top:headerTop}">
			<view class="nav-item" :class="{current: filterIndex === 1}" @tap="tabClick(1)">
				寄存中
			</view>
			<view class="nav-item" :class="{current: filterIndex === 0}" @tap="tabClick(0)">
				待发货
			</view>
			<view class="nav-item" :class="{current: filterIndex === 3}" @tap="tabClick(3)">
				已发货
			</view>
			<view class="nav-item" :class="{current: filterIndex === 2}" @tap="tabClick(2)">
				已兑换
			</view>
		</view>
		<view class="dolls-list" v-if="filterIndex == 1 || filterIndex == 2">
			<!-- :style="{opacity: (item.status == 1 ? 1 : 0.5)}" -->
            <view class="gui-shoppingcard-goods gui-flex gui-rows gui-nowrap gui-align-items-center
            gui-space-between gui-border-b" 
            v-for="(item, index) in dollsList" :key="index" @tap="itemSelect(index)">
                <view v-show="filterIndex===1" class="gui-shoppingcard-goods-checkbtn">
                    <radio :name='item.id' :checked="item.checked===true"></radio>
                </view>
                <image :src="$utils.formatImg(item.thumbnail)" mode="widthFix"
                class="gui-shoppingcard-goods-image"></image>
                <view class="gui-shoppingcard-goods-body">
                    <text class="gui-shoppingcard-goods-title gui-text gui-primary-color 
                    gui-block-text">{{item.dollName}}</text>
                    <view class="gui-space-between">
						<gui-row v-if="item.status===1">
							<view v-if="item.stock <= 5 && item.stock > 0" class="gui-color-orange gui-shoppingcard-goods-stock" style="border-color: orange">库存紧张</view>
							<view v-else-if="item.stock === 0" class="gui-color-red gui-shoppingcard-goods-stock" style="border-color: red">等待补货</view>
							<text class="gui-shoppingcard-goods-price gui-flex1">可兑积分{{item.exchangeJifen}}</text>
						</gui-row>
						
                        <!-- <view v-if="item.status===1" class="gui-shoppingcard-goods-price gui-block-text">
                            <gui-tags text="边框标签" bgClass="gui-bg-white" color="#FF0035"
                            			:width="120" :lineHeight="2.2" :size="20" borderColor="#FF0035"></gui-tags>
							可兑积分{{item.exchangeJifen}}</view> -->
                        <text v-else class="gui-shoppingcard-goods-status gui-block-text">
                            {{item.status == 2 ? ('已兑换'+item.exchangeJifen+'积分') : (item.status == 3 ? '已申请发货' : '体验娃娃不发货')}}</text>    
                        <view class="gui-shoppingcard-goods-number">
                            <text class="gui-color-gray">{{item.createTime}}</text>
                        </view>
                    </view>
                </view>
				<view class="doll-detail" @tap.stop="navToDetailPage(item.id)" hover-class="gui-tap">
					<gui-tags text="详情" bgClass="gui-bg-gray" color="#232526" :size="28"></gui-tags>
				</view>
            </view>
		</view>
		<view class="dolls-list" v-else>
			<view class="gui-order gui-flex1 gui-flex gui-columns gui-border-b" v-if="orders != null" v-for="(order, oIndex) in orders" :key="oIndex">
				<view class="gui-flex gui-rows gui-space-between gui-align-items-center">
					<text class="gui-order-number gui-primary-color">订单号 : {{order.orderNo}}</text>
				</view>
				<!-- 循环订单商品 -->
				<view class="gui-order-goods gui-flex" 
				v-for="(orderItem, indexGoods) in order.orderItemVos" :key="indexGoods" @tap.stop="navToDetailPage(orderItem.catchRecordId)">
					<view class="gui-order-goods-img">
						<gui-image :src="$utils.formatImg(orderItem.productThumbnail)" :width="100" :height="100"></gui-image>
					</view>
					<text class="gui-order-goods-name">{{orderItem.productName}}</text>
				</view>
				<!-- 订单底部 -->
				<view class="gui-order-footer gui-flex gui-rows gui-space-between">
					<text class="gui-order-number"><!-- {{order.status}} --> {{order.createTime}}</text>
					<text class="gui-order-btn gui-border" :class="order.status == 1 ? 'gui-order-btn-red' : (order.status == 2 ? 'gui-order-btn-green' : 'gui-order-btn-gray')">{{order.status == 1 ? '等待发货' : (order.status == 2 ? '已发货' : '已完成')}}</text>
				</view>
				<view v-if="order.status != 1" class="gui-order-footer gui-flex gui-rows gui-space-between">
					<text class=" gui-color-green" style="font-size: 28rpx;">快递公司:{{order.deliveryName}}</text>
				</view>
				<view v-if="order.status != 1" class="gui-order-footer gui-flex gui-rows gui-space-between">
					<text class=" gui-color-green" style="font-size: 28rpx;">快递单号:{{order.deliveryCode}}</text>
					
					<text v-if="order.status > 1" class="gui-order-btn gui-border gui-order-btn-gray" style="font-size: 22rpx;" @click="copy(order)">复制单号</text>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
        
		<ddw-address-action-sheet ref="guiactionsheet" @selected="selectAddress"
		title="请选择您的地址" :items="addressItems" :canCloseByShade="true"></ddw-address-action-sheet>
		
		<gui-modal ref="guimodal"
		title="申请发货">
			<view slot="content" class="gui-padding gui-bg-gray">
				<text class="gui-block-text gui-text-center gui-text gui-color-gray" 
				style="line-height:60rpx; padding:10rpx;">确认申请选中娃娃发货到以下地址?</text>
				<text class="gui-block-text gui-text-center gui-text gui-color-green"
				style="line-height:30rpx; padding:10rpx;">邮费:{{isFreeShipping ? '包邮' : (shippingCoin + '金币')}}</text>
				<text class="gui-block-text gui-text-center gui-text gui-color-gray"
				<view class="gui-list-items" >
					<view class="gui-list-body gui-border-b">
						<view class="gui-list-title">
							<text class="gui-list-title-text gui-primary-color">{{selectAddressItem.realname}}-{{selectAddressItem.phone}}</text>
						</view>
						<text class="gui-list-body-desc gui-color-gray">{{selectAddressItem.addressName + selectAddressItem.addressDetails}}</text>
					</view>
				</view>
			</view>
			<!-- 利用 flex 布局 可以放置多个自定义按钮哦  -->
			<view slot="btns" class="gui-flex gui-rows gui-space-between">
				<view class="modal-btns gui-flex1" style="margin-right:80rpx;">
					<text class="modal-btns gui-color-gray" @tap="close">取消</text>
				</view>
				<view class="modal-btns gui-flex1" style="margin-left:80rpx;">
					<text class="modal-btns gui-color-blue" @tap="confirm">确认</text>
				</view>
			</view>
		</gui-modal>
		
        <!-- 购物车底部 -->
        <view v-show="filterIndex===1 && dollsList.length>0">
            <view style="height:120rpx;"></view>
            <view class="gui-shoppingcard-footer gui-bg-gray  gui-border-box gui-border-t">
            	<view class="gui-flex gui-rows gui-space-between gui-align-items-center">
            		<view class="gui-shoppingcard-checkbtn gui-flex grace-nowrap">
            			<gui-radio :checked="false" checkedColor="#008AFF" 
            			@change="itemChangeAll">
            				<text class="gui-text gui-primary-color">{{selectText}}</text>
            			</gui-radio>
            		</view>
                    <view class="gui-shoppingcard-count gui-flex gui-column gui-align-items-left gui-block-text" @tap="exchange"
					 hover-class="gui-tap" style="background-color: #47afff;">
            			<view class="gui-text gui-color-white">兑换积分</view>
            			<view class="gui-color-white">可兑换{{totalJifen}}积分</view>
            		</view>
					<view class="gui-shoppingcard-count gui-flex gui-column gui-align-items-left gui-block-text" @tap="openAddress"
					 hover-class="gui-tap" style="background-color: #ff9b37;">
						<view class="gui-text gui-color-white">申请发货</view>
						<view class="gui-color-white">{{freeShippingCount}}件包邮</view>
					</view>
            	</view>
                <!-- <ddw-iphone-bottom></ddw-iphone-bottom> -->
            </view>
        </view>
	</view>
</template>

<script>
	var graceJS = require('@/GraceUI5/js/grace.js');
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore	
		},
		data() {
			return {
				headerPosition:"fixed",
				headerTop:"0px",
				loadingType: 'more', //加载更多状态
				filterIndex: 1, 
				currentPage: 1,
				dollsList: [],
                totalJifen : 0, // 总积分
                selectText : '全不选', // 选择文本
				addressItems: [],
				freeShippingCount: '',
				shippingCoin: '',
				isFreeShipping: true,
				selectAddressItem: {
					id: '',
					realname: '',
					phone: '',
					addressName: '',
					addressDetails: ''
				},
				orders: []
			};
		},
		
		onLoad(options){
			// #ifdef H5
			// this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
			// #endif
			// this.loadData();
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom(){
			this.loadData();
		},
		onShow() {
			if(this.filterIndex === 1){
				this.loadData('refresh', 1);
			}
			// this.loadData('refresh');
			
			if(!this.$store.state.user){
				// #ifdef H5
				//微信授权登录
				if(this.$utils.isWeiXinBrowser()){
					this.$utils.wxAuthLogin(true);
					return;
				}
				// #endif
				
				uni.navigateTo({
					url: '/pages/public/login'
				}) 
			}
		},
		methods: {
			//加载商品 ，带下拉刷新和上滑加载
			async loadData(type='add', loading) {
				//没有更多直接返回
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
				
				if(type === 'refresh'){
					this.currentPage = 1;
				}
				
				
				if(this.filterIndex === 3 || this.filterIndex === 0){
					let status = this.filterIndex === 3 ? 4 : 1;
					
					uni.http.get(
						'/order/list?status=' + status + '&type=0&page=' + this.currentPage,
						{token:true}
					).then(res=>{
						let orders
						if(res.code == 200){
							if(type === 'refresh'){
								this.orders = res.data;
							}else {
								this.orders = this.orders.concat(res.data);
							}
						}
						//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
						this.loadingType  = (orders && orders.length > 0) ? 'more' : 'nomore';
						if(this.loadingType === 'more'){
							this.currentPage ++ ;
						}
						if(type === 'refresh'){
							if(loading == 1){
								uni.hideLoading()
							}else{
								uni.stopPullDownRefresh();
							}
						}
					}).catch(err=>{
						console.log(err);
					});
				}else{
					// uni.showLoading();
					uni.http.get(
						'/user/myDollList?page=' + this.currentPage + "&status=" +  this.filterIndex,
					    {token:true}
					).then(res=>{
						let dollsList = res.data;
						
						if(type === 'refresh'){
							this.dollsList = dollsList;
							this.totalJifen = 0;
						}else {
							this.dollsList = this.dollsList.concat(dollsList);
						}
						
						this.shippingCoin = res.shippingCoin;
						this.freeShippingCount = res.freeShippingCount;
						// uni.hideLoading();
						
						//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
						this.loadingType  = dollsList.length > 0 ? 'more' : 'nomore';
						if(this.loadingType === 'more'){
							this.currentPage ++ ;
						}
						if(type === 'refresh'){
							if(loading == 1){
								uni.hideLoading()
							}else{
								uni.stopPullDownRefresh();
							}
						}
					}).catch(err=>{
						
					});
				}
			},
			//筛选点击
			tabClick(index){
				if(this.filterIndex === index){
					return;
				}
				this.filterIndex = index;
				
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.loadData('refresh', 1);
				uni.showLoading({
					title: '正在加载'
				})
			},
			//详情
			navToDetailPage(id){
				// let id = item.id;
				uni.navigateTo({
					url: `/pages/user/dollDetail?id=` + id
				})
			},
			stopPrevent(){},
            
            //计算总计函数
            countTotoal:function(){
                var total = 0;
                for (var i = 0; i < this.dollsList.length; i++){
                    if(this.dollsList[i].checked){
                        total += Number(this.dollsList[i].exchangeJifen);
                    }
                }
                this.totalJifen = total;
            },
            // 兑换积分
            exchange:function(){
				let self = this;
				
				let selectIdList = [];
				for(let i=0; i<self.dollsList.length; i++){
				    if(self.dollsList[i].checked){
				        selectIdList.push(self.dollsList[i].id);
				    }
				}
				if(selectIdList.length == 0){
					graceJS.msg("请选择要兑换的娃娃");
					return;
				}
				
				uni.showModal({
				    title: '提示',
				    content: '确认兑换积分?',
				    success: function (res) {
				        if (res.confirm) {
							uni.showLoading({title:'正在兑换...'});
							
							uni.http.post('/doll/exchangeJifen', {ids:selectIdList.join(",")}, {token:true}).then(res=>{
							    if(res.code == 200){
							        graceJS.msg("兑换成功");
									self.$store.state.user.jifen = res.currentJifen;
							        self.loadData('refresh', 1);
							    }else {
									graceJS.msg(res.msg);
								}
								uni.hideLoading();
							}).catch(err=>{
							    console.error(err);
							})
							
							setTimeout(function () {
							    uni.hideLoading();
							}, 2000);
				        } else if (res.cancel) {
				        }
				    }
				});
            },
			openAddress : function () {
				let selectIdList = [];
				for(let i=0; i<this.dollsList.length; i++){
				    if(this.dollsList[i].checked){
				        selectIdList.push(this.dollsList[i].id);
				    }
				}
				if(selectIdList.length == 0){
					graceJS.msg("请选择娃娃");
					return;
				}
				
				this.isFreeShipping = true;
				
				if(selectIdList.length < this.freeShippingCount){
					graceJS.msg("不满包邮件数,您需支付" + this.shippingCoin + "金币的邮费!");
					this.isFreeShipping = false;
				}
				
				// uni.showLoading();
				uni.http.get(
					'/address/list',
				).then(res=>{
					if(res.code && res.code == 200){
						this.addressItems = [];
						res.data.forEach((item,index)=>{  
							this.addressItems.push(item) 
						});
					}
				}).catch(err=>{
				});
				this.$refs.guiactionsheet.open();
			},
			selectAddress : function(index){
				console.log(index);
				// 返回索引，可以根据索引获取文本数据
				this.selectAddressItem = this.addressItems[index];
				this.$refs.guimodal.open();
			},
			close : function () {
				this.$refs.guimodal.close();
			},
			confirm : function () {
				uni.showLoading({title:'正在处理...'});
				let selectIdList = [];
				for(let i=0; i<this.dollsList.length; i++){
				    if(this.dollsList[i].checked){
				        selectIdList.push(this.dollsList[i].id);
				    }
				}
				if(selectIdList.length == 0){
					graceJS.msg("请选择娃娃");
					return;
				}
				uni.http.post('/doll/applyDeliver', {ids:selectIdList.join(","),addressId: this.selectAddressItem.id}, {token:true}).then(res=>{
				    if(res.code == 200){
				        graceJS.msg("申请成功");
				       this.loadData('refresh', 1);
				    }else {
						graceJS.msg(res.msg);
					}
					uni.hideLoading();
				}).catch(err=>{
				    console.error(err);
				})
				setTimeout(function () {
				    uni.hideLoading();
				}, 2000);
				this.$refs.guimodal.close();
			},
            // 选中
            itemSelect: function(index){
                if(this.filterIndex !=1) return;
                this.dollsList[index].checked = !this.dollsList[index].checked;
                this.countTotoal();
            },
            // 全选/全不选
            itemChangeAll : function (e) {
                this.selectText = e[0] ? '全选' : '全不选';
                for(var i = 0; i < this.dollsList.length; i++){
                    this.dollsList[i].checked = e[0];
                }
                this.countTotoal();
            },
			copy(order) {
				let data = order.deliveryCode;
				uni.setClipboardData({
					data: data
				});
			}
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
	}
	.content{
		padding-top: 96upx;
	}

	.navbar{
		position: fixed;
		left: 0;
		top: var(--window-top);
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0,0,0,.06);
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			color: $font-color-dark;
			position: relative;
			&.current{
				color: $base-color;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid $base-color;
				}
			}
		}
		.p-box{
			display: flex;
			flex-direction: column;
			.yticon{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;
				&.active{
					color: $base-color;
				}
			}
			.xia{
				transform: scaleY(-1);
			}
		}
		.cate-item{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;
			&:after{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}

	.dolls-list{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #fff;
		.dolls-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}
		.price-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
			color: $font-color-light;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		}
	}
	
    .gui-shoppingcard{border-radius:8rpx; padding:20rpx 30rpx;}
    .gui-shopp-name{width:200rpx; flex:1;}
    .gui-shopp-go{width:120rpx; text-align:right;}
    .gui-shoppingcard-goods{padding:20rpx 0; height: 180rpx; width: 700rpx;}
    .gui-shoppingcard-goods-checkbtn{width:60rpx;}
    .gui-shoppingcard-goods-image{width:120rpx; margin-right:20rpx;border-radius: 25rpx;}
    .gui-shoppingcard-goods-body{flex:1; overflow:hidden;}
    .gui-shoppingcard-goods-title{font-size:30rpx;}
    .gui-shoppingcard-goods-price{color:#aa557f; font-size:28rpx;}
    .gui-shoppingcard-goods-status{color:#008AFF; font-size:28rpx;}
    .gui-shoppingcard-goods-number{padding:2px 0; font-size:28rpx;}
    .gui-shoppingcard-remove{text-align:right; line-height:50rpx; margin-top:20rpx; font-size:24rpx;}
    .gui-shoppingcard-footer{position:fixed; z-index:99; left:0; bottom:0; width:750rpx; padding-left:30rpx;padding-right:30rpx;}
    .gui-shoppingcard-checkbtn{width:140rpx;}
    .gui-shoppingcard-count{width:240rpx; height:90rpx; font-size:26rpx; text-align:center; border-radius: 25rpx;}
	.gui-shoppingcard-goods-stock{font-size: 24rpx;border-style: solid;border-radius: 15rpx; border-width: 2rpx;;margin-right: 15rpx;padding: 2rpx;}
    .doll-detail{width: 120rpx; font-size:28rpx;}
    .modal-btns{line-height:88rpx; font-size:26rpx; text-align:center; width:200rpx;}
	.iphone-bottom{
		padding-bottom: 0;  
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);
	}
    /* 如果购物车放在 switch 页面并且是 h5 端请打开注释启用下面的样式 */
    /* #ifdef H5 */
    .gui-shoppingcard-footer{bottom:var(--window-bottom);}
    /* #endif */
	
	.gui-order{background-color:#FFFFFF; padding:20rpx; margin:25rpx; margin-bottom:10rpx; border-radius:10rpx;}
	.gui-order-number{line-height:50rpx; font-size:26rpx; width:300rpx; flex:1;}
	.gui-order-goods{flex-direction:row; flex-wrap:nowrap; padding-bottom:20rpx;}
	.gui-order-goods-img{width:100rpx; height:100rpx;}
	.gui-order-goods-name{line-height:40rpx; width:200rpx; flex:1; overflow:hidden; font-size:26rpx; margin-left:20rpx; margin-right:20rpx; color:#333333;}
	.gui-order-goods-price{font-size:24rpx; line-height:50rpx; color:#333333; width:150rpx; text-align:right;}
	.gui-order-footer{margin-top:2px;}
	.gui-order-status{line-height:50rpx; color:#999999; font-size:26rpx; width:100rpx; text-align:center;}
	.gui-order-btn{width:150rpx; height:50rpx; line-height:50rpx; color:#999999; font-size:22rpx; text-align:center; border-radius:60rpx; margin-left:20rpx;}
	.gui-order-btn-red{border-color:#FF0036; color:#FF0036;}
	.gui-order-btn-green{border-color:green; color:green;}
</style>
