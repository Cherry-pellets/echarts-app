import Vue from 'vue'
import App from './App.vue'
import  '@/assets/style/index.scss'
import router from '@/routes'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as Echarts from 'echarts'

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.$echarts = Echarts

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
