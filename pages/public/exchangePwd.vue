<template>
	<view class="content gui-margin">
		<!-- #ifdef H5 -->
		<view class="navigateBack-btn" @click="$utils.navigateBack()">
			<image class="navigateBack-img" src="../../static/imgs/goback.png"></image>
		</view>
		<!-- #endif -->
		<view class="row b-b">
			<input class="input" type="text" v-model="pwd" placeholder="请输入口令,兑换福利" placeholder-class="placeholder" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pwd:''
			}
		},
		onLoad(){
		},
		methods: {
			//提交
			confirm(){
				if(!this.pwd){
				    uni.showToast({
				    	title: '请输入口令',
				    	icon: 'none'
				    });
					return;
				}
				
                uni.http.post('market/exchangePwd', {"pwd":this.pwd}, {token:true}).then(res=>{
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
					if(res.code == 200){
						this.pwd = '';
					}else {
					}
                }).catch(err=>{
                    console.log(err);
                })
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
			width: 200upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
			text-align:center;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
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
	
	.placeholder{text-align: center}
</style>
