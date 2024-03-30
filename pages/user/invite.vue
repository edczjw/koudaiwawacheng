<template>
	<view style="background-color:#7ACBDC; padding-bottom:100rpx;">
		<!-- #ifdef H5 -->
		<view class="navigateBack-btn" @click="$utils.navigateBack()">
			<image class="navigateBack-img" src="../../static/imgs/goback.png"></image>
		</view>
		<!-- #endif -->
		<view class="canvas-in">
			<canvas v-if="heightIn > 0" 
			:style="{
				width:widthIn+'px', 
				height:heightIn+'px', 
				opacity:0
			}" 
			canvas-id="graceCanvas" class="grace-canvas"></canvas>
		</view>
		<view class="grace-canvas-img" v-if="imgSrc != null">
			<image :src="imgSrc" mode="widthFix" style="width:750rpx" @longpress="longpress"></image>
		</view>
        
		<!-- #ifdef APP-PLUS -->
		<button class="share-btn" v-if="imgSrc != null" @tap="openShare">立即分享</button>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<button class="share-btn" v-if="imgSrc != null">长按图片分享好友</button>
		<!-- #endif -->
        
        <!--  利用底部对话框插槽 + 宫格布局实现分享布局 -->
        <gui-popup ref="guipopupforshare" position="bottom">
            <view class="gui-relative gui-box-shadow gui-bg-gray">
                <view class="gui-grids gui-flex gui-rows gui-wrap gui-share gui-space-between">
                    <view class="gui-grids-items gui-flex gui-columns gui-align-items-center" hover-class="gui-tap" @tap="share('WXSceneSession')">
                        <image class="gui-grids-icon-img" src="../../static/imgs/weixin.png" mode="widthFix"></image>
                        <text class="gui-grids-text gui-color-gray">微信好友</text>
                    </view>
                    <view class="gui-grids-items gui-flex gui-columns gui-align-items-center" hover-class="gui-tap" @tap="share('WXSceneTimeline')">
                        <image class="gui-grids-icon-img" src="../../static/imgs/timeline.png" mode="widthFix"></image>
                        <text class="gui-grids-text gui-color-gray">朋友圈</text>
                    </view>
                </view>
            </view>
        </gui-popup>
	</view>
