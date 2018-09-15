PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

Changes
---------------

### Modify the Schema

```graphql
type Query {
    me: User
    ...
}
```

### Modify Context

__index.js__
```javascript
const context = async ({req}) => {
    const photos = db.collection('photos')
    const users = db.collection('users')
    const githubToken = req.headers.authorization
    const currentUser = await users.findOne({ githubToken })
    return { photos, users, currentUser }
}
```

### Test

```graphql
query currentUser {
  me {
    name
  }
}

mutation authorize {
  githubAuth(code:"TEST") {
    token 
    user {
      ...person
    }
  }
}

fragment person on User {
  name
  githubLogin
  avatar
  postedPhotos {
    name
  }
}
```

__HTTP Headers__
```json
{
  "Authorization": "d4ef0d880dc3bfd4d445fb6a8c9674d6ebd86935"
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
6. [x] Add fake users to `githubLogin` mutation
7. [x] Identify the `currentUser`
8. [ ] Post new Photos to the Database

### e. Subscriptions and Custom Scalars

1. [ ] Adding Subscription Support 
2. [ ] Uploading File with postPhoto 
3. [ ] Adding custom scalar for `DateTime`
