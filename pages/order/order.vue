<template>
	<gui-page :fullPage="true" :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody" class="gui-flex1 gui-flex gui-columns" 
		style="background-color:#F8F8F8;">
			<!-- 分类导航 -->
			<view class="header gui-border-b gui-border-box gui-flex gui-columns gui-justify-content-center" 
			id="myheader">
				<gui-switch-navigation :size="180" :currentIndex="currentIndex" 
				activeLineBg="linear-gradient(to right, #008AFF,#008AFF)" 
				:items="tabs" @change="navchange"></gui-switch-navigation>
			</view>
			<swiper :current="currentIndex" 
			@change="swiperChange" 
			:style="{height:mainHeight+'px', width:'750rpx'}">
				<!-- 轮播项目数量对应 上面的选项标签 -->
				<swiper-item  
				v-for="(items, orderIndex) in orders" :key="orderIndex">
					<!-- 使用滚动区域来实现主体内容区域 -->
					<scroll-view :scroll-y="true"  
						:scroll-top="scrollTops[currentIndex]" 
						:style="{height:mainHeight+'px'}" 
						@touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"
						@scrolltolower="loadmorefun" @scroll="scroll">
						<!-- 刷新组件 -->
						<gui-refresh @reload="reload" ref="refreshcom"></gui-refresh>
						<gui-empty v-if="items == null">
							<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
								<!-- 请根据您的项目要求制作并更换为空图片 -->
								<image class="gui-empty-img" 
								src="https://upload-images.jianshu.io/upload_images/15372054-1f849183cebb80b1.png?imageMogr2/auto-orient/strip|imageView2/2/w/388/format/webp"></image>
							</view>
							<text slot="text" 
							class="gui-text-small gui-block-text gui-text-center gui-margin-top" style="color:#9DABFF;">暂无数据</text>
						</gui-empty>
						<!-- 数据展示区域 -->
						<view class="gui-order" v-if="items != null" 
						v-for="(order, oIndex) in items" :key="oIndex">
							<view class="gui-flex gui-rows gui-space-between gui-align-items-center">
								<text class="gui-order-number gui-primary-color">订单号 : {{order.orderNo}}</text>
								<!-- <text class="gui-icons gui-text-small gui-color-gray" 
								@tap="removeorder(orderIndex, oIndex, order.orderNumber)">&#xe632; 删除订单</text> -->
							</view>
							<!-- 循环订单商品 -->
							<view class="gui-order-goods gui-flex" 
							v-for="(orderItem, indexGoods) in order.orderItemVos" :key="indexGoods">
								<view class="gui-order-goods-img">
									<gui-image :src="$utils.formatImg(orderItem.productThumbnail)" :width="100" :height="100"></gui-image>
								</view>
								<text class="gui-order-goods-name">{{orderItem.productName}}</text>
								<!-- <text class="gui-order-goods-price">￥{{orderItem.productPrice}}  x {{orderItem.productCount}}</text> -->
							</view>
							<!-- 订单底部 -->
							<view class="gui-order-footer gui-flex gui-rows gui-space-between">
								<text class="gui-order-number"><!-- {{order.status}} --> {{order.createTime}}</text>
								<!-- <text class="gui-order-btn gui-border">查看发票</text> -->
								<text class="gui-order-btn gui-border" :class="order.status == 1 ? 'gui-order-btn-red' : (order.status == 2 ? 'gui-order-btn-green' : 'gui-order-btn-gray')">{{order.status == 1 ? '等待发货' : (order.status == 2 ? '已发货' : '已完成')}}</text>
							</view>
							<view v-if="order.status != 1" class="gui-order-footer gui-flex gui-rows gui-space-between">
								<text class=" gui-color-green" style="font-size: 28rpx;">快递公司:{{order.deliveryName}}</text>
							</view>
							<view v-if="order.status != 1" class="gui-order-footer gui-flex gui-rows gui-space-between">
								<text class=" gui-color-green" style="font-size: 28rpx;">快递单号:{{order.deliveryCode}}</text>
								
								<text v-if="order.status > 1" class="gui-order-btn gui-border gui-order-btn-gray" style="font-size: 22rpx;" @click="copy(order)">复制单号</text>
							</view>
						</view>
						<!-- 加载组件 -->
						<gui-loadmore  ref="loadmorecom"></gui-loadmore>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</gui-page>
