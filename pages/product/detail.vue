<template>
	<view>
		<!-- #ifdef H5 -->
		<view class="navigateBack-btn" @click="$utils.navigateBack()">
			<image class="navigateBack-img" src="../../static/imgs/goback.png"></image>
		</view>
		<!-- #endif -->
		
		<!-- 商品标题 分享按钮 -->
		<view class="gui-padding gui-margin-top gui-flex gui-rows gui-space-between gui-align-items-center">
			<text class="gui-h5 gui-block-text product-name gui-block-text">{{product.name}}</text>
			<!-- <view class="product-share" @tap="share">
				<text class="product-share gui-icons gui-color-orange">&#xe622;</text>
			</view> -->
		</view>
		<view class="gui-common-line gui-margin-top"></view>
		<!-- 价格 -->
		<view class="gui-padding" style="margin-top:10rpx;">
			<view class="gui-flex gui-rows gui-nowrap gui-align-items-center">
				<text class="product-price">{{product.jifen}}积分</text>
				<text v-if="product.jifen < product.jifenOri" class="gui-text gui-color-gray gui-line-through" style="margin-left:30rpx;">{{product.jifenOri}}积分</text>
			</view>
			<!-- <view class="gui-flex gui-rows gui-nowrap gui-align-items-center gui-space-between">
				<text class="gui-text-small gui-color-gray">运费 ￥0.00</text>
				<text class="gui-text-small gui-color-gray">已售 21008 件</text>
				<text class="gui-text-small gui-color-gray">浏览 36万次</text>
			</view> -->
		</view>
		<view class="gui-common-line gui-margin-top"></view>
		<!-- 详情 请根据项目情况自行改进 可以使用 富文本-->
		<view class="gui-padding gui-margin-top">
			<image style="width:690rpx;"
			:src="$utils.formatImg(item)" mode="widthFix" v-for="(item,index) in product.detailImgList" :key="index"></image>
		</view>
		
		<ddw-address-action-sheet ref="guiactionsheet" @selected="selectAddress" 
		title="请选择您的地址" :items="addressItems" :canCloseByShade="true"></ddw-address-action-sheet>
		
		<!-- 例子 1 -->
		<gui-modal ref="guimodal" 
		title="兑换商品">
			<view slot="content" class="gui-padding gui-bg-gray">
				<text class="gui-block-text gui-text-center gui-text gui-color-gray" 
				style="line-height:100rpx; padding:10rpx;">确认兑换{{product.name}}?</text>
				<text class="gui-block-text gui-text-center gui-text gui-color-gray"
				<view v-if="product.type != 3" class="gui-list-items" >
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
		
		
		<!-- 底部 -->
		<view class="product-footer gui-bg-white gui-border-t">
			<view v-if="$store.state.user.jifen >= product.jifen" class="gui-bg-blue" @tap="openAddress"  hover-class="gui-tap" style="border-radius: 30rpx;">
				<text class="gui-text gui-color-white gui-footer-large-button-text gui-block-text gui-text-center">立即兑换</text>
			</view>
			<view v-else class="gui-bg-black-opacity3"  hover-class="gui-tap" style="border-radius: 30rpx;">
				<text class="gui-text gui-color-white gui-footer-large-button-text gui-block-text gui-text-center" >积分不足</text>
			</view>
			<ddw-iphone-bottom></ddw-iphone-bottom>
		</view>
		<!-- 底部占位 -->
		<view style="height:120rpx;"></view>
	</view>
</template>
<script>
var graceJS = require('@/GraceUI5/js/grace.js');
import {
        mapState 
    } from 'vuex';
export default {
	data() {
		return {
			// 商品信息
			product : {
				id: '',
				name: "",
				type: "",
				jifen : '',
				jifenOri : '',
				detailImgList: []
			},
			addressItems: [],
			selectAddressItem: {
				id: '',
				realname: '',
				phone: '',
				addressName: '',
				addressDetails: ''
			}
		}
	},
	onLoad(options){
		let productId = options.productId;
		// uni.showLoading();
		uni.http.get(
			'/shop/detail/' + productId,
		).then(res=>{
			if(res.code && res.code == 200){
				let product = res.data;
				product.detailImgList = product.detailImgs.split(",");
				this.product = product;
			}
		}).catch(err=>{
			
		});
	},
    computed: {
    	...mapState({user:state=>state.user})
    },
	methods: {
		openAddress : function () {
			// uni.showLoading();
            if(!this.user){
                uni.navigateTo({
                	url: '/pages/public/login'
                })
                return
            }
            
			if(this.product.type != 3){
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
			}else {
				this.$refs.guimodal.open();
			}
		},
		selectAddress : function(index){
			// 返回索引，可以根据索引获取文本数据
			this.selectAddressItem = this.addressItems[index];
			this.$refs.guimodal.open();
		},
		close : function () {
			this.$refs.guimodal.close();
		},
		confirm : function () {
			uni.showLoading();
			let data = {productId : this.product.id,addressId: this.selectAddressItem.id}
			uni.http.post('/shop/exchange',data).then(res=>{
				if(res.code && res.code == 200){
					graceJS.msg("兑换成功");
					this.$store.dispatch('getUserInfo');
					
					if(this.product.type != 3){
						uni.navigateTo({
							url: '/pages/order/order'
						}) 
					}
				}else {
					graceJS.msg(res.msg);
				}
			}).catch(err=>{
				uni.hideLoading();
			});
			// 客户点击确认按钮后的逻辑请在此处实现
			this.$refs.guimodal.close();
			uni.hideLoading();
		},
	}
}
</script>
<style scoped>
.product-name{width:560rpx; line-height:50rpx;}
.product-price{color:#FF7900; line-height:60rpx; font-size:30rpx; font-weight:bold;}
.gui-common-line{height:18rpx;}
.product-footer{position:fixed; z-index:99; margin-left: 25rpx; bottom:0; width:700rpx;}
.modal-btns{line-height:88rpx; font-size:26rpx; text-align:center; width:200rpx;}
</style>