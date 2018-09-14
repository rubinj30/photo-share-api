PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

Changes
---------------

### Change Code

```graphql
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
}
```

```javascript
const resolvers = {
    
    ...

    Photo: {
        url: parent => `/img/photos/${parent.id}.jpg`
    }

}
```

### Test Query

```graphql
query photos {
  totalPhotos
  allPhotos {
    id
    name
    url
  }
}

mutation addPhoto($input: PostPhotoInput!) {
  postPhoto(input:$input) {
    id
    name
    description
    category
  }
}
```

```json
{
  "input": {
    "name": "Stick the Landing",
    "description": "Glen going big at Mammoth",
    "category": "ACTION"
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
3. [x] Handling Photo Categories 
4. [x] Using an Input Type 
5. [x] Listing All Photos 
6. [ ] Querying a Single Photo 

### c. The User Type

1. [x] Challenge: Adding the User Type
2. [x] Connecting Photos to Users
3. [x] Connecting Users to Photos
4. [x] Adding currentUser to context

### d. Context

1. [x] Add environment and refactor
2. [ ] Configuring a Database
3. [ ] Configure an express server
4. [ ] Configure Github OAuth
5. [ ] Add `githubLogin` mutation
6. [ ] Add fake users to `githubLogin` mutation
7. [ ] Identify the `currentUser`
8. [ ] Post new Photos to the Database

### e. Subscriptions and Custom Scalars

1. [ ] Adding Subscription Support 
2. [ ] Uploading File with postPhoto 
3. [ ] Adding custom scalar for `DateTime`