<template>
	<view class="gui-margin gui-margin-top">
		<!-- #ifdef H5 -->
		<view class="navigateBack-btn" @click="$utils.navigateBack()">
			<image class="navigateBack-img" src="../../static/imgs/goback.png"></image>
		</view>
		<!-- #endif -->
		<!-- 文章标题 -->
		<view class="gui-padding">
			<text class="gui-h4"></text>
		</view>
		
		<!-- 不需要引入，可直接使用 -->
		<div class="ql-container">
			<div class="ql-editor">
				<mp-html :content="html" />
			</div>
		</div>
		
		<view class="gui-margin-top" style="height: 20rpx;"></view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			title   : "",
			html: ''
		}
	},
	onLoad : function(options){
		this.getArticle(options.id);
	},
	methods: {
		getArticle(id) {
			uni.http.get(
				'article/' + id
			).then(res => {
				if(res.code == 200){
					uni.setNavigationBarTitle({
					    title: res.data.noticeTitle
					});
					
					this.html = res.data.noticeContent;
				}else {
					uni.showToast({
						title: '文章不存在',
						icon: 'none'
					});
					setTimeout(function() {
						uni.navigateBack();
					}, 500);
				}
			})
		}
	}
}
</script>
<style>
	@import '@/static/quill/quill.bubble.css';
	@import '@/static/quill/quill.core.css';
	@import '@/static/quill/quill.snow.css';
</style>