<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				{{codeType==1?'手机号登录':'绑定手机号'}}
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input 
						type="number" 
						v-model="form.phone"
						placeholder="请输入手机号码"
						maxlength="11"
						data-key="mobile"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<text class="tit">验证码</text>
					<input 
						type="tel" 
						v-model="form.code"
						placeholder="请输入验证码"
						placeholder-class="input-empty"
						maxlength="6"
						data-key="password"
						@input="inputChange"
						@confirm="toLogin"
					/>
                    <text class="getcode" @click="sendcode">{{sendMsg}}</text>
				</view>
			</view>
            <view v-if="codeType==1">
                <button class="confirm-btn" @click="toLogin">登录</button>
                <view class="forget-section">
                	<gui-radio :checked="agreement" @change="radioChange">
                		<text class="gui-text gui-color-gray">登录表示同意</text><text class="gui-text gui-color-blue" @tap.stop="navTo('/pages/public/article?id=1')">《隐私政策与服务协议》</text>
                	</gui-radio>
                </view>
            </view>
            <view v-else>
                <button class="confirm-btn" @click="toBind">绑定</button>
            </view>
		</view>
	</view>
</template>

<script>
    let timer = '';
	import {  
        mapMutations  
    } from 'vuex';
	
	export default{
		data(){
			return {
				form:{
					phone:"",
					code:""
				},
				showloging:true,
				agreement:false,
                codeType: 1,
                sendMsg: '获取验证码',
                isCanSendCode: true
			}
		},
        onLoad(option){
        	if(option.codeType){
                this.codeType = option.codeType;
            }
        },
		loadData(){},
		created(){
			let token = uni.getStorageSync('token')
			if(!token){
				// 用户未登录
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
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
			async toLogin(){
				if(!this.agreement){
					uni.showToast({
						title: "请先阅读并同意用户协议",
						icon: 'none'
					});
					return
				}
				
				this.showloging = true;
				console.log(this.form)
                if(this.form.phone.length != 11){
					uni.showToast({
						title: "请输入正确的手机号",
						icon: 'none'
					});
                    return
                }
                if(this.form.code.length < 6){
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					});
                    return
                }
				
				let dp = uni.getStorageSync('downloadParams');
				if(!dp){
					dp = "";
				}
				this.form.dp = dp;
				
				uni.http.post('user/login',this.form).then(res=>{
					if(res.code==200){
						uni.showToast({
							title: '登陆成功',
							icon: 'none'
						});
						uni.switchTab({
							url:'../index/index'
						})
						// console.log(this.$store);
						this.$store.dispatch('login',res.token)
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				}).catch(err=>{
					
				});
			},
            setCodeInterval() {
            	//设置验证码重新发送定时器
            	let time = 60;
            	var self = this;
            	clearInterval(timer);
            	timer = setInterval(() => {
            		time--;
            		self.isCanSendCode = false;
            		self.sendMsg = "已发送" + time + "s"
            		if (time <= 0) {
            			self.isCanSendCode = true;
            			self.sendMsg = "重新获取";
            			clearInterval(timer);
            		}
            	}, 1000)
            },
            sendcode(){
                let self = this;
                if(!self.isCanSendCode) return;
                if(this.form.phone.length != 11){
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					});
                    return
                }
				uni.http.post("user/sendCode",{
                        phone: this.form.phone,
                        codeType: this.codeType
                    }).then(res=>{
						uni.showToast({
							title:"已发送",
							icon:'none'
						})
						self.setCodeInterval();
					}).catch(err=>{
						console.log("1111:" + err)
					})
            },
			radioChange : function (e) {
				this.agreement = e[0];
			},
            toBind(){
                if(this.form.phone.length != 11){
                	uni.showToast({
                		title: "请输入正确的手机号",
                		icon: 'none'
                	});
                    return
                }
                if(this.form.code.length < 6){
                	uni.showToast({
                		title: '请输入验证码',
                		icon: 'none'
                	});
                    return
                }
                uni.http.post('user/bindPhone',this.form, {token:true}).then(res=>{
                	if(res.code==200){
                		uni.showToast({
                			title: '绑定成功',
                			icon: 'none'
                		});
                		setTimeout(()=>{
                			uni.navigateBack()
                		}, 800);
                		// console.log(this.$store);
                		this.$store.dispatch('getUserInfo');
                	}else{
                		uni.showToast({
                			title: res.msg,
                			icon: 'none'
                		});
                	}
                }).catch(err=>{
                	
                });
            }
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
	.input-content{
		padding: 0 60upx;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 120upx;
		border-radius: 4px;
        position: relative;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}
        .getcode{
            position: absolute;
            right: 10upx;
            color: $font-color-spec;
            top: 55%;
            font-size: $font-base;
        }
	}

	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
		margin-left: 60upx;
	}
</style>
