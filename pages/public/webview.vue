<template>
	<view class="gui-padding">
		<web-view :src="linkUrl"></web-view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			linkUrl: ''
		}
	},
	onLoad(options){
		this.linkUrl = decodeURIComponent(options.url);
	}
}
</script>
<style>
.menu-items{width:100rpx; height:100rpx; margin:20rpx 0; border-radius:100rpx;}
.menu-icon{width:100rpx; line-height:40rpx; font-size:36rpx;}
.menu-text{width:100rpx; line-height:30rpx; font-size:22rpx;}
</style>