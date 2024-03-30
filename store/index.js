import Vue from 'vue'
import Vuex from 'vuex'
import $C from '@/common/config.js';
import socketio from '@/common/uni-socket.io.js'
import netstatus from '@/common/netstatus.js'
import scrollMessage from '@/common/scroll-message.js'
import $request from '@/common/request.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		user:null,
		token:null,
		socket:null,
		offsetTime:0,
		screenHeight: 1000,
		gameSet:{
			volume: true
		},
		reconnectCnt:0,
		currentMachine:null
	},
	mutations:{
		setCurrentMachine(state,data) {
			state.currentMachine = data
		},
		setUser(state,data) {
			state.user = data
		},
		setToken(state,data) {
			state.token = data
		}
	},
	actions: {
		initConf({state,dispatch}){
			uni.http.get('conf.json').then(res=>{
				uni.conf = res
			})
		},
		// 断开socket连接
		closeSocket({ state,dispatch }){
			if(state.socket){
				state.socket.close()
			}
		},
		// 连接socket
		connectSocket({ state,dispatch }){
			if(state.socket || state.isConnecting){
				return;
			}
			if(!uni.conf){
				uni.http.get('conf.json').then(res=>{
					uni.conf = res
					dispatch("connectSocket");
				})
				return
			}
			const S = socketio(uni.conf.server,{
				query:{token:state.token},
				transports:['websocket'],
				timeout:2000
			})
			
			let onlineEvent = (e)=>{
				uni.$emit('live',{
					type:"online",
					data:e
				})
			}
			let changeStatusEvent = (e)=>{
				uni.$emit('live',{
					type:"changeStatus",
					data:e
				})
			}
			
			// 监听连接
			S.on('connect',()=>{
				console.log('已连接')
				state.reconnectCnt = 0;
				state.isConnecting = false
				state.socket = S
				// socket.io唯一链接id，可以监控这个id实现点对点通讯
				const { id } = S
				S.on(id,(e)=>{
					console.log(e)
				})
				
				// 监听在线用户信息
				S.on('online',onlineEvent)
				// 监听娃娃机状态变化
				S.on('changeStatus',changeStatusEvent)
				//调用协议进行登陆
				dispatch('socketSlogin')
			})
			// 监听失败
			S.on('error',()=>{
				state.socket = null
				console.log('连接失败')
				dispatch("initConf");
			})
			// 监听断开
			S.on('disconnect',()=>{
				state.socket = null
				uni.$emit('socketdisconnect');
			})
			S.on('reconnecting', function(data){
			    console.log(data + ' - reconnecting');
			});
			S.on('connect_error', function(data){
			    console.log(data + ' - connect_error');
				if(state.reconnectCnt > 10){
					S.close();
					uni.showModal({
						title:"提示",
						content:"连接服务器失败",
						showCancel:false,
						success: (res) => {
							netstatus.close();
							dispatch("logout");
						}
					})
				}
			});
			S.on('connect_timeout', function(data){
			    console.log(data + ' - connect_timeout');
			});
			S.on('reconnect', function(data){
			    // console.log(data + ' - reconnect');
			});
			S.on('reconnect_attempt', function(data){
				uni.$emit('reconnect_attempt');
				state.reconnectCnt = data;
				if(data%5===0){
					dispatch("initConf");
				}
			});
			S.on('reconnect_error', function(data){
			    console.log(data + ' - reconnect_error');
			});
			
			S.on('reconnect_failed', function(data){
			    console.log(data + ' - reconnect_failed');
			});
			S.on('ping', function(data){
			    // console.log('ping');
				state.socket.emit('90002',{});
			});
			S.on('pong', function(data){
			    // console.log(data + ' - pong');
			});
			S.on('90002',(e)=>{
				let localTimestamp = parseInt(new Date().getTime()/1000);
				state.offsetTime = Number(e.timestamp) - Number(localTimestamp);
			});
			//全局飘字
			S.on('10012',(e)=>{
				let message = {
					nick:e.userNick,
					dollName:e.dollName
				}
				scrollMessage.push(message);
			});
			//异地登录
			S.on('10009',(data)=>{
				if(data.rtnCode != 0){
					uni.showModal({
						title:"提示",
						content:data.desc,
						showCancel:false,
						success: (res) => {
							netstatus.close();
							dispatch("logout");
						}
					})
				}
			})
		},
		authMethod({ state },callback){
			if(!state.token){
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				return uni.navigateTo({
					url: '/pages/public/login'
				});
			}
			callback()
		},
		// 初始化用户登录状态
		initUser({ state,dispatch }){
			let u = uni.getStorageSync('user')
			let t = uni.getStorageSync('token')
			if(u){
				state.user = JSON.parse(u)
				state.token = t
				// 连接socket
				console.log('连接socket')
				dispatch('connectSocket')
			}
		},
		logout({ state,dispatch }){
			uni.http.post('/logout',{},{
				token:true,toast:false
			})
			state.user = null
			state.token = null
			console.log('断开socket')
			dispatch('closeSocket')
			uni.removeStorageSync('user')
			uni.removeStorageSync('token')
		},
		login({ state,dispatch },token){
			state.token = token
			uni.setStorageSync('token',token)
			// 连接socket
			console.log('连接socket')
			dispatch('getUserInfo')
			dispatch('connectSocket')
		},
		socketSlogin({state,dispatch}){
			dispatch('authMethod',()=>{
				$request.socketReq('10000',{token:state.token},(res)=>{
					if(res.rtnCode == 0){
						uni.$emit('socketSloginsuccess');
					}else{
						uni.showModal({
							title:"提示",
							content:res.msg,
							showCancel:false,
							success: (res) => {
								netstatus.close();
								dispatch("logout");
							}
						})
					}
				});
			});
		},
		getUserInfo({ state }){
			if(state.token){
				uni.http.post('user/info',null,{
					token:true
				}).then(res=>{
					if(res.code == 200){
						state.user = res.data
						uni.setStorage({
							key:"user",
							data:JSON.stringify(state.user)
						})
					}
				})
			}
		}
	}
})

export default store
