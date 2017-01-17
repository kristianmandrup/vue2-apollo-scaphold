// import 'babel-polyfill'
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import VueApollo from 'vue-apollo'
import Router from 'vue-router'
Vue.use(Router)

import apollo from '../apollo' // apollo client plugin for vue
import router from './router'

// https://www.npmjs.com/package/vue-awesome
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/heart'

// Install the vue-apollo plugin and use the apollo client
Vue.use(VueApollo, {
  apollo
})

// use vue-material: https://github.com/marcosmoura/vue-material
Vue.use(VueMaterial)

// Aplly themes
Vue.material.theme.register('default', {
  primary: 'indigo',
  accent: 'pink',
  warn: 'deep-orange',
  background: 'grey'
})

import App from './components/App/App.vue'
App.router = router

new Vue(App).$mount('#root')
