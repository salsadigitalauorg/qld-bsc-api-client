import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(VueRouter)
var router = new VueRouter({
  mode: 'history',
  routes: []
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
