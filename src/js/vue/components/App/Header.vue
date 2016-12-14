<template>
  <nav class="top-bar">
    <md-toolbar class="header">
      <md-button class="brand">
        <router-link :to="{ name: 'root' }">Scaphold</router-link>
      </md-button>
    </md-toolbar>
    <section class="right">
      <md-tabs>
        <md-tab id="home" md-label="Home">
          <router-link :to="{ name: 'root' }"></router-link>
        </md-tab>
        <!-- <md-tab><router-link :to="{ name: 'graphiql' }">GraphiQL</router-link></md-tab> -->
        <md-tab id="login" md-label="Login">
          <login></login>
        </md-tab>
        <md-tab id="register" md-label="Register">
          Register
          <!-- <register></register> -->
        </md-tab>
      </md-tabs>
    </section>
  </nav>
</template>

<script>
// load components
import Login from './Login.vue';
import Register from './Register.vue';
// import Logout from '../Home/Logout';

const log = console.log

export default {
  // register local components
  components: {
    'login': Login,
    'register': Register
    // 'logout': Logout
  },
  props: [],
  data () {
    return {
      showModal: false,
      activeTab: 'home'
    }
  }
}
</script>

<style>
.header {

}

.brand {

}
</style>