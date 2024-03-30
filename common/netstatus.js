import $store from '@/store/index.js';
export default {
	mask: null,
	view: null,
	pxToRpxScale:1,
	isShowing:false,
	initMask() {
		if (!this.mask) {
			this.mask = new plus.nativeObj.View('viewHotFixMask', {
				bottom: '0px',
				left: '0px',
				right: '0px',
				top: '0px',
				// position: 'dock'
			});
		}

		this.mask.drawRect({
			color: 'rgba(0, 0, 0, 0.5)'
		});
	},
	initInfoPanel() {
		let x = 150 / this.pxToRpxScale;
		let y = 550 / this.pxToRpxScale;
		let width = 450 / this.pxToRpxScale;
		let height = 450 / this.pxToRpxScale;
		if (!this.view) {
			this.view = new plus.nativeObj.View('viewHotFixView', {
				top: y + "px",
				left: x + "px",
				width: width,
				height: height,
				position: 'dock'
			}, [{
				tag: 'img',
				id: 'bgroundicon',
				position: {
					top: '0',
					left: 75/this.pxToRpxScale + 'px',
					width: 300/this.pxToRpxScale + 'px',
					height: 300/this.pxToRpxScale + 'px'
				},
				src: '_www/static/gif/netloading.gif'
			}, {
				tag: 'font',
				id: 'icon',
				text: '正在重连游戏服务.. .请稍后',
				position: {
					top: 208 / this.pxToRpxScale + 'px',
					left: '10px',
					width: '100%',
					height: '50px',

				},
				textStyles: {
					align: 'center',
					color: '#ffffff',
					size: '16px'
				}
			}])
		}
	},
	initEventListener(){
		this.uncheck();
		uni.$on("socketSloginsuccess",()=>{
			this.close();
		});
		uni.$on("socketdisconnect",()=>{
			console.log('socket 断开了连接=========')
			this.show();
		})
	},
	check(){
		this.initEventListener();
	},
	uncheck(){
		uni.$off("socketSloginsuccess");
		uni.$off("socketdisconnect");
		uni.$off("reconnect_attempt");
	},
	show(){
		if(!$store.state.token || this.isShowing===true){
			return
		}
		var pages = getCurrentPages();
		var page = pages[pages.length - 1];
		console.log(page.route);
		if("pages/machine/game" != page.route){
			return
		}
		this.isShowing = true;
		let systemInfo = uni.getSystemInfoSync()
		// px转换到rpx的比例
		let pxToRpxScale = 750 / systemInfo.windowWidth;
		this.pxToRpxScale = pxToRpxScale;
		this.initMask();
		this.initInfoPanel();
		if(this.mask && this.view){
			this.mask.show()
			this.view.show()
		}
	},
	close() {
		this.isShowing = false;
		if (this.mask) {
			this.mask.close();
			this.mask = null;
		}
		if(this.view){
			this.view.close();
			this.view = null;
		}
	}
}
