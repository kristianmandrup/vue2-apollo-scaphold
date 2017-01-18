import ApolloClient, { createNetworkInterface } from 'apollo-client'
import config from '../config/client'

const networkInterface = createNetworkInterface({
  uri: config.scapholdUrl,
  transportBatching: true
})

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
  networkInterface
})

export default client
