/* message:{
	nick:'',玩家昵称
	doll:null,夹中娃娃
	cnt:0,夹中次数
} */
import $utils from "@/common/utils";
export default {
	view: null,
	pxToRpxScale:0,
	windowWidth:0,
	messages:[],
	isScrolling:false,
	initComponent(){
		let systemInfo = uni.getSystemInfoSync()
		this.windowWidth = systemInfo.windowWidth;
		// px转换到rpx的比例
		let pxToRpxScale = 750 / this.windowWidth;
		this.pxToRpxScale = pxToRpxScale;
		this.view = new plus.nativeObj.View('scrollMsg', {
			top: 100 + 'px',
			left: 5 + 'px',
			height: 60/pxToRpxScale + 'px',
			width: (this.windowWidth - 10) + 'px',
		});
	},
	push(message){
		this.messages.push(message);
		this.start();
	},
	start(){
		if(this.isScrolling){
			return
		}
		if(!this.view){
			this.initComponent();
		}
		this.isScrolling = true;
		this.scrollMessage();
	},
	scrollMessage(){
		let message = this.messages.shift();
		if(!message){
			this.isScrolling=false;
			return
		}
		this.initComponent();
		this.view.drawRect({
				color: '#FF7900',
				size: '90%',
				radius: '15px',
				borderWidth: '2px',
				borderColor: '#ffb777'
				
			})
		/* let richText = "<img src='" + $utils.formatImg(message.doll.thumbnail)  +"' width='22px' height='22px'></img>"
		richText += "<font color='#FFFFFF' style='font-size:16px;'>"+ message.nick +"</font>";
		richText += "<font color='#55ff7f' style='font-size:16px;'>仅抓("+ message.cnt +")次就获得了</font>"
		richText += "<font color='#ffff00' style='font-size:16px;'> "+ message.doll.name +"</font>" */
		
		
		let richText = "<font color='#FFFFFF' style='font-size:14px;'>恭喜 </font>";
		richText += "<font color='#ffff00' style='font-size:14px;font-weight:900'>"+ message.nick +"</font>";
		richText += "<font color='#FFFFFF' style='font-size:14px;'> 成功抓到了 </font>"
		richText += "<font color='#ffff00' style='font-size:14px;font-weight:900'> "+ message.dollName +"</font>"
		
		this.view.drawRichText(richText, {top:'6px',left:'12px',width:'100%',height:'wrap_content'},{
				align: 'left'
			})
		let isComplete = false;
		
		plus.nativeObj.View.startAnimation({type:'pop-in',duration:3000},this.view,null,()=>{
			// console.log('plus.nativeObj.View.startAnimation动画结束');
			// 延时500ms关闭原生动画
			setTimeout(()=>{
				isComplete = true;
				plus.nativeObj.View.clearAnimation();
				this.scrollMessage();
				
			},1000);
		});
		setTimeout(()=>{
			if(!isComplete){
				plus.nativeObj.View.clearAnimation();
				this.scrollMessage();
			}
		},4100);
	}
}