<template>
	<gui-page 
		:footerSets="{height:100, zIndex:100, bg:'linear-gradient(to bottom, #F8F8F8,#F8F8F8)'}">
		<!-- 自定义头部导航 -->
		<!-- <view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center gui-padding">
				<gui-header-leading :onlyBack="true"></gui-header-leading>
				<text class="gui-block-text gui-text gui-ellipsis gui-text-left gui-header-content gui-primary-color game-title">{{doll.name}}{{$store.state.screenHeight}}</text>
				<view v-if="player && player.userName" class="gui-flex gui-rows gui-nowrap gui-list-items">
					<image class="" src="../../static/gif/playing.gif" style="width: 40rpx;height: 40rpx;"></image>
					<view class="gui-relative">
						<image class="" style="width: 60rpx;height: 50rpx;border-radius: 50rpx;"
						:src="utils.formatImg(player.icon)" mode="widthFix"></image>
					</view>
					
					<view style="margin-left: 10rpx;">
						<view class="gui-list-title" style="margin-bottom: -15rpx;">
							<text class="gui-list-title-text gui-color-gray" style="font-size: 22rpx;">{{player.nick}}</text>
						</view>
						<text class="gui-list-body-desc gui-color-gray gui-block-text" style="font-size: 20rpx;">游戏中</text>
					</view>
				</view>
			</view>
		</view> -->

		<!-- 页面主体 -->
		<view slot="gBody" style="margin: 15rpx;">
			<view class="game-body" style="margin: 15rpx;">
				<view :style="{ height: $store.state.screenHeight * 0.68 + 'rpx', 'z-index': 98}" ref="videoView" class="videoView">
					<!-- <view style="width:690rpx;height:100%;z-index: 9999;position: absolute;"></view> -->
					<view :style="{ width:'690rpx',height: $store.state.screenHeight * 0.68 + 'rpx',position : 'absolute', 'z-index': 99}"></view>
				</view>
			</view>
			
			<view class="game-roomname" :style="{top: ($store.state.screenHeight * 0.68 - 45) + 'rpx'}">
				<text class="game-roomname-text">房间号:{{name}}</text>
			</view>
			
			<view class="game-player" v-if="player && player.userName">
				<view class="gui-flex gui-rows gui-nowrap">
					<image :src="utils.formatImg(player.icon)" class="game-player-item"></image>
					<view class="text-box gui-color-white gui-bg-black-opacity5" style="height: 80rpx;width: 150rpx;margin-left: -40rpx;border-radius: 30rpx;" scroll-y="true" >
						<text style="margin-left: 45rpx;font-size: small;">{{player.nick}}\n</text>
						<text style="margin-left: 45rpx;font-size: small;">游戏中</text>
					</view>
					
					<!-- <text style="margin-left: 0rpx;height: 80rpx;line-height: 80rpx;" class="gui-badge gui-bg-black-opacity7 gui-color-white">aaac\n游戏中</text> -->
				</view>
			</view>
			
			<view class="game-viewer">
				<view class="gui-flex gui-rows gui-nowrap">
					<image v-for="(item,index) in faces" :src="item" class="game-viewer-item"
					 :style="{'margin-left': index == 0 ? '0rpx' : '-20rpx'}"></image>
					<text v-if="viewers && viewers.length > 0" style="margin-left: 0rpx;height: 60rpx;line-height: 60rpx;" class="gui-badge gui-bg-black-opacity3 gui-color-white">{{viewers.length}}人在房间</text>
				</view>
			</view>
			
			<view class="tool-bar" :style="{top: $store.state.screenHeight * 0.15 + 'rpx', 'z-index': 999}">
				<image class="tool-bar-item" @tap="changeVolume" :src="$store.state.gameSet.volume ? '../../static/imgs/volume-up.png' : '../../static/imgs/volume-off.png'"></image>
				<image class="tool-bar-item" @tap="complaint" src="../../static/imgs/shensu.png"></image>
				<image class="tool-bar-item" style="margin-top: 50rpx;" @tap="loadMachine(-1 * machineId)" src="../../static/imgs/exchange.png"></image>
			</view>
			<!-- <button @click="tankuang">测试弹框</button> -->
			<swiper class="gui-bg-gray" :current="controllPanelIndex" disable-touch=true style="height: 240rpx;">
				<swiper-item>
					<!-- 控制面板 -->
					<view :style="{'margin-top': '60rpx'}"
						class="gui-flex gui-rows gui-wrap gui-space-between">
							<view class="demo gui-button gui-noborder game-collectbtn-border" @tap="collectMachine()">
								 <view class="game-collectbtn-inner">
									<text class="gui-button-text gui-icons" :style="{'font-size': '55rpx',color : (collect ? '#fc6a6a': 'gray')}">&#xe605;</text>
								 </view>
							</view>
							
							<view v-if="subscribeOpen" class="game-playbtn-view" @tap="play()" hover-class="btn-hover">
								<image class="game-playbtn-img" :src="isSubscribe ? '../../static/imgs/game-yuyue-cancal.png' : ((!player || player.userName == $store.state.user.id) ? '../../static/imgs/game-play.png' : '../../static/imgs/game-yuyue.png')"></image>
								<text class="game-playbtn-text">{{(!isSubscribe && (!player || player.userName == $store.state.user.id)) ? (doll.coin + '金币/次') : ('前面' + subscribeSort + '人')}}</text>
							</view>
							<view v-else class="game-playbtn-view" @tap="play()" hover-class="btn-hover">
								<image class="game-playbtn-img" :src="(!player || player.userName == $store.state.user.id) ? '../../static/imgs/game-play.png' : '../../static/imgs/gameing.png'"></image>
								<text class="game-playbtn-text">{{(!player || player.userName == $store.state.user.id) ? (doll.coin + '金币/次') : ""}}</text>
							</view>
							
							<view class="demo gui-noborder game-coinbtn-border" style="text-align: center;" @tap="navTo('/pages/money/recharge')">
								<text class="gui-color-gray my-icons game-coinbtn-text">{{$store.state.user.coin}}币</text>
								<view type="default" class=" gui-bg-white gui-button-mini game-rechargebtn" style="text-align: center;">
									<text class="my-icons gui-button-text-mini gui-color-orange game-rechargebtn-text">&#xe60f;充币</text>
								</view>
							</view>
					</view>
					
				</swiper-item>
				
				<swiper-item>
					<view :style="{'margin-left': '30rpx',opacity : status == 2 ? 0.4 : 1}"
						class="gui-flex gui-rows gui-nowrap">
						<view class="game-control-view">
							<view class="gui-grids gui-flex gui-rows gui-wrap" style="margin-top: 10rpx;">
								<view class="gui-grids-items gui-flex gui-columns gui-align-items-center"></view>
								<view class="gui-grids-items gui-flex gui-columns gui-align-items-center" @touchstart="opera(127)" @touchend="opera(255)" hover-class="btn-hover">
									<image class="game-controlbtn-img preventLongpress" src="../../static/imgs/rocker_up.png"></image>
								</view>
								<view class="gui-grids-items gui-flex gui-columns gui-align-items-center"></view>
							</view>
							<view class="gui-grids gui-flex gui-rows gui-wrap gui-margin-top" style="margin-top: -25rpx;">
								<view class="gui-grids-items gui-flex gui-columns gui-align-items-center" @touchstart="opera(223)" @touchend="opera(255)" hover-class="btn-hover">
									<image class="game-controlbtn-img preventLongpress" src="../../static/imgs/rocker_left.png"></image>
								</view>
								<view class="gui-grids-items gui-flex gui-columns gui-align-items-center"></view>
								<view class="gui-grids-items gui-flex gui-columns gui-align-items-center" @touchstart="opera(239)" @touchend="opera(255)" hover-class="btn-hover">
									<image class="game-controlbtn-img preventLongpress" src="../../static/imgs/rocker_right.png"></image>
								</view>
							</view>
							<view class="gui-grids gui-flex gui-rows gui-wrap gui-margin-top" style="margin-top: -25rpx;">
								<view class="gui-grids-items gui-flex gui-columns gui-align-items-center"></view>
								<view class="gui-grids-items gui-flex gui-columns gui-align-items-center" @touchstart="opera(191)" @touchend="opera(255)" hover-class="btn-hover">
									<image class="game-controlbtn-img preventLongpress" src="../../static/imgs/rocker_down.png"></image>
								</view>
								<view class="gui-grids-items gui-flex gui-columns gui-align-items-center"></view>
							</view>
						</view>
						<view style="width: 240rpx;">
							<view class="gui-flex gui-columns" style="margin-top: 50rpx;" @touchstart="opera(247)">
								<view class="game-catchbtn-view" hover-class="btn-hover">
									<image class="game-catchbtn-img preventLongpress" :src="status == 1 ? '../../static/imgs/game-xiazhua.png' : '../../static/imgs/game-result.png'"></image>
									<text class="game-catchbtn-text" v-show="status == 1">{{countdownTime}}S</text>
								</view>
							</view>
				            <text class="gui-color-gray my-icons game-coinbtn-text" style="margin-left: 50rpx;">{{$store.state.user.coin}}币</text>
						</view>
					</view>
					
				</swiper-item>
			</swiper>
			
			<!-- 切换导航 -->
			<view class="gui-margin-top" style="margin-left: 25rpx;">
				<gui-switch-navigation :items="navItems" lineHeight="60rpx" :isCenter="true" :size="200" :activeFontWeight="900"
					activeLineBg="linear-gradient(to right, #FF7900, #FF7900)" textAlign="center" activeColor="#FF7900" color="#a5a5a5"
					activeLineWidth="200rpx" activeLineHeight="2rpx" activeFontSize="30rpx" :margin="10" @change="navChange">
				</gui-switch-navigation>
			</view>
			<!-- 详情 -->
			<view class="gui-margin-top" v-if="active == 0">
				<view class="gui-padding" style="margin-bottom: 20rpx;">
					<view class="gui-list-items">
						<view class="gui-relative">
							<image class="" style="width: 150rpx;height: 150rpx;border-radius: 30rpx;"
							:src="utils.formatImg(doll.thumbnail)"></image>
						</view>
						<view class="gui-list-body">
							<view class="gui-flex gui-rows gui-nowrap gui-align-items-center">
							    <text class="gui-text gui-color-gray">娃娃名称</text>
								<text class="gui-text game-detail-text" style="width: 320rpx;">{{doll.name}}</text>
							</view>
							<view class="gui-flex gui-rows gui-nowrap gui-align-items-center">
							    <text class="gui-text gui-color-gray">所需金币</text>
								<text class="gui-text game-detail-text">{{doll.coin}}金币/次</text>
							</view>
							<view class="gui-flex gui-rows gui-nowrap gui-align-items-center">
							    <text class="gui-text gui-color-gray">可兑积分</text>
								<text class="gui-text game-detail-text">{{doll.exchangeJifen}}积分</text>
							</view>
						</view>
					</view>
				</view>
				<image style="width:720rpx;" :src="utils.formatImg(item)" mode="widthFix" v-for="(item,index) in doll.imgs"
					:key="index"></image>
			</view>
			<!-- 最近抓到的玩家 -->
			<view class="gui-padding gui-margin-top" v-if="active == 1">
				<list class="my-list" scrollable=false>
					<cell v-for="(item,index) in catchRecords" class="gui-list-items">
						<view class="gui-list-image gui-relative" @tap="navTo('/pages/user/recentCatch?user=' + encodeURIComponent(JSON.stringify(item)))">
							<image class="gui-list-image" :src="utils.formatImg(item.userIcon)"></image>
						</view>
						<view class="gui-list-body gui-border-b" @tap="navTo('/pages/user/recentCatch?user=' + encodeURIComponent(JSON.stringify(item)))">
							<view class="gui-list-title">
								<text class="gui-list-title-text gui-primary-color">{{item.userNick}}</text>
								<text class="gui-list-title-desc gui-color-gray">{{item.createTime}}</text>
							</view>
							<text class="gui-list-body-desc gui-color-gray">{{item.dollName}}</text>
						</view>
						<text class="gui-list-arrow-right gui-icons gui-color-gray-light" @tap="navTo('/pages/user/recentCatch?user=' + encodeURIComponent(JSON.stringify(item)))">&#xe601;</text>
					</cell>
				</list>
			</view>
			<!-- 用户须知 -->
			<view class="gui-padding gui-margin-top" v-if="active == 2">
				<text class="gui-list-title-text gui-color-gray">{{userNotice}}</text>
			</view>
			
			<!-- 居中弹出 -->
			<gui-popup ref="resultPopup" :canCloseByShade="false">
				<view>
					<view v-if="showType==1">
						<view class="gui-relative gui-box-shadow gui-img-in">
							<gui-image src="/static/imgs/game_catch_success.png" 
							:width="580"></gui-image>
							
							<view class="gui-relative" style=";left:150rpx;top: -430rpx;">
								<image src="@/static/imgs/game_success_wawa_bg.png" style="position: absolute;left: 0rpx;top: 0rpx;width: 300rpx;height: 300rpx;" mode="widthFix"></image>
								<image class="rounded-lg m-1" :src="utils.formatImg(doll.thumbnail)" style="width: 270rpx;height: 270rpx;" mode=""></image>
							</view>
							
							<view class="gui-relative" style="height: 60rpx;left:150rpx;width: 300rpx; top: -400rpx;">
								<view class="flex align-center justify-center py-1 px-2 rounded bg-warning" @click="closeResultPopup();play()">
									<text class="font font-weight-bold text-white result-text">再来一局</text>
									<text class="font font-weight-bold text-white result-text">({{countdownTime}}s)</text>
								</view>
							</view>
							<!-- 关闭按钮 -->
							<text class="gui-block-text demo-close gui-icons gui-color-white gui-absolute-rt"
							@tap.stop="closeResultPopup();cancalSubribe()">&#xe78a;</text>
						</view>
					</view>
					<view v-if="showType==2">
						<view class="gui-relative gui-box-shadow gui-img-in">
							<gui-image src="/static/imgs/game_catch_fail.png" 
							:width="580"></gui-image>
							
							<view class="gui-relative" style="height: 60rpx;left:150rpx;width: 300rpx; top: -100rpx;">
								<view class="flex align-center justify-center py-1 px-2 rounded bg-warning" @click="closeResultPopup();play()">
									<text class="font font-weight-bold text-white result-text">再来一局</text>
									<text class="font font-weight-bold text-white result-text">({{countdownTime}}s)</text>
								</view>
							</view>
							
							<text class="gui-block-text demo-close gui-icons gui-color-white gui-absolute-rt"
							@tap.stop="closeResultPopup();cancalSubribe()">&#xe78a;</text>
						</view>
					</view>
					<view v-if="showType==3">
						<view class="gui-relative gui-box-shadow gui-img-in">
							<gui-image src="/static/imgs/daoninle.png" 
							:width="580"></gui-image>
							
							<view class="gui-relative" style="height: 60rpx;left:380rpx; top: -200rpx;">
								<text class="font font-weight-bold text-white" style="font-size: 96rpx;">{{countdownTime}}s</text>
							</view>
							
							<view class="gui-relative"
							 style="height: 120rpx;left:150rpx;width: 300rpx; top: -300rpx;" @click="closeResultPopup();play()"></view>
							
							<text class="gui-block-text demo-close gui-icons gui-color-white gui-absolute-rt"
							@tap.stop="closeResultPopup();cancalSubribe()">&#xe78a;</text>
						</view>
					</view>
				</view>
			</gui-popup>
		</view>
	</gui-page>