</template>
<script>
// 以下路径需根据项目实际情况填写
import { pathToBase64, base64ToPath } from '../../js_sdk/mmmm-image-tools/index.js'
export default {
	data(){
		return {
			width    : 700,   // 画布宽度，单位 rpx
			height   : 1200,  // 画布高度
			widthIn  : 300,   // 自动计算转换为 px
			heightIn : 0,  //  自动计算转换为 px
			bgColor  : '#7ACBDC', // 背景颜色
			bgImg    : 'https://oss.fszhuazhuale.com/imgs/wwj/share.jpg',
			imgSrc   : null,
			multiple : 1 // 将画布放大 2.0 - 2.9 倍（支持小数，过大app端会出现无法渲染的问题），保存的图片更清晰
		}
	},
	onLoad : function () {
		uni.showLoading({title:'loading ...'});
		// 画布初始化
		this.context = uni.createCanvasContext('graceCanvas');
		this.initSize();
		//延迟1秒等待画布创建
		setTimeout(()=>{this.draw();}, 1000);
	},
    onUnload(){
        uni.hideLoading();
    },
	methods:{
		// 画布初始化
		initSize : function () {
			this.widthIn  = uni.upx2px(this.width)  * this.multiple;
			this.heightIn = uni.upx2px(this.height) * this.multiple;
			console.log(this.widthIn, this.heightIn);
		},
		// 海报绘制代码
		draw : function(){
			// 步骤 01. 绘制背景颜色
			this.step01();
			// 步骤 02. 绘制背景图片（如果需要，条件结构）
			if(this.bgImg != ''){
				this.drawBGIMG(this.bgImg, ()=>{
					// 步骤 03
					this.step03();
				});
			}else{
				this.step03();
			}
		},
		// 步骤 01 : 绘制背景颜色
		step01 : function () {
			this.context.setFillStyle(this.bgColor);
			this.context.fillRect(0,0,this.widthIn, this.heightIn);
		},
		// 步骤 03 : 
		// 3.1 绘制标题 [ 居中对应 x = 画布的一半 ]
		// 3.2 绘制验证码
		step03 : function () {
			// 3.1 绘制标题 [ 居中对应 x = 画布的一半 ]
			this.drawText(
				'分享好友，各得30金币', 
				this.widthIn / 2, (this.heightIn - 1 * this.multiple), 
				'#FFFFFF', 
				16  * this.multiple, 
				'center'
			);
			// 3.2 绘制二维码
			/* uni.downloadFile({
				// 请使用自己的后端来实现二维码的生成
				// 如 : php 的 qrcode, 此处换成自己的二维码图片 api 地址
			    // url: 'https://test232.oss-cn-shenzhen.aliyuncs.com/test/2021/12/31/90ae7570359b4d80afe8a347efcb0623.png',
				url: 'http://192.168.3.123:8084/user/getInviteQrcode.png',
			    success: (res) => {
					console.log(res);
			        if (res.statusCode === 200) {
						// 绘制二维码
						// x = (画布宽度 - 图片宽度 ) / 2
						var qrCodeWidth = 200 * this.multiple;
						var x = (this.widthIn - qrCodeWidth) / 2;
						this.context.drawImage(res.tempFilePath,x, 260 * this.multiple,qrCodeWidth,qrCodeWidth);
						// 3.3 二维码下面的小字描述 
						this.drawText('长按图片保存 ~ ', this.widthIn / 2, 500 * this.multiple, '#FFFFFF', 12 * this.multiple, 'center');
						// 在最后一步执行 drawIt 完整最终的绘制
						this.drawIt();
			        }
			    },
				fail:function(e){console.log(e);}
			}); */
			
			uni.http.get('/user/inviteQrcode.png', {token:true}).then(res=>{
			    if(res){
					base64ToPath(res).then(path => {
						console.log(path)
						// 绘制二维码
						// x = (画布宽度 - 图片宽度 ) / 2
						var qrCodeWidth = 160 * this.multiple;
						var x = (this.widthIn - qrCodeWidth) / 2;
						this.context.drawImage(path,x, 230 * this.multiple,qrCodeWidth,qrCodeWidth);
						
						console.log(this.multiple);
						
						// 3.3 二维码下面的小字描述 
						//this.drawText('长按图片保存 ~ ', this.widthIn / 2, 200 * this.multiple, '#5d5d5d', 12 * this.multiple, 'center');
						// 在最后一步执行 drawIt 完整最终的绘制
						this.drawIt(); 
						
					  }).catch(error => {
						 uni.showToast({
						 	title: error,
						 	icon: 'none',
							duration: 15000
						 }); 
						  
					})
			    }
			}).catch(err=>{
			})
		},
		// 绘制文本, 参数 : 文本内容,x,y,颜色,文本大小,横向对齐方式
		drawText:function(content, x, y, color, size, align){
			this.context.setFontSize(size);
			this.context.setFillStyle(color);
			this.context.setTextAlign(align);
			this.context.fillText(content,x,y);
		},
		// 最终绘制函数
		drawIt : function(){
			this.context.draw(true, ()=>{
				uni.canvasToTempFilePath({
				  x: 0,
				  y: 0,
				  width: this.widthIn,
				  height: this.heightIn,
				  destWidth: this.widthIn,
				  destHeight: this.heightIn,
				  quality: 0.8,
				  canvasId: 'graceCanvas',
				  success:(res)=>{
				    // 在H5平台下，tempFilePath 为 base64
				    console.log(res)
					this.imgSrc = res.tempFilePath;
					uni.hideLoading();
				  } 
				});
			});
		},
		// 绘制图片,参数 : 图片地址, 绘制完成后执行的回调函数
		drawBGIMG:function (img, callback){
			uni.downloadFile({
			    url: img,
			    success: (res) => {
			        if (res.statusCode == 200) {
						// 绘制
						uni.getImageInfo({
							src:res.tempFilePath,
							success:(res2)=>{
								console.log(res2);
								var bgImgHeight = (this.widthIn/res2.width) * res2.height;
								console.log(this.widthIn, bgImgHeight);
								this.context.drawImage(res.tempFilePath,0,0,this.widthIn, bgImgHeight);
								callback();
							}
						});
			        }
			    }
			});
		},
		// 长按事件
		longpress : function () {
            // #ifndef H5
            uni.saveImageToPhotosAlbum({
            	filePath: this.imgSrc,
            	success:()=>{
            		console.log('save success');
            		uni.showToast({
            			title:"图片已经保存到您的相册~"
            		})
            	}
            });
            // #endif
		},
        
        //分享
        share(scene){
            console.log(this.imgSrc);
            // #ifdef APP-PLUS
            uni.share({
                provider: "weixin",
                scene: scene,
                type: 2,
                imageUrl: this.imgSrc,
                success: function (res) {
                    console.log("success:" + JSON.stringify(res));
                },
                fail: function (err) {
                    console.log("fail:" + JSON.stringify(err));
                } 
            });
            // #endif
        },
        
        openShare : function(){
            // #ifdef APP-PLUS
            this.$refs.guipopupforshare.open();
            // #endif
            
            // #ifdef H5
            let isWx = this.$utils.isWeiXinBrowser();
            if(isWx){
                
            } else {
                let nativeShare = new NativeShare();
                // 设置分享文案
                nativeShare.setShareData({
                    // icon: 'https://pic3.zhimg.com/v2-080267af84aa0e97c66d5f12e311c3d6_xl.jpg',
                    link: 'https://kdwwc.fszhuazhuale.com/#/',
                    title: '口袋娃娃城',
                    desc: '口袋娃娃城',
                })
                // 唤起浏览器原生分享组件(如果在微信中不会唤起，此时call方法只会设置文案。类似setShareData)
                try {
                	nativeShare.call(); // 如果是分享到微信则需要 nativeShare.call('wechatFriend')
                } catch(err) {
                    // 如果不支持，你可以在这里做降级处理
                    alert(err.message);
                    uni.showModal({
                        title: '提示',
                        content: '请点击浏览器自带分享按钮进行分享',
                        showCancel: false,
                    });
                }
            }
            // #endif
        }
	}
}
</script>
<style>
page{background-color:#7ACBDC;}
.canvas-in{width:750rpx; overflow:hidden; position:absolute; z-index:1; left:0; top:-5000px;}
.grace-canvas-img{font-size:0; width:750rpx;}
.gui-grids-items{width:160rpx; margin:30rpx 50rpx;}
.gui-share{padding:10rpx 30rpx;}
.gui-grids-icon-img{width: 92rpx;}
.share-btn{
    width: 630rpx;
    height: 96rpx;
    line-height: 96rpx;
    border-radius: 50px;
    margin-top: 50rpx;
    color: #000000;
    font-size: $font-lg;
    &:after{
        border-radius: 100px;
    }
}
</style>