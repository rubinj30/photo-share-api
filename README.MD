PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

Changes
---------------

### Change the index.js file

```graphql
type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
    Photo(id:ID!): Photo
}
```

```javascript
const resolvers = {
    Query: {

        ...
        
        Photo: (parent, { id }) => photos.find(p => p.id === id)
    },

    ...

```

### Add a new query 

```graphql
query getPhoto {
  Photo(id:"5242445") {
    name
    url
  }
}
```


### Use Query Parameters

```graphql
query getPhoto($photo_id:ID!) {
  Photo(id:$photo_id) {
    name
    url
  }
}
```

```json
{
  "photo_id":"524244"
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
4. [ ] Configure Github OAuth
5. [ ] Add `githubLogin` mutation
6. [ ] Add fake users to `githubLogin` mutation
7. [ ] Identify the `currentUser`
8. [ ] Post new Photos to the Database

### e. Subscriptions and Custom Scalars

1. [ ] Adding Subscription Support 
2. [ ] Uploading File with postPhoto 
3. [ ] Adding custom scalar for `DateTime`