<template>
	<gui-page :customHeader="true" :showH5GobackBtn="false" :fullPage="true" 
	headerStyle="background-color:rgba(255,255,255,0)" 
	statusBarStyle="background-color:rgba(255,255,255,0)" 
	:isHeaderSized="false">
		<!-- 自定义头部导航 -->
		<view slot="gHeader">
			<!-- 返回按钮 -->
			<!-- <view style="margin-left:20rpx; margin-top:20rpx;">
				<gui-header-leading :onlyBack="true" 
				buttonStyle="color:#FFFFFF;"></gui-header-leading>
			</view> -->
		</view>
		<!-- 页面主体 -->
		<view slot="gBody" class="gui-flex1" style="background-color:#F5F6F8;">
			<!-- 背景图片 -->
			<image src="../../static/imgs/rank.png" 
			class="bgimg"></image>
			<!-- 列表主体 -->
			<view class="ranking-list gui-absolute-lt" 
			:style="{top:'250rpx', left:'30rpx', height:mainHeight+'px'}">
				<!-- 头部个人信息 -->
				<view class="gui-flex gui-rows gui-justify-content-center" 
				style="margin-top:38rpx;">
					<view class="header-msg-item gui-flex">
						<text class="header-msg-text-small">夹中</text>
						<text class="header-msg-text">{{mySuccessCount ? mySuccessCount : 0}}</text>
						<text class="header-msg-text-small">次</text>
					</view>
					<view class="header-msg-item gui-flex">
						<image class="header-msg-face" 
						:src="user ? $utils.formatImg(user.icon) : '../../static/imgs/missing-face.png'"></image>
					</view>
					<view class="header-msg-item gui-flex">
						<text v-show="myrank > 0" class="header-msg-text">{{myrank}}</text>
						<text v-show="myrank > 0" class="header-msg-text-small">名</text>
						
						<text v-show="!myrank || myrank == 0" class="header-msg-text">暂无排名</text>
					</view>
				</view>
				<view class="ranking-lists">
					<scroll-view :scroll-y="true" 
					:style="{height : (mainHeight - 100) + 'px'}">
						<view class="ranking-lists-item gui-flex" 
						v-for="(item,index) in rankingList" :key="index">
							<view class="ranking-lists-num gui-block-text" 
							:style="{color:item.color?item.color:''}">{{index+1}}</view>
							<image class="ranking-lists-image" 
							:src="$utils.formatImg(item.userIcon)"></image>
							<view class="ranking-lists-content">
								<text class="ranking-lists-content-name gui-block-text">{{item.userNick}}</text>
								
							</view>
							<view class="ranking-lists-zan">
								<text class="ranking-lists-content-desc gui-block-text gui-color-gray">夹中{{item.successCount}}次 </text>
							</view>
						</view>
						<view class="" style="height:60rpx;"></view>
					</scroll-view>
				</view>
			</view>
		</view>
	</gui-page>
</template>
<script>
var graceJS = require('@/GraceUI5/js/grace.js');
import {
        mapState 
    } from 'vuex';
export default {
	data() {
		return {
			mainHeight:300,
			rankingList : [],
			myrank: '',
			mySuccessCount: ''
		}
	},
	onLoad:function () {
		var systemInfo = graceJS.system();
		this.mainHeight = systemInfo.windowHeight - uni.upx2px(250);
		
		// this.loadData();
	},
	onShow() {
		this.loadData();
	},
    computed: {
    	...mapState({user:state=>state.user})
    },
	methods: {
		loadData() {
			console.log("aaaaaa");
			// uni.showLoading();
			uni.http.get(
				'user/weekRankList'
			).then(res=>{
				let rankingList = res.data;
				res.data.forEach((item,index) => {
					let color = "";
					if(index == 0){
						color = '#FF0036';
					}else if(index == 1){
						color = '#FF9B00';
					}else if(index == 2){
						color = '#FFCC00';
					}
					rankingList[index].color = color;
					
					if(this.user && (item.userId == this.user.id)){
						this.mySuccessCount = item.successCount;
						this.myrank = index + 1;
					}
				})
				this.rankingList = rankingList;
			})
		}
	}
}
</script>
<style scoped>
.bgimg{width:750rpx; height:350rpx;}
.ranking-list{width:690rpx; background-color:rgba(255,255,255,1); border-radius:20rpx; overflow:hidden;}
.header-msg-item{width:200rpx; flex-direction:row; justify-content:center; align-items:center;}
.header-msg-text{font-size:32rpx; font-weight:bold; color:#666666;}
.header-msg-text-small{font-size:22rpx; margin:10rpx; color:#666666;}
.header-msg-face{width:138rpx; height:138rpx; border-radius:120rpx;}
.ranking-lists{padding:25rpx;}
.ranking-lists-item{margin-bottom:28rpx; flex-direction:row; justify-content:space-between; flex-wrap:nowrap; align-items:center;}
.ranking-lists-num{width:60rpx; line-height:80rpx; font-size:50rpx; color:#666666; font-weight:bold; font-style:italic; text-align:center;}
.ranking-lists-image{width:100rpx; height:100rpx; border-radius:80rpx; margin:0 20rpx;}
.ranking-lists-content{width:200rpx; margin:0 10rpx; flex:1;}
.ranking-lists-content-name{font-size:30rpx; line-height:56rpx; color:#333333; line-height:50rpx;}
.ranking-lists-content-desc{font-size:28rpx; line-height:36rpx}
.ranking-lists-zan{width:150rpx;}
.ranking-lists-zan-icon{font-size:50rpx; line-height:60rpx; text-align:center;}
.ranking-lists-zan-num{font-size:22rpx; text-align:center;}
.zan-active{color:#FF0036;}
</style>