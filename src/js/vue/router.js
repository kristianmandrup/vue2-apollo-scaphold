import VueRouter from 'vue-router'

import App from './components/App/App.vue'
// import Home from './components/Home/Home';
// import GraphiQLModule from './components/GraphiQL/GraphiQL';

const routes = [
  { path: '/', name: 'root', component: App }
//  { path: '/home', name: 'home', component: Home },
//  { path: '/graphiql', name: 'graphiql', component: GraphiQLModule }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

