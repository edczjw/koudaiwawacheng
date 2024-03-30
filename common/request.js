import $store from '@/store/index.js';
import $C from './config.js';
import $utils from './utils.js';
import $ali from './ali.js';
export default {
    // 全局配置
    common:{
        baseUrl:$C.baseUrl,
        header:{
            'Content-Type':'application/x-www-form-urlencoded',
        },
        data:{},
        method:'GET',
        dataType:'json',
        token:false
    },
    // 请求 返回promise
    request(options = {}){
        // 组织参数
        options.url = (options.url.indexOf("http:") != -1 || options.url.indexOf("https:") != -1) ? options.url : (this.common.baseUrl + options.url)
        options.header = options.header || this.common.header
        options.data = options.data || this.common.data
        options.method = options.method || this.common.method
        options.dataType = options.dataType || this.common.dataType
        options.token = options.token === true ?  true : this.common.token
		
        // 请求
        return new Promise((res,rej)=>{
			// options.header.app = "tlzww";
			
			// 请求之前验证...
			// token验证
			/* if (options.token) {
			    let token = uni.getStorageSync('token')
			    // 二次验证
			    if (!token && options.noJump !== true) {
			        uni.showToast({ title: '请先登录', icon: 'none' });
			        // token不存在时跳转
					uni.navigateTo({
					    url: '/pages/public/login',
					});
					return rej("请先登录") 
			    }
			    // 往header头中添加token
			    options.header.token = token
			} */
			let token = uni.getStorageSync('token')
			options.header.token = token || "";
			let timestamp = new Date().getTime();
			options.header.timestamp = timestamp;
			
			let signParams = options.data
			if($utils.isEmpty(signParams)){
				signParams = $ali.parseQueryString(options.url);
			}
			let signstr = $ali.sign(token,timestamp,signParams);
			options.header.sign = signstr;
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
				let clientVersion = widgetInfo.version;
				// let client = widgetInfo;
				options.header.clientVersion = clientVersion;
			});
			// #endif
			
			uni.getSystemInfo({
				success: (res) => {
					options.header.platform = res.platform;
					options.header.model = res.model;
					options.header.system = res.system;
					options.header.version = res.version;
				}
			})
			
			// #ifdef H5
			options.header.clientVersion = "1.0.0";
			options.header.platform = "h5";
			// #endif
			
            // 请求中...
            uni.request({
                ...options,
                success: (result) => {
                    // 返回原始数据
                    if(options.native){
                        return res(result)
                    }
                    // 服务端失败
                    if(result.statusCode !== 200){
                        if (options.toast !== false && result.data.data) {
                            uni.showToast({
								title: result.data.data,
                                // title: result.data.data || '服务端失败',
                                icon: 'none'
                            });
                        }
                        return rej(result.data) 
                    }
					// token不合法，直接退出登录
					if(result.data.code === 999 ){
						uni.showToast({
							title: result.data.msg,
							icon: 'none'
						});
						
						if(result.data.toLogin){
							$store.dispatch('logout')
						}
						
						return rej(result.data) 
					}
                    // 其他验证...
                    // 成功
                    let data = result.data
                    res(data)
                },
                fail: (error) => {
                    uni.showToast({ title: error.msg || '网络异常!请稍后重试', icon: 'none' });
                    return rej(error)
                }
            });
        })
    },
	
    // get请求
    get(url,options = {}){
        options.url = url
        options.data = {}
        options.method = 'GET'
        return this.request(options)
    },
    // post请求
    post(url,data = {},options = {}){
        options.url = url
        options.data = data
        options.method = 'POST'
        return this.request(options)
    },
    // delete请求
    del(url,data = {},options = {}){
        options.url = url
        options.data = data
        options.method = 'DELETE'
        return this.request(options)
    },
	socketReq(protoId,reqData, callback){
		if($store.state.socket){
			$store.state.socket.removeAllListeners('' + protoId);
			$store.state.socket.on("" + protoId, (res)=>{
				callback(res);
			})
			$store.state.socket.emit(""+protoId, reqData);
		}
	},
	socketOn(protoId, callback, isMultiple){
		if(!isMultiple || isMultiple == false){
			this.clearSocket(protoId);
		}
		$store.state.socket.on("" + protoId, (res)=>{
			callback(res);
		})
	},
	clearSocket(protoId) {
		$store.state.socket.removeAllListeners('' + protoId);
	},
	isSocketConnected(){
		if(!$store.state.socket){
			return false
		}
		return true;
	},
	// 上传文件
	upload(url,data,onProgress = false){
		return new Promise((result,reject)=>{
			// 上传
			let token = uni.getStorageSync('token')
			if (!token) {
			    uni.showToast({ title: '请先登录', icon: 'none' });
			    // token不存在时跳转
			    return uni.reLaunch({
			        url: '/pages/public/login',
			    });
			}
			
			const uploadTask = uni.uploadFile({
				url:this.common.baseUrl + url,
				filePath:data.filePath,
				name:data.name || "files",
				header:{ token },
				formData:data.formData || {},
				success: (res) => {
					if(res.statusCode !== 200){
						result(false)
						return uni.showToast({
							title: '上传失败',
							icon: 'none'
						});
					}
					let message = JSON.parse(res.data)
					result(message.data);
				},
				fail: (err) => {
					reject(err)
				}
			})
			
			uploadTask.onProgressUpdate((res) => {
				if(typeof onProgress === 'function'){
					onProgress(res.progress)
				}
			});
			
		})
	}
}