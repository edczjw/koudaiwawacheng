<template>
	<view>
		<view @tap.stop="open"><slot></slot></view>
		<view class="gui-dateBT-shade gui-flex gui-columns gui-justify-content-end"
		v-if="show" 
		:style="{zIndex:zIndex, width:width}">
			<view class="graceDateTime-header gui-flex gui-rows gui-space-between gui-bg-gray">
				<text class="graceDateTime-header-btn" 
				:style="{color:cancelTColor}" 
				@tap="close">{{cancelText}}</text>
				<text class="graceDateTime-header-btn" 
				:style="{textAlign:'right', color:confirmColor}" 
				@tap="confirm">{{confirmText}}</text>
			</view>
			<view class="gui-bg-white">
				<!-- #ifndef MP-ALIPAY -->
				<picker-view 
				:indicator-style="indicatorStyle" 
				class="graceDateTime-main" 
				:value="defaultVal" 
				@change="change" 
				:style="{height:height, width:width}">
					<picker-view-column>
						<text class="graceDateTime-item gui-block-text" 
						v-for="(item, index) in sDate[0]" 
						:key="index">{{item}}{{units[0]}}</text>
					</picker-view-column>
					<picker-view-column>
						<text class="graceDateTime-item gui-block-text" 
						v-for="(item, index) in sDate[1]" 
						:key="index">{{item}}{{units[1]}}</text>
					</picker-view-column>
					<picker-view-column>
						<text class="graceDateTime-item gui-block-text" 
						v-for="(item, index) in sDate[2]" 
						:key="index">{{item}}{{units[2]}}</text>
					</picker-view-column>
					<picker-view-column v-if="isTime">
						<text class="graceDateTime-item" 
						v-for="(item, index) in sDate[3]" 
						:key="index">{{item}}{{units[3]}}</text>
					</picker-view-column>
					<picker-view-column v-if="isTime && isMinute">
						<text class="graceDateTime-item gui-block-text" 
						v-for="(item, index) in sDate[4]" 
						:key="index">{{item}}{{units[4]}}</text>
					</picker-view-column>
					<picker-view-column  v-if="isTime && isMinute && isSecond">
						<text class="graceDateTime-item gui-block-text" 
						v-for="(item, index) in sDate[5]" 
						:key="index">{{item}}{{units[5]}}</text>
					</picker-view-column>
				</picker-view>
				<!-- #endif -->
				<!-- #ifdef MP-ALIPAY -->
				<!-- 时分秒 -->
				<picker-view :indicator-style="indicatorStyle" 
				class="graceDateTime-main" 
				:value="defaultVal" 
				@change="change" 
				:style="{height:height, width:width}" 
				v-if="isTime && isSecond && isMinute">
					<picker-view-column>
						<text class="graceDateTime-item gui-block-text" 
						v-for="(item, index) in sDate[0]" 
						:key="index">{{item}}{{units[0]}}</text>
					</picker-view-column>
					<picker-view-column>
						<text class="graceDateTime-item gui-block-text" 
						v-for="(item, index) in sDate[1]" 
						:key="index">{{item}}{{units[1]}}</text>
					</picker-view-column>
					<picker-view-column>
						<text class="graceDateTime-item gui-block-text" 
						v-for="(item, index) in sDate[2]" 
						:key="index">{{item}}{{units[2]}}</text>
					</picker-view-column>
					<picker-view-column>
						<text class="graceDateTime-item" 
						v-for="(item, index) in sDate[3]" 
						:key="index">{{item}}{{units[3]}}</text>
					</picker-view-column>
					<picker-view-column>
						<text class="graceDateTime-item gui-block-text" 
						v-for="(item, index) in sDate[4]" 
						:key="index">{{item}}{{units[4]}}</text>
					</picker-view-column>
					<picker-view-column>
						<text class="graceDateTime-item gui-block-text" 
						v-for="(item, index) in sDate[5]" 
						:key="index">{{item}}{{units[5]}}</text>
					</picker-view-column>
				</picker-view>
				<!-- 时分 -->
				<picker-view :indicator-style="indicatorStyle"
				class="graceDateTime-main" 
				:value="defaultVal" @change="change" 
				:style="{height:height, width:width}" 
				v-else-if="isTime && isMinute && !isSecond">
					<picker-view-column>
						<text class="graceDateTime-item gui-block-text" 
						v-for="(item, index) in sDate[0]" 
						:key="index">{{item}}{{units[0]}}</text>
					</picker-view-column>
					<picker-view-column>
						<text class="graceDateTime-item gui-block-text" 
						v-for="(item, index) in sDate[1]" 
						:key="index">{{item}}{{units[1]}}</text>
					</picker-view-column>
					<picker-view-column>
						<text class="graceDateTime-item gui-block-text" 
						v-for="(item, index) in sDate[2]" 
						:key="index">{{item}}{{units[2]}}</text>
					</picker-view-column>
					<picker-view-column>
						<text class="graceDateTime-item" 
						v-for="(item, index) in sDate[3]" 
						:key="index">{{item}}{{units[3]}}</text>
					</picker-view-column>
					<picker-view-column>
						<text class="graceDateTime-item gui-block-text" 
						v-for="(item, index) in sDate[4]" 
						:key="index">{{item}}{{units[4]}}</text>
					</picker-view-column>
				</picker-view>
				<!-- 时 -->
				<picker-view :indicator-style="indicatorStyle"
				class="graceDateTime-main" 
				:value="defaultVal" @change="change" 
				:style="{height:height, width:width}" 
				v-else-if="isTime && !isMinute">
					<picker-view-column>
						<text class="graceDateTime-item gui-block-text" 
						v-for="(item, index) in sDate[0]" 
						:key="index">{{item}}{{units[0]}}</text>
					</picker-view-column>
					<picker-view-column>
						<text class="graceDateTime-item gui-block-text" 
						v-for="(item, index) in sDate[1]" 
						:key="index">{{item}}{{units[1]}}</text>
					</picker-view-column>
					<picker-view-column>
						<text class="graceDateTime-item gui-block-text" 
						v-for="(item, index) in sDate[2]" 
						:key="index">{{item}}{{units[2]}}</text>
					</picker-view-column>
					<picker-view-column>
						<text class="graceDateTime-item" 
						v-for="(item, index) in sDate[3]" 
						:key="index">{{item}}{{units[3]}}</text>
					</picker-view-column>
				</picker-view>
				<picker-view :indicator-style="indicatorStyle"
				class="graceDateTime-main" 
				:value="defaultVal" @change="change" 
				:style="{height:height, width:width}" 
				v-else-if="!isTime">
					<picker-view-column>
						<text class="graceDateTime-item gui-block-text" 
						v-for="(item, index) in sDate[0]" 
						:key="index">{{item}}{{units[0]}}</text>
					</picker-view-column>
					<picker-view-column>
						<text class="graceDateTime-item gui-block-text" 
						v-for="(item, index) in sDate[1]" 
						:key="index">{{item}}{{units[1]}}</text>
					</picker-view-column>
					<picker-view-column>
						<text class="graceDateTime-item gui-block-text" 
						v-for="(item, index) in sDate[2]" 
						:key="index">{{item}}{{units[2]}}</text>
					</picker-view-column>
				</picker-view>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>
