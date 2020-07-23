import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from './pages/Main.vue'
import ProfilePage from './pages/ProfilePage.vue'
import ResultsPage from './pages/ResultsPage.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)
var router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', component: ProfilePage },
    { path: '/results', name: 'results', component: ResultsPage },
  ]
});

new Vue({
  router,
  render: h => h(Main),
}).$mount('#app')
