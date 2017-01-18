<template>
  <md-card>
    <span class="md-headline">Login Here!</span>
    <div class="form">
      <md-input-container>
        <md-input type="email" placeholder="Email" v-model="email" />
      </md-input-container>
      <md-input-container>
        <md-input id="password" type="password" placeholder="Password" v-model="password" />
      </md-input-container>
      <div class="errors">
        <li v-for="error in errors">
          {{ error }}
        </li>
      </div>
    </div>
    <md-bottom-bar>
      <md-button class="primary" type="submit" @click="loginUser()">Login</button>
    </md-bottom-bar>
  </md-card>
</template>

<script>
import gql from 'graphql-tag'
import config from '../../config/client'

const log = console.log

const loginUserMutation = gql `
  mutation LoginUserMutation($data: LoginUserInput!) {
    loginUser(input: $data) {
      token
      user {
        id
        username
      }
    }
  }
`

export default {
  props: [],
  data () {
    return {
      showModal: false,
      email: '',
      password: '',
      errors: []
    }
  },
  apollo: {
    // apollo queries and subscriptions here
    // loginUserMutation
  },
  methods: {
    // called by loginUser() below
    // pass login ctx:
    // - username, passsord
    login(user) {
      log('login', user)

      const mutationQL = {
        mutation: loginUserMutation,
        variables: {
          data: user
        }
      }
      log('mutationQL', mutationQL)

      return this.$apollo.mutate(mutationQL)
    },

    close() {
      log('close')
      this.showModal = false
    },

    open() {
      log('open')
      this.showModal = true
    },

    validateInput() {
      return this.email && this.email.length && this.password && this.password.length
    },

    loginUser() {
      log('loginUser')
      if (!this.validateInput()) {
        this.errors = ['invalid login: email and password must not be empty']
        return
      }

      this.login({
        username: this.email,
        password: this.password
      }).then(({data}) => {
        log('login response', data)
        const errors = data.errors
        if (errors) {
          log('errors', errors)
          this.errors = errors;
          return
        }
        const user = data.loginUser;
        log('update localStorage', user)
        localStorage.setItem('token', user.token)
        localStorage.setItem('userId', JSON.stringify(user))
      }).catch((error) => {
        this.errors = [error]
      })
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


