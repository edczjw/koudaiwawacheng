<template>
	<scroll-view :scroll-with-animation="scorllAnimation" :scroll-x="true" :show-scrollbar="false" 
	:class="['gui-scroll-x', isCenter ? 'gui-nav-center' : '']" 
	:style="{width:width+'rpx'}" 
	:scroll-left="scrollLeft">
		<view class="gui-scroll-x-item gui-columns gui-relative" :id="'tab-'+index+(random+'')" 
		:style="{width:size+'rpx', height:(lineHeight+lineHeightSamll+25)+'rpx'}" 
		v-for="(item, index) in itemsIn" :key="index" @tap="navchange" :data-index="index">
			<!-- <text 
			:class="['gui-block-text','gui-text-center']"
			:style="{
			color:currentIndexIn == index ? activeColor : color, 
			lineHeight:lineHeight+'rpx', height:lineHeight+'rpx',
			fontSize:currentIndexIn == index ? activeFontSize : fontSize, 
			fontWeight:currentIndexIn == index ? 'bold' : ''}">{{$utils.formatImg(item.img)}}</text> -->
			<gui-image :width="150" :height="150" :src="$utils.formatImg(item.img)"></gui-image>
			<text :class="['gui-block-text','gui-text-center']"
			:style="{
			color:currentIndexIn == index ? activeColor : descColor, 
			lineHeight:lineHeightSamll+'rpx', height:lineHeightSamll+'rpx', 
			fontSize:fontSizeSmall}">{{item.name}}</text>
			<!-- <view class="nav2-active-line-in gui-flex gui-rows gui-justify-content-center gui-fade-in" 
			v-if="currentIndexIn == index">
				<view class="nav2-active-line" :style="{borderColor:activeColor}"></view>
			</view> -->
		</view>
	</scroll-view>
</template>
<script>
export default {
	name  : "ddw-switch-navigation",
	props : {
		width           : {type : Number,  default : 690},
		isCenter        : {type : Boolean, default : false},
		currentIndex    : {type : Number,  default : 0},
		size            : {type : Number,  default : 138},
		fontSize        : {type : String,  default : '28rpx'},
		activeFontSize  : {type : String,  default : '28rpx'},
		lineHeight      : {type : Number,  default : 102},
		fontSizeSmall   : {type : String,  default : '26rpx'},
		lineHeightSamll : {type : Number,  default : 28},
		items           : {type : Array,   default : function () {return []}},
		color           : {type : String,  default : "#2B2E3D"},
		descColor       : {type : String,  default : "#999999"},
		activeColor     : {type : String,  default : "#3688FF"},
		autoLeft        : {type : String,  default : ''},
		scorllAnimation : {type : Boolean, default : true},
	},
	data() {
		return {
			currentIndexIn : 0,
			itemsIn        : [],
			random         : 1,
			scrollLeft     : 0,
			scrllTimer     : null
		}
	},
	created:function(){
		this.currentIndexIn = this.currentIndex;
		this.itemsIn        = this.items;
		this.random         = this.randomNum();
	},
	watch:{
		currentIndex : function(value){ this.currentIndexIn = value; },
		items        : function(value){ this.itemsIn = value; },
		currentIndexIn : function(val){
			if(this.isCenter){return ;}
			if(this.scrllTimer != null){clearTimeout(this.scrllTimer);}
			this.scrllTimer = setTimeout(()=>{this.setLeft();}, 200);
		}
	},
	methods:{
		navchange : function (e){
			this.currentIndexIn = e.currentTarget.dataset.index;
			this.$emit('change', Number(e.currentTarget.dataset.index))
		},
		randomNum : function () {
			return parseInt(Math.random() * 1000);
		},
		setLeft   : function () {
			if(this.isCenter){return ;}
			var itemWidth =  Number(this.size);
			var left      = (Number(this.currentIndexIn) + 1) * itemWidth - Number(this.width) / 2 - itemWidth / 2;
			var maxLeft   = Number(this.itemsIn.length) * itemWidth - this.width;
			maxLeft       = uni.upx2px(maxLeft);
			left          = uni.upx2px(left);
			if(left > maxLeft){left = maxLeft;}
			if(left < 0){left = 0;}
			this.scrollLeft = left;
		}
	}
}
</script>
<style scoped>
.gui-nav-center{justify-content:center; text-align:center;}
.nav2-active-line-in{height:18rpx; overflow:hidden; margin-top:6rpx;}
.nav2-active-line{width:18rpx; height:18rpx; border-radius:20rpx; 
border-width:6rpx; border-style:solid; margin-top:-15rpx;}
/* #ifdef APP-NVUE */
.nav2-active-line{width:30rpx; height:30rpx;}
/* #endif */
</style>