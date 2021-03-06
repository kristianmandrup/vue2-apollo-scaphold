import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import VueApollo from 'vue-apollo'
// https://www.npmjs.com/package/vue-awesome
// import Icon from 'vue-awesome/components/Icon.vue'
// import 'vue-awesome/icons/heart'
import client from './client' // apollo client plugin for vue
import App from './components/App.vue'

Vue.config.debug = true

// use vue-material: https://github.com/marcosmoura/vue-material
Vue.use(VueMaterial)
Vue.material.registerTheme('default', {
})

Vue.material.setCurrentTheme('default')

// Install the vue-apollo plugin and use the apollo client
Vue.use(VueApollo, {
  apolloClient: client
})

new Vue({
  ...App,
  apollo: {
    // Apollo specific options
  }
}).$mount('#app')

