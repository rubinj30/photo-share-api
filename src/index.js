const express = require('express')
const expressPlayground = require('graphql-playground-middleware-express').default
const { ApolloServer } = require('apollo-server-express')
const { readFileSync } = require('fs')
const { MongoClient } = require('mongodb')

const resolvers = require('./resolvers')
const typeDefs = readFileSync('src/typeDefs.graphql', 'UTF-8')

const start = async (port) => {

    const client = await MongoClient.connect(process.env.DB_HOST, { useNewUrlParser: true })
    const db = client.db()

    const context = {
        photos: db.collection('photos'),
        users: db.collection('users'),
        currentUser: null
    }
    
    const server = new ApolloServer({ typeDefs, resolvers, context })
    
    const app = express()
    server.applyMiddleware({app})

    app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

    app.get('/', (req, res) => {
        res.end(`Welcome to the Photo Share API`)
    })

    app.listen({ port }, () => {
        console.log(`photo-share api running on port ${port}`)
    })

}

start(process.env.PORT || 4000)
