<template>
  <md-card>
    <span class="md-headline">Login Here!</span>
    <div class="form">
      <md-input-container>
        <md-input type="email" placeholder="Email" @change="emailChange()" />
      </md-input-container>
      <md-input-container>
        <md-input id="password" type="password" placeholder="Password" @change="passwordChange()" />
      </md-input-container>
      <div class="errors">{{ errors }}</div>
    </div>
    <md-bottom-bar>
      <md-button class="primary" type="submit" @click="loginUser()">Login</button>
    </md-bottom-bar>
  </md-card>
</template>

<script>
import config from './../../../config';
import * as mutations from './mutations'
import router from '../../router';

const log = console.log

function loginWithData(ctx) {
  return mutations.LoginWithData(ctx)
}

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
      log('login', ctx)
      return this.$apollo.mutate(loginWithData(ctx))
    },

    close() {
      log('close')
      this.showModal = false
    },
    open() {
      log('open')
      this.showModal = true
    },

    emailChange(e) {
      this.loginEmail = e.target.value;
    },
    passwordChange(e) {
      this.loginPassword = e.target.value;
    },

    loginUser() {
      log('loginUser')

      this.login({
        username: this.loginEmail,
        password: this.loginPassword
      }).then((data) => {
        log('login response', data)
        const errors = data.errors
        if (errors) {
          log('errors', errors)
          this.errors = errors;
          return
        }
        const loginUser = data.loginUser;
        log('update localStorage', loginUser)
        localStorage.setItem('token', loginUser.token);
        localStorage.setItem('userId', loginUser.id);
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


