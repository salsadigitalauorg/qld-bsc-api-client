import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from './pages/Main.vue'
import ProfilePage from './pages/ProfilePage.vue'
import ResultsPage from './pages/ResultsPage.vue'
import FullPage from './pages/FullPage.vue'

Vue.config.productionTip = false

// Set up routes
Vue.use(VueRouter)
var router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', component: ProfilePage },
    { path: '/results', name: 'results', component: ResultsPage },
    { path: '/service/:id', name: 'service', component: FullPage },
  ]
});

new Vue({
  router,
  render: h => h(Main),
}).$mount('#app')
