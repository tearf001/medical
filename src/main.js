// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import '@/styles/common.less'
import vueResource from 'vue-resource'
import store from './store'
import '@/styles/theme.less'
import 'animate.css'
import Cookies from 'js-cookie'

Vue.use(iView)
Vue.use(vueResource)

Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
	iView.LoadingBar.start();
	
	store.commit('setTaken',Cookies.get('taken'));
	console.log(Cookies.get('taken'));

	if(to.path!=='/'){
		if(store.state.token){
			next();
		}else{
			next({ path: '/' });
		}
	}else{
		next();
	}
	iView.LoadingBar.finish();
	

})
router.afterEach(route=>{
	iView.LoadingBar.finish();
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
