
<script>
	/**
	 * vuex管理登陆状态，具体可以参考官方登陆模板示例
	 */
	import {
		mapMutations
	} from 'vuex';
	import $updateVersion from '@/common/updateVersion.js';
	import $netstatus from '@/common/netstatus.js';
	export default {
		onLaunch: function() {
            let self = this;
			
			// #ifdef H5
			let dp = this.$utils.getUrlParam("d");
			if(dp){
				uni.setStorageSync('downloadParams', "type=1&d=" + dp);
			} 
			
			this.$store.state.screenHeight = 1300;
			// #endif
			
            // #ifdef APP-PLUS
            plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
            	let param = {
            		version: widgetInfo.version,
            		appid: widgetInfo.appid
            	}
                // console.log('==============version='+widgetInfo.version);
            	uni.http.post("client/update", param).then(data => {
            		$updateVersion.checkUpdate(data);
            	})
            });

			plus.screen.lockOrientation('portrait-primary'); //锁定屏幕
			const dom = weex.requireModule('dom');
			dom.addRule('fontFace', {
				'fontFamily': "graceIconfont",
				'src': "url('/static/iconfont/grace.ttf')"
			});
			dom.addRule('fontFace', {
				'fontFamily': "uniwwj",
				'src': "url('https://at.alicdn.com/t/font_3041110_9k55f2c33i.ttf?t=1641439129623')"
			});
			
			let systemInfo = uni.getSystemInfoSync()
			this.$store.state.screenHeight = systemInfo.windowHeight * 750 / systemInfo.windowWidth;
			// #endif
			
			uni.http.get('conf.json').then(res=>{
				this.$store.state.conf = res
				this.$store.dispatch('initUser');
				
				// #ifdef H5
				//微信授权登录
				if(this.$utils.isWeiXinBrowser()){
					let u = uni.getStorageSync('user');
					if(!u){
						this.$utils.wxAuthLogin(false);
					}
				}
				
				// #endif
			})
			$netstatus.check();
		},
		onShow: function() {
			console.log('App Show')
            
		},
		onHide: function() {
			// $netstatus.uncheck();
			console.log('App Hide')
		},
		methods: {
			...mapMutations(['login'])
		},
	}
</script>

