PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

Changes
---------------
Within the data folder you will find sample json data for __Photos__ and __Users__. We need to initialize the app with the sample data found in this file. Once added, we need to add the necessary types, queries, and resolvers to make the user data accessible with out GraphQL Service.

### Change index.js

```graphql
input PostPhotoInput {
    name: String! 
    description: String 
    category: PhotoCategory=PORTRAIT
}

type Mutation {
    postPhoto(input: PostPhotoInput!): Photo!
}
```

```javascript
const resolvers = {
    
    ....
    
    Mutation: {
        postPhoto: (parent, { input }) => {
            const id = generate()
            const newPhoto = { id, ...input }
            photos.push(newPhoto)
            return newPhoto
        }
    }

}
```

### Test with Query Variables

```graphql
query countPhotos {
  totalPhotos
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
5. [ ] Listing All Photos 
6. [ ] Querying a Single Photo 

### c. The User Type

1. [x] Challenge: Adding the User Type
2. [ ] Connecting Photos to Users
3. [ ] Connecting Users to Photos
4. [ ] Adding currentUser to context

### d. Context

1. [ ] Add environment and refactor
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