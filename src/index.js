const { ApolloServer } = require('apollo-server')
const { readFileSync } = require('fs')
const { MongoClient } = require('mongodb')

const resolvers = require('./resolvers')
const typeDefs = readFileSync('src/typeDefs.graphql', 'UTF-8')

const start = async () => {

    const client = await MongoClient.connect(process.env.DB_HOST, { useNewUrlParser: true })
    const db = client.db()

    const context = {
        photos: db.collection('photos'),
        users: db.collection('users'),
        currentUser: null
    }
    
    const server = new ApolloServer({ typeDefs, resolvers, context })
    
    server.listen()
        .then(({port}) => `server listening on ${port}`)
        .then(console.log)
        .catch(console.error)

}

start()
