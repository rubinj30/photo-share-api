const { ApolloServer } = require('apollo-server')
const { generate } = require('short-id')

const typeDefs = `

    type Photo {
        id: ID!
        name: String!
        description: String
    }

    type Query {
        totalPhotos: Int!
    }

    type Mutation {
        postPhoto(name: String!, description: String): Photo!
    }

`

const photos = []

const resolvers = {
    Query: {
        totalPhotos: () => photos.length
    },
    Mutation: {
        postPhoto: (parent, args) => {
            const id = generate()
            const newPhoto = { id, ...args }
            photos.push(newPhoto)
            return newPhoto
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen()
    .then(({port}) => `server listening on ${port}`)
    .then(console.log)
    .catch(console.error)