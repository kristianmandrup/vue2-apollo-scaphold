import 'babel-polyfill'
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
// import ApolloClient, { createNetworkInterface } from 'apollo-client';
import VueApollo from 'vue-apollo'
import Router from 'vue-router'
Vue.use(Router)

import apollo from '../apollo' // apollo client plugin for vue
import router from './router'

// https://www.npmjs.com/package/vue-awesome
// import Icon from 'vue-awesome/components/Icon.vue'
// import 'vue-awesome/icons/heart'

// Install the vue-apollo plugin and use the apollo client
Vue.use(VueApollo, {
  apollo
})

// use vue-material: https://github.com/marcosmoura/vue-material
Vue.use(VueMaterial)

import 'vue-material/dist/components/mdCore/index.css' // Required to boot vue material
import 'vue-material/dist/components/mdButton/index.css'
import 'vue-material/dist/components/mdBottomBar/index.css'
import 'vue-material/dist/components/mdTabs/index.css'
import 'vue-material/dist/components/mdToolbar/index.css'

Vue.use(VueMaterial.mdCore) // Required to boot vue material
Vue.use(VueMaterial.mdBottomBar)
Vue.use(VueMaterial.mdTabs)
Vue.use(VueMaterial.mdToolbar)

// Aplly themes
Vue.material.theme.registerAll({
  default: {
    primary: 'cyan',
    accent: 'pink'
  },
  phone: {
    primary: 'indigo',
    accent: 'pink'
  }
})

import App from './components/App/App.vue'
App.router = router

new Vue(App).$mount('#root')
