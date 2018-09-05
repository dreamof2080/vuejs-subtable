import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'url-search-params-polyfill';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueAxios,axios);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