</template>
<script>
import {mapMutations} from 'vuex';
import $utils from "@/common/utils";
var graceJS = require('@/GraceUI5/js/grace.js');
export default {
	data() {
		return {
			controllPanelIndex : 0,
			// 切换导航
			navItems: [{id: 0,name: '商品详情'}, {id: 1,name: '最近夹中的人'}, {id: 2,name: '用户须知'}],
			active: 0,
			utils:$utils,
			machineId: 0,
			name: '',
			status: '',
			player: null,
			viewers: [],
			subscribers: [],
			subscribeOpen: false,
			faces: [],
			collect: false,
			catchRecords: [],
			countdownTime: '',
			isSubscribe: false,
			subscribeSort: 0,
			exchangeJifen: '',
			userNotice: '',
			video: '',
			videoPlayer: null,
			showInmachineAnimation: false,
			operToken: "",
			operUrl: "",
			lastCmd: 0,
			playbtnType: 0,//0开始游戏 1预约游戏 2取消预约
			doll: {
				id: 0,
				name: '',
				thumbnail: '',
				detailImgs: '',
				coin: 0,
				imgs: []
			},
			showType: ''
		}
	},
	watch: {
		viewers: {
			handler(newViewers, oldViewers) {
				if (newViewers && newViewers.length > 0) {
					if(newViewers.length > 4){
						newViewers = newViewers.slice(0,4)
					}
					this.faces = [];
					newViewers.forEach((item) => {
						this.faces.push(this.utils.formatImg(item.icon));
					})
				}
			}
		},
		player: {handler(newPlayer, oldPlayer) {}},
		subscribers: {
			handler(newSubscribers, oldSubscribers) {
				let subscribeSort = 0;
				let isSubscribe = false;
				if (newSubscribers && newSubscribers.length > 0) {
					newSubscribers.forEach((item,index) => {
						if(item.userName == this.$store.state.user.id){
							subscribeSort = index;
							isSubscribe = true;
						}
					})
				}
				this.subscribeSort = subscribeSort;
				this.isSubscribe = isSubscribe;
			}
		},
		status: {
			handler(newStatus, oldStatus) {
				if(newStatus != 0 && (this.player && this.player.userName == this.$store.state.user.id)){
					this.controllPanelIndex = 1;
				}else {
					this.controllPanelIndex = 0;
				}
			}
		}
	},
	onReady() {
        // 监听返回按钮按键事件
        /* plus.key.addEventListener("backbutton",function(e){
            uni.navigateBack();
        },false); */
	},
	
	updated() {
		if(!this.initStatus){
			this.initStatus = true;
			// uni-app 会劫持canvas标签并替换为uni-canvas，无法赋予canvas标签id
			// 这里创建canvas元素，插入到view中
			let cv = document.createElement("canvas");
			cv.id = "video1"
			cv.style.cssText = "width:100%;height:100%;background-color: black;border-radius: 20px;";
			this.$refs.videoView.$el.appendChild(cv);
			/* nnmw.load(()=>{
				this.videoPlayer = new nnmw();
				this.videoPlayer.setView(cv.id);
				this.videoPlayer.setBufferTime(0);
				this.videoPlayer.setScaleMode(0);
				this.videoPlayer.start(this.video);
				this.videoPlayer.on("start", () => {
					this.clearPlayVideoInterval();
				});
			}); */
			
			this.videoPlayer = new NNM();
			this.videoPlayer.setView(cv.id);
			this.videoPlayer.setBufferTime(0);
			this.videoPlayer.setScaleMode(0);
			this.videoPlayer.start(this.video);
			this.videoPlayer.on("start", () => {
				this.clearPlayVideoInterval();
			});
		}
	},
	onLoad(option) {
		// const machine = JSON.parse(option.machine);
		// this.machineId = machine.machineId;
		// this.video = machine.video;
		
		this.machineId = option.machineId;
		
		this.showInmachineAnimation = true;
		this.getCatchSuccessRecent();
		this.getUserNotice();
		this.$store.dispatch('getUserInfo');
	},
	onHide() {
		this.leaveRoom(this.machineId);
		this.clearListener();
	},
	onShow() {
		this.addListenerSocketSloginsuccess();
		if(!uni.http.isSocketConnected()){
			uni.$emit('socketdisconnect');
		}
		this.listener();
		this.loadMachine(this.machineId);
		this.startVideo();
	},
	onUnload() {
		this.clearInterval();
		this.leaveRoom(this.machineId);
		this.clearListener();
		
		// canvas 是由createElement每次创建，调用这个方法完全释放，避免16次之后WebGL出现警告
		this.videoPlayer.release(true);
	},
	methods: {
		...mapMutations(['setCurrentMachine']),
		addListenerSocketSloginsuccess(){
			uni.$once("socketSloginsuccess",()=>{
				this.listener();
				this.loadMachine(this.machineId);
				this.startVideo();
				this.addListenerSocketSloginsuccess()
			});
		},
		async startVideo(){
			// this.$refs.webview.evalJs("start()");
			this.backgroundVoice();
		},
		async stopVideo(){
			// this.$refs.webview.evalJs("stop()");
		},
		videoPostMessage:function(data){
			let action = data.detail.data[0];
			if(action.action === "onReady"){
				// this.$refs.webview.evalJs("start()");
				this.backgroundVoice();
			}
		},
		listener: function() {
			//倒计时结束
			uni.http.socketOn(10008, res => {
				// console.log("------------------------------PushGameStatus-------------------------------");
				if(res.mid == this.machineId){
					this.status = res.status;
				}
			});

			//游戏开始
			uni.http.socketOn(10006, res => {
				// console.log("------------------------------PushGameStart-------------------------------");
				if(res.mid == this.machineId){
					this.player = res.player;
					this.subscribers = res.subscribers;
					this.status = res.status;
					
					if(this.isSubscribe && res.player && res.player.userName == this.$store.state.user.id && this.status == 0){
						//弹出预约玩家开始游戏的倒计时框
						this.daoninleVoice();
						this.popGameResult(3,Number(res.subscribeEndTime - this.utils.getLocalTimestamp() - this.$store.state.offsetTime));
					}
				}
			});

			//游戏结果
			uni.http.socketOn(10007, res => {
				// console.log("------------------------------PushGameResult-------------------------------");
				if(res.mid == this.machineId){
					if(this.player && this.player.userName == this.$store.state.user.id){
						if(res.isWin == 1){
							this.gameSuccessVoice();
						}else {
							this.gameFailVoice();
						}
						
						this.popGameResult(res.isWin == 1 ? 1 : 2,Number(res.subscribeEndTime - this.utils.getLocalTimestamp() - this.$store.state.offsetTime));
					}
					this.status = 0;
				}
			});
			
			//监听再来一局事件
			/* uni.$on('againplay',()=>{
				this.play();
			}); */
			
			//监听取消开局事件
			/* uni.$on('cancalplay',()=>{
				this.cancalSubribe();
			}) */
		},
		clearListener: function() {
			uni.http.clearSocket(10008);
			uni.http.clearSocket(10006);
			uni.http.clearSocket(10007);
			uni.$off('againplay')
			uni.$off('cancalplay')
			this.backgroundVoiceStop();
		},
		closeResultPopup() {
			this.$refs.resultPopup.close();
		},
		popGameResult:function(type,countdownTime){
			this.showType = type;
			this.clearInterval();
			this.countdownTime = countdownTime;
			this.timer = setInterval( () => {
				if(this.countdownTime > 0){
					this.countdownTime --;	
				}else {
					this.clearInterval();
					this.closeResultPopup();
				}
			}, 1000)
			this.$refs.resultPopup.open();
		},
		play: function() {
			
			if(!this.subscribeOpen && this.player && this.player.userName != this.$store.state.user.id){
				return;
			}
			
			if(this.isSubscribe){
				this.btnVoice();
			    this.cancalSubribe();
			    return;
			}
            
			if (this.$store.state.socket) {
				//开始游戏
				uni.http.socketReq(10004, {
					"id": this.machineId
				}, res => {
					if(res.msg){
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
					if (res.rtnCode == 0) {
						this.lastCmd = 0;
						
						if(res.isSubscribe && res.isSubscribe == 1){
							this.btnVoice();
							return;
						}
						this.readygoVoice();
						this.operToken = res.operToken;
						this.operUrl = res.operUrl;
						this.$store.state.user.coin = res.coin;
						this.setInterval(res.stopTime);
					}else if(res.rtnCode == 100){
						uni.navigateTo({
							url: '/pages/money/recharge'
						});
					}else if(res.rtnCode == 101){
						setTimeout(function() {
							uni.switchTab({
								url:'../index/index'
							})
						}, 500);
					}else if(res.rtnCode == 102){//您正在游戏中
					}else if(res.rtnCode == 199){//操作过于频繁
					}
				})
			}
		},
		opera: function(cmd) {
			if(this.status != 1 || !this.player || this.player.userName != this.$store.state.user.id || !this.operToken){
				return;
			}
			
			if(cmd == 247){
				if(this.lastCmd == 0){
					uni.showToast({
						title: "请先移动爪子",
						icon: 'none'
					});
					return;
				}else if(this.lastCmd != 255){
					this.lastCmd = 255;
					return;
				}
			}
			
			if(cmd != 255 && cmd != 247){
				this.btnVoice();
			} 
			if (this.$store.state.socket) {
				//操作游戏
				// uni.http.post(this.operUrl + "/operate/cmd",{
				uni.http.post("https://kdwwc.fszhuazhuale.com/facade/operate/cmd",{
					cmd:cmd,
					operToken:this.operToken,
				}).then(res=>{
					if(res.code == 200){
						this.lastCmd = cmd;
						
						if(cmd === 247){
							this.status = 2;
							this.xiazhuaVoice();
						}
					}else if(res.msg) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				}).catch(err=>{
				})
				
				
				/* uni.http.socketReq(10005, {
					"mid": this.machineId,
					"cmd": cmd
				}, res => {
					if(res.rtnCode == 0){
						if(cmd === 247){
							this.status = 2;
							this.xiazhuaVoice();
						}
					}else if(res.msg) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				}) */
			}
		},
		cancalSubribe() {
			if (this.$store.state.socket) {
				//取消预约
				uni.http.socketReq(10011, {
					"id": this.machineId
				}, res => {
					if(res.rtnCode != 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				})
			}
		},
		// 导航切换
		navChange: function(e) {
			this.active = e;
			//最近夹中的人
			if (e == 1) {
				this.getCatchSuccessRecent();
			}
		},
		navTo(url){
			this.btnVoice();
			uni.navigateTo({
			    url: url
			});
		},
		getCatchSuccessRecent(){
			uni.http.get(
				'machine/catchSuccessRecent?machineId=' + this.machineId
			).then(res => {
				this.catchRecords = res.data.catchRecords || [];
			})
		},
		getUserNotice(){
			uni.http.get(
				'article/3'
			).then(res => {
				if(res.code == 200){
					this.userNotice = res.data.noticeContent;
				}
			})
			
			/* uni.http.get(
				'user/userNotice'
			).then(res => {
				this.userNotice = res || '';
			}) */
		},
		complaint(){
			this.btnVoice();
			uni.http.get(
				'user/complaintRecordByMachine/' + this.machineId
			).then(res => {
				if(res.code == 200 && res.data.complaintStatus == 0 && res.data.status == 0) {
					uni.navigateTo({
					    url: '/pages/complaint/complaint?record=' + encodeURIComponent(JSON.stringify(res.data))
					});
				}else {
					uni.navigateTo({
					    url: '/pages/complaint/gameRecord'
					});
				}
			})
		},
		loadMachine(machineId) {
			/* try {
			    const value = uni.getStorageSync('machineId');
			    if (value) {
			        machineId = value;
			    }
			} catch (e) {} */
			if(machineId >= 0){
				machineId = this.machineId;
			}else {
				this.leaveRoom(this.machineId);
				this.showInmachineAnimation = true;
			}

			if(!machineId || machineId == 0){
				return;
			}
			if (this.$store.state.socket) {
				uni.http.socketReq(10001, {
					"id": machineId
				}, res => {
					if (res.rtnCode == 0) {
						this.doll = res.machine.doll;
						if (this.doll && this.doll.detailImgs) {
							this.doll.imgs = this.doll.detailImgs.split(",");
						}
						
						// let data = {machineId: res.machine.id,video:res.machine.video}
						// this.setCurrentMachine(data)
						
						
						this.machineId = res.machine.id;
						this.status = res.machine.status;
						this.player = res.machine.player;
						this.viewers = res.machine.viewers;
						this.name = res.machine.name;
						this.subscribers = res.machine.subscribers;
						this.collect = res.machine.isCollect == 1;
						this.subscribeOpen = res.subscribeOpen && res.subscribeOpen == 1;
						this.operToken = res.operToken || "";
						this.operUrl = res.machine.operUrl || "";
						
						
						let title = this.doll.name;
						uni.setNavigationBarTitle({
							title
						})
						
						if(res.machine.video && res.machine.video.indexOf("https") == -1){
							res.machine.video = res.machine.video.replace("http","https");
						}
						
						if(this.video != res.machine.video){
							this.video = res.machine.video;
							this.videoPlayer.stop();
							this.videoPlayer.clearView();
							this.videoPlayer.start(res.machine.video);
							
							this.setPlayVideoInterval();
						}
						
						if(this.status == 1 && this.player && this.player.userName == this.$store.state.user.id){
							this.setInterval(res.machine.stopTime);
						}
						if(this.showInmachineAnimation){
							uni.$emit("goInMachineAnimation",this.doll);
							this.showInmachineAnimation = false;
						}
					}else if(res.rtnCode == 101){
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
						setTimeout(function() {
							uni.switchTab({
								url:'../index/index'
							})
						}, 500);
					}
				})
			}
		},
		leaveRoom(machineId){
			if (this.$store.state.socket) {
				uni.http.socketReq(10002, {
					"id": machineId
				}, res => {
					console.log("leaveRoom");
				})
			}
		},
		collectMachine() {
			this.btnVoice();
			uni.http.get(
				'user/collectMachine?machineId=' + this.machineId
			).then(res => {
				this.collect = res.data;
				uni.showToast({
					title: this.collect ? '收藏成功' : '已取消收藏',
					icon: 'none'
				});
			})
		},
		clearInterval(){
			if(this.timer) {
				clearInterval(this.timer);  
				this.timer = null;  
			} 
		},
		setInterval(stopTime){
			this.clearInterval();
			this.countdownTime = Number(stopTime - this.utils.getLocalTimestamp() - this.$store.state.offsetTime);
			this.timer = setInterval( () => {
				if(this.countdownTime > 0){
					this.countdownTime --;	
				}else {
					this.clearInterval();
				}
			}, 1000)
		},
		backgroundVoice() {
			if(this.$store.state.gameSet.volume && this.machineId && this.machineId != 0){
				/* if(this.innerAudioContext){
					this.innerAudioContext.destroy();
				}
				this.innerAudioContext = uni.createInnerAudioContext();
				this.innerAudioContext.autoplay = true;
				this.innerAudioContext.loop = true;
				this.innerAudioContext.src = './../../static/voice/background.mp3';
				this.innerAudioContext.sessionCategory = "ambient";
				this.innerAudioContext.onPlay(() => {
				  console.log('开始播放');
				});
				this.innerAudioContext.onError((res) => {
				  console.log(res.errMsg);
				  console.log(res.errCode);
				}); */
				// this.$refs.webview.evalJs("backgroundVoice()");
				
				backgroundVoice();
			}
		} ,
		backgroundVoiceStop(){
			/* if(this.innerAudioContext){
				this.innerAudioContext.destroy();
			} */
			// this.$refs.webview.evalJs("backgroundVoiceStop()");
			backgroundVoiceStop();
		},
		btnVoice() {
			if(this.$store.state.gameSet.volume){
				// this.$refs.webview.evalJs("caozuodianjiVoice()");
				caozuodianjiVoice();
			}
		} ,
		xiazhuaVoice() {
			if(this.$store.state.gameSet.volume){
				// this.$refs.webview.evalJs("xiazhuaVoice()");
				xiazhuaVoice();
			}
		} ,
		readygoVoice() {
			if(this.$store.state.gameSet.volume){
				// this.$refs.webview.evalJs("readygoVoice()");
				readygoVoice();
			}
		},
		gameSuccessVoice() {
			if(this.$store.state.gameSet.volume){
				// this.$refs.webview.evalJs("gameSuccessVoice()");
				gameSuccessVoice();
			}
		},
		gameFailVoice() {
			if(this.$store.state.gameSet.volume){
				// this.$refs.webview.evalJs("gameFailVoice()");
				gameFailVoice();
			}
		},
		daoninleVoice() {
			if(this.$store.state.gameSet.volume){
				// this.$refs.webview.evalJs("daoninleVoice()");
				daoninleVoice();
			}
		},
		changeVolume() {
			this.$store.state.gameSet.volume = !this.$store.state.gameSet.volume;
			if(this.$store.state.gameSet.volume){
				this.backgroundVoice();
				// this.$refs.webview.evalJs("backgroundVoice()");
				backgroundVoice();
			}else {
				this.backgroundVoiceStop();
				// this.$refs.webview.evalJs("backgroundVoiceStop()");
				backgroundVoiceStop();
			}
		},
		setPlayVideoInterval() {
			try{
				this.clearPlayVideoInterval();
						
				let i = 0;
				this.playVideoTimer = setInterval(() => {
					i++;
					
					this.videoPlayer.stop();
					this.videoPlayer.clearView();
					this.videoPlayer.start(this.video);
					
					if (i == 30) {
						this.clearPlayVideoInterval();
					}
				}, 500)
			}catch(e){
				console.log(e);
			}
			
		},
		clearPlayVideoInterval() {
			if (this.playVideoTimer) {
				clearInterval(this.playVideoTimer);
				this.playVideoTimer = null;
			}
		},
	}
}
</script>
<style>
	.modal-btns {line-height: 88rpx;font-size: 26rpx;text-align: center;width: 200rpx;}
	.gui-grids-items {width: 120rpx;}
	.demo{width:350rpx; margin:10rpx;}
	.button{width:90rpx; height:90rpx; border-radius:8rpx; margin:10rpx;}
	.button-text{font-size:38rpx; text-align:center; line-height:90rpx;}
	.face-image {height: 50rpx;width: 50rpx;border-radius:50rpx;}
	.gui-badge{border-radius:38rpx; height:38rpx; line-height:38rpx;  font-size:22rpx;margin-left: -10rpx;}
	
	.game-title{width:350rpx; height:50rpx;margin-left: -50rpx;margin-right: 30rpx;font-size: 32rpx;}
	.game-text-margin{margin: 10rpx 10rpx;}
	.game-body{border: 5rpx;border-color: #ffffff;border-radius: 40rpx;background-color: #ffffff;}
	.game-webview{width: 695rpx;position: relative;margin: 10rpx;}
	.game-info{height: 60rpx;}
	/* .game-viewer{margin-top: 0rpx;margin-bottom: -10rpx;} */
	.game-player{position: absolute;left: 35rpx; width: 320rpx;height: 60rpx;top:40rpx;}
	.game-player-item{height: 80rpx;width:80rpx;border-radius:80rpx;opacity: 0.9;}
	.game-viewer{position: absolute;right: 35rpx; height: 60rpx;top:40rpx;}
	.game-viewer-item{height: 60rpx;width:60rpx;border-radius:60rpx;opacity: 0.8;}
	.game-roomname{position: absolute;left: 35rpx;width: 180rpx;height: 40rpx;}
	.game-roomname-text{font-size: 26rpx;color: #d6d6d6;}
	.game-collectbtn-border{width: 140rpx;height:120rpx;border-radius: 50rpx;padding: 15rpx;background-color: #e6e6e6;margin-left: 10rpx;margin-right: 10rpx;}
	.game-collectbtn-inner{width: 110rpx;height:100rpx;border-radius: 40rpx;background-color: #ffffff;}
	.game-coinbtn-border{width: 160rpx;height:120rpx;border-radius: 50rpx;padding: 10rpx;}
	.game-playbtn-view{width: 300rpx;height:120rpx;}
	.game-playbtn-text{position: absolute;bottom: 85rpx;left:210rpx; text-align: center;width: 300rpx;font-size: 24rpx;color: #e3e3e3;}
	.game-playbtn-img{width: 300rpx;height:120rpx}
	.game-controlbtn-img{width: 90rpx;height:90rpx}
	.game-catchbtn-view{width: 200rpx;height:150rpx;}
	.game-catchbtn-text{position: absolute;top: 90rpx;left:530rpx; text-align: center;width: 140rpx;font-size: 42rpx;color: #ffffff;font-weight: bold;}
	.game-catchbtn-img{width: 200rpx;height:150rpx}
	.game-coinbtn-text{font-size: 30rpx;line-height:35rpx; text-align:center;}
	.game-rechargebtn{border-radius: 25rpx;}
	.game-rechargebtn-text{padding-right:10rpx;font-size: 30rpx;}
	.game-detail-text{margin-left:60rpx;color: #626262;}
	.game-control-view{width: 430rpx;}
	.tool-bar{position: absolute;right: 30rpx;width: 80rpx;height: 300rpx; background-color: rgba(83, 83, 83, 0.3);border-top-left-radius: 40rpx;border-bottom-left-radius: 40rpx;opacity: 0.6;}
	.tool-bar-item{width: 50rpx;height: 50rpx;margin-left: 15rpx;margin-top: 30rpx;}
	.btn-hover{opacity:0.3}
	
	.demo-close{width:100rpx; height:100rpx; line-height:100rpx; opacity:0.88; text-align:center; font-size:58rpx;}
	
	.preventLongpress {pointer-events: none;}
</style>
