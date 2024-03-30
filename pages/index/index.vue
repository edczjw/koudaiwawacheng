<template>
	<gui-page :customHeader="true" :showH5GobackBtn="false" ref="guipage" >
		<!-- #ifdef APP-PLUS -->
		<!-- 自定义头部导航 -->
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center gui-padding">
				<!-- 导航文本此处也可以是其他自定义内容 -->
				<image class="logo" src="../../static/imgs/logo.png"></image>
				<!-- 如果右侧有其他内容可以利用条件编译和定位来实现-->
				<view style="position: absolute;right: -20rpx;">
					<button type="default" size="mini" class="gui-button" @tap="navigateTo('/pages/money/recharge')">
						<image class="jinbi-img" src="../../static/imgs/jinbi.png"></image>
						<text class="jinbi-text">{{user?user.coin:0}}</text>
					</button>
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- 页面主体 -->
		<view slot="gBody">
			
			<uni-sign-in ref="signIn"></uni-sign-in>
			<view class="carousel-section">
				<!-- 背景色区域 -->
				<swiper class="carousel" circular  :autoplay="true" :interval="5000" :duration="1000" @change="swiperChange">
					<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @tap="bannerTab(item)">
						<!-- <image :src="item.src" /> -->
						<!-- <image src="../../static/imgs/banner2.jpeg"></image> -->
						<image :src="$utils.formatImg(item.img)"></image>
					</swiper-item>
				</swiper>
				<!-- 自定义swiper指示器 -->
				<view class="swiper-dots">
					<text class="num">{{swiperCurrent+1}}</text>
					<text class="sign">/</text>
					<text class="num">{{swiperLength}}</text>
				</view>
			</view>
			
			<view v-if="speakerMsgs && speakerMsgs.length > 0" class="gui-margin-top gui-padding">
				<gui-speaker  :interval="3500"
				:items="speakerMsgs" styles="overflow:hidden; height:30rpx; line-height:30rpx; font-size:28rpx;color:gray;margin-left:10rpx">
					<text slot="icon" class="gui-block-text gui-icons demo-icon gui-color-gray">&#xe656;</text>
				</gui-speaker>
			</view>
			
			<!-- 分类 -->
			<view class="cate-section" elevation="10rpx">
				<view class="cate-item" @tap="navigateTo('/pages/public/exchangePwd')">
					<image src="/static/imgs/kl.png"></image>
					<text class="gui-color-gray">口令红包</text>
				</view>
				<view class="cate-item" @tap="signIn(false)">
					<image src="/static/imgs/signin.png"></image>
					<text class="gui-color-gray">签到领币</text>
				</view>
				<view class="cate-item" @tap="navigateTo('/pages/money/recharge')">
					<image src="/static/imgs/cz.png"></image>
					<text class="gui-color-gray">金币充值</text>
				</view>
				<view class="cate-item" @tap="switchTab('/pages/product/list')">
					<image src="/static/imgs/sc.png"></image>
					<text class="gui-color-gray">积分商城</text>
				</view>
				<!-- #ifdef APP-PLUS -->
				<view class="cate-item" @tap="navigateTo('/pages/user/invite')">
					<image src="/static/imgs/yq.png"></image>
					<text class="gui-color-gray">邀请有礼</text>
				</view>
				<!-- #endif -->
				<view class="cate-item" @tap="navigateTo('/pages/user/rank')">
					<image src="/static/imgs/rankIcon.png"></image>
					<text class="gui-color-gray">排行榜</text>
				</view>
			</view>
			
			<swiper v-if="adList && adList.length > 0" class="ad-1" circular>
				<swiper-item v-for="(item, index) in adList" :key="index" class="carousel-item" @tap="bannerTab(item)">
					<!-- <image :src="item.src" /> -->
					<!-- <image src="../../static/imgs/banner2.jpeg"></image> -->
					<image :src="$utils.formatImg(item.img)"></image>
				</swiper-item>
			</swiper>
			
			<view class="">
				<u-sticky style="z-index:1;background-color: #ffffff;" :customNavHeight="customNavHeight">
					<u-tabs :list="categoriesTabs" @change="tabChange" @click="ontabtap" :current="tabIndex" 
					:activeStyle="{color: '#606266',fontWeight: 'bold',transform: 'scale(1.05)'}"
					:inactiveStyle="{color: '#9ea2a8',transform: 'scale(1)'}">
					</u-tabs>
				</u-sticky>
				<swiper class="tab-box" ref="swiper1" :current="tabIndex" :duration="300" @change="onswiperchange" easing-function=""
					@transition="onswiperscroll" @animationfinish="animationfinish" @onAnimationEnd="animationfinish"
					:style="{height:swiperHeight}">
					<swiper-item v-for="(citem,index) in categoriesTabs" :key="index">
						<view class="swiper-item" :id="'content-wrap'+index">
							<view class="guess-section gui-margin-top">
								<view 
									v-for="(item, index) in getDollsByCategorieId(citem.id)" :key="index"
									class="guess-item"
									@tap="navToMachinePage(item)"
								>
									<view class="image-wrapper" style="border-radius: 25rpx;">
										<image :src="$utils.formatImg(item.thumbnail)" mode="aspectFill"></image>
									</view>
									<text class="title clamp">{{item.name}}</text>
									<view class="price-box">
										<gui-tags class="price" :text="item.coin + '币'" bgClass="jianbian-bg" :size="28" :borderRadius="50"></gui-tags>
										<gui-tags :text="(item.isBusy ? '火爆/' : '空闲/') + (item.machineIds ? item.machineIds.length : 0) + '台'" bgClass="gui-bg-gray" :color="item.isBusy ? 'red' : 'green'" :size="22"></gui-tags>
									</view>
								</view>
							</view>
						</view>
						
					</swiper-item>
				
				</swiper>
			</view>
			
			<!-- #ifdef H5 -->
			<ddw-machine-choose-sheet ref="guiactionsheet" @selected="selected" 
					:title="selectDollName" :items="machineList"></ddw-machine-choose-sheet>
			<!-- #endif -->
			
			<!-- 居中弹出 -->
			<gui-popup ref="lotteryPop" width="600rpx" :canCloseByShade="false">
				<view>
					<view class="text-center" style="margin-bottom: 20rpx;padding: 5rpx;color: #ffffff;background-color:gray;opacity: 0.6;border-radius: 20rpx;">恭喜您获得一次抽奖机会</view>
					<view class="gui-relative">
						<gui-turntable ref="guiturntable" 
						:rewardNames="rewardNames" 
						:rewardBGColors="rewardBGColors" @end="endLottery"></gui-turntable>
						<image class="gui-lucky-turntable-btn"
						src="https://oss.fszhuazhuale.com/imgs/wwj/lottery.png" 
						mode="widthFix" @tap="startLottery" 
						:class="[luckyStatus == 1 ? 'gui-breathing' : '']"></image>
					</view>
					<view class="text-center" style="margin-top: 30rpx;">
						<text class="gui-icons gui-color-white" style="font-size: 70rpx;" @tap.stop="closeLotteryPop">&#xe78a;</text>
					</view>
				</view>
			</gui-popup>
		</view>
	</gui-page>
