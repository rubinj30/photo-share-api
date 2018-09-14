PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

Changes
---------------

### Install short-id

`npm i short-id`

### Change index.js

```javascript
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
```

### Test Queries

```graphql
query countPhotos {
  totalPhotos
}

mutation addPhoto {
  postPhoto(name:"Tahoe Sunset") {
    id
    name
    description
  }
}
```

Iterations
---------------

### a. Start

1. [x] Initial Project Folder
2. [x] Apollo Server 2.0

### b. The Photo Type

1. [x] Counting the Photos 
2. [x] Posting a Photo 
3. [ ] Handling Photo Categories 
4. [ ] Using an Input Type 
5. [ ] Listing All Photos 
6. [ ] Querying a Single Photo 

### c. The User Type

1. [x] Challenge: Adding the User Type
2. [x] Connecting Photos to Users
3. [x] Connecting Users to Photos
4. [x] Adding currentUser to context

### d. Context

1. [x] Add environment and refactor
2. [x] Configuring a Database
3. [x] Configure an express server
4. [x] Configure Github OAuth
5. [ ] Add `githubLogin` mutation
6. [ ] Add fake users to `githubLogin` mutation
7. [ ] Identify the `currentUser`
8. [ ] Post new Photos to the Database

### e. Subscriptions and Custom Scalars

1. [ ] Adding Subscription Support 
2. [ ] Uploading File with postPhoto 
3. [ ] Adding custom scalar for `DateTime`
