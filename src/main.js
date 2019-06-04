import Vue from 'vue'
import App from './App.vue'
import router from './route'
import store from './store'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import './plugins/element-ui.js'
import './style/index.scss'
import './assets/ant-icon'

Vue.config.productionTip = false;

Vue.component('vScroll', VuePerfectScrollbar);

Vue.prototype.$vars = store.state.style.vars;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
