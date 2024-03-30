import $utils from './utils.js'
export default {
	mask: null,
	view: null,
	updateNowBtn: null,
	closeBtn: null,
	param:{
		updateCmd:0,//updateCmd =1 热更新；updateCmd =2 强制热更新; updateCmd=3整包更新,updateCmd=4强制整包更新
		note:'',
		wgtUrl:'',
		pkgiOSUrl:'',
		pkgAndUrl:''
	},
	isDownloading:false,
	pxToRpxScale:0,
	checkUpdate(param){
		this.param = param;
		if(!this.param.updateCmd || this.param.updateCmd == 0){
			return
		}
		this.open();
	},
	open() {
		let systemInfo = uni.getSystemInfoSync()
		// px转换到rpx的比例
		let pxToRpxScale = 750 / systemInfo.windowWidth;
		this.pxToRpxScale = pxToRpxScale;
		this.initMask();
		this.initInfoPanel();
		this.initBtn();
		this.initEventListener();
		this.setContent(this.param.note?this.param.note:'有最新版本');
	},
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
		this.mask.addEventListener("click", () => {
		}, false);
		this.mask.show()
	},
	initInfoPanel() {
		let x = 75 / this.pxToRpxScale;
		let y = 350 / this.pxToRpxScale;
		let width = 600 / this.pxToRpxScale;
		let height = 800 / this.pxToRpxScale;
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
						left: '0',
						width: '100%',
						height: '100%'
					},
					src: '_www/static/imgs/app_update_bg.png'
				}, {
					tag: 'font',
					id: 'icon',
					text: '发现新版本',
					position: {
						top:118/this.pxToRpxScale + 'px',
						left: '10px',
						width: '100%',
						height: '50px',

					},
					textStyles: {
						align: 'left',
						color: '#ffffff',
						size: '16px'
					}
				}
			])
		}
		/* this.view.drawRect({
		       color: '#ff5500',
		       size: '100%',
		       radius: '16px'
		     }, {
		       bottom: '10px',
		       right: '20%',
		       width: '60%',
		       height: '38px',
		     },"btnBG");
		 var richtext = '<font color="#ffffff" style="font-size:22px;">立即更新</font>';
		 	// 绘制文本
		 this.view.drawRichText(richtext,{bottom:'5px',left:'20%',width:'60%',height:'38px'},{align:'center',onClick: () => {
		 	uni.showToast({
		 		 title: 'test',
		 		 duration:2000
		 	})
		 }},"btnTxt"); */
		this.view.show();
	},
	initBtn() {
		let updateNowBtnX = 225/this.pxToRpxScale;
		let updateNowBtnY = 1050/this.pxToRpxScale;
		let updateNowBtnWidth = 300/this.pxToRpxScale;
		let updateNowBtnHeight = 80/this.pxToRpxScale;
		if (!this.updateNowBtn) {
			this.updateNowBtn = new plus.nativeObj.View('updateNowBtn', {
				top: updateNowBtnY + 'px',
				left: updateNowBtnX + 'px',
				height: updateNowBtnHeight + 'px',
				width: updateNowBtnWidth + 'px'
			}, [{
				tag: 'rect',
				id: 'btnBg',
				rectStyles: {
					color: '#ff5500',
					size: '100%',
					radius: '26px'
				}
			}, {
				tag: 'font',
				id: 'btnTxt',
				text: '立即更新',
				position: {
					width: '100%',
					height: '100%',
				},
				textStyles: {
					align: 'center',
					color: '#ffffff',
					size: '22px'
				}
			}]);
		}
		this.updateNowBtn.show();
		//非强制更新显示关闭按钮
		if(this.param.updateCmd === 1 || this.param.updateCmd ===3){
			if (!this.closeBtn) {
				this.closeBtn = new plus.nativeObj.View('closeBtn', {
					top: '22%',
					right: '10%',
					height: '30px',
					width: '30px'
				}, [{
					tag: 'img',
					id: 'closeImg',
					position: {
						top: '0',
						left: '0',
						width: '100%',
						height: '100%'
					},
					src: '_www/static/imgs/app_update_close.png'
				}]);
				
			}
			this.closeBtn.show();
		}
	},
	initEventListener(){
		if(this.updateNowBtn){
			this.updateNowBtn.addEventListener("click",()=>{
				this.updateNowBtn.hide();
				this.update();
			},false);
		}
		if(this.closeBtn){
			this.closeBtn.addEventListener("click", () => {
				this.close();
			}, false)
		}
	},
	update(){
		if (this.param.updateCmd) {
			//updateCmd =1 热更新；updateCmd =2 强制热更新; updateCmd=3整包更新,updateCmd=4强制整包更新
			if(this.param.updateCmd ===1 || this.param.updateCmd ===2){
				uni.downloadFile({
					url: $utils.formatImg(this.param.wgtUrl),  
					success: (downloadResult) => {  
						if (downloadResult.statusCode === 200) {  
							plus.runtime.install(downloadResult.tempFilePath, {  
								force: false  
							}, function() {  
								console.log('install success...');  
								plus.runtime.restart();  
							}, function(e) {  
								console.error('install fail...');  
							});  
						}  
					}  
				}).onProgressUpdate((res) => {
					//更新下载进度
					this.updateProgress(res.progress)
				  });  
			}else if(this.param.updateCmd === 3 || this.param.updateCmd ===4){
				let isShowCancle = this.param.updateCmd ===3?true:false;
				let openUrl = plus.os.name === 'iOS' ? this.param.pkgiOSUrl : this.param.pkgAndUrl;
				if(plus.os.name === 'iOS'){
                    if(openUrl.indexOf('https://apps.apple.com/') != -1){
                        plus.runtime.launchApplication({
                        	action: openUrl
                        }, (e) => {
                        	uni.showToast({
                        		title: "请向app反馈，错误信息：" + e.message,
                        		icon: 'none',
                        		duration: 4000
                        	})
                        });
                    }
				}else{
					uni.downloadFile({
						url: $utils.formatImg(openUrl),  
						success: (downloadResult) => {  
							if (downloadResult.statusCode === 200) {  
								plus.runtime.install(downloadResult.tempFilePath, {  
									force: false  
								}, function() {  
									console.log('install success...');  
									plus.runtime.restart();  
								}, function(e) {  
									console.error('install fail...');  
								});  
							}  
						},
						fail: () => {
						  	uni.showToast({
						  		title: '下载失败,请重试,跳转到浏览器打开下载更新',
						  		duration: 4000,
						  		icon: 'none'
						  	});
							plus.runtime.openURL($utils.formatImg(openUrl));
						}
					}).onProgressUpdate((res) => {
						//更新下载进度
						this.updateProgress(res.progress)
					  });  
				}
			}
		}  
	},
	setContent(content){
		let richContent = '<font style="font-size:16px;">' + content + '</font>'
		this.view.drawRichText(richContent, {
			top: 350/this.pxToRpxScale + 'px',
			left: '10px',
			width:572/this.pxToRpxScale + 'px',
			height:'wrap_content'
		})
	},
	updateProgress(progress) {
		if(this.isDownloading == false){
			this.view.drawText('正在为您 火速下载中.. .',{
					bottom: '40px',
					left: '16px',
					width: '100%',
					height: '50px',
			
				},{
					align: 'left',
					color: '#ff832a',
					weight: 'bold',
					size: '14px'
				});
			this.view.drawRect({
					color: 'rgba(186, 186, 186, 1.0)',
					size: '100%',
					radius: '3px'
				},{
					bottom: '40px',
					left: '5%',
					width: '90%',
					height: '9px',
				});
		}
		this.isDownloading = true;
		this.view.drawText(progress + '%', {
			bottom: '10px',
			left: (progress * 0.8 + 5) + '%',
			width: '40px',
			height: '30px',
		}, {
			align: 'left',
			color: '#000000',
			size: '15px'
		}, 'process')

		this.view.drawRect({
			color: 'rgba(110, 166, 64, 1.0)',
			size: '100%',
			radius: '3px'
		}, {
			bottom: '40px',
			left: '5%',
			width: (progress * 0.9) + '%',
			height: '9px',
		}, 'processFR')
	},
	close() {
		this.isDownloading = false;
		if (this.mask) {
			// this.mask.hide();
			this.mask.close();
			this.mask = null;
		}
		if (this.view) {
			// this.view.hide();
			this.view.close();
			this.view = null;
		}
		if(this.updateNowBtn){
			this.updateNowBtn.close();
			this.updateNowBtn = null;
		}
		if (this.closeBtn) {
			this.closeBtn.close();
			this.closeBtn = null;
		}
	}
}