</template>
<script>
var graceJs  = require('@/GraceUI5/js/grace.js');
// 模拟 api 请求数据，格式见 article.js
var artciles = require('@/GraceUI5/demoData/article.js');
export default {
	data() {
		return {
			// 全屏 loading
			pageLoading      : true,
			// 选项卡标签
			tabs             : [{id:0, name:'全部订单'},{id:1, name:'待发货'},{id:2, name:'已发货'},{id:3, name:'已完成'}],
			// 选中选项的 索引
			currentIndex     : 0,
			// 核心区域高度 
			mainHeight       : 200,
			// 订单信息保存数组
			orders          : [],
			// 每个选项卡对应的分页
			pages            : [],
			// 每个选项卡内部的滚动区域滚动值
			scrollTops       : [],
			// 滚动延迟
			scrollTimer      : null,
			// 加载更多延迟
			loadMoreTimer    : null,
			// api 加载状态记录
			apiLoadStatus    : []
		}
	},
	onLoad:function(){
		// 01. 获取页面主体高度
		graceJs.getRefs('guiPage', this, 0, (ref)=>{
			ref.getDomSize('guiPageBody', (e)=>{
				// 主体高度 = 页面高度 - 自定义区域高度
				graceJs.select('#myheader', (e2)=>{
					// 如果自定义区域有 margin 尺寸获取不到请加上这个值，可以利用 uni.upx2px() 转换
					this.mainHeight  = e.height - e2.height;
					// 模拟 api 加载新闻分类
					// 实际开发时此处改成 api 请求即可
					setTimeout(()=>{
						// 初始化新闻列表数组 元素数量与分类匹配
						for(var i = 0; i < this.tabs.length; i++){
							this.orders.push([]);
							this.pages.push(1);
							this.scrollTops.push(0);
							this.apiLoadStatus.push(false);
						}
						// 第一次加载数据
						this.getOrders();
					}, 500);
				});
			});
		});
	},
	watch:{
		currentIndex : function (nVal, oldVal) {
			if(this.orders[nVal] == null){
				return ;
			}
			if(this.orders[nVal].length < 1){ 
				this.getOrders(); 
			}
		}
	},
	methods: {
		// 分类切换
		navchange    : function (e) { this.currentIndex = e; },
		// 轮播切换
		swiperChange : function (e) { this.currentIndex = e.detail.current; },
		// 滚动区域滚动
		scroll:function(e){
			if(this.scrollTimer != null){clearTimeout(this.scrollTimer);}
			this.scrollTimer = setTimeout(()=>{
				this.scrollTops.splice(this.currentIndex, 1, e.detail.scrollTop);
			}, 100);
		},
		// 下拉刷新相关事件绑定
		touchstart : function (e){
			if(this.apiLoadStatus[this.currentIndex]){return ;}
			if(this.scrollTops[this.currentIndex] > 0){return ;}
			this.$refs.refreshcom[this.currentIndex].touchstart(e);
		},
		touchmove : function(e){
			if(this.apiLoadStatus[this.currentIndex]){return ;}
			if(this.scrollTops[this.currentIndex] > 0){return ;}
			this.$refs.refreshcom[this.currentIndex].touchmove(e);
		},
		touchend : function (e) {
			if(this.apiLoadStatus[this.currentIndex]){return ;}
			if(this.scrollTops[this.currentIndex] > 0){return ;}
			this.$refs.refreshcom[this.currentIndex].touchend(e);
		},
		// 刷新事件
		reload : function(){
			this.pages[this.currentIndex] = 1;
			this.$refs.loadmorecom[this.currentIndex].stoploadmore();
			this.getOrders(1);
		},
		// 加载更多事件
		loadmorefun : function(){
			var currentIndex   = this.currentIndex;
			if(this.apiLoadStatus[currentIndex]){return ;}
			// 获取加载组件状态看一下是否还能继续加载
			if(this.$refs.loadmorecom[currentIndex].loadMoreStatus != 0){return ;}
			// 保证触底只执行一次加载
			if(this.loadMoreTimer != null){clearTimeout(this.loadMoreTimer);}
			this.loadMoreTimer =  setTimeout(() => {
				this.$refs.loadmorecom[currentIndex].loading();
				// 此处开启加载动画执行加载数据的函数
				this.getOrders();
			}, 80);
		},
		// 新闻数据读取
		getOrders : function (isReload) {
			// 使用内部变量记录 当前索引，避免加载时用户切换引起的变量变化
			var currentIndex = this.currentIndex;
			console.log(this.pages[currentIndex]);
			// 更新 api 加载状态
			this.apiLoadStatus.splice(currentIndex, 1, true);
			if(this.pages[currentIndex] == 1 && !isReload){this.pageLoading = true;}
			// 当前正在展示的 选项index 为 this.currentIndex
			// 那么分类 id 应该为 this.tabs[this.currentIndex].id
			// console.log('类型 : ' + this.tabs[currentIndex].name + ' 第'+ this.pages[currentIndex] +'页');
			// 组合一个请求地址的 示例
			// var url = "https://www.graceui.com/api/index/orders/"+this.tabs[currentIndex].name+'/'+this.pages[currentIndex];
			
			var url = "/order/list?status="+this.currentIndex+'&page='+this.pages[currentIndex];
			
			uni.http.get(url, {token:true}).then(res=>{
				if(res.code == '200'){
					// 第一页
					if(this.pages[currentIndex] == 1){
						this.orders.splice(currentIndex, 1 , res.data);
					}
					// 之后的加载页
					else{
						this.orders[currentIndex] = this.orders[currentIndex].concat(res.data);
						this.$refs.loadmorecom[currentIndex].stoploadmore();
					}
					
					if(!res.data || res.data.length == 0){
						this.$refs.loadmorecom[currentIndex].nomore();
					}
				}else if(!res.data || res.data.length == 0){
					console.log('empty');
					this.orders.splice(currentIndex, 1 , null);
					this.$refs.loadmorecom[currentIndex].stoploadmore();
				}else if(res.status == 'nomore'){
					console.log('nomore');
					this.$refs.loadmorecom[currentIndex].nomore();
				}
				// 刷新
				if(isReload){
					this.$refs.refreshcom[currentIndex].endReload();
				}
				this.pages[currentIndex]++;
				// 更新 api 加载状态
				this.apiLoadStatus.splice(currentIndex, 1, false);
				this.pageLoading = false;
			}).catch(err=>{
			    console.log(err);
				this.apiLoadingStatus = false;
			})
		},
		// 删除订单
		// 参数 : orderIndex,   oIndex,  orderNumber
		//       数组第一层索引   订单索引     订单号码
		removeorder : function (orderIndex, oIndex, orderNumber) {
			console.log(orderIndex, oIndex);
			uni.showModal({
				title    : "确定要删除吗？",
				complete : (e)=>{
					if(e.confirm){
						// 此处连接可以后端api 删除订单
						// 删除前端数据
						this.orders[orderIndex].splice(oIndex,1);
						this.orders.splice(oIndex, 1, this.orders[orderIndex]);
					}
				}
			})
		},
		copy(order) {
			let data = order.deliveryCode;
			uni.setClipboardData({
				data: data
			});
		}
	}
}
</script>
<style>
.header{padding:15rpx 30rpx; height:100rpx;}
.gui-order{background-color:#FFFFFF; padding:20rpx; margin:25rpx; margin-bottom:0rpx; border-radius:10rpx;}
.gui-order-number{line-height:50rpx; font-size:26rpx; width:300rpx; flex:1;}
.gui-shop{line-height:60rpx; font-size:28rpx; font-weight:bold; color:#333333;}
.gui-order-goods{flex-direction:row; flex-wrap:nowrap; padding-bottom:20rpx;}
.gui-order-goods-img{width:100rpx; height:100rpx;}
.gui-order-goods-name{line-height:40rpx; width:200rpx; flex:1; overflow:hidden; font-size:26rpx; margin-left:20rpx; margin-right:20rpx; color:#333333;}
.gui-order-goods-price{font-size:24rpx; line-height:50rpx; color:#333333; width:150rpx; text-align:right;}
.gui-order-footer{margin-top:2px;}

.gui-order-status{line-height:50rpx; color:#999999; font-size:26rpx; width:100rpx; text-align:center;}
.gui-order-btn{width:150rpx; height:50rpx; line-height:50rpx; color:#999999; font-size:22rpx; text-align:center; border-radius:60rpx; margin-left:20rpx;}
.gui-order-btn-red{border-color:#FF0036; color:#FF0036;}
.gui-order-btn-green{border-color:green; color:green;}
</style>