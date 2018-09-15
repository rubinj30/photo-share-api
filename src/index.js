const { ApolloServer } = require('apollo-server')

const typeDefs = `
    type Query {
        totalPhotos: Int!
    }
`

const photos = []

const resolvers = {
    Query: {
        totalPhotos: () => photos.length
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen()
    .then(({port}) => `server listening on ${port}`)
    .then(console.log)
    .catch(console.error)