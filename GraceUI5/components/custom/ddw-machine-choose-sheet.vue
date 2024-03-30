<template>
	<gui-popup ref="guipopupforacsheet" 
	position="bottom" :canCloseByShade="true">
		<view @tap.stop.prevent="stopfun">
			<view class="gui-bg-white"
			:style="{width:width+'rpx', height:((360 * (parseInt((items.length - 1) / 3) + 1))+100)+'rpx', borderRadius:borderRadius}">
				<text class="gui-action-sheet-title gui-block-text gui-border-b">{{title}}</text>
				
				<view class="gui-card-list gui-flex gui-rows gui-wrap gui-justify-content-start ddw-machine-card">
					<view v-for="(item,index) in items" class="gui-card-item" :key="item.id" @tap.stop="selected(item)" :data-index="item.id" hover-class="gui-tap">
						<view>
							<gui-image borderRadius="20rpx" :width="180" :height="270" :src="$utils.formatImg(item.previewImg)"></gui-image>
						</view>
						<view style="margin-top:5rpx" class="gui-flex gui-rows gui-space-between">
							<text class="gui-block-text gui-text-small gui-color-gray gui-text-center">{{item.name}}</text>
							<text v-if="item.player == null" class="gui-block-text gui-text-small gui-text-center" style="color:green">空闲</text>
							<text v-else-if="item.player && item.subscribers.length == 0" class="gui-block-text gui-text-small gui-text-center" style="color:red">游戏中</text>
							<text v-else class="gui-block-text gui-text-small gui-text-center" style="color:red">{{item.subscribers.length}}人排队中</text>
						</view>
					</view>
				</view>
			</view>
			<!-- iphone 底部操作按钮躲避 -->
			<gui-iphone-bottom></gui-iphone-bottom>
		</view>
	</gui-popup>
</template>
<script>
export default{
	name  : "ddw-machine-choose-sheet",
	props : {
		width           : { type : Number,  default : 750},
		borderRadius    : { type : String,  default : '10rpx'},
		title           : { type : String,  default : ''},
		items           : { type : Array,   default : function(){return [];}}
	},
	methods:{
		open  : function(){
			this.$refs.guipopupforacsheet.open();
		},
		close : function(){
			this.$refs.guipopupforacsheet.close();
		},
		stopfun : function(e){
			e.stopPropagation();
			return null;
		},
		selected:function (item) {
			this.$emit('selected', item);
			this.close();
		}
	}
}
</script>
<style scoped>
.gui-action-sheet-title{text-align:center; font-size:26rpx; line-height:100rpx; height:100rpx; font-weight:bold;color:#2B2E3D}
.gui-card-item{width:180rpx; margin-left: 40rpx;}
.ddw-machine-card{margin-left: 25rpx;margin-right: 65rpx;margin-top: 20rpx;}
</style>
