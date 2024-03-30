<template>
	<gui-popup ref="guipopupforacsheet" 
	position="bottom" :canCloseByShade="canCloseByShade">
		<view  
		:style="{'margin-bottom':'25rpx','margin-left':((750-width)/2)+'rpx'}"
		@tap.stop.prevent="stopfun">
			<view class="gui-bg-white"
			:style="{width:width+'rpx', height:(height+100)+'rpx', borderRadius:borderRadius}">
				<text class="gui-action-sheet-title gui-block-text gui-border-b" 
				:style="{color:titleColor}">{{title}}</text>
				<scroll-view scroll-y="true" class="gui-border-box" 
				:style="{width:width+'rpx', height:height+'rpx', paddingTop:'20rpx', paddingBottom:'20rpx'}">
					<view class="gui-list">
						<view class="gui-list-items" v-for="(item, index) in items" :key="index" @tap.stop="selected" :data-index="index" >
							<view class="gui-list-body gui-border-b">
								<view class="gui-list-title">
									<text class="gui-list-title-text gui-primary-color">{{item.realname}}-{{item.phone}}</text>
									<gui-tags v-if="item.isDefault == 1" class="gui-list-title-desc" color="#FFFFFF" text="默认" bgClass="gui-bg-green" :size="22"></gui-tags>
								</view>
								<text class="gui-list-body-desc gui-color-gray">{{item.addressName + item.addressDetails}}</text>
							</view>
						</view>
					</view>
					<view class="gui-text-center gui-block-text" >
						<button type="default" size="mini" class="gui-button gui-bg-blue gui-noborder" @tap.stop="add">
							<text class="gui-icons gui-button-text-mini gui-color-white" 
							style="padding-right:10rpx;">&#xe625; 新增地址</text>
						</button>
						<!-- <text :style="{color:cancelBtnColor, lineHeight:listLineHeight, fontSize:listFontSize, marginTop:'10rpx'}" 
						v-if="isCancelBtn" @tap.stop="cancel">{{cancelBtnName}}</text> -->
					</view>
				</scroll-view>
			</view>
			<!-- iphone 底部操作按钮躲避 -->
			<gui-iphone-bottom></gui-iphone-bottom>
		</view>
	</gui-popup>
</template>
<script>
export default{
	name  : "ddw-address-action-sheet",
	props : {
		width           : { type : Number,  default : 700},
		height          : { type : Number,  default : 500},
		borderRadius    : { type : String,  default : '10rpx'},
		title           : { type : String,  default : ''},
		titleColor      : { type : String,  default : '#2B2E3D'},
		items           : { type : Array,   default : function(){return [];}},
		listColor       : { type : String,  default : '#008AFF'},
		listLineHeight  : { type : String,  default : '95rpx'},
		listFontSize    : { type : String,  default : '38rpx'},
		isCancelBtn     : { type : Boolean, default : true},
		cancelBtnName   : { type : String,  default : '取消'},
		cancelBtnColor  : { type : String,  default : 'rgba(69, 90, 100, 0.6)'},
		canCloseByShade : { type : Boolean, default : false}
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
		cancel : function () {
			this.$emit('cancel');
			this.close();
		},
		selected:function (e) {
			this.$emit('selected', e.currentTarget.dataset.index);
			this.close();
		},
		add:function () {
			uni.navigateTo({
				url: `/pages/address/address`
			})
			this.close();
		},
	}
}
</script>
<style scoped>
.gui-action-sheet-title{text-align:center; font-size:26rpx; line-height:100rpx; height:100rpx; font-weight:bold;}
</style>
