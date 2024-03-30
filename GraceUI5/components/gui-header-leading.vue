<template>
	<view v-if="!onlyBack" 
	class="gui-header-leader gui-flex gui-rows gui-nowrap gui-align-items-center gui-header-buttons-bg gui-border-box" 
	:style="bgStyle">
		<view class="gui-header-leader-btns" hover-class="gui-tap">
			<text class="gui-header-leader-btns gui-block-text gui-icons gui-header-buttons-color" 
			@tap="goback" :style="buttonStyle">&#xe643;</text>
		</view>
		<view class="gui-header-leader-btns" hover-class="gui-tap">
			<text class="gui-header-leader-btns gui-block-text gui-icons gui-header-buttons-color" 
			@tap="gohome" :style="'font-size:35rpx; '+ buttonStyle">&#xe63b;</text>
		</view>
	</view>
	<view v-else class="gui-header-leader">
		<view class="gui-header-leader-btns" hover-class="gui-tap">
			<text class="gui-header-leader-btns gui-block-text gui-icons gui-primary-color" 
			hover-class="gui-tap" @tap="goback" :style="'text-align:left; '+buttonStyle">&#xe643;</text>
		</view>
	</view>
</template>
<script>
export default{
	name  : "gui-header-leading",
	props : {
		homePage    : {type:String , default:"/pages/index/index"},
		bgStyle     : {type:String , default:""},
		buttonStyle : {type:String , default:""},
		onlyBack    : {type:Boolean, default:false}
	},
	methods:{
		goback : function () {
			uni.navigateBack({delta:1}); 
			this.$emit('goback');
		},
		gohome : function () {
			if(this.homePage != ''){
				uni.switchTab({url:this.homePage});
			}
			this.$emit('gohome');
		}
	}
}
</script>
<style scoped>
.gui-header-leader{height:60rpx; border-radius:60px; width:138rpx; overflow:hidden;}
.gui-header-leader-btns{width:68rpx; line-height:60rpx; font-size:32rpx; text-align:center;}
</style>