import VueRouter from 'vue-router'

import Home from './components/App/Home.vue'
// import GraphiQL from './components/GraphiQL/GraphiQL';

const routes = [
  { path: '/', name: 'root', component: Home }
//  { path: '/graphiql', name: 'graphiql', component: GraphiQL }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
