<template>
  <md-tab @click="open()">
    Register
    <modal v-show="showModal" v-hide="close">
      <modal-Header>
        <modal-title>Register Here!</modal-title>
      <modal-Header>
      <modal-body>
        <form class="horizontal">
          <div class="row">
            <form-group ref="formRegisterEmail">
              <label>
                Email
              </label>
              <div class="control">
                <input type="email" placeholder="Email" @onChange="handleRegisterEmailChange()" />
              </div>
            </form-group>
            <form-group ref="formRegisterPassword">
              <label>
                Password
              </label>
              <div class="control">
                <input type="password" placeholder="Password" @onChange="handleRegisterPasswordChange()" />
              </div>
            </form-group>
          </div>
        </form>
        <div class="errors">{{ errors}}</div>
      </modal-body>
      <modal-footer>
        <md-button class="primary" type="submit" @onClick="registerUser()">Register</md-button>
        <md-button @click="close()">Close</md-button>
      </modal-footer>
    </modal>
  </md-tab>
</template>

<script>
// import { graphql } from 'react-apollo'
// import gql from 'graphql-tag'
import config from './../../../config'
import * as mutations from './mutations'
import router from '../../router'

export default {
  props: [],
  data () {
    return {
      showModal: false,
      registerEmail: undefined,
      registerPassword: undefined,
      errors: undefined
    }
  },
  methods: {
    // open close modal with registration form
    close () {
      this.showModal = false
    },
    open () {
      this.showModal = true
    },

    register (data) {
      return this.$apollo.mutate(mutations.registerUser(data))
    },

    registerUser () {
      // register using Apollo GraphQL mutation on User model in data store
      this.register({
        username: this.registerEmail,
        password: this.registerPassword
      }).then((data) => {
        if (data.errors) {
          this.error = data.errors
          return
        }
        // save token, id in local storage
        localStorage.setItem('token', data.createUser.token)
        localStorage.setItem('userId', data.createUser.changedUser.id)

        // redirect to home
        router.push({name: 'home'});
      }).catch((error) => {
        this.error = error;
      })
    },

    handleRegisterEmailChange(e) {
      this.registerEmail = e.target.value
    },
    handleRegisterPasswordChange(e) {
      this.registerPassword = e.target.value
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

