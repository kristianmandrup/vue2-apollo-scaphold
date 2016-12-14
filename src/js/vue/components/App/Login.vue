<template>
  <nav-item onClick="open()">
    Login
    <modal onShow="showModal()" :v-hide="close">
      <modal-header>
        <modal-title>Login Here!</modal-title>
      </modal-header>
      <modal-body>
        <form horizontal>
          <form-group id="formLoginEmail" ref="formLoginEmail">
            <div class="label">
              Email
            </div>
            <div class="usr-input">
              <input type="email" placeholder="Email" @onChange="handleLoginEmailChange()" />
            </div>
          </form-group>

          <form-group ref="formLoginPassword">
            <div class="label">
              Password
            </div>
            <div class="usr-input">
              <input type="password" placeholder="Password" @onChange="handleLoginPasswordChange()" />
            </div>
          </form-group>
        </Form>
        <div class="errors">{{ errors }}</div>
      </modal-body>
      <modal-footer>
        <button class="primary" type="submit" @onClick="loginUser()">Login</button>
        <button @onClick="close()">Close</button>
      </modal-footer>
    </modal>
  </navItem>
</template>        
<script>
import config from './../../../config';
import { * as mutations } from './mutations'
import router from '../../router';

export default {
  props: [],
  data () {
    return {
      showModal: false,
      loginEmail: undefined,
      loginPassword: undefined,
      errors: undefined
    }
  },

  methods: {    
    // called by loginUser() below
    // pass login ctx:
    // - username, passsord
    login(ctx) {
      return this.$apollo.mutate(mutations.LoginWithData(ctx))
    },        
    
    close() {
      this.showModal = false
    },
    open() {
      this.showModal = true
    },

    handleLoginEmailChange(e) {
      this.loginEmail = e.target.value;
    },
    handleLoginPasswordChange(e) {
      this.loginPassword = e.target.value;
    },

    loginUser() {
      this.login({
        username: this.loginEmail,
        password: this.loginPassword
      }).then((data) => {
        if (data.errors) {
          this.errors = data.errors;
          return
        }
        localStorage.setItem('token', data.loginUser.token);
        localStorage.setItem('userId', data.loginUser.id);
        router.push({name: 'home'});
      }).catch((error) => {
        this.errors = [error]
      });
    }
  }
}
</script>
<style>
.errors {
  text-align: 'center';
  color: 'red';
}
</style>


