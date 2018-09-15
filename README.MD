PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

Changes
---------------

### Modify Schema for Github User Auth

__Modify the user type__
```graphql
type User {
    githubLogin: ID!
    name: String!
    avatar: String!
    postedPhotos: [Photo!]!
}
```

__Modify the User Query__
```graphql
type Query {
    ...
    User(githubLogin:ID!): User
}
```

__Add the Mutation__
```graphql
type AuthPayload {
    token: String!
    user: User!
}

type Mutation {
    postPhoto(input: PostPhotoInput!): Photo!
    githubAuth(code: String!): AuthPayload!
}
```

### Modify the Query Resolvers

* [ ] Remove: `const photos = require('../data/photos')`
* [ ] Resolver Query users with __users__ collection

__resolvers.js__
```javascript
const { generate } = require('short-id')

const photos = require('../data/photos')

module.exports = {

    Query: {
        ...

        totalUsers: (parent, args, { users }) => users.countDocuments(),
        allUsers: (parent, args, { users }) => users.find().toArray(),
        User: (parent, { githubLogin }, { users }) => users.findOne({ githubLogin })
    
    },
```

### Add the githubLogin Mutation

__resolvers.js__
```javascript
const { authorizeWithGithub } = require('./lib')

...

module.exports = {

    ...

    Mutation: {
        githubAuth: async (parent, { code }, { users }) => {

            const payload = await authorizeWithGithub({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            })

            if (payload.message) {
                throw new Error(payload.message)
            }

            const githubUserInfo = {
                githubLogin: payload.login,
                name: payload.name,
                avatar: payload.avatar_url,
                githubToken: payload.access_token
            }

            const { ops:[user] } = await users.replaceOne(
                { githubLogin: payload.login }, 
                githubUserInfo, 
                { upsert: true }
            )

            return { user, token: user.githubToken }
            
        }
    }

    ...
    
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
3. [x] Handling Photo Categories 
4. [x] Using an Input Type 
5. [x] Listing All Photos 
6. [x] Querying a Single Photo 

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
5. [x] Add `githubLogin` mutation
6. [ ] Add fake users to `githubLogin` mutation
7. [ ] Identify the `currentUser`
8. [ ] Post new Photos to the Database

### e. Subscriptions and Custom Scalars

1. [ ] Adding Subscription Support 
2. [ ] Uploading File with postPhoto 
3. [ ] Adding custom scalar for `DateTime`