<script>
export default {
	name  : "gui-datetime",
	props : {
		cancelText    : { type : String,  default : '取消' },
		cancelTColor  : { type : String,  default : '#888888' },
		confirmText   : { type : String,  default : '确定' },
		confirmColor  : { type : String,  default : '#008AFF' },
		value         : { type : String , default : ''},
		isTime        : { type : Boolean, default : true},
		isMinute      : { type : Boolean, default : true},
		isSecond      : { type : Boolean, default : true},
		startYear     : { type : Number,  default : 1980},
		endYear       : { type : Number,  default : 2050},
		units         : { type : Array ,  default : function(){return new Array('年','月','日','时','分','秒')}},
		height        : { type : String,  default : '300rpx' },
		zIndex        : { type : Number,  default : 90},
		width         : { type : String,  default : '750rpx' }
	},
	data() {
		return {
			show:false,
			indicatorStyle : 'height:35px',
			defaultVal     : [0,0,0,0,0,0],
			sDate:[[],[],[],[],[],[]],
			timer:null,
			show : false
		}
	},
	created() {
		this.init();
	},
	methods: {
		stopfun:function(e){e.stopPropagation(); return ;},
		now : function () {
			var date = new Date();
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			m = m < 10 ? ('0' + m) : m;
			var d = date.getDate();
			d = d < 10 ? ('0' + d) : d;
			var h = date.getHours();
			h = h < 10 ? ('0' + h) : h;
			var minute = date.getMinutes();
			var second = date.getSeconds();
			minute = minute < 10 ? ('0' + minute) : minute;
			second = second < 10 ? ('0' + second) : second;
			return y + '-' + m + '-' + d + ' '+ h +':' + minute + ':' + second;
		},
		arrayIndexOf : function(arr, needFind){
			var index = -1;
			for(let i = 0; i < arr.length; i++){if(arr[i] == needFind){index = i; return i;}}
			return index;
		},
		setValue : function (val) {
			if(val == ''){val = this.now();}
			var reg = /^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
			var res = val.match(reg);
			if(res == null){
				reg = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
				res = val.match(reg);
				if(res == null){
					this.setValue(this.now());
					return ;
				}
				res[4] = '00';
				res[5] = '00';
				res[6] = '00';
			}
			this.setDefaults([res[1],res[2],res[3],res[4],res[5],res[6]]);
		},
		setDefaults : function (res) {
			for(let i = 0; i < res.length; i++){
				var index = this.arrayIndexOf(this.sDate[i], res[i]);
				if(index == -1){index = 0;}
				this.defaultVal.splice(i, 1, index);
			}
			this.changeBase(this.defaultVal);
		},
		// 初始化组件
		init:function(){
			if(this.endYear < this.startYear){this.endYear = this.startYear + 10;}
			var years     = new Array();
			for(let i = this.startYear; i <= this.endYear; i++){years.push(i);}
			var months     = new Array();
			for(let i = 1; i <= 12; i++){if(i < 10){months.push('0'+i);}else{months.push(i);}}
			var days     = new Array();
			for(let i = 1; i <= 31; i++){if(i < 10){days.push('0'+i);}else{days.push(i);}}
			var hours     =  new Array();
			for(let i = 0; i < 24; i++){if(i < 10){hours.push('0'+i);}else{hours.push(i);}}
			var minutes  =  new Array();
			var seconds  =  new Array();
			for(let i = 0; i < 60; i++){
				if(i < 10){minutes.push('0'+i); seconds.push('0'+i);}else{minutes.push(i); seconds.push(i);}
			}
			this.sDate = [years, months, days, hours, minutes, seconds];
			this.$nextTick(()=>{setTimeout(()=>{ this.setValue(this.value);}, 500);});
		},
		change : function (res) {
			if(this.timer != null){clearTimeout(this.timer);}
			this.timer = setTimeout(()=>{this.changeBase(res.detail.value);},500);
		},
		changeBase:function(res){
			var date = new Date(this.sDate[0][res[0]], this.sDate[1][res[1]], 0);
			var days = date.getDate();
			var daysOut = new Array();
			for(let i = 1; i <= days; i++){if(i < 10){daysOut.push('0'+i);}else{daysOut.push(i);}}
			this.sDate.splice(2, 1, daysOut);
			if(res[2] + 1 > days){res[2] = days - 1;}
			this.defaultVal = res;
			if(this.isTime){
				var resdata = new Array(this.sDate[0][this.defaultVal[0]],
				this.sDate[1][this.defaultVal[1]],
				this.sDate[2][this.defaultVal[2]],
				this.sDate[3][this.defaultVal[3]],
				this.sDate[4][this.defaultVal[4]],
				this.sDate[5][this.defaultVal[5]]);
			}else{
				var resdata = new Array(
					this.sDate[0][this.defaultVal[0]],
					this.sDate[1][this.defaultVal[1]],
					this.sDate[2][this.defaultVal[2]]
				)
			}
			this.$emit('change', resdata);
		},
		confirm:function () {
			if(this.isTime){
				var res = new Array(this.sDate[0][this.defaultVal[0]],
				this.sDate[1][this.defaultVal[1]],
				this.sDate[2][this.defaultVal[2]],
				this.sDate[3][this.defaultVal[3]],
				this.sDate[4][this.defaultVal[4]],
				this.sDate[5][this.defaultVal[5]]);
			}else{
				var res = new Array(this.sDate[0][this.defaultVal[0]],
				this.sDate[1][this.defaultVal[1]],
				this.sDate[2][this.defaultVal[2]])
			}
			this.$emit('confirm', res);
			this.close();
		},
		open : function () {
			this.show = true;
		},
		close : function () {
			this.show = false;
		}
	}
}
</script>
<style scoped>
.gui-dateBT-shade{width:750rpx; position:fixed; background-color:rgba(0,0,0,0.5); z-index:99; left:0; top:0; bottom:0; flex:1; overflow:hidden;}
.graceDateTime-header{padding:25rpx;}
.graceDateTime-header-btn{width:200rpx; line-height:38rpx; height:38rpx; font-size:28rpx;}
.graceDateTime-main{width:750rpx; color:#232323;}
.graceDateTime-item{height:35px; font-size:14px; line-height:35px; overflow:hidden; text-align:center;}
/* #ifndef APP-NVUE */
.graceDateTime-item{display:block; width:100%;}
/* #endif */
</style>