</template>
<script>
    import {mapState,mapMutations} from 'vuex';
	import $utils from '@/common/utils.js'
export default {
	data() {
		return {
			utils: $utils,
			swiperCurrent: 0,
			swiperLength: 0,
			carouselList: [],
			adList:[],
			dollList: [],
			selectDollName: '',
			machineList: [],
			categoriesTabs: [],
			tabIndex: 0,
			swiperList: [],
			swiperHeight: '100rpx',
			speakerMsgs : [],
            customNavHeight: 0,
			// 奖品名称
			rewardNames    : [],
			// 奖品展示区背景颜色
			rewardBGColors : [],
			// 抽奖状态
			luckyStatus    : 0 ,// 0 等待抽奖  1 抽奖中
			cid: null
		};
	},
	
	onLoad(options) {
		this.setInterval();
		
		this.initBanner("init");
		this.getdata();
		setTimeout(()=>{
			if(this.user){
				this.signIn(true);
			}
		}, 1500)
		
		// if(options.share == 'game' && options.cid){
		// 	this.cid = options.cid;
		// 	setTimeout(()=>{
		// 		if(this.user){
		// 			this.lottery();
		// 		}
		// 	}, 2000)
		// }
		
        
        this.customNavHeight = uni.getSystemInfoSync().statusBarHeight;
		// #ifdef APP-PLUS
		this.customNavHeight = this.customNavHeight + 35;
		// #endif
		uni.$on('selected',(data)=>{
			this.selected(data);
		})
	},
	onUnload(){
		this.clearInterval();
	},
	onTabItemTap(){
		this.getdata();
	},
    onPullDownRefresh(){
        this.reload();
    },
    computed: {
    	...mapState({user:state=>state.user})
    },
	methods: {
		...mapMutations(['setCurrentMachine']),
		signIn(init) { //签到
			if(!this.user){
				// #ifdef H5
				//微信授权登录
				if(this.$utils.isWeiXinBrowser()){
					this.$utils.wxAuthLogin(true);
					return;
				}
				// #endif
				
				uni.navigateTo({
					url: '/pages/public/login'
				});
				return;
			}
			
			this.$refs.signIn.open(init)
		},
		selected : function(item){
			let self = this;
			// this.$refs.guipageloading.open();
			// this.$refs.guiactionsheet.close();
			let data = {machineId: item.id,video:item.video}
			this.setCurrentMachine(data)
			
			setTimeout(function() {
				// self.$refs.guipageloading.close();
				uni.navigateTo({
					// url: `/pages/machine/game?machine=` + encodeURIComponent(JSON.stringify(data)),
					url: `/pages/machine/game?machineId=` + item.id,
					animationType: 'pop-in',
					animationDuration: 300
				})
			}, 200);
		},
		reload : function(){
			this.initBanner();
			this.getdata('reload');
            uni.stopPullDownRefresh();
		},
		open:function(){
			uni.$emit('dollMachineList',{selectDollName: this.selectDollName,
			machineList: this.machineList,})
			
		},
		//app取消更新
		updateClose:function() {
			this.is_update_app = false;
		},
		/**
		 * 请求静态数据只是为了代码不那么乱
		 * 分次请求未作整合
		 */
		async getdata(type) {
			 // uni.showLoading();
			uni.http.get(
				'doll/list'
			).then(res=>{
				let dollList = res.data.dollList;
				this.dollList = dollList || [];
				this.categoriesTabs = res.data.categories;
				this.categoriesTabs.splice(0, 0, {
					id: 0,
					name: '全部'
				})
				this.$nextTick(() => {
					this.setSwiperHeight()
				})
			}).catch(err=>{
				
			});
			if(type && type == 'reload'){
				this.$refs.guipage.endReload();
			}
		},
		async initBanner(type) {
			uni.http.get('banner?dataVersion=0').then(res=>{
				if(res.code == 200){
					var isPlayd = uni.getStorageSync('playStartBanner');
					if(isPlayd == '' && res.data.startPage && res.data.startPage.length > 0){ 
						uni.redirectTo({
							url:'../startBanner/startBanner?imgs=' + encodeURIComponent(JSON.stringify(res.data.startPage))
						});
					}
					
					if(res.data.indexCarousel && res.data.indexCarousel.length > 0){
						this.carouselList = res.data.indexCarousel;
						this.swiperLength = this.carouselList.length;
					}
					if(res.data.indexAd && res.data.indexAd.length > 0){
						this.adList = res.data.indexAd;
					}
					
					if(res.data.speakerMsgs && res.data.speakerMsgs.length > 0){
						this.speakerMsgs = res.data.speakerMsgs;
					}
					//
					if(type == "init" && res.data.indexPopImg && res.data.indexPopImg.length > 0){
						setTimeout(()=>{
							uni.$emit('popImgLink', res.data.indexPopImg);
						},500)
					}
				}
			})
		},
		
		//轮播图切换修改背景色
		swiperChange(e) {
			const index = e.detail.current;
			this.swiperCurrent = index;
		},
		//机器列表
		navToMachinePage(item) {
            if(!this.user){
				// #ifdef H5
				//微信授权登录
				if(this.$utils.isWeiXinBrowser()){
					this.$utils.wxAuthLogin(true);
					return;
				}
				// #endif
				
                uni.navigateTo({
                	url: '/pages/public/login'
                })
                return
            }
			let id = item.id;
			let machineIds = item.machineIds;
			if(!machineIds || machineIds.length == 0){
				uni.showToast({title:"暂无机器可用", icon:"none", mask:true});
				return;
			}else if(machineIds.length == 1){
				let data = {machineId: machineIds[0],video:item.video}
				this.setCurrentMachine(data)
				
				uni.navigateTo({
					// url: `/pages/machine/game?machine=` + encodeURIComponent(JSON.stringify(data)),
					url: `/pages/machine/game?machineId=` + machineIds[0],
					animationType: 'pop-in',
					animationDuration: 300
				})
			}else {
				this.selectDollName = item.name;
				// uni.showLoading();
				uni.http.get(
					'machine/list/' + item.id,
				).then(res=>{
					this.machineList = res.data.machineList || [];
					
					// #ifdef APP-PLUS
					this.open();
					// #endif
					
					// #ifdef H5
					this.$refs.guiactionsheet.open();
					// #endif
				})
				
				
				
				/* uni.navigateTo({
					url: `/pages/machine/machine?doll=` + encodeURIComponent(JSON.stringify(item))
				}) */
			}
		},
		navigateTo(url){
            if(!this.user){
				// #ifdef H5
				//微信授权登录
				if(this.$utils.isWeiXinBrowser()){
					this.$utils.wxAuthLogin(true);
					return;
				}
				// #endif
                url = '/pages/public/login';
            }
			uni.navigateTo({
			    url: url
			});
		},
		switchTab(url){
			uni.switchTab({
			    url: url
			});
		},
		bannerTab(item){
			if(item.jumpType == 'outLink'){
                // #ifdef APP-PLUS
                plus.runtime.openURL(item.jumpLink, function(res) {});
                // #endif
			}else if(item.jumpType == 'innerPage'){
                let url = item.jumpLink;
				uni.authJump({
					url : url,
					fail: function(res) {
						uni.switchTab({
							url : url
						})
					}
				})
			}else if(item.jumpType == 'innerWebview'){
				uni.navigateTo({
					url : "/pages/public/webview?url=" + encodeURIComponent(item.jumpLink),
				})
			}else if(item.jumpType == 'article'){
				uni.navigateTo({
					url : "/pages/public/article?id=" + item.jumpLink,
				})
			}
		},
		getDollsByCategorieId(id) {
			let dolls = this.dollList;
			if (id == 0) {
				dolls = this.dollList;
			} else {
				dolls = this.dollList.filter((item) => {
					let categoryIds = item.categoryIds.split(",");
					return categoryIds.indexOf(id + "") != -1;
				});
			}
			return dolls;
		},
		tabChange(e) {
			console.log(e);
			this.tabIndex = e.index
		},
		// 切换tab
		ontabtap(e) {
			let index = e.index;
		
			this.changeTabsIndex(index);
		},
		changeTabsIndex(index) {
		
			if (this.tabIndex === index) {
				return;
			}
			this.tabIndex = index;
			this.setSwiperHeight()
		},
		setSwiperHeight() {
			setTimeout(()=>{
				let element = "#content-wrap" + this.tabIndex;
				let query = uni.createSelectorQuery().in(this);
				query.select(element).boundingClientRect();
				query.exec((res) => {
					if (res && res[0]) {
						// this.swiperHeight = res[0].height + 750 + "rpx";
                        let height = res[0].height + 15;
                        if(height < 280) height = 280;
                        this.swiperHeight = height + "px";
					}
				});
			},800);
		},
		onswiperchange(e) {
			let index = e.target.current || e.detail.current;
			this.tabIndex = index;
			this.setSwiperHeight()
		},
		onswiperscroll() {
		
		},
		animationfinish() {},
		itemTap(item){
			
		},
		setInterval(){
			this.clearInterval();
			
			let i = 0;
			this.timer = setInterval( () => {
				i ++ ;
				if(this.dollList.length == 0 && this.carouselList.length == 0){
					this.initBanner('init');
					this.getdata();
				}else {
					this.clearInterval();
				}
				if(i == 20){
					this.clearInterval();
				}
			}, 3000)
		},
		clearInterval(){
			if(this.timer) {
				clearInterval(this.timer);  
				this.timer = null;  
			} 
		},
		lottery() {
			if(this.user){
				uni.http.get(
					'user/checkLottery?catchRecordId=' + this.cid
				).then(res => {
					if(res.code == 200){
						this.rewardNames = res.rewardNames;
						this.rewardBGColors = res.rewardBGColors;
						this.$refs.lotteryPop.open();
					}
				})
			}
		},
		closeLotteryPop() {
			this.$refs.lotteryPop.close();
		},
		startLottery : function(){
			uni.http.get(
				'user/startLottery?catchRecordId=' + this.cid
			).then(res => {
				if(res.code == 200){
					if(this.luckyStatus != 0){
						return ;
					}
					this.luckyStatus = 1;
					// 抽奖流程
					// 检查抽奖次数，看用户是否还可以继续抽奖
					//if(用户不能抽奖){ 提示用户代码; return ;}
					// 向后端发起请求, 后端进行抽奖算法封装，返回中奖结果索引
					setTimeout(()=>{
						// 假设中奖 index 为 2
						this.$refs.guiturntable.goto(res.result);
					},500);
				} else if(res.code == 101){
					uni.showToast({title:res.msg, icon:"none", mask:true});
					this.closeLotteryPop();
				} else {
					uni.showToast({title:"抱歉,您没有抽奖次数了哦~", icon:"none", mask:true});
					this.closeLotteryPop();
				}
			}).catch(err=>{
				console.log(err);
				this.closeLotteryPop();
			});
		},
		endLottery : function(index){
			if(this.rewardNames[index] == '谢谢参与'){
				alert("谢谢参与");
			}else {
				alert("恭喜您获得" + this.rewardNames[index]);
			}
			this.luckyStatus = 0;
			this.closeLotteryPop();
		}
	}
}
</script>
<style lang="scss">
	.logo{
		height: 30px;
		width: 90px;
	}
	
	page {
		background: #ffffff;
	}
	.m-t{
		margin-top: 16upx;
	}
	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		// padding-top: 10px;
	}
	.carousel {
		width: 100%;
		height: 350upx;

		.carousel-item {
			width: 100%;
			height: 100%;
			padding: 10upx 15upx;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
			border-style: solid;border-width: 15rpx;border-color: #ffffff;
			border-radius: 40upx;
			box-shadow: 4upx 4upx 8upx rgba(144, 144, 144, 0.2);
		}
	}
	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;

		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}

		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}
	/* 分类 */
	.cate-section {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap:wrap;
		padding: 30upx 22upx; 
		background: #fff;
		border-radius: 35rpx;
		margin: 15rpx;
		box-shadow: 0rpx 5rpx 25rpx rgba(144, 144, 144, 0.2);
		.cate-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: $font-sm + 1upx;
			color: $font-color-dark;
		}
		/* 原图标颜色太深,不想改图了,所以加了透明度 */
		image {
			width: 78upx;
			height: 78upx;
			margin-bottom: 14upx;
			border-radius: 50%;
			opacity: .7;
			// box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
		}
	}
	.ad-1{
		width: 100%;
		height: 210upx;
		padding: 10upx 30upx;
		background: #fff;
		image{
			width:100%;
			height: 100%; 
			border-radius: 50upx;
		}
	}
	.f-header{
		display:flex;
		align-items:center;
		height: 140upx;
		padding: 6upx 30upx 8upx;
		background: #fff;
		image{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			margin-right: 20upx;
		}
		.tit-box{
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.tit{
			font-size: $font-lg +2upx;
			color: #font-color-dark;
			line-height: 1.3;
		}
		.tit2{
			font-size: $font-sm;
			color: $font-color-light;
		}
		.icon-you{
			font-size: $font-lg +2upx;
			color: $font-color-light;
		}
	}
	/* 猜你喜欢 */
	.guess-section{
		display:flex;
		flex-wrap:wrap;
		padding: 0 20rpx;
		// background: #fff;
		.guess-item{
			display:flex;
			flex-direction: column;
			width: 48%;
            margin-bottom: 20rpx;
            padding: 10rpx 10rpx;
            border-radius: 25rpx;
            background: #fff;
			box-shadow: 2rpx 6rpx 10rpx rgba(144, 144, 144, 0.2);
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-base;
			color: gray;
			line-height: 80upx;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		}
		
		.price-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
			color: $font-color-light;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
			box-shadow: 0rpx 0rpx 6rpx rgba(144, 144, 144, 0.2);
		}
	}
	
	.jinbi-img{height: 55rpx;width: 165rpx;}
	.jinbi-text{position: absolute;left: 75rpx;font-size: 26rpx;line-height: 55rpx; width: 100rpx;color: gray;font-weight: bold;}
	.jianbian-bg{background: linear-gradient(#fa7500, #f5c86e);}
	.tip-msg{white-space:nowrap; line-height:28rpx; font-size:28rpx;color:#aaaa00}
	
	.gui-lucky-turntable{overflow:hidden; width:600rpx; height:600rpx; border-radius:100%;}
	.gui-lucky-turntable-btn{width:160rpx; height:160rpx; position:absolute; z-index:9; left:220rpx; top:220rpx; z-index:9;}
	
	@keyframes gui-breathing{
		0%{opacity:0.5; transform: scale(1,1);} 
		50%{opacity:1; transform: scale(1.08,1.08);} 
		100%{opacity:0.5; transform: scale(1,1);}
	}
	.gui-breathing{animation:gui-breathing 1200ms ease-in infinite;}
</style>