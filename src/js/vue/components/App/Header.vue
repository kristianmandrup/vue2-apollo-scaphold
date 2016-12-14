<template>
  <nav class="top-bar">
    <md-toolbar class="header">
      <md-button class="brand">
        <router-link :to="{ name: 'root' }">Scaphold</router-link>
      </md-button>
    </md-toolbar>
    <section class="right">
      <md-tabs>
        <md-tab><router-link :to="{ name: 'home' }">Home</router-link></md-tab>
        <md-tab><router-link :to="{ name: 'graphiql' }">GraphiQL</router-link></md-tab>
        <md-tab><login></login></md-tab>
        <md-tab><register></register></md-tab>
      <md-tabs>
    </section>
  </nav>
<template>
<script>
// load components
import Login from './Login';
import Register from './Register';
import Logout from '../Home/Logout';

export default {
  // register local components  
  components: [
    'login': Login,
    'register': Register,
    'logout': Logout
  ],  
  props: [],
  data () {
    return {
      showModal: false
    }
  } 
}
</script>
<style>
navbar {
  margin-bottom: 0
}
</style>