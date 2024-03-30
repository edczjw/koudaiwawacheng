<template>
	<view class="content b-t">
		<!-- #ifdef H5 -->
		<view class="navigateBack-btn" @click="$utils.navigateBack()">
			<image class="navigateBack-img" src="../../static/imgs/goback.png"></image>
		</view>
		<!-- #endif -->
		<gui-empty v-if="!addressList || addressList.length == 0">
			<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
				<image class="gui-empty-img" 
				src="../../static/imgs/nulldata.webp"></image>
			</view>
			<text slot="text" 
			class="gui-text-small gui-block-text gui-text-center gui-margin-top" style="color:#9DABFF;">暂无数据</text>
		</gui-empty>
		<view class="list b-b" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
			<view class="wrapper">
				<view class="address-box">
					<text v-if="item.isDefault==1" class="tag">默认</text>
					<text class="address">{{item.addressName}} {{item.addressDetails}}</text>
				</view>
				<view class="u-box">
					<text class="name">{{item.realname}}</text>
					<text class="mobile">{{item.phone}}</text>
				</view>
			</view>
			<text class="yticon icon-bianji" @click.stop="addAddress('edit', item)"></text>
            <text class="yticon icon-fork" @click.stop="delAddress(item)"></text>
		</view>
		<!-- <text style="display:block;padding: 16upx 30upx 10upx;lihe-height: 1.6;color: #fa436a;font-size: 24upx;">
			重要：添加和修改地址回调仅增加了一条数据做演示，实际开发中将回调改为请求后端接口刷新一下列表即可
		</text> -->
		
		<button class="add-btn" @click="addAddress('add')">新增地址</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				source: 0,
				addressList: [
					// {
					// 	name: '刘晓晓',
					// 	mobile: '18666666666',
					// 	addressName: '贵族皇仕牛排(东城店)',
					// 	address: '北京市东城区',
					// 	area: 'B区',
					// 	default: true
					// },{
					// 	name: '刘大大',
					// 	mobile: '18667766666',
					// 	addressName: '龙回1区12号楼',
					// 	address: '山东省济南市历城区',
					// 	area: '西单元302',
					// 	default: false,
					// }
				]
			}
		},
		onLoad(option){
			console.log(option.source);
			this.source = option.source;
            
            this.getAddressList();
		},
		methods: {
			//选择地址
			checkAddress(item){
				if(this.source == 1){
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().addressData = item;
					uni.navigateBack()
				}
			},
			addAddress(type, item){
				uni.navigateTo({
					url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}`
				})
			},
            //删除地址
            delAddress(item){
                uni.showModal({
                    title: '提示',
                    content: '是否确认删除该地址',
                    success: (res)=>{
                        if(res.confirm){
                            uni.http.post('address/del', {id:item.id}, {token:true}).then(res=>{
                                console.log(JSON.stringify(res));
                                if(res.code==200){
                                    this.getAddressList();
                                    uni.showToast({
                                    	title: '删除成功',
                                    	icon: 'none'
                                    });
                                }
                            }).catch(err=>{
                                console.log(err);
                            })
                        }
                    }
                });
            },
			//添加或修改成功之后回调
			refreshList(data, type){
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
				this.addressList.unshift(data);
				
				console.log(data, type);
			},
            getAddressList(){
                uni.http.get('address/list', {token:true}).then(res=>{
                    console.log(JSON.stringify(res));
                    if(res.code==200){
                        this.addressList = res.data;
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
		}
	}
</script>

<style lang='scss'>
	page{
		padding-bottom: 120upx;
	}
	.content{
		position: relative;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;;
		background: #fff;
		position: relative;
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.address-box{
		display: flex;
		align-items: center;
		.tag{
			font-size: 24upx;
			color: $base-color;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}
		.address{
			font-size: 30upx;
			color: $font-color-dark;
		}
	}
	.u-box{
		font-size: 28upx;
		color: $font-color-light;
		margin-top: 16upx;
		.name{
			margin-right: 30upx;
		}
	}
	.icon-bianji{
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}
    .icon-fork{
        display: flex;
        align-items: center;
        height: 80upx;
        font-size: 40upx;
        color: $font-color-light;
        padding-left: 30upx;
    }
	
	.add-btn{
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);		
	}
</style>
