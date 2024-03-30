<template>
	<view :style="{height:height}" v-if="need"></view>
</template>
<script>
export default{
	name  : "ddw-iphone-bottom",
	props : {
		height       : {type:String,  default:'50rpx'},
		isSwitchPage : {type:Boolean, default:false}
	},
	data() {
		return {
			need:false 
		}
	},
	created:function(){
		this.setBottom();
	},
	methods:{
		setBottom : function () {
			if(this.isSwitchPage){return ;}
			var system   = uni.getSystemInfoSync();
            console.log(system);
			system.model = system.model.replace(' ', '');
			system.model = system.model.toLowerCase();
			var res1     = system.model.indexOf('iphonex');
			if(res1 > 5){res1 = -1;}
			var res2     = system.model.indexOf('iphone1');
			if(res2 > 5){res2 = -1;}
			if(res1 != -1 || res2 != -1){
				this.need = true;
			}
		}
	}
}
</script>
<style scoped>
</style>
