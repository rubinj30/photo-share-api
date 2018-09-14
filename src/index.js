const { ApolloServer } = require('apollo-server')
const { generate } = require('short-id')

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

    type Query {
        totalPhotos: Int!
        allPhotos: [Photo!]!
        Photo(id:ID!): Photo
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

const photos = []

const resolvers = {
    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos,
        Photo: (parent, { id }) => photos.find(p => p.id === id)
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