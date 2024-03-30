<template>
	<view>
		<!-- 购物车主结构  -->
        <view class="gui-shoppingcard-goods gui-flex gui-rows gui-nowrap gui-align-items-center
        gui-space-between gui-border-b" 
        v-for="(item, indexItem) in dollList" :key="indexItem" @tap="itemSelect(indexItem)">
            <view class="gui-shoppingcard-goods-checkbtn">
                <radio :checked="item.checked"></radio>
            </view>
            <image :src="$utils.formatImg(item.thumbnail)" mode="widthFix"
            class="gui-shoppingcard-goods-image"></image>
            <view class="gui-shoppingcard-goods-body">
                <text class="gui-shoppingcard-goods-title gui-text gui-primary-color 
                gui-block-text">{{item.dollName}}</text>
                <view class="gui-space-between">
                    <text class="gui-shoppingcard-goods-price gui-block-text">
                        可兑积分{{item.exchangeJifen}}</text>
                    <view class="gui-shoppingcard-goods-number">
                        <text class="gui-color-gray">{{item.createTime}}</text>
                    </view>
                </view>
            </view>
        </view>
		<!-- 购物车底部 -->
		<view style="height:120rpx;"></view>
		<view class="gui-shoppingcard-footer gui-bg-gray  gui-border-box gui-border-t">
			<view class="gui-flex gui-rows gui-space-between gui-align-items-center">
				<view class="gui-shoppingcard-checkbtn gui-flex grace-nowrap">
					<gui-radio :checked="false" checkedColor="#008AFF" 
					@change="itemChangeAll">
						<text class="gui-text gui-primary-color">{{selectText}}</text>
					</gui-radio>
				</view>
                <view class="gui-shoppingcard-count gui-flex gui-column
                gui-align-items-center gui-block-text" @tap="exchange">
					<view class="gui-text gui-color-white">兑换积分</view>
					<view class="gui-color-white">可兑换{{totalJifen}}积分</view>
				</view>
				<text class="gui-shoppingcard-checkout gui-bg-red gui-block-text gui-color-white" 
				@tap="applyDeliver">申请发货</text>
			</view>
			<!-- 如果购物车处于switch页面，请删除下面的组件 -->
			<view>
				<gui-iphone-bottom></gui-iphone-bottom>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
            dollList: [],
			// 总积分
			totalJifen : 0,
			// 选择文本
			selectText : '全不选',
        }
	},
	onLoad : function(){
        this.loadData();
	},
	methods:{
        loadData: function(){
            uni.http.get('/user/myDollList?status=1&pageSize=20',{token:true}).then(res=>{
                console.log(JSON.stringify(res));
                this.dollList = res.data;
            }).catch(err=>{
                
            });
        },
		//计算总计函数
		countTotoal:function(){
			var total = 0;
			for (var i = 0; i < this.dollList.length; i++){
                if(this.dollList[i].checked){
                    total += Number(this.dollList[i].exchangeJifen);
                }
			}
			this.totalJifen = total;
		},
        // 申请发货
        applyDeliver:function(){
            let selectList = [];
            for(let i=0; i<this.dollList.length; i++){
                if(this.dollList[i].checked){
                    selectList.push(this.dollList[i]);
                }
            }
            console.log(JSON.stringify(selectList));
        },
        // 兑换积分
        exchange:function(){
            let selectList = [];
            for(let i=0; i<this.dollList.length; i++){
                if(this.dollList[i].checked){
                    selectList.push(this.dollList[i]);
                }
            }
            console.log(JSON.stringify(selectList));
        },
		// 选中
        itemSelect: function(index){
            this.dollList[index].checked = !this.dollList[index].checked
            this.countTotoal();
        },
        // 全选/全不选
		itemChangeAll : function (e) {
			this.selectText = e[0] ? '全选' : '全不选';
			for(var i = 0; i < this.dollList.length; i++){
				this.dollList[i].checked = e[0];
			}
			this.countTotoal();
		}
	}
}
</script>
<style>
.gui-shoppingcard{border-radius:8rpx; padding:20rpx 30rpx;}
.gui-shopp-name{width:200rpx; flex:1;}
.gui-shopp-go{width:120rpx; text-align:right;}
.gui-shoppingcard-goods{padding:20rpx 30rpx; height: 180rpx;}
.gui-shoppingcard-goods-checkbtn{width:60rpx;}
.gui-shoppingcard-goods-image{width:120rpx; margin-right:20rpx;}
.gui-shoppingcard-goods-body{width:400rpx; flex:1; overflow:hidden;}
.gui-shoppingcard-goods-title{font-size:32rpx;}
.gui-shoppingcard-goods-price{color:#FF0036; font-size:28rpx;}
.gui-shoppingcard-goods-number{padding:2px 0; font-size:28rpx;}
.gui-shoppingcard-remove{text-align:right; line-height:50rpx; margin-top:20rpx; font-size:24rpx;}
.gui-shoppingcard-footer{position:fixed; z-index:99; left:0; bottom:0; width:750rpx; padding-left:30rpx;}
.gui-shoppingcard-checkbtn{width:200rpx;}
.gui-shoppingcard-count{width:200rpx; flex:1; height:100rpx; font-size:28rpx; text-align:center; background-color: #008AFF;}
.gui-shoppingcard-checkout{width:260rpx; height:100rpx; line-height:100rpx; font-size:28rpx; text-align:center;}

/* 如果购物车放在 switch 页面并且是 h5 端请打开注释启用下面的样式 */
/* #ifdef H5 */
/* .gui-shoppingcard-footer{bottom:50px;} */
/* #endif */
</style>