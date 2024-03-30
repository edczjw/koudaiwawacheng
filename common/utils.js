import $C from './config.js';
import $store from '@/store/index.js';
export default {
    formatImg(url) {
        if (url == null || url.indexOf("http:") != -1 || url.indexOf("https:") != -1) {
            return url;
        } else {
            if (uni.conf && uni.conf.cdnUrl) {
                return uni.conf.cdnUrl + url;
            } else {
                $store.dispatch('initConf');
                return url;
            }
        }
    },
    getLocalTimestamp() {
        return parseInt(new Date().getTime() / 1000);
    },
    getVideoBufferTime(){
		try{
			if (uni.conf && uni.conf.videoBuffertime) {
			    return parseInt(uni.conf.videoBuffertime);
			} 
		}catch(e){}
		return 0;
	},
	/**
	 * 判断是否为空
	 */
	isEmpty(value) {
		switch (typeof value) {
			case 'undefined':
				return true;
			case 'string':
				if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
				break;
			case 'boolean':
				if (!value) return true;
				break;
			case 'number':
				if (isNaN(value)) return true;
				break;
			case 'object':
				if (null === value || value.length === 0) return true;
				for (var i in value) {
					return false;
				}
				return true;
		}
		return false;
	},
	navigateBack(){
		uni.navigateBack()
	},
    // #ifdef H5
    //是否微信浏览器
    isWeiXinBrowser(){
        let ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('micromessenger') != -1;
		
		//return false;
    },
	wxAuthLogin(relogin){
		/* uni.navigateTo({
			url: '/pages/public/login'
		}) */
		if(this.getUrlParam('code') && !relogin){
			this.checkWeChatCode()
		}else {
			this.getWeChatCode();
		}
	},
	//检查浏览器地址栏中微信接口返回的code
	checkWeChatCode() {
		let code = this.getUrlParam('code')
		if (code) {
			this.getOpenidAndUserinfo(code)
		}
	},
	//请求微信接口，用来获取code
	getWeChatCode() {
		let url = "https://kdwwc.fszhuazhuale.com/#/";
		
		let share = this.getUrlParam("share");
		let cid = this.getUrlParam("cid");
		if(share && cid){
			url += "?share=" + share + "&cid=" + cid;
		} 
		
		let d = this.getUrlParam("d");
		if(d){
			if(url.indexOf("?") == -1){
				url += "?";
			}else {
				url += "&";
			}
			url += "d=" + d; 
		}
		
		let local = encodeURIComponent(url); //获取当前页面地址作为回调地址
		let appid = 'wx4ed56a27b5d3b970'
		
		//通过微信官方接口获取code之后，会重新刷新设置的回调地址【redirect_uri】
		window.location.href =
			"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
			appid + 
			"&redirect_uri=" +
			local +
			"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
	},
	//方法:用来提取code
	getUrlParam(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1]
			.replace(/\+/g, '%20')) || null
	},
	//把code传递给后台接口，静默登录
	getOpenidAndUserinfo(code) {
		let dp = uni.getStorageSync('downloadParams');
		if(!dp){
			dp = "";
		}
		
		uni.http.post('/user/wxlogin', {code:code,dp:dp}).then(res=>{
			if(res.code==200){
				uni.showToast({
					title: '登陆成功',
					icon: 'none'
				});
				uni.switchTab({
					url:'../index/index'
				})
				// console.log(this.$store);
				$store.dispatch('login',res.token)
			}else{
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
			}
		}).catch(err=>{
			uni.showToast({
				title: err,
				icon: 'none'
			});
		});
	},
	
    // #endif
}
