<template>
	<view>
		<!-- #ifdef H5 -->
		<view class="navigateBack-btn" @click="$utils.navigateBack()">
			<image class="navigateBack-img" src="../../static/imgs/goback.png"></image>
		</view>
		<!-- #endif -->
        <view class="doll-info gui-flex gui-rows gui-nowrap 
        gui-space-between gui-border-b">
            <image :src="$utils.formatImg(thumbnail)" mode="widthFix"
            class="doll-info-image"></image>
            <view class="doll-info-body">
                <text class="doll-info-title gui-primary-color 
                gui-block-text" style="font-size: 32rpx;">{{dollName}}</text>
                <view class="gui-space-between doll-info-text">
                    <text class="gui-color-gray gui-block-text">
                        抓取时间: {{createTime}}</text>
                    <!-- <view>
                        <text class="gui-color-gray">房间号: {{roomId}}</text>
                    </view> -->
                    <view>
                        <text class="gui-color-gray">申诉状态: </text>
                        <text :style="{'color':complaintStatus>0? '#0f0':'#0f0#f00'}">
                        {{complaintStatus>0 ? '已申诉':'未申诉'}}
                        </text>
                    </view>
                </view>
            </view>
        </view>
        <view>
            <view class="reason-text">
                <text class="gui-color-gray">
                    申诉理由（提交后不能修改）
                </text>
            </view>
            <view class="reason-list">
                <view class="reason-item gui-flex gui-align-items-center gui-border-b"
                v-for="(item,index) in reasonList" :key='index' @tap="setSelect(item,index)">
                    <view class="doll-info-checkbtn">
                        <radio :checked="selectIdx===index"></radio>
                    </view>
                    <text class="gui-button-text">{{item.des}}</text>
                </view>
				<view v-show="otherQesShow" style="margin-top: 20rpx;">
					<textarea @input="onInput" name="text" value="" placeholder="说点什么..." 
					class="gui-textarea gui-bg-gray gui-border-box" style="width:690rpx;" />
				</view>
            </view>
        </view>
		<view>
			<izUploaderImg ref="izUploaderImg" style="width: 100%;" @change="imgChange"></izUploaderImg>
		</view>
		
        <button class="confirm-btn my-icons" @click="onSubmit">提交申诉</button>
	</view>
</template>
<script>
import izUploaderImg from '@/components/iz-aloss-uploader-img/iz-aloss-uploader-img.vue'
let fromRecord = false;
export default {
	components:{izUploaderImg},
	data() {
		return {
			recordId: '',
            thumbnail: '',
            dollName: '',
            createTime: '',
            complaintStatus: '',
            selectIdx: -1,
			otherQesShow: false,
			otherQesContent: '',
			imgs: [],
            reasonList: [
				{type:1, des:'娃娃卡在爪子上'},
				{type:2, des:'视频卡顿'},
				{type:3, des:'按键延迟或失灵'},
                {type:4, des:'游戏中闪退'},
                {type:5, des:'抓取成功提示失败'},
				{type:6, des:'机器硬件故障'},
				{type:7, des:'其他问题'}
            ],
        }
	},
	onLoad : function(options){
		const record = JSON.parse(options.record);
		console.log(record);
		this.recordId = record.id;
		this.thumbnail = record.thumbnail;
		this.dollName = record.dollName;
		this.createTime = record.createTime;
		this.complaintStatus = record.complaintStatus;
		fromRecord = options.fromRecord;
	},
	methods:{
		onInput: function(e) {
			this.otherQesContent = e.target.value;
		},
        setSelect: function(item,index){
            this.selectIdx = index;
			
			if(item.type == 7){
				this.otherQesShow = true;
			}else {
				this.otherQesShow = false;
			}
        },
		// 提交申诉
        onSubmit: function(){
			let content = this.reasonList[this.selectIdx].des;
			if(this.selectIdx == this.reasonList.length - 1){
				content = this.otherQesContent;
			}
			uni.http.post('user/submitComplaint',{recordId:this.recordId,content:content,imgs:this.imgs.join(",")}).then(res=>{
				if(res.code==200){
                    if(fromRecord){
                        this.$prePage().refresh();
                    }
                    uni.showToast({
                    	title: '申诉提交成功',
                    	icon: 'none'
                    });
                    setTimeout(()=>{
                    	uni.navigateBack()
                    }, 800)
				}else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
			}).catch(err=>{
				
			});
        },
		imgChange(data) {
			if(data.details){
				this.imgs = [];
				data.details.forEach((item,index) => {
					this.imgs.push(item.url);
				})
			}
		}
	},
	onNavigationBarButtonTap(e) {
		const index = e.index;
		if (index === 0) {
			uni.navigateTo({
			    url: '/pages/complaint/gameRecord'
			});
		}
	}
}
</script>
<style lang='scss'>
.doll-info{padding:20rpx 30rpx;}
.doll-info-checkbtn{width:60rpx;}
.doll-info-image{width:130rpx; margin-right:20rpx;}
.doll-info-body{width:400rpx; flex:1; overflow:hidden;}
.doll-info-title{font-size:36rpx;}
.doll-info-price{color:#FF0036; font-size:28rpx;}
.doll-info-text{font-size:30rpx;}
.reason-text{padding: 30rpx; background-color: #eaeaea;}
.reason-list{padding: 0 30rpx;}
.reason-item{height: 100rpx;}
.confirm-btn{
		width: 630rpx;
		height: 96rpx;
		line-height: 96rpx;
		border-radius: 50px;
		margin-top: 50rpx;
		/* background: $uni-color-primary; */
		color: #000000;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
</style>