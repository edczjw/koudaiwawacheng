<template>
	<view class="content gui-margin">
		<!-- #ifdef H5 -->
		<view class="navigateBack-btn" @click="$utils.navigateBack()">
			<image class="navigateBack-img" src="../../static/imgs/goback.png"></image>
		</view>
		<!-- #endif -->
		<view class="row b-b">
			<text class="tit">支付宝账号</text>
			<input class="input" type="text" v-model="data.alipayCount" placeholder="请输入支付宝账号" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">真实姓名</text>
			<input class="input" type="text" v-model="data.realname" placeholder="请输入真实姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">提现金额</text>
			<input class="input" type="number" v-model="data.value" placeholder="请输入提现金额" placeholder-class="placeholder" />
		</view>
		<view class="row b-b" v-if="tip">
			<text class="tip">{{tip}}</text>
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:{
					alipayCount: '',
					realname: '',
					value: ''
				},
				tip: ''
			}
		},
		onLoad(){
			this.init()
		},
		methods: {
			init(){
				this.data.alipayCount = this.$store.state.user.alipayCount;
				this.data.realname = this.$store.state.user.realname;
				this.getWithdrawTip();
			},
			getWithdrawTip(){
				uni.http.get('user/withdrawTip', {token:true}).then(res=>{
					if(res.code == 200){
						this.tip = res.msg;
					}
				}).catch(err=>{
				    console.log(err);
				})
			},
			//提交
			confirm(){
				let data = this.data;
				if(!data.alipayCount){
                    uni.showToast({
                    	title: '请填写支付宝账号',
                    	icon: 'none'
                    });
					return;
				}
				if(!data.realname){
				    uni.showToast({
				    	title: '请填写真实姓名',
				    	icon: 'none'
				    });
					return;
				}
				if(!data.value){
				    uni.showToast({
				    	title: '请填写提现金额',
				    	icon: 'none'
				    });
					return;
				}
                
                uni.http.post('user/withdraw', data, {token:true}).then(res=>{
					if(res.code == 200){
						uni.showToast({
							title: "已提交,等待审核",
							icon: 'none'
						});
						this.$store.dispatch('getUserInfo');
						setTimeout(function() {
							uni.navigateBack();
						}, 500);
						
					}else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
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
		
		.tip{
			color: red;
			font-size: 26upx;
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
