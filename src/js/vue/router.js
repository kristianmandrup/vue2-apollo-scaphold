import VueRouter from 'vue-router'

import App from './components/App/App.vue'
// import Home from './components/Home/Home';
// import GraphiQLModule from './components/GraphiQL/GraphiQL';

const routes = [
  { path: ['/', '/home'], name: 'root', component: App }
//  { path: '/graphiql', name: 'graphiql', component: GraphiQLModule }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
