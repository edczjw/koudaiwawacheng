<template>
	<view class="content gui-margin">
		<!-- #ifdef H5 -->
		<view class="navigateBack-btn" @click="$utils.navigateBack()">
			<image class="navigateBack-img" src="../../static/imgs/goback.png"></image>
		</view>
		<!-- #endif -->
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressData.realname" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.phone" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">所在地区</text>
			<text @click="openAddressPicker" class="input" :style="{color:(addressData.addressName ? '#303133':'#999999')}">
				{{addressData.addressName?addressData.addressName:'请选择所在地区'}}
			</text>
            <text class="gui-list-arrow-right gui-icons">&#xe601;</text>
		</view>
		<view class="row b-b"> 
			<text class="tit">详细地址</text>
			<input class="input" type="text" v-model="addressData.addressDetails" placeholder="详细地址" placeholder-class="placeholder" />
		</view>
		
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.isDefault==1" color="#fa436a" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
        <gui-area-picker ref="graceAddressPicker" 
            @confirm="areaConfirm" :level="3" cancelText="关闭"></gui-area-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressData: {
					realname: '',
					phone: '',
					addressName: '',
					addressDetails: '',
					isDefault: 0
				}
			}
		},
		onLoad(option){
			let title = '新增收货地址';
			if(option.type==='edit'){
				title = '编辑收货地址'
				
				this.addressData = JSON.parse(option.data)
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			switchChange(e){
				// this.addressData.default = e.detail;
                if(e.detail){
                    this.addressData.isDefault = 1;
                }else{
                    this.addressData.isDefault = 0;
                }
			},
			
			//地图选择地址
			chooseLocation(){
				uni.chooseLocation({
					success: (data)=> {
						this.addressData.addressName = data.address;
					}
				})
			},
			
			//提交
			confirm(){
				let data = this.addressData;
				if(!data.realname){
                    uni.showToast({
                    	title: '请填写联系人',
                    	icon: 'none'
                    });
					return;
				}
				if(!/(^1[0-9]{10}$)/.test(data.phone)){
                    uni.showToast({
                    	title: '请输入正确的手机号码',
                    	icon: 'none'
                    });
					return;
				}
				if(!data.addressName){
                    uni.showToast({
                    	title: '请选择所在地区',
                    	icon: 'none'
                    });
					return;
				}
				if(!data.addressDetails){
                    uni.showToast({
                    	title: '请填写详细地址',
                    	icon: 'none'
                    });
					return;
				}
				
				//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
				// this.$api.prePage().refreshList(data, this.manageType);
				// this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
				// setTimeout(()=>{
				// 	uni.navigateBack()
				// }, 800)
                
                let urlStr = 'address/add';
                let titleStr = '添加成功';
                if(this.manageType=='edit'){
                    urlStr = 'address/edit';
                    titleStr = '修改成功';
                }
				
                uni.http.post(urlStr, data, {token:true}).then(res=>{
                    console.log(JSON.stringify(res));
                    if(res.code == 200){
                        this.$prePage().getAddressList();
                        uni.showToast({
                        	title: titleStr,
                        	icon: 'none'
                        });
                        setTimeout(()=>{
                        	uni.navigateBack()
                        }, 800)
                    }else{
                        uni.showToast({
                        	title: res.msg,
                        	icon: 'none'
                        });
                    }
                }).catch(err=>{
                    console.log(err);
                })
			},
            
            // 地区联动组件相关
            openAddressPicker: function(){this.$refs.graceAddressPicker.open();},
            areaConfirm : function (e) {
                // 返回选中城市的编号及文本信息
                // console.log(e);
                this.addressData.addressName = e.names[0]+e.names[1]+e.names[2];
            },
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 150upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
