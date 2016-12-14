<template>
  <section @click="open()">
    <md-dialog :v-show="showModal">
      <md-dialog-title>
        <span class="dtitle">Login Here!</span>
      </md-dialog-title>
      <md-dialog-content>
        <div class="label">
          Email
        </div>
        <md-input-container class="usr-input">
          <md-input type="email" placeholder="Email" @change="handleLoginEmailChange()" />
        </md-input-container>

        <div class="label">
          Password
        </div>
        <md-input-container class="usr-input">
          <md-input type="password" placeholder="Password" @change="handleLoginPasswordChange()" />
        </md-input-container>
        <div class="errors">{{ errors }}</div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="primary" type="submit" @click="loginUser()">Login</button>
        <md-button @click="close()">Close</button>
      </md-dialog-actions>
    </md-dialog>
  </section>
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

    handleLoginEmailChange(e) {
      this.loginEmail = e.target.value;
    },
    handleLoginPasswordChange(e) {
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


