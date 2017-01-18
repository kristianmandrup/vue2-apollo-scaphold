<template>
  <nav class="top-bar">
    <section class="right">
      <md-tabs>
        <md-tab id="login" md-label="Login">
          <login></login>
        </md-tab>
        <md-tab id="register" md-label="Register">
          <register></register>
        </md-tab>
      </md-tabs>
    </section>
  </nav>
</template>

<script>
// load components
import Login from './Login.vue';
import Register from './Register.vue';

const log = console.log

export default {
  // register local components
  components: {
    'login': Login,
    'register': Register
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