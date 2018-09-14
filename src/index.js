const { ApolloServer } = require('apollo-server')
const { generate } = require('short-id')

const photos = require('../data/photos')
const users = require('../data/users')

const typeDefs = `

    enum PhotoCategory {
        PORTRAIT
        LANDSCAPE
        ACTION
        GRAPHIC
    }

    type Photo {
        id: ID!
        name: String!
        url: String!
        description: String
        category: PhotoCategory!
    }

    type User {
        id: ID!
        name: String!
    }

    type Query {
        totalPhotos: Int!
        allPhotos: [Photo!]!
        Photo(id:ID!): Photo
        totalUsers: Int!
        allUsers: [User!]!
        User(id:ID!): User
    }

    input PostPhotoInput {
        name: String! 
        description: String 
        category: PhotoCategory=PORTRAIT
    }

    type Mutation {
        postPhoto(input: PostPhotoInput!): Photo!
    }

`

const resolvers = {
    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos,
        Photo: (parent, { id }) => photos.find(p => p.id === id),
        totalUsers: () => users.length,
        allUsers: () => users,
        User: (parent, { id }) => users.find(p => p.id === id)
    },
    Mutation: {
        postPhoto: (parent, { input }) => {
            const id = generate()
            const newPhoto = { id, ...input }
            photos.push(newPhoto)
            return newPhoto
        }
    },
    Photo: {
        url: parent => `/img/photos/${parent.id}.jpg`
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen()
    .then(({port}) => `server listening on ${port}`)
    .then(console.log)
    .catch(console.error)