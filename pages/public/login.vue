<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- #ifndef H5 -->
		<view v-if="visitorModel && visitorModel == 'true'" class="visitor-btn" @click="visitorLogin">
				<text>游客登录</text>
		</view>
		<!-- #endif -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎回来！
			</view>
            <!-- #ifndef H5 -->
            <button v-if="system >= 13 && platform == 'ios'" class="confirm-btn gui-bg-black gui-color-white my-icons" @click="appleLogin">&#xe63d; 通过Apple登录</button>
            <button v-if="showWX" class="confirm-btn my-icons" @click="weixinLogin">&#xe65c; 微信登录</button>
            <!-- #endif -->
            <!-- #ifdef H5 -->
            <button v-if="isWxBrowser" class="confirm-btn my-icons" @click="wxBrowserLogin">&#xe65c; 微信登录</button>
            <!-- #endif -->
			<button v-if="!isWxBrowser" class="confirm-btn my-icons" @click="phoneLogin">&#xe600; 手机登录</button>
			<view class="agreement-section">
				<gui-radio :checked="agreement" @change="radioChange">
					<text class="gui-text gui-color-gray">登录表示同意</text><text class="gui-text gui-color-blue" @tap.stop="navTo('/pages/public/article?id=1')">《隐私政策与服务协议》</text>
				</gui-radio>
			</view>
		</view>
	</view>
