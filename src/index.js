const { ApolloServer } = require('apollo-server')
const { readFileSync } = require('fs')

const resolvers = require('./resolvers')
const typeDefs = readFileSync('src/typeDefs.graphql', 'UTF-8')

console.log('database host: ', process.env.DB_HOST)

const context = {
    currentUser: null
}

const server = new ApolloServer({ typeDefs, resolvers, context })

server.listen()
    .then(({port}) => `server listening on ${port}`)
    .then(console.log)
    .catch(console.error)