<style lang='scss'>
	/*
		全局公共样式和字体图标
	*/
    @import "@/uni_modules/uview-ui/index.scss";
    
	/* #ifdef H5 */ 
	.navigateBack-btn{
		position: fixed;top: 30rpx;left: 30rpx;z-index: 99999;
		.navigateBack-img{
			width: 70rpx;height: 70rpx;
		}
	}
	/* #endif */
	
    /* #ifndef APP-NVUE */
	@font-face {
		font-family: yticon;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_1078604_w4kpxh0rafi.ttf') format('truetype');
	}
	
	.yticon {
		font-family: "yticon" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	.icon-yiguoqi1:before {
		content: "\e700";
	}
	
	.icon-iconfontshanchu1:before {
		content: "\e619";
	}
	
	.icon-iconfontweixin:before {
		content: "\e611";
	}
	
	.icon-shang:before {
		content: "\e624";
	}
	
	.icon-shouye:before {
		content: "\e626";
	}
	
	.icon-shanchu4:before {
		content: "\e622";
	}
	
	.icon-xiaoxi:before {
		content: "\e618";
	}
	
	.icon-jiantour-copy:before {
		content: "\e600";
	}
	
	.icon-fenxiang2:before {
		content: "\e61e";
	}
	
	.icon-pingjia:before {
		content: "\e67b";
	}
	
	.icon-daifukuan:before {
		content: "\e68f";
	}
	
	.icon-pinglun-copy:before {
		content: "\e612";
	}
	
	.icon-dianhua-copy:before {
		content: "\e621";
	}
	
	.icon-shoucang:before {
		content: "\e645";
	}
	
	.icon-xuanzhong2:before {
		content: "\e62f";
	}
	
	.icon-gouwuche_:before {
		content: "\e630";
	}
	
	.icon-icon-test:before {
		content: "\e60c";
	}
	
	.icon-icon-test1:before {
		content: "\e632";
	}
	
	.icon-bianji:before {
		content: "\e646";
	}
	
	.icon-jiazailoading-A:before {
		content: "\e8fc";
	}
	
	.icon-zuoshang:before {
		content: "\e613";
	}
	
	.icon-jia2:before {
		content: "\e60a";
	}
	
	.icon-huifu:before {
		content: "\e68b";
	}
	
	.icon-sousuo:before {
		content: "\e7ce";
	}
	
	.icon-arrow-fine-up:before {
		content: "\e601";
	}
	
	.icon-hot:before {
		content: "\e60e";
	}
	
	.icon-lishijilu:before {
		content: "\e6b9";
	}
	
	.icon-zhengxinchaxun-zhifubaoceping-:before {
		content: "\e616";
	}
	
	.icon-naozhong:before {
		content: "\e64a";
	}
	
	.icon-xiatubiao--copy:before {
		content: "\e608";
	}
	
	.icon-shoucang_xuanzhongzhuangtai:before {
		content: "\e6a9";
	}
	
	.icon-jia1:before {
		content: "\e61c";
	}
	
	.icon-bangzhu1:before {
		content: "\e63d";
	}
	
	.icon-arrow-left-bottom:before {
		content: "\e602";
	}
	
	.icon-arrow-right-bottom:before {
		content: "\e603";
	}
	
	.icon-arrow-left-top:before {
		content: "\e604";
	}
	
	.icon-icon--:before {
		content: "\e744";
	}
	
	.icon-zuojiantou-up:before {
		content: "\e605";
	}
	
	.icon-xia:before {
		content: "\e62d";
	}
	
	.icon--jianhao:before {
		content: "\e60b";
	}
	
	.icon-weixinzhifu:before {
		content: "\e61a";
	}
	
	.icon-comment:before {
		content: "\e64f";
	}
	
	.icon-weixin:before {
		content: "\e61f";
	}
	
	.icon-fenlei1:before {
		content: "\e620";
	}
	
	.icon-erjiye-yucunkuan:before {
		content: "\e623";
	}
	
	.icon-Group-:before {
		content: "\e688";
	}
	
	.icon-you:before {
		content: "\e606";
	}
	
	.icon-forward:before {
		content: "\e607";
	}
	
	.icon-tuijian:before {
		content: "\e610";
	}
	
	.icon-bangzhu:before {
		content: "\e679";
	}
	
	.icon-share:before {
		content: "\e656";
	}
	
	.icon-yiguoqi:before {
		content: "\e997";
	}
	
	.icon-shezhi1:before {
		content: "\e61d";
	}
	
	.icon-fork:before {
		content: "\e61b";
	}
	
	.icon-kafei:before {
		content: "\e66a";
	}
	
	.icon-iLinkapp-:before {
		content: "\e654";
	}
	
	.icon-saomiao:before {
		content: "\e60d";
	}
	
	.icon-shezhi:before {
		content: "\e60f";
	}
	
	.icon-shouhoutuikuan:before {
		content: "\e631";
	}
	
	.icon-gouwuche:before {
		content: "\e609";
	}
	
	.icon-dizhi:before {
		content: "\e614";
	}
	
	.icon-fenlei:before {
		content: "\e706";
	}
	
	.icon-xingxing:before {
		content: "\e70b";
	}
	
	.icon-tuandui:before {
		content: "\e633";
	}
	
	.icon-zuanshi:before {
		content: "\e615";
	}
	
	.icon-zuo:before {
		content: "\e63c";
	}
	
	.icon-shoucang2:before {
		content: "\e62e";
	}
	
	.icon-shouhuodizhi:before {
		content: "\e712";
	}
	
	.icon-yishouhuo:before {
		content: "\e71a";
	}
	
	.icon-dianzan-ash:before {
		content: "\e617";
	}
	
	
	
	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}
	
	/* 图片载入替代方案 */
	.image-wrapper {
		font-size: 0;
		background: #f3f3f3;
		border-radius: 4px;
	
		image {
			width: 100%;
			height: 100%;
			transition: .6s;
			opacity: 0;
	
			&.loaded {
				opacity: 1;
			}
		}
	}
    
    .clamp {
    	overflow: hidden;
    	text-overflow: ellipsis;
    	white-space: nowrap;
    	display: block;
    }
    
    /*边框*/
    .b-b:after,
    .b-t:after {
    	position: absolute;
    	z-index: 3;
    	left: 0;
    	right: 0;
    	height: 0;
    	content: '';
    	transform: scaleY(.5);
    	border-bottom: 1px solid $border-color-base;
    }
    
    .b-b:after {
    	bottom: 0;
    }
    
    .b-t:after {
    	top: 0;
    }
    /* #endif */
    
    
    /* 骨架屏替代方案 */
    .Skeleton {
    	background: #f3f3f3;
    	padding: 20upx 0;
    	border-radius: 8upx;
    }
	
	.common-hover {
		background: #ffffff;
	}
	
	/* button样式改写 */
	/* uni-button,
	button {
		height: 80upx;
		line-height: 80upx;
		font-size: $font-lg + 2upx;
		font-weight: normal;
	
		&.no-border:before,
		&.no-border:after {
			border: 0;
		}
	}
	
	uni-button[type=default],
	button[type=default] {
		color: $font-color-dark;
	} */
	
	/* input 样式 */
	.input-placeholder {
		color: #999999;
	}
	
	.placeholder {
		color: #999999;
	}

	/* 加载图标字体 - 条件编译模式 */
	/* #ifdef APP-PLUS-NVUE */
	.gui-icons {
		font-family: graceIconfont;
	}

	.my-icons{font-family:uniwwj;}
	/* #endif */
	
	
</style>

<style>
	/* 加载框架核心样式 */
	@import "./GraceUI5/css/graceUI.css";
	/* 加载主题样式 */
	@import "./GraceUI5/skin/my.css";
	@import url("/common/free.css");
	@import url("/common/common.css");
</style>
