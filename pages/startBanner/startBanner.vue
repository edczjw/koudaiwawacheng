<template>
	<view class="gui-start-banner">
		<view class="gui-start-banner-skip" @tap.stop="closeStartBanner">跳过</view>
		<swiper class="gui-start-banner-swiper" 
		:indicator-dots="true" indicator-active-color="#7BB830" 
		indicator-color="rgba(0,0,0,0.3)" 
		:autoplay="false" 
		:style="{height:startBannerHeight+'px'}">
			<!-- 启动图片建议纯色背景 此处设置 swiper-item 背景颜色与图片背景颜色相同即可实现全屏效果 -->
			<!-- <swiper-item style="background-color:#FFFFFF;" 
			class="gui-start-banner-swiper-item">
				<image src="https://graceui.oss-cn-beijing.aliyuncs.com/startBanner/1.png" 
				mode="widthFix" class="gui-start-banner-image"></image>
			</swiper-item> -->
			<swiper-item v-for="(item,index) in imgs" style="background-color:#FFFFFF;" 
			class="gui-start-banner-swiper-item">
				<image :src="$utils.formatImg(item.img)" mode="widthFix" class="gui-start-banner-image"></image>
				
				<view v-if="index == (imgs.length - 1)" class="gui-start-banner-close" @tap.stop="closeStartBanner">开始体验</view>
			</swiper-item>
			<!-- <swiper-item style="background-color:#FFFFFF;" 
			class="gui-start-banner-swiper-item">
				<image src="https://graceui.oss-cn-beijing.aliyuncs.com/startBanner/3.png" 
				mode="widthFix" class="gui-start-banner-image"></image>
				<view class="gui-start-banner-close" @tap.stop="closeStartBanner">开始体验</view>
			</swiper-item> -->
		</swiper>
	</view>
</template>
<script>
var graceJS = require('@/GraceUI5/js/grace.js');
export default {
	data() {
		return {
			startBannerHeight : 500,
			imgs:[]
		}
	},
	onLoad:function(option){
		this.imgs = JSON.parse(option.imgs);
		
		var system = graceJS.system();
		this.startBannerHeight = system.windowHeight;
		uni.setStorageSync('playStartBanner', 'played');
	},
	methods: {
		closeStartBanner : function(){
			uni.switchTab({
				url:'../index/index'
			});
		}
	}
}
</script>
<style>
.gui-start-banner-skip{width:100rpx; height:50rpx; border-radius:50rpx; text-align:center; border:1px solid #999999; color:#999999; font-size:22rpx; line-height:50rpx; position:absolute; z-index:9999; top:80rpx; right:50rpx;}
.gui-start-banner{width:750rpx; position:fixed; z-index:9998; top:0; left:0; bottom:0;}
.gui-start-banner-swiper{width:750rpx; height:500rpx; background-color:#FFFFFF;}
.gui-start-banner-swiper-item{width:750rpx; display:flex; flex-direction: column; justify-content:center; align-items:center; font-size:0;}
.gui-start-banner-image{width:750rpx;}
.gui-start-banner-close{width:220rpx; height:80rpx; border-radius:80rpx; margin-top:80rpx; text-align:center; border:1px solid #F97D7C; color:#F97D7C; font-size:28rpx; line-height:80rpx;}
</style>