<template>
	<view :class="[
		'gui-flex', 'gui-columns', 'gui-sbody', 
		fullPage ? 'gui-flex1':'' , 
		refresh || loadmore ? 'gui-flex1' : ''
	]">
		<!-- #ifdef H5 -->
		<view v-if="showH5GobackBtn" class="navigateBack-btn" @click="$utils.navigateBack()">
			<image class="navigateBack-img" src="../../static/imgs/goback.png"></image>
		</view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<!-- 自定义头部 -->
		<view class="gui-header gui-transition-all" 
		v-if="customHeader" 
		id="guiPageHeader" ref="guiPageHeader" 
		:style="'height:'
		+(headerSets.height+statusBarHeight)+'px; z-index:'
		+headerSets.zIndex+';'+headerStyle">
			<!-- 状态栏 -->
			<view class="gui-page-status-bar" 
			:style="'height:'+statusBarHeight+'px;'+statusBarStyle"></view>
			<!-- 头部插槽 -->
			<view class="gui-flex gui-columns gui-justify-content-center" 
			@tap.stop.prevnet="headerTap"
			:style="{height:headerSets.height+'px'}">
				<slot name="gHeader"></slot>
			</view>
		</view>
		<!-- 自定义头部占位 -->
		<view v-if="customHeader && isHeaderSized"
		:style="'height:'+(headerSets.height+statusBarHeight)+'px; '+ headerSizedStyle + ';'"></view>
		<!-- #endif -->
		
		<!-- 页面主体 -->
		<view class="gui-flex gui-columns" v-if="!refresh && !loadmore" 
		id="guiPageBody" ref="guiPageBody" 
		:class="[fullPage?'gui-flex1':'']">
			<slot name="gBody"></slot>
		</view>
		
		
		<!-- 刷新加载主体 -->
		<view class="gui-flex gui-columns gui-flex1" 
		v-if="refresh || loadmore" 
		id="guiPageBody" 
		ref="guiPageBody" 
		:style="{
			marginTop:fixedTopMargin+'px', 
			height:refreshBodyHeight+'px'
		}">
			<scroll-view class="gui-relative" 
			:scroll-y="true" 
			:show-scrollbar="false" 
			:style="{
				height:refreshBodyHeight+'px',
				opacity:refreshBodyHeight < 1 ? 0 : 1
			}" 
			@touchstart="touchstart" 
			@touchmove="touchmove" 
			@touchend="touchend" 
			@scroll="scroll" 
			:scroll-top="scrollTop" 
			@scrolltolower="loadmorefun">
				<view>
					<gui-refresh 
					ref="guiPageRefresh" 
					@reload="reload"
					:refreshText="refreshText" 
					:refreshBgColor="refreshBgColor" 
					:refreshColor="refreshColor" 
					:refreshFontSize="refreshFontSize"></gui-refresh>
				</view>
				<slot name="gBody"></slot>
				<view 
				v-if="loadmore" 
				class="gui-page-loadmore">
					<gui-loadmore 
					ref="guipageloadmore" 
					:loadMoreText="loadMoreText" 
					:loadMoreColor="loadMoreColor" 
					:loadMoreFontSize="loadMoreFontSize"></gui-loadmore>
				</view>
			</scroll-view>
		</view>


		<!-- 页面底部 -->
		<!-- 底部占位 -->
		<view v-if="customFooter" 
		:style="{height:footerHeight}"></view>
		<view class="gui-page-footer gui-border-box" 
		:class="[isSwitchPage?'gui-switch-page-footer':'']" 
		v-if="customFooter" 
		id="guiPageFooter" 
		ref="guiPageFooter" 
		:style="{
			height:footerHeight, 
			'background-image':footerSets.bg, 
			'z-index':footerSets.zIndex
		}">
			<view><slot name="gFooter"></slot></view>
			<view 
			:style="'height:'+iphoneXButtomHeight+'; '+ iphoneXButtomStyle"></view>
		</view>
		
		<!-- 右下角悬浮挂件 -->
		<view class="gui-page-pendant" 
		:style="{
			right:pendantSets.right, bottom:pendantSets.bottom, 
			width:pendantSets.width, zIndex:pendantSets.zIndex}">
			<slot name="gPendant"></slot>
		</view>
		
		<!-- 吸顶元素 -->
		<view class="gui-page-fixed-top" 
		ref="guiPageFixedTop" 
		id="guiPageFixedTop" 
		:style="{top:fixedTop+'px', zIndex:fixedTopZIndex}">
			<slot name="gFixedTop"></slot>
		</view>
		
		<!-- 全屏 loading -->
		<gui-page-loading ref="guipageloading"></gui-page-loading>
	</view>
