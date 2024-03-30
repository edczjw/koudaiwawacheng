import Vue from 'vue'
import store from './store'
import App from './App'
import utils from "@/common/utils";
import $C from "@/common/config.js"
import Json from 'Json.js'

const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
	})
}

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$prePage = prePage;
uni.$api={json};
Vue.prototype.$utils = utils;

uni.authJump = (options)=>{
	if(!store.state.token){
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		});
		return uni.navigateTo({
			url: '/pages/public/login'
		});
	}
	uni.navigateTo(options);
}

App.mpType = 'app'

/* 全局挂载请求库 */
// import GraceRequest from './GraceUI5/js/request/request.js'
import $H from '@/common/request.js'
uni.http = $H;

uni.http.get('conf.json').then(res=>{
	uni.conf = res;
})

import nlist from '@/components/nlist/nlist.vue'
Vue.component("nlist",nlist)

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

// #ifdef H5
// import vconsole from 'vconsole' // 引入vconsole
// Vue.prototype.$vconsole = new vconsole() // 使用vconsole
// #endif

const errorHandler = (err, vm, info)=>{
    console.error(err);
    console.error(vm);
    // console.log(vm.$scope.route);
    console.error(info);
    let errInfo = "err="+err+"&info="+info+"&path="+vm.$scope.route;
}
Vue.config.errorHandler = errorHandler;


const app = new Vue({
	...App
})
app.$mount()