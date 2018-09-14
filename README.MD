PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

Changes
---------------

### Add a userID to sample Photo Data

```json
[
    { 
      "id": "1", 
      "name": "Kirkwood Blue Bird",
      "description": "Dropping the heart chute",
      "category": "ACTION",
      "userID": "a"
    },
    { 
      "id": "2", 
      "name": "Squaw Valley",
      "description": "chimney chute",
      "category": "LANDSCAPE",
      "userID": "b"
    }
]
```

### Change the index.js

```graphql
type Photo {
    ...
    postedBy: User!
}
```

```javascript
const resolvers = {
    
    ...

    Photo: {
        url: parent => `/img/photos/${parent.id}.jpg`,
        postedBy: parent => users.find(u => u.id === parent.userID)
    }
}
```

### Test with a Query

```graphql
query photos {
  allPhotos {
    id
    name
    postedBy {
      name
    }
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
6. [x] Querying a Single Photo 

### c. The User Type

1. [x] Challenge: Adding the User Type
2. [x] Connecting Photos to Users
3. [ ] Connecting Users to Photos
4. [ ] Requiring a User to Post a Photo

### d. Context

1. [x] Add environment and refactor
2. [x] Configuring a Database
3. [x] Configure an express server
4. [x] Configure Github OAuth
5. [x] Add `githubLogin` mutation
6. [x] Add fake users to `githubLogin` mutation
7. [x] Identify the `currentUser`
8. [x] Post new Photos to the Database

### e. Subscriptions and Custom Scalars

1. [x] Adding Subscription Support 
2. [ ] Uploading File with postPhoto 
3. [ ] Adding custom scalar for `DateTime`
