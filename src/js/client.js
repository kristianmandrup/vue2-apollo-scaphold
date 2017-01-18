import ApolloClient, { createNetworkInterface } from 'apollo-client'
// import { Client } from 'subscriptions-transport-ws'
// import { addGraphQLSubscriptions } from 'vue-apollo';
import config from '../config/client'

const networkInterface = createNetworkInterface({
  uri: config.scapholdUrl,
  transportBatching: true
})

// const wsClient = new Client('wss://us-west-2.api.scaphold.io/graphql/react-apollo-starter-kit')

// const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
//   networkInterface,
//   wsClient,
// )

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}  // Create the header object if needed.
    }
    if (localStorage.getItem('token')) {
      req.options.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    next()
  }
}])

const client = new ApolloClient({
  networkInterface // : networkInterfaceWithSubscriptions
})

export default client
