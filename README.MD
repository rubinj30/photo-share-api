PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

Changes
---------------

### Move typeDefs to typeDefs.graphql

__index.js__
```javascript
const { readFileSync } = require('fs')
const typeDefs = readFileSync('src/typeDefs.graphql', 'UTF-8')
```

### Move resolvers to resolvers.js

__resolvers.js__
```javascript
const { generate } = require('short-id')

const photos = require('../data/photos')
const users = require('../data/users')

module.exports = {
    Query: { ... },
    Mutation: { ... },
    Photo: { ... },
    User: { ... }
}
```

__index.js__
* [ ] Remove photos, users, and short-id/generate
```javascript
const resolvers = require('./resolvers')
```

### Add Environment variables

* [ ] Add `.env` file: `DB_HOST=mongodb://localhost:27017/photo-share`
* [ ] Add `.env` to `.gitignore`
* [ ] Install `dotenv`: `npm i dotenv`
* [ ] Modify `start` script in `package.json`.
* [ ] Log the `process.env.DB_HOST` to make sure environment vars are working
* [ ] Start the app: `npm start`

__package.json__
```json
"scripts": {
  "start": "nodemon -r dotenv/config ./src/index.js"
}
```

__index.js__
```javascript
const { ApolloServer } = require('apollo-server')
const { readFileSync } = require('fs')

const resolvers = require('./resolvers')
const typeDefs = readFileSync('src/typeDefs.graphql', 'UTF-8')

console.log('database host: ', process.env.DB_HOST)

const context = {
    currentUser: null
}

...

```

Iterations
---------------

### a. Start

1. [x] Initial Project Folder
2. [x] Apollo Server 2.0

### b. The Photo Type

1. [x] Counting the Photos 
2. [x] Posting a Photo 
3. [x] Handling Photo Categories 
4. [x] Using an Input Type 
5. [x] Listing All Photos 
6. [x] Querying a Single Photo 

### c. The User Type

1. [x] Challenge: Adding the User Type
2. [x] Connecting Photos to Users
3. [x] Connecting Users to Photos
4. [x] Adding currentUser to context

### d. Database and Context

1. [x] Add environment and refactor
2. [ ] Restructuring Queries
3. [ ] Restructuring Mutations

### f. Github Authorization

1. [ ] Environment Variables 
2. [ ] Adding Github Authorization Mutation 
3. [ ] Authorizing with Github 
4. [ ] Authorizing Fake Users 

### g. Subscriptions

1. [ ] Adding Subscription Support 
2. [ ] Publishing Events 

### h. File Uploads

1. [ ] Modifying the Schema to Support File Uploads 
2. [ ] Uploading File with postPhoto 
