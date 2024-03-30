<template>
	<gui-page :customHeader="true"
		:footerSets="{height:100, zIndex:100, bg:'#ffffff'}">
		<!-- 自定义头部导航 -->
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center gui-padding">
				<!-- 返回按钮 -->
				<gui-header-leading :onlyBack="true"></gui-header-leading>
				<!-- 标题 -->
				<text class="gui-block-text gui-text gui-text-center gui-header-content gui-primary-color" style="font-size: 32rpx;">{{doll.dollName}}</text>
			</view>
		</view>
		
		
		<!-- #ifdef H5 -->
		<!-- <view class="navigateBack-btn" @click="$utils.navigateBack()">
			<image class="navigateBack-img" src="../../static/imgs/goback.png"></image>
		</view> -->
		<!-- #endif -->
		
		<view slot="gBody" style="margin:1rpx 15rpx;">
			<!-- 商品标题 分享按钮 -->
			<view class="gui-padding gui-margin-top gui-flex gui-rows gui-space-between gui-align-items-center">
				<text class="gui-h5 gui-block-text doll-name gui-block-text">{{doll.dollName}}</text>
			</view>
			<view class="gui-common-line gui-margin-top"></view>
			<!-- 价格 -->
			<view class="gui-padding" style="margin-top:10rpx;">
				<view class="gui-flex gui-rows gui-nowrap gui-align-items-center">
					<text class="gui-text gui-color-gray">抓中时间</text>
					<text class="gui-text" style="margin-left:60rpx;">{{doll.createTime}}</text>
				</view>
				<view class="gui-flex gui-rows gui-nowrap gui-align-items-center">
					<text class="gui-text gui-color-gray">可兑积分</text>
					<text class="gui-text" style="margin-left:60rpx;">{{doll.exchangeJifen}}积分</text>
				</view>
				<view class="gui-flex gui-rows gui-nowrap gui-align-items-center">
					<text class="gui-text gui-color-gray">娃娃状态</text>
					<text class="gui-text" style="margin-left:60rpx;">{{doll.statusDes}}</text>
				</view>
				<view v-if="doll.status  == 2 || doll.status == 3" class="gui-flex gui-rows gui-nowrap gui-align-items-center">
					<text class="gui-text gui-color-gray">{{doll.status == 2 ? '兑换时间' : '申请时间'}}</text>
					<text class="gui-text" style="margin-left:60rpx;">{{doll.exchangeTime}}</text>
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
				:src="$utils.formatImg(item)" mode="widthFix" v-for="(item,index) in doll.detailImgList" :key="index"></image>
			</view>
			
			<ddw-address-action-sheet ref="guiactionsheet" @selected="selectAddress" 
			title="请选择您的地址" :items="addressItems" :canCloseByShade="true"></ddw-address-action-sheet>
			
			<gui-modal ref="guimodal" 
			title="申请发货">
				<view slot="content" class="gui-padding gui-bg-gray">
					<text class="gui-block-text gui-text-center gui-text gui-color-gray" 
					style="line-height:100rpx; padding:10rpx;">确认发货{{doll.dollName}}?</text>
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
			
			
			<!-- 底部 -->
			<!-- <view class="doll-footer gui-bg-white gui-border-t"> -->
			<view v-if="doll.status == 1" class="doll-footer gui-flex gui-rows gui-wrap gui-space-between">
				<button class="gui-bg-blue" style="width: 300rpx;" @tap="exchangeJifen"  hover-class="gui-tap" :disabled="doll.status!=1">
					<text class="gui-text gui-color-white gui-footer-large-button-text gui-block-text gui-text-center">兑换积分</text>
				</button>
				<button class="gui-bg-red" style="width: 300rpx;" @tap="openAddress"  hover-class="gui-tap" :disabled="doll.status!=1">
					<text class="gui-text gui-color-white gui-footer-large-button-text gui-block-text gui-text-center">申请发货</text>
				</button>
				<gui-iphone-bottom></gui-iphone-bottom>
			</view>
			<!-- 底部占位 -->
			<view style="height:120rpx;"></view>
		</view>
	</gui-page>
</template>
<script>
var graceJS = require('@/GraceUI5/js/grace.js');
export default {
	data() {
		return {
			// 商品信息
			doll : {
				id: '',
				dollName: "",
				exchangeJifen : '',
                status: 0,
				detailImgList: [],
                statusDes: ''
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
		let id = options.id;
        // let doll = JSON.parse(options.doll);
        // if(doll.status == 1){
        //     doll.statusDes = '寄存中';
        // }else if(doll.status == 2){
        //     doll.statusDes = '已兑换积分';
        // }else if(doll.status == 3){
        //     doll.statusDes = '已申请发货';
        // }else if(doll.status == 4){
        //     doll.statusDes = '体验娃娃不发货';
        // }
        // doll.detailImgList = doll.detailImgs.split(",");
        // this.doll = doll;
		// uni.showLoading();
		uni.http.get(
			'/user/getRecordDetail/' + id,
		).then(res=>{
			if(res.code && res.code == 200){
				let doll = res.data;
				
				if(doll.status == 1){
				    doll.statusDes = '寄存中';
				}else if(doll.status == 2){
				    doll.statusDes = '已兑换积分';
				}else if(doll.status == 3){
				    doll.statusDes = '已申请发货';
				}else if(doll.status == 4){
				    doll.statusDes = '体验娃娃不发货';
				}
				
				doll.detailImgList = doll.detailImgs.split(",");
				this.doll = doll;
			}
		}).catch(err=>{
			
		});
	},
	methods: {
		openAddress : function () {
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
			uni.showLoading();
			let data = {ids : this.doll.id + "",addressId: this.selectAddressItem.id}
			uni.http.post('/doll/applyDeliver',data, {token:true}).then(res=>{
				if(res.code && res.code == 200){
					graceJS.msg("申请发货成功");
                    setTimeout(()=>{
                    	uni.navigateBack()
                    }, 800)
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
        exchangeJifen: function(){
            uni.http.post('/doll/exchangeJifen', {ids:this.doll.id + ""}, {token:true}).then(res=>{
                console.log(JSON.stringify(res));
                if(res.code == 200){
					this.$store.state.user.jifen = res.currentJifen;
                    graceJS.msg("兑换积分成功");
                    setTimeout(()=>{
                    	uni.navigateBack()
                    }, 800)
                }
            }).catch(err=>{
                console.error(err);
            })
        }
	}
}
</script>
<style scoped>
.doll-name{width:560rpx; line-height:50rpx;}
.gui-common-line{height:18rpx;}
.doll-footer{position:fixed; z-index:99; margin-left: 25rpx; bottom:30rpx; width:700rpx;}
.modal-btns{line-height:88rpx; font-size:26rpx; text-align:center; width:200rpx;}
.gui-bg-add-card{width: 300rpx;}
</style>