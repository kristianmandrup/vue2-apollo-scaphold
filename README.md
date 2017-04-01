# Vue2 Apollo Scaphold starter kit

[![Greenkeeper badge](https://badges.greenkeeper.io/kristianmandrup/vue2-apollo-scaphold.svg)](https://greenkeeper.io/)

Based on [React apollo starter kit](https://github.com/scaphold-io/react-apollo-starter-kit)

Fork this boilerplate code to get started with GraphQL, and Apollo with [Scaphold.io](https://scaphold.io)

**Quickstart:**

1) Go to [Scaphold.io](https://scaphold.io)

2) Create an account and dataset.

3) Change the URL in the API manager (config.js) in the boilerplate to point to your unique Scaphold.io API URL.

5) Install dependencies: `npm install`

4) Run with: `npm start`

Open browser at: `localhost:3001`

Please open the browser console and monitor the logging there to see what goes on under the covers...

It should open the login screen. Try entering some login credentials and it should respond with:

```
{ "graphQLErrors": [ { "message": "Could not find a user with that username", "locations": [ { "line": 2, "column": 3 } ], "path": [ "loginUser" ], "name": "GraphQLError" } ], "message": "GraphQL error: Could not find a user with that username" }
```

Showing that it really works!

Now go to the *register* tab and register with a username and password. Then go back to *login* tab and
login with those credentials and it should display *Login successful :)*

It really works! :D

**Deployment:**

*Note: For development, you only need to run `npm start`*

1) Run `npm run build` to transpile ES6 code from the src/ directory to JavaScript in the lib/ directory.

2) Set the environment variable `process.env.NODE_ENV = 'production'` to let server.js know to run the code in the lib/ directory.

*scaphold.io*
- [scaphold.io quickstart](https://scaphold.io/docs/#quick-start-tutorial)
- [scaphold.io slack channel](https://scaphold.slack.com)

### Vue2

The main points of interest are the `vue-apollo` integrations and GraphQL queries.

*Vue 2*
- [vue 2 API](https://vuejs.org/v2/api/)
- [vue 2 guide](https://vuejs.org/v2/guide/)

*vue-material*
- [repo](https://github.com/marcosmoura/vue-material) and [docs](https://marcosmoura.github.io/vue-material/#/)
- [vue-material getting started](https://marcosmoura.github.io/vue-material/#/getting-started)

*vue-router*
- [vue-router](https://router.vuejs.org/en/essentials/getting-started.html)

*GraphQL*
- [GraphQL first: how to build modern apps](https://dev-blog.apollodata.com/graphql-first-a-better-way-to-build-modern-apps-b5a04f7121a0#.j4jqd5y63)
- [redux dev tools - debug queries in chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
- [GraphiQL](https://medium.com/the-graphqlhub/graphiql-graphql-s-killer-app-9896242b2125#.93aza2s7h)

*Apollo GraphQL client*
- [put GraphQL data in your UI](https://www.youtube.com/watch?v=u1E0CbGeICo)
- [Apollo mutate API](http://dev.apollodata.com/core/apollo-client-api.html#ApolloClient.mutate)
- [Apollo observable query](http://dev.apollodata.com/core/apollo-client-api.html#ObservableQuery)
- [vue-apollo mutations](https://github.com/Akryum/vue-apollo#mutations)
- [graphql subscriptions](https://dev-blog.apollodata.com/a-proposal-for-graphql-subscriptions-1d89b1934c18#.rw9v6x215)
- [introducing vue apollo blog post](https://dev-blog.apollodata.com/use-apollo-in-your-vuejs-app-89812429d8b2#.965u4wz6w)

*Extra tools*
- [optics analytics](http://www.apollodata.com/optics)


The `vue-apollo` author recommends defining the *apollo queries* directly on the component using the special `apollo` key:

```js
  // Apollo GraphQL
  apollo: {
    // Local state 'posts' data will be updated
    // by the GraphQL query result
    posts: {
      // GraphQL query
      query: postsQuery,
      // Will update the 'loading' attribute
      // +1 when a new query is loading
      // -1 when a query is completed
      loadingKey: 'loading',
    },
  },
```

Here is a good mutation example:

```js
export default {
  // Attribute
  props: {
    // Post id passed down to this component
    postId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    upvote() {
      // Mutation
      this.$apollo.mutate({
        mutation: upvoteMutation,
        variables: {
          postId: this.postId,
        },
      }).then(data => {
        console.log('Done upvoting.');
      });
    },
  },
};
```

Please refactor the current Vue2 components to follow best practices!

Also have a look at: [vue-apollo: hello world example](https://github.com/Akryum/frontpage-vue-app)

[Using Vuex with Apollo](https://github.com/Akryum/vue-apollo/issues/7#issuecomment-285974766)

There is now a [vue-supply](https://github.com/Akryum/vue-supply) module which makes it easier to supply Vuex with external data, such as via Apollo.

"Efficiently managing reactive and living data from an external source can become difficult in a large app or when using vuex. With vue-supply, you can easily consume data and automatically activate or deactivate subscriptions."

#### Apollo GraphQL mutations

All the GraphQL queries can be found in `queries.js` under `src/vue/components/App`

The mutation queries can be found in `mutations.js` which use the GraphQL mutation queries defined in `queries.js`.
- `createUser`
- `LoginWithData`

*LoginWithData*

Takes an object with `username` and `password`, then attempts to login via GraphQL API on [scaphold.io](https://scaphold.io).

*createUser*

Creates a new user (ie. Registration). We can then use this user account to login.
Takes an object with `username` and `password`

#### App component

Folder: `src/vue/components/App`

In `App.vue` we have a method `createUser()` which I'm not sure how it fits in... but this is the method used to make a
mutation on the GraphQL backend at [scaphold.io](https://scaphold.io) to actually create a `User` object in the data store [RethinkDB](https://www.rethinkdb.com/).

```js
methods: {
  createUser() {
    this.$apollo.mutate(mutations.createUser({
      username: this.username,
      password: this.password
    }))
```

*subscribe to user*

There is also a `subscribeToUser` method used to subscribe to new users (via RethinkDB changefeed)

    "RethinkDB pushes JSON to your apps in realtime."

Currently it polls every 30 seconds (ie. every minute: `pollInterval: 60000` ms)

```js
subscribeToUser(id) {
  const observable = this.$apollo.watchQuery({
    query: userQuery,
    fragments: createFragment(FragmentDoc),
    pollInterval: 30000,
    forceFetch: true,
    variables: {
      id,
    },
  })

  const subscription = observable.subscribe({
    next(result) {
      // error handling
      ...

      // save in local storage
      // update component state
    }
  })
}
```

#### Register user component

*You need to first register in order to login!*

Contains the following data, bound to the form dialog.

```js
{
  showModal: false, // show modal or not
  registerEmail: undefined, // user email
  registerPassword: undefined, // user password
  errors: undefined // registration error
}
```

#### Login user component

Contains an apollo mutation method to perform a `loginWithData`

```js
  methods: {
    login(ctx) {
      return this.$apollo.mutate(LoginQuery)
    },
    ...
  }
```

The method `loginUser` executes `login`, passing `username` and `password`.
On login success (ie. no `errors` in returned `data`), it stores `token` and `id` in `localStorage` then redirects to `home`.

```js
loginUser() {
  this.login({
    username: this.email,
    password: this.password
  }).then(({ data }) => {
    if (!data.errors) {
      localStorage.setItem('token', data.loginUser.token);
      localStorage.setItem('userId', data.loginUser.id);
      // ...
```

## License

MIT For you pleasure ;)