</template>
<script>
	const sharetrace = uni.requireNativePlugin('shoot-sharetrace');
	var md5 = require('@/GraceUI5/js/md5.js');
	import {  
        mapMutations  
    } from 'vuex';
	
	export default{
		data(){
			return {
				system: '', // 系统版本
				platform: '',   // 平台
				agreement:false,
				visitorModel: false,
                showWX: true,
				isWxBrowser: false
			}
		},
		onReady(){
			console.log("login.vue onready")
            // #ifdef APP-PLUS
			sharetrace.getInstallTrace( data => {
				if(data.code == 200){
					uni.setStorage({
						key:"downloadParams",
						data:data.data.paramsData
					})
				}
			});
            // #endif
		},
		onLoad() {
			// 先判断 系统版本
			uni.getSystemInfo({
				success: (res) => {
					this.system = res.system.replace("iOS","").replace(" ","").split("\.")[0];
					this.platform = res.platform;
				},fail: (err) => {
				},complete: () => {
				}
			})
            
            // #ifdef APP-PLUS
            if(plus.runtime.isApplicationExist({pname:'com.tencent.mm', action:'weixin://'})){
                //安装了微信
                console.log('============安装了微信');
            }else{
               //未安装微信
               console.log('============未安装微信');
               if(this.platform === 'ios'){
                   this.showWX = false;
               }
            }
            // #endif
			
			// #ifdef H5
			if(this.$utils.isWeiXinBrowser()){
				this.isWxBrowser = true;
			}
			// #endif
			this.visitorModel = uni.conf.visitorModel;
		},
		loadData(){},
		created(){
			let token = uni.getStorageSync('token')
			if(!token){
				// 用户未登录
				/* uni.showToast({
					title: '请先登录',
					icon: 'none'
				}); */
				return this.showloging = false
			}
			// 用户已登录
			/* uni.switchTab({
				url:"../index/index"
			}) */
		},
		methods: {
			...mapMutations(['login']),
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack(){
				uni.navigateBack();
			},
			navTo(url){
				// this.$api.msg(`跳转到${url}`);
			    uni.navigateTo({
			        url
			    })
			},
			phoneLogin(){
				/* if(!this.agreement){
					uni.showToast({
						title: "请先阅读并同意用户协议",
						icon: 'none'
					});
					return
				} */
			    this.navTo('/pages/public/phonelogin');
			},
			visitorLogin(){
				if(!this.agreement){
					uni.showToast({
						title: "请先阅读并同意用户协议",
						icon: 'none'
					});
					return
				}
				let self = this;
				uni.showModal({
				    title: '提示',
				    content: '游客登录将会生成游客账号,该账号仅限当前设备使用,更换设备将无法登录该账号。建议使用其他登陆方式或登录后尽快进行手机绑定。',
				    success: function (res) {
				        if (res.confirm) {
							let clientid = uni.getStorageSync('clientid');
							if(clientid == ''){
								clientid = self.getClientId();
							}
							
							let dp = uni.getStorageSync('downloadParams');
							if(!dp){
								dp = "";
							}
							
							uni.http.post('/user/visitorlogin', {device:md5.md5(clientid),dp:dp}).then(res=>{
								if(res.code==200){
									uni.showToast({
										title: '登陆成功',
										icon: 'none'
									});
									uni.switchTab({
										url:'../index/index'
									})
									// console.log(this.$store);
									self.$store.dispatch('login',res.token)
								}else{
									uni.showToast({
										title: res.msg,
										icon: 'none'
									});
								}
							})
				        } else if (res.cancel) {
				        }
				    }
				});
				// this.$refs.guimodal.open();
			},
			weixinLogin(){
				if(!this.agreement){
					uni.showToast({
						title: "请先阅读并同意用户协议",
						icon: 'none'
					});
					return
				}
				
                let self = this;
                uni.login({
                    provider: 'weixin',
                    onlyAuthorize: true,
                    success: function (loginRes) {
						let dp = uni.getStorageSync('downloadParams');
						if(!dp){
							dp = "";
						}
						
                        uni.http.post('/user/wxlogin', {code:loginRes.code,dp:dp}).then(res=>{
                        	if(res.code==200){
                        		uni.showToast({
                        			title: '登陆成功',
                        			icon: 'none'
                        		});
                        		uni.switchTab({
                        			url:'../index/index'
                        		})
                        		// console.log(this.$store);
                        		self.$store.dispatch('login',res.token)
                        	}else{
                        		uni.showToast({
                        			title: res.msg,
                        			icon: 'none'
                        		});
                        	}
                        }).catch(err=>{
                        	
                        });
                    }
                })
			},
			appleLogin() {
				if(!this.agreement){
					uni.showToast({
						title: "请先阅读并同意用户协议",
						icon: 'none'
					});
					return
				}
				
				let self = this 
				
				uni.login({
					provider: 'apple',
					success: loginRes => {
						uni.getUserInfo({
							provider: 'apple',
							success: userInfoRes => {
								let dp = uni.getStorageSync('downloadParams');
								if(!dp){
									dp = "";
								}
								
								let user = userInfoRes.userInfo
								
								uni.http.post('/user/applelogin', {identityToken:user.identityToken,dp:dp}).then(res=>{
									if(res.code==200){
										uni.showToast({
											title: '登陆成功',
											icon: 'none'
										});
										uni.switchTab({
											url:'../index/index'
										})
										// console.log(this.$store);
										self.$store.dispatch('login',res.token)
									}else{
										uni.showToast({
											title: res.msg,
											icon: 'none'
										});
									}
								}).catch(err=>{
								});
							}
						})
					},
					fail: err => {
						console.log('apple登录失败' + JSON.stringify(err))
						uni.showToast({
							title:'登录失败',
							icon:'none'
						})
					}
				})
			},
			radioChange(e) {
				this.agreement = e[0];
			},
			getClientId() {
				//获取客户端ID和版本号
				let clientid = '';
				// #ifdef APP-PLUS
				// 苹果系统
				plus.device.getInfo({
					success: function(e) {
						clientid = e.uuid;
						uni.setStorageSync('clientid', clientid);
					},
					fail: function(e) {
						console.log(e);
					}
				});
				// 安卓系统
				plus.device.getAAID({
					success: function(e) {
						clientid = e.aaid;
						console.log(clientid);
						uni.setStorageSync('clientid', clientid);
					},
					fail: function(e) {
						console.log(e);
					}
				});
				//老版本、安卓模拟器
				if (clientid == '') {
					clientid = plus.device.uuid;
					uni.setStorageSync('clientid', clientid);
				}
				// #endif
				return clientid;
			},
            wxBrowserLogin(){
                if(!this.agreement){
                	uni.showToast({
                		title: "请先阅读并同意用户协议",
                		icon: 'none'
                	});
                	return
                }
                
                // #ifdef H5
                this.$utils.wxAuthLogin(true);
                // #endif
            },
		},
	}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container{
		padding-top: 115px;
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	
	.visitor-btn{
		position:absolute;
		z-index: 9999;
		right: 50upx;
		top: 100upx;
		font-size: 26upx;
		color: #707070;
		/* text-shadow: 1px 0px 1px rgba(106, 106, 106, 0.3); */
	}

	.confirm-btn{
		width: 630upx;
		height: 96upx;
		line-height: 96upx;
		border-radius: 50px;
		margin-top: 50upx;
		/* background: $uni-color-primary; */
		color: #000000;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
	.agreement-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
		margin-left: 60upx;
	}
	
	.modal-btns{line-height:88rpx; font-size:30rpx; text-align:center; width:200rpx;}
</style>