</template>
<script>  
// #ifdef APP-NVUE
const dom     = weex.requireModule('dom');
// #endif
export default{
	name  : 'gui-page',
	props : {
		fullPage           : {type:Boolean, default:false},
		customHeader       : {type:Boolean, default:false},
		showH5GobackBtn    : {type:Boolean, default:true},
		headerSets         : {type:Object , default:function(){return {height:44, zIndex:100}}},
		headerStyle        : {type:String , default:'background-color:#FFFFFF;'},
		isHeaderSized      : {type:Boolean, default:true},
		statusBarStyle     : {type:String , default:'background-color:#FFFFFF;'},
		customFooter       : {type:Boolean, default:false},
		footerSets         : {type:Object , default:function(){return {height:100, zIndex:100, bg:'linear-gradient(to bottom, #FFFFFF,#FFFFFF)'}}},
		pendantSets        : {type:Object , default:function(){return {width:'100rpx', right:'25rpx', bottom:'100rpx', zIndex:100};}},
		isLoading          : {type:Boolean, default:false},
		isSwitchPage       : {type:Boolean, default:false},
		iphoneXButtomStyle : {type:String,  default:''},
		headerSizedStyle   : {type:String,  default:''},
		fixedTopZIndex     : {type:Number,  default:2},
		
		/* 刷新 */
		refresh            : {type:Boolean, default:false},
		refreshText        : {type:Array,   default:function () {
			return ['继续下拉刷新','松开手指开始刷新','数据刷新中','数据已刷新'];
		}},
		refreshBgColor     : {type:Array,   default:function () {
			return ['#FFFFFF','#FFFFFF','#FFFFFF','#63D2BC'];
		}},
		refreshColor       : {type:Array,   default:function () {
			return ['rgba(69, 90, 100, 0.6)','rgba(69, 90, 100, 0.6)','#63D2BC','#FFFFFF'];
		}},
		refreshFontSize    : {type:String, default:'26rpx'},
		
		/* 加载更多 */
		loadmore           : {type:Boolean, default:false},
		loadMoreText       : {type:Array, default:function () {
			return ['','更多数据加载中', '已加载全部数据'];
		}},
		loadMoreColor      : {type:Array, default:function () {
			return ['rgba(69, 90, 100, 0.6)', 'rgba(69, 90, 100, 0.6)', 'rgba(69, 90, 100, 0.8)'];
		}},
		loadMoreFontSize   : {type:String, default:'26rpx'},
		apiLoadingStatus   : {type:Boolean, default:false}
	},
	data() {
		return {
			footerHeight        : '100rpx',
			iphoneXButtomHeight : '0rpx',
			statusBarHeight     : 0,
			// #ifdef APP-NVUE
			animateCount        : 0,
			// #endif
			headerTapNumber     : 0,
			fixedTop            : 0,
			refreshBodyHeight   : 0,
			loadMoreTimer       : null,
			fixedTopMargin      : 0,
			scrollTop           : 0,
			srcollTimer         : null,
			
		}
	},
	
	mounted:function(){
		
		if(this.isLoading){
			this.$refs.guipageloading.open();
		}
		
		// 刷新相关
		if(this.refresh || this.loadmore){
			// #ifdef APP-NVUE
			this.getRefs('guiPageBody', 0, (res)=>{
				setTimeout(()=>{
					this.getDomSize('guiPageBody', (res2)=>{
						this.refreshBodyHeight = res2.height;
						this.getDomSize('guiPageFixedTop', (res)=>{
							if(res.height){
								this.refreshBodyHeight -= res.height;
								this.fixedTopMargin     = res.height;
							}
						});
					});
				},100);
			});
			// #endif
			// #ifndef APP-NVUE
			this.getDomSize('guiPageBody', (res)=>{
				this.refreshBodyHeight = res.height;
				this.getDomSize('guiPageFixedTop', (res)=>{
					if(res.height){
						this.refreshBodyHeight -= res.height;
						this.fixedTopMargin     = res.height;
					}				
				})
			});
			// #endif
		}
	},
	
	watch:{
		isLoading : function (val) {
			if(val){
				this.$refs.guipageloading.open();
			}else{
				this.$refs.guipageloading.close();
			}
		}
	},
	
	created:function(){
		
		this.footerHeight = this.footerSets.height + 'rpx';
		
		// #ifdef H5
		if(this.customHeader){
			this.fixedTop = this.headerSets.height;
		}else{
			this.fixedTop = 44;
		}
		// #endif
		
		try {
			var system   = uni.getSystemInfoSync();
			if(system.model){
				system.model = system.model.replace(' ', '');
				system.model = system.model.toLowerCase();
				this.statusBarHeight = system.statusBarHeight;
				var res1 = system.model.indexOf('iphonex');
				if(res1 > 5){res1 = -1;}
				var res2 = system.model.indexOf('iphone1');
				if(res2 > 5){res2 = -1;}
				if(res1 != -1 || res2 != -1){
					this.iphoneXButtomHeight = '50rpx';
					this.footerHeight        =  (this.footerSets.height + 50 ) + 'rpx';
				}
			}
			
			// #ifdef MP-ALIPAY
			this.statusBarHeight = 0;
			// #endif
			
			// #ifdef APP-PLUS
			this.iphoneXButtomHeight = '0rpx';
			this.footerHeight        =  this.footerSets.height + 'rpx';
			if(plus.navigator.isFullscreen()){
				this.statusBarHeight = 0;
			}
			// #endif
			
			if(this.isSwitchPage){
				this.iphoneXButtomHeight = '0rpx';
				this.footerHeight        =  this.footerSets.height + 'rpx';
			}
			
			// #ifndef H5
			if(this.customHeader){
				this.fixedTop = this.headerSets.height + this.statusBarHeight;
			}else{
				this.fixedTop = 0;
			}
			// #endif
		} catch (e){return null;}
	},
	methods:{
		// 下拉刷新相关
		touchstart : function (e){
			if(!this.refresh){return false;}
			if(this.apiLoadingStatus){return false;}
			this.$refs.guiPageRefresh.touchstart(e);
		},
		touchmove : function(e){
			if(!this.refresh){return false;}
			if(this.apiLoadingStatus){return false;}
			this.$refs.guiPageRefresh.touchmove(e);
		},
		touchend : function (e) {
			if(!this.refresh){return false;}
			if(this.apiLoadingStatus){return false;}
			this.$refs.guiPageRefresh.touchend(e);
		},
		scroll:function(e){
			if(this.srcollTimer != null){
				clearTimeout(this.srcollTimer);
			}
			this.srcollTimer = setTimeout(()=>{
				this.$refs.guiPageRefresh.scroll(e);
				this.$emit('scroll', e);
				this.scrollTop = e.detail.scrollTop;
			}, 100);
		},
		setScrollTop : function (scrollTop){
			this.scrollTop = scrollTop;
		},
		endReload : function(){
			this.$refs.guiPageRefresh.endReload();
		},
		reload : function(){
			if(this.apiLoadingStatus){return false;}
			this.$emit('reload');
			if(this.loadmore){this.$refs.guipageloadmore.stoploadmore();}
		},
		
		// 获取元素尺寸
		getDomSize : function(domIDOrRef, fun){
			setTimeout(()=>{
				// #ifndef APP-NVUE
				uni.createSelectorQuery().in(this).select('#'+domIDOrRef).boundingClientRect().exec((res)=>{
					fun(res[0]);
				});
				// #endif
				// #ifdef APP-NVUE
				var el = this.$refs[domIDOrRef];
				dom.getComponentRect(el, (res) => {
					fun(res.size);
				});
				// #endif
			}, 800);
			
		},
		stopfun : function(e){e.stopPropagation(); return null;},
		headerTap : function(){
			this.headerTapNumber ++;
			if(this.headerTapNumber >= 2){
				this.$emit('gotoTop');
				this.headerTapNumber = 0;
			}else{
				setTimeout(()=>{this.headerTapNumber = 0;}, 1000);
			}
		},
		// #ifdef APP-NVUE
		getRefs : function(ref, count, fun){
			if(count >= 40){return null;}
			var refReturn = this.$refs[ref];
			if(refReturn){
				fun(refReturn);
				return;
			}else{
				count++;
				setTimeout(()=>{
					this.getRefs(ref, count, fun);
				}, 100);
			}
		},
		// #endif
		
		loadmorefun : function () {
			if(!this.loadmore){return false;}
			if(this.apiLoadingStatus){return false;}
			// 获取加载组件状态看一下是否还能继续加载
			// 保证触底只执行一次加载
			if(this.loadMoreTimer != null){clearTimeout(this.loadMoreTimer);}
			this.loadMoreTimer =  setTimeout(() => {
				var status = this.$refs.guipageloadmore.loadMoreStatus;
				if(status != 0){return null;}
				this.$refs.guipageloadmore.loading();
				this.$emit('loadmorefun');
			}, 80);
		},
		stoploadmore : function(){
			this.$refs.guipageloadmore.stoploadmore();
		},
		nomore : function () {
			this.$refs.guipageloadmore.nomore();
		}
	}
}
</script>
<style scoped>
.gui-sbody{width:750rpx;}
.gui-page-loading{width:750rpx; position:fixed; left:0; top:0; bottom:0; flex:1; z-index:99999;}
.gui-page-loading-points{width:20rpx; height:20rpx; border-radius:50rpx; margin:10rpx;}
/* #ifndef APP-NVUE */
.gui-sbody{min-height:calc(100vh - var(--window-top) - var(--window-bottom));}
@keyframes pageLoading1{0% {opacity:0.5; transform:scale(1);} 40% {opacity:1; transform:scale(1.5);}  60%{opacity:0.5; transform:scale(1);}}
@keyframes pageLoading2{20% {opacity:0.5; transform:scale(1);} 60% {opacity:1; transform:scale(1.5);}  80% {opacity:0.5; transform:scale(1);}}
@keyframes pageLoading3{40% {opacity:0.5; transform:scale(1);} 80% {opacity:1; transform:scale(1.5);}  100% {opacity:0.5; transform:scale(1);}}
.animate1{animation:pageLoading1 1.2s infinite linear;}
.animate2{animation:pageLoading2 1.2s infinite linear;}
.animate3{animation:pageLoading3 1.2s infinite linear;}
/* #endif */
.gui-header{width:750rpx; position:fixed; left:0; top:0;}
.gui-page-footer{width:750rpx; position:fixed; left:0; bottom:0;}
/* #ifdef H5 */
.gui-switch-page-footer{bottom:50px;}
/* #endif */
.gui-page-status-bar{width:750rpx;}
.gui-page-pendant{position:fixed;}

.gui-page-fixed-top{position:fixed; top:44px; left:0px;  width:750rpx; z-index:99998; overflow:hidden;}
.gui-page-loadmore{padding-bottom:30rpx;}
</style